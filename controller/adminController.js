import Admin from "./../models/adminModel.js";

const getData=async(req,res)=>{
    try{
        if(req.role=="user"){
            return res.status(409).json({status:"Failed",message:"Role not Allowed for this Route"});
        };

        const adminId=req.user;

        const adminObj=await Admin.findOne({id:adminId}).select("-password -_id -__v");

        if(!adminObj){
            return res.status(409).json({status:"Failed",message:"Admin Data Not Found"});
        };

        return res.status(200).json({status:"Success",admin:adminObj});

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error in Getting Admin Profile"});
        console.log("Error Getting Admin Data - ",error);
    }
};

export default {
    getData
}