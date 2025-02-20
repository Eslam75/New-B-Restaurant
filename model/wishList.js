import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId:String,
  productId:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
},{timestamps:true});
export const wishlistModel = mongoose.model('wishlist', wishlistSchema);

 