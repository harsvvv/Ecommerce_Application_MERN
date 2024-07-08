import { addToCartModel } from "../../models/cartProduct.js";

export const addToCartController=async(req,res)=>{
    try {
        const {productId}=req?.body
        const currentUser=req.userId;

       

       const isProductAvailable=await addToCartModel.find({productId,userId:currentUser});
       
       if(isProductAvailable && isProductAvailable.length>0){
        return res.json({
            message:"product already exist in Add to Cart",
            success:false,
            error:true
        })
       }

        const payload={
            productId:productId,
            quantity:1,
            userId:currentUser,
        }

        const newAddToCart=await addToCartModel.create(payload);

        res.json({
            data:newAddToCart,
            message:"product Added",
            success:true,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}