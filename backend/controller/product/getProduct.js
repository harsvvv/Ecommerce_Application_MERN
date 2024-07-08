import {productModel} from '../../models/productModel.js'
export const getProductController=async(req,res)=>{
    try {
        const allProduct=await productModel.find().sort({createdAt:-1});
        res.json({
            message:"All product",
            success:true,
            error:false,
            data:allProduct
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true,
            success:false
        })
    }
}