import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:false
    },
    role:String,
},{timestamps:true});

export const userModel=new mongoose.model("User",userSchema);