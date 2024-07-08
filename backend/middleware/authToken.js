import jwt from 'jsonwebtoken';

export const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers['authorization'];

        if (!token) {
            return res.status(401).json({
                message: 'user not logged IN',
                error: true,
                success: false
            });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        console.log("inside authToken",verify.id);
       

        if (verify) {
            req.userId = verify.id;
            next();
        } else {
            console.log("Token is not valid");
            res.status(401).json({
                message: 'Token is not valid',
                error: true,
                success: false
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};