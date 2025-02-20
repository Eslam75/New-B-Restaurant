import express from 'express';

import multer from 'multer'

import { addproduct, deleteAllproduct, getALLproduct, getByCategory, getCategoryproduct, getproductDet, getproductDetquick, removeproduct, searchproduct } from './Products.controller.js';
import { authAdmin, authMiddle } from '../../middleWare/middleWare.js';

const productRouter=express.Router()

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()} ${file.originalname}`)
    }
})

const upload=multer({storage:storage})

productRouter.get("/search",searchproduct)
productRouter.post("/addproduct",upload.array('image',6),addproduct)
productRouter.post("/getByCategory",getByCategory)
productRouter.get("/getCategoryproduct",getCategoryproduct)
productRouter.get("/getproductDet/:id",getproductDet)
productRouter.get("/getproductDetquick/:id",getproductDetquick)
productRouter.get("/getallproduct",getALLproduct)
productRouter.delete("/removeproduct/:id",removeproduct)
productRouter.delete("/deleteAllproduct",deleteAllproduct)

export default productRouter