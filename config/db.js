import mongoose from "mongoose";

const connectDB=async()=>{

    try{

        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to Mongo.....");

    }catch(error){

        console.error("MongoDB Connection Error:", err);

        process.exit(1);

    }

};


const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from Mongo.");
    } catch (error) {
        console.error("MongoDB Disconnection Error:", error);
    }
};



export default {
    connectDB,
    disconnectDB
};