
export const userLogOut=async(req,res)=>{
    try {
        res.clearCookie("token");

        res.json({
            message:"Logged out successfully",
            error:false,
            success:true,
            data:[]
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:error.message,
            error:true,
            success:false
        })
    }
}