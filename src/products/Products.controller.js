import { productmodel } from "../../model/products.js"


export const addproduct=async (req,res)=>{
try {
if(req.files.length==0){
    return res.json({message:"you must send on image"})
}

let arr=[]

for(let i=0;i<req.files.length;i++){
    arr.push(req.files[i].filename)
}

    const file_images=arr
    const food=new productmodel({
        name:req.body.name,
        desc:req.body.desc,
        price:req.body.price,
        image:file_images,
        offer:req.body.offer,
        category:req.body.category,
    })
    const saveFood=await food.save()
    res.json({
        message:"food is added",
        data:saveFood,
        success:true
    })
}
    catch (error) {
        console.log(error)
    res.status(400).json({
        message:"user is not tmam",
        success:false,
        error:error.message||error
    })
}
}

export const getALLproduct=async (req,res)=>{
    try {
        const allFood=await productmodel.find({})
res.status(200).json({
    message:"allFood aho",
    data:allFood,
    success:true

})
    } catch (error) {
        res.status(200).json({
            success:false,
            message:error||error.message
    })
    }
}

export const updateproduct=async (req,res)=>{
try {
    
    const   namee=req.body.name
    const   descc=req.body.desc
    const   pricee=req.body.price
    
    const productUpdate=await productmodel.findByIdAndUpdate(req.body.id,{
        
        ...(namee&&{name:namee}),
        ...(descc&&{desc:descc}),
        ...(pricee&&{price:pricee}),
    
    })
    
    res.status(200).json({
        message:"product updated",
        data:productUpdate,
        suucess:true
    })
    
} 

catch (error) {
      
    res.status(400).json({
        message:error||error.message,
        data:productUpdate,
        suucess:false
    })
}

}

export const removeproduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productmodel.findOneAndDelete({ _id: id });

        if (result) {
            res.status(200).json({ success: true, message: 'Product removed successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing product', error });
    }
};


export const getCategoryproduct=async(req,res)=>{

    try {
        const productCategory=await productmodel.distinct("category")
        const productCartonaCategory=[]
        for (const category of productCategory){
            const product =await productmodel.findOne({category})
        if(product){
            productCartonaCategory.push(product)
        }
    }
    res.status(200).json({
        message:"product is very genius",
        success:true,
        data:productCartonaCategory
    })
    }

     catch (error) {
        res.status(400).json({
            message:"NO",
            success:false,
            error:error||error.message
        })
    }

    } 

    export const getproductDet=async(req,res)=>{
try {
    const {id}=req.params
    const product =await productmodel.findById(id)
    res.status(200).json({
        message:"this product",
        data:product,
        success:true
    })
}

 catch (error) {
    res.status(400).json({
        success:false
    })
}
    }

    export const getproductDetquick=async(req,res)=>{
        try {
            const {id}=req.params
            const product =await productmodel.findById(id)
            res.status(200).json({
                message:"this product",
        data:product,
        success:true
        
            })
        }
         catch (error) {
            res.status(400).json({
                success:false
            })
        }
            }

    export const getByCategory=async(req,res)=>{
        try {
       const {category}=req.body
       const products=await productmodel.find({category})
       res.status(200).json({
        message:"this is all productsxxxxxxxx",
        data:products,
        success:true
       })
        } 
        catch (error) {
            res.status(400).json({
                success:false
            })
        }
            }

    export const searchproduct=async(req,res)=>{
try {
    const query=req.query.q
    const regex=new RegExp(query,"i","g")
    const products=await productmodel.find({
        "$or":[
            {
                name:regex
            },
            {
                category:regex
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

    export const deleteAllproduct=async(req,res)=>{
    try {
            await productmodel.deleteMany()
res.status(200).json({
    message:"all product bye",
    success:true
})
    } catch (error) {
        res.status(200).json({
            message:error,
        success:false
            })
        }
    }
