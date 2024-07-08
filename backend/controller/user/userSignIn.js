import { userModel } from "../../models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const userSignIN=async(req,res)=>{
    try {
        const {password,email}=req.body;
        if(!email){
            throw new Error("please provide email");
        }
        if(!password){
            throw new Error("please provide password");
        }
        const user=await userModel.findOne({email});
        if(!user){
            throw new Error("User not found");
        }
        const compare=bcryptjs.compareSync(password,user.password);
        if(compare){
            const token=await jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.cookie("token",token,{httpOnly:true}).status(200).json({
                "message":"user loggin successfully",
                statuscode:200,
                user
                })

        }else{
            throw new Error("wrong password");
        }


    } catch (error) {
        console.log(error);
        res.json({
            message:error.message,
            error:true,
            success:false
        })
    }
}