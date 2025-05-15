import logService from "./../service/logService.js";
import User from "./../models/userModel.js";
import Admin from "./../models/adminModel.js";

const cookieOptions = {
  expires: new Date(Date.now() + 15 * 60 * 1000),
  httpOnly: true,
  sameSite: "strict",
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
        if(user){

            if(!(await user.matchPassword(password))){
                return res.status(401).json({status:"Failed",message:"Password Dismatched",isLoggedIn:false});
            };
            token=logService.signToken(user.id,"user");
            res.cookie("authToken",token,cookieOptions);
            return res.status(200).json({status:"Success",message:"Logged in successfully",isLoggedIn:true});

        } else if(admin){

            if(!(await admin.matchPassword(password))){
                return res.status(401).json({status:"Failed",message:"Password Dismatched",isLoggedIn:false});
            };
            token=logService.signToken(admin.id,"admin");
            res.cookie("authToken",token,cookieOptions);
            return res.status(200).json({status:"Success",message:"Logged in successfully",isLoggedIn:true});

        } else{
            return res.status(404).json({status:"Failed",message:"User Not Found"});
        }

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error in Login - ",error});
        console.log("Internal Server Error in Login - ",error);
    }
}


export default {
    login
}