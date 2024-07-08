import {productModel} from "../../models/productModel.js"
export const getCategoryProduct=async(req,res)=>{
    try {
        const productCategory=await productModel.distinct("category");
       
        // array to store one product from each category
         const productByCategory=[];

         for(const category of productCategory){
            const product=await productModel.findOne({category});
            if(product){
                productByCategory.push(product);
            }
         }
      res.json({
        message:"category product",
        data:productByCategory,
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