// Assuming you have imported your product model (`Product`) from your MongoDB setup

import { productModel } from "../../models/productModel.js";

export const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        // Use a regular expression to search in the 'productName' field
        const searchResults = await productModel.find({
            category: { $regex: query, $options: 'i' } // 'i' for case-insensitive search
        });

        res.json({
            success: true,
            data: searchResults,
            message: 'Products fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
};
