import { addToCartModel } from "../../models/cartProduct.js";

export const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.currentUserId;
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;
        console.log("Inside controller for update");
        console.log("Product ID:", addToCartProductId);
        console.log("Quantity:", qty);

        // Ensure addToCartProductId is valid
        if (!addToCartProductId) {
            return res.json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        // Ensure qty is a valid number
        if (typeof qty !== 'number' || qty < 1) {
            return res.json({
                message: "Quantity must be a valid number greater than 0",
                error: true,
                success: false
            });
        }

        // Update the product
        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId },
            { $set: { quantity: qty } }
        );

        console.log("Update Result:", updateProduct);

        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
