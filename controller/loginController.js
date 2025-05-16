import logService from "./../service/logService.js";
import User from "./../models/userModel.js";
import Admin from "./../models/adminModel.js";

let totalFailedLog;

const cookieOptions = {
  expires: new Date(Date.now() + 15 * 60 * 1000),
  httpOnly: true,
  sameSite: "strict",
};


const refreshCookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: "strict",
  secure: true,
};


const login=async(req,res)=>{
    try{

        const {email,password}=req.body;

        if(!password && req.query.pf==true){
            // make an email push
        };

        const [user,admin]=await Promise.all([
            User.findOne({email}),
            Admin.findOne({email})
        ]);

        let token;
        let refreshToken;
        if(user){

            if(!(await user.matchPassword(password))){
                totalFailedLog++;
                return res.status(401).json({status:"Failed",message:"Password Dismatched",isLoggedIn:false});
            };

            token=logService.signToken(user.id,"user");
            refreshToken=logService.signToken(user.id,"user");

            res.cookie("authToken",token,cookieOptions);
            res.cookie("refreshToken",refreshToken,refreshCookieOptions);

            return res.status(200).json({status:"Success",message:"Logged in successfully",isLoggedIn:true});

        } else if(admin){

            if(!(await admin.matchPassword(password))){
                totalFailedLog++;
                return res.status(401).json({status:"Failed",message:"Password Dismatched",isLoggedIn:false});
            };

            token=logService.signToken(admin.id,"admin");
            refreshToken=logService.signToken(user.id,"user");

            res.cookie("authToken",token,cookieOptions);
            res.cookie("refreshToken",refreshToken,refreshCookieOptions);

            return res.status(200).json({status:"Success",message:"Logged in successfully",isLoggedIn:true});

        } else{
            totalFailedLog++;
            return res.status(404).json({status:"Failed",message:"User Not Found"});
        }

    } catch(error){
        totalFailedLog++;
        res.status(500).json({status:"Failed",message:"Internal Server Error in Login - ",error});
        console.log("Internal Server Error in Login - ",error);
    }
}


const failedLog=()=>{
    return totalFailedLog;
}

export default {
    login,
    failedLog
}