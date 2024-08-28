import { userModel } from "../../models/userModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userSignIN = async (req, res) => {
    try {
        const { password, email } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const compare = bcryptjs.compareSync(password, user.password);

        if (compare) {
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,        // Ensure this is true when serving over HTTPS
                sameSite: 'None',    // Cross-site cookie setup
                maxAge: 24 * 60 * 60 * 1000  // Optional: Set cookie expiration time (24 hours here)
            })
            .status(200)
            .json({
                message: "User logged in successfully",
                statusCode: 200,
                user
            });

        } else {
            throw new Error("Wrong password");
        }

    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            error: true,
            success: false
        });
    }
};
