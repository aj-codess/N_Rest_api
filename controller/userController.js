import User from "./../models/userModel.js";
import Admin from "./../models/adminModel.js";


const cookieOptions = {
  expires: new Date(Date.now() + 15 * 60 * 1000),
  httpOnly: true,
  sameSite: "strict",
};


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



const logout=async(req,res)=>{
    try{

        const id=req.user;
        let dbObj;
        if (req.role === "admin") {
                dbObj = await Admin.findOneAndUpdate(
                { id: id },
                { $set: { isActive: false } },
                { new: true }
            );
        } else {
            dbObj = await User.findOneAndUpdate(
                { id: id },
                { $set: { isActive: false } },
                { new: true }
            );
        }

        res.clearCookie("authToken", cookieOptions);
        return res.status(200).json({ message: "Logged out successfully" });

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server error In Loggin out"});
        console.log("Internal Server Error in logging out session - ",error);
    }
}


export default {
    getProfile,
    logout
}