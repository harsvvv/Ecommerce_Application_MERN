import { productModel } from "../../models/productModel.js"

export const getCategoryWiseProduct=async(req,res)=>{
    try {

        const {category}=req?.body || req?.query;
        const product=await productModel.find({category})
        res.json({
            data:product,
            message:"product ",
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