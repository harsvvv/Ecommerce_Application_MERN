import { userModel } from "../../models/userModel.js";

export const allUsers=async(req,res)=>{
try {
   
    const users=await userModel.find().select("-password");
    res.json({
        message:"api working fine good",
        data:users,
        success:true,
        error:false
    })
} catch (error) {
    
    res.json({
        message:error.message,
        error:true,
        success:false
    })
}
}