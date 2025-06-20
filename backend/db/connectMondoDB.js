import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected to ${connection.connection.host}`);
    }
    catch(error){
        console.error(`Error:${error.message}`);
    }
}
export default connectDB;