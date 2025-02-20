import mongoose from "mongoose";
import  dotenv  from "dotenv";
dotenv.config()

export const  dbconnection= ()=>{
    mongoose.connect(process.env.connectedDB)
    .then(()=>console.log("hello"))
    .catch((err)=>console.log("Why do that" ,err));
}


