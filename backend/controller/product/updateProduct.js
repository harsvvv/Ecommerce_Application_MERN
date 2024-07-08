import { uploadProductPermission } from '../../helpers/permission.js';
import { productModel } from '../../models/productModel.js';

export const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission Denied");
    }

    const { _id, ...restBody } = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(_id, restBody, { new: true });
    res.json({
      message: "Product Updated successfully",
      data: updateProduct,
      success: true,
      error: false
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false
    });
  }
};
