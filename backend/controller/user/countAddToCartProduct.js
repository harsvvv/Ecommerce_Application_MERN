import { addToCartModel } from "../../models/cartProduct.js";

export const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId; // Directly assign userId from req

    const count = await addToCartModel.countDocuments({ userId: userId });
    res.json({
      data: count,
      message: "ok",
      error: false,
      success: true
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true
    });
  }
};
