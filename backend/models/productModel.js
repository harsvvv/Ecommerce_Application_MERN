import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema=new Schema({
    productName:{
        type:String,
        required:true,
    },
    brandName:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    productImage:[],
    sellingPrice:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const productModel=mongoose.model("product",productSchema)