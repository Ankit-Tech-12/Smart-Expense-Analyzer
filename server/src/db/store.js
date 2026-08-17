import mongoose from "mongoose";

export const connectDb =async () => {
    try {
     await mongoose.connect(process.env.MONGODB_URI) ;  
     console.log("DB is connected!!!")
    } catch (err) {
        console.log("DB connection failed :",err);
    }
}