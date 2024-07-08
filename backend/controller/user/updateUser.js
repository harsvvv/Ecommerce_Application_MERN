import {userModel} from '../../models/userModel.js'
export const updateUser=async(req,res)=>{
    try {

        const sessionUser=req.userId;
        const {userId,email,name,role}=req.body;

     const payload={
        ...(email && {email:email}),
        ...(name && {name:name}),
        ...(role && {role:role})

     }
     const user=await userModel.findById(sessionUser);

    console.log("user role",user.role);




    const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });
     res.json({
        user:updateUser,
        message:"user updated",
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