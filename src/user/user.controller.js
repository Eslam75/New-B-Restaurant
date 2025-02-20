import { usermodel } from "../../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs";
import path from "path";


export const signUp=async(req,res,next)=>{
try {
    const {username,email,password,profilePic}=req.body
    
    const user=await usermodel.findOne({email})
    
    if(user){return res.status(400).json({message:"user ALready exists",success:false})}
    
    const hashPassword=  bcrypt.hashSync(password,8)
    
    if(!hashPassword)
      {
    throw new Error("something is wrong")
     }

const payload={
    ...req.body,
    password:hashPassword,
    profilePic:profilePic||""
}

const newUser=new usermodel(payload)

const saveUser=await newUser.save()


res.json({
    data:saveUser,
    success:true,
    error:false
})

}catch (error) {
res.status(400).json({message:"something is wrong",success:false})
  
}

}

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const tokenData = {
      tokenId: user._id,
      tokenname: user.name,
    };
    const token = jwt.sign(tokenData, process.env.seucritYtOKENkEY, {
      expiresIn: "1d", 
    });

    // Respond with user data and token
    return res.status(200).json({
      data: user,
      success: true,
      token: token,
      message: "Login successful",
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Server error occurred"));
  }
};

export const getUserProfile=async (req, res) => {
  try {
      const user = await usermodel.findById(req.params.id).select("-password")
      .populate("followers","username email profilePic")
      .populate("following","username email profilePic");
      ;
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({user,success:true});
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
}

export const getuser= async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await usermodel.find().select("-password"); // Exclude password
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ data: users, success: true }); // Fix `use` to `users`
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating user:", id);

    const userId=req.userId
    if (userId !== id && !req.user.isAdmin) {
      return res.status(403).json({ message: "غير مسموح بتحديث بيانات مستخدم آخر" });
  }
    const { username, email, bio } = req.body;
    let profilePic = req.file ? req.file.filename : null;

    const user = await usermodel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If a new profile picture is uploaded, delete the old one
    if (profilePic && user.profilePic) {
      const oldPicPath = path.join(__dirname, "../uploads", user.profilePic);
      if (fs.existsSync(oldPicPath)) {
        fs.unlinkSync(oldPicPath);
      }
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const updateUser=async (req,res,next)=>{
  try {
   const {userId,name,role,email}=req.body
   const payload={
       ...(name&&{name:name}),
       ...(role&&{role:role}),
       ...(email&&{email:email}),
   }
   const updateUser=await usermodel.findByIdAndUpdate(userId,payload)

   res.status(200).json({
       message:"gd3",
       success:true,
       data:updateUser
   })

  } catch (error) {
   res.status(400).json({
       message:"error leh ya kos omk",
       success:false,
   })

  }

   }


export const deleteAllUser=async(req,res)=>{
  try {
    await usermodel.deleteMany({})
    res.status(200).json({message:"all users deleted"})
  } catch (error) {
    res.status(500).json({message:"server error"})
  }
}






export const getFollowers = async (req, res) =>{
  try {
    const userId = req.userId;
    const user = await usermodel.findById(userId)
      .populate({
        path: "followers",
        select: "username email profilePic"
      })
      .populate({
        path: "following",
        select: "username email profilePic"
      });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      following: user.following, 
      followers: user.followers 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const searchUser=async(req,res)=>{
  try {
      const query=req.query.q
      const regex=new RegExp(query,"i","g")
      const products=await usermodel.find({
          "$or":[
              {
                  username:regex
              },
              {
                  id:regex
              },
              {
                email:regex
            },
          ]
      })
  
  res.status(200).json({
          message:"this is all products",
          data:products,
          success:true
  })} 
  
      catch (error) {
          res.status(400).json({
          success:false
          })
  }
  
  }






  export const deleteUser=async (req,res,next)=>{
    try {
        const {userId}=req.body
      
        const deleteUser=await usermodel.findByIdAndDelete(userId)
    
        res.status(200).json({
            message:"gd3",
            success:true,
            data:deleteUser
        })
    
       } catch (error) {
        res.status(400).json({
            message:"error leh ya kos omk",
            success:false,
        })
    
       }
  }
  