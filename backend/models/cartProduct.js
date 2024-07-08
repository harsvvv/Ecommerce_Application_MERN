import mongoose from "mongoose";
import {Schema} from "mongoose"

const cartSchema=new Schema({
   productId:{
      ref: "product",
      type:String,
   },
   quantity:Number,
   userId: String
},{timestamps:true})


export const addToCartModel=mongoose.model("addToCart",cartSchema)