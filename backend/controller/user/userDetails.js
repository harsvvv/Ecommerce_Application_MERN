import { userModel } from "../../models/userModel.js";

export const userDetailController = async (req, res) => {
    try {
        const { userId } = req.body; // Ensure userId is in req.body
       
       

        const userDetail = await userModel.findOne({ _id: req.userId });
        
        if (!userDetail) {
            throw new Error("User not found");
        }

        // Destructure to exclude the password field
        const { password, ...user } = userDetail._doc;

        // Send the response with the user details
        res.status(200).json({ user,
            success:true,
            error:false
         });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
