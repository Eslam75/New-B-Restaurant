import { wishlistModel } from "../../model/wishList.js";




export const addtowishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    console.log(currentUser, "current user");
    console.log(productId, "productId");

    const payLoad = {
      userId: currentUser,
      productId: productId,
    };

    const productAvailable = await wishlistModel.findOne({ productId, userId: currentUser }); // Use `findOne` to get a single item
    if (productAvailable) {
      return res.status(200).json({
        found: true,
        message: "This product is already in the cart.",
      });
    }
    
    // Add the new product to the cart
    const newProduct = new wishlistModel(payLoad);
    const saveProduct = await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully.",
      data: saveProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred, please check your information.",
    });
  }
};



export const getWishList = async (req, res) => {
  const userId = req.userId
  try {
    // Find all cart items and populate the `productId` field with details from the `food` collection
    const wishListData = await wishlistModel.find({userId}).populate("productId")
  
    const count =await wishlistModel.countDocuments({
      userId
    })
  
    res.status(200).json({
      data: wishListData,
      success: true,
      count,

      message: "All items in the wishListData",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching wishListData items",
      error: error.message,
    });
  }
};




export const deleteProductWishList = async (req,res) => {
  try {
    const {productId}=req.body
    console.log("productId",productId)
    const product = await wishlistModel.findById(productId);
      
      // Check if the product was found
      if (!product) {
          return { success: false, message: "Product not found." };
      }

      // If found, delete the product
      await wishlistModel.findByIdAndDelete(productId);
      return  res.status(200).json({ success: true, message: "Product successfully deleted." });
  } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "An error occurred while deleting the product." };
  }
};

