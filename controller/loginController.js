import logService from "./../service/logService.js";
import User from "./../models/userModel.js";
import Admin from "./../models/adminModel.js";

const login=async(req,res)=>{
    try{

        const {email,password}=req.body;

        if(!password && req.query.pf==true){
            // make an email push
        };

        

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error in Login - ",error});
        console.log("Internal Server Error in Login - ",error);
    }
}


export default {
    login
}