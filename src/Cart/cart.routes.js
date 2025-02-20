import express from 'express';
import {  authMiddle } from '../../middleWare/middleWare.js';
import  { deleteAllCartItems,addToCart, getCart, deleteProduct, updateQuantity} from './Cart.controller.js';

const cartRouter=express.Router()
cartRouter.post("/addToCart",authMiddle,addToCart)

cartRouter.get(`/cart`,authMiddle,getCart )
cartRouter.delete(`/deleteAllCartItems`,authMiddle,deleteAllCartItems )

cartRouter.post(`/removeFromCart`,authMiddle,deleteProduct )
cartRouter.post("/updateCart",authMiddle,updateQuantity)

export default cartRouter