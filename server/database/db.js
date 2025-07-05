import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected"); //"mongodb://localhost:27017/GoStaff"
    } catch(error){
        console.log(error);
    }
    
}
export default connectDB;