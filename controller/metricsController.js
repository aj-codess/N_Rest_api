import User from "./../models/userModel.js";
import Admin from "./../models/adminModel.js";
import loginController from "./loginController.js";
import registerController from "./registerController.js";

const getMetrics=async(req,res)=>{
    try{
        
        const totalUsers = await User.countDocuments({});
        const totalAdmins = await Admin.countDocuments({});
        const total = totalUsers + totalAdmins;

        res.status(200).json({
            status:"Failed",
            totalUsers,
            totalAdmins,
            totalUsers:total,
            totalFailedRegister:registerController.getFailed,
            totalFailedLog:loginController.failedLog
        });

    } catch(error){
        res.status(409).json({status:"Failed",message:"Internal Server Error getting Metrics"});
        console.log("Internal Server Error Getting Metrics - ",error);
    }
};


export default {
    getMetrics
}