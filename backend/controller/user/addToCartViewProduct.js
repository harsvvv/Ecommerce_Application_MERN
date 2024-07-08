
import { addToCartModel } from "../../models/cartProduct.js";
 export const addToCartViewProduct=async(req,res)=>{
    try {
        const currentUser=req.userId
        const allProduct=await addToCartModel.find({
            userId: req.userId
        }).populate("productId")

        res.json({
            data:allProduct,
            error:false,
            success:true
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}