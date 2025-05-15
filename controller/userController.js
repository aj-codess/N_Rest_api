import User from "./../models/userModel.js";

const getProfile=async(req,res)=>{
    try{

        const userId=req.user;

        const userObj=await User.findOne({id:userId}).select("-password -_id -__v");

        if(!userObj){
            return res.status(404).json({status:"Failed",message:"Could Not Find User "});
        };

        return res.status(200).json({status:"Success",user:userObj});

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error in Getting profile"});
        console.log("Error Getting User Profile - ",error);
    }
};


export default {
    getProfile
}