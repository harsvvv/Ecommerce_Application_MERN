import { userModel } from "../../models/userModel.js";
import bcryptjs from 'bcryptjs';


 export const UserSignUpController=async(req,res)=>{
    try {
        const {name,password,email,profilePic}=req.body;

        const user=await userModel.findOne({email});
        if(user ){
         return   res.status(500).json({
                message:"user already exists",
                status:"500",
            })
        }
        if(!email){
            throw new Error("please provide password");
        }
        if(!name){
            throw new Error("please provide userName");
        }
        if(!password){
            throw new Error("please provide password");
        }
        const hashedPassword= bcryptjs.hashSync(password,10);
        const newUser = {
            ...req.body,
            role:"GENERAL",
            password: hashedPassword // Replace plain text password with hashed password
        };



        const result=await userModel.create(newUser);
        res.status(200).json({
            success:true,
            error:false,
            data:result,
            message:"user created successfully"
        });

    } catch (error) {
        console.log(error);
        res.json({
            message:error,
            error:true,
            success:false
        })
    }
}
