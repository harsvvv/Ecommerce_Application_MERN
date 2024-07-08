import mongoose from 'mongoose';

const connectDB=async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Db is connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;