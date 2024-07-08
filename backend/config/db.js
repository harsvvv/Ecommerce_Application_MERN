import mongoose from 'mongoose';

const connectDB=async()=>{
    try {
        mongoose.connect("mongodb+srv://harshit3152001:harshit3152001@cluster0.qtloynv.mongodb.net/");
        console.log("Db is connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;