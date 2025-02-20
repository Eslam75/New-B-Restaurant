import express from 'express';
import {  deleteAllUser, deleteUser, getAllUser, getUserProfile, getuser, searchUser, signUp , signin, updateUser, updateUserProfile } from './user.controller.js';
import { authAdmin, authMiddle } from '../../middleWare/middleWare.js';
import { uploadimage } from '../../utilts/uploadImage.js';

const userRouter=express.Router()

userRouter.post("/register",signUp)
userRouter.post("/login",signin)
userRouter.get("/getuserProfile/:id",getUserProfile)
userRouter.get("/getuser/:id",getuser)
userRouter.get("/getAllUser",getAllUser)
userRouter.put("/updateUserProfile/:id",uploadimage.single("profilePic"),authMiddle,updateUserProfile)
userRouter.delete("/deleteAllUser",deleteAllUser)
userRouter.post("/deleteUser",deleteUser)
userRouter.post("/updateUser",updateUser)


// followindRoutes


export default userRouter
