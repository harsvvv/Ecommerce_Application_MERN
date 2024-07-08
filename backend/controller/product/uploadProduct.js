
import { productModel } from "../../models/productModel.js";
import { uploadProductPermission } from "../../helpers/permission.js";

export const  uploadProductController=async(req,res)=>{
    try {

        const sessionUserId=req.userId;
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("permission denied");

        }
        const uploadProduct=await productModel.create(req.body);
        res.status(201).json({
            message:"product upload successful",
            error:false,
            success:true,
            data:uploadProduct
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }

}