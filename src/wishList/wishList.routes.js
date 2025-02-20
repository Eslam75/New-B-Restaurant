import express from 'express';
import {  addtowishlist, getWishList, deleteProductWishList } from './wishList.controller.js';
import {  authMiddle } from '../../middleWare/middleWare.js';

export const wishRouter=express.Router()

wishRouter.post('/addTowishlist',authMiddle,addtowishlist);
wishRouter.get('/getwishlist',authMiddle,getWishList);

wishRouter.post('/deleteProductWishlist',authMiddle,deleteProductWishList);

