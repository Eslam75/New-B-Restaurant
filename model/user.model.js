import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
    },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"",
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"admin"
    }
},
{timestamps:true})

export const usermodel=mongoose.model("user",userSchema) 