import logService from "./../service/logService.js";
import User from "./../models/userModel.js";
import Admin from "./../models/adminModel.js";
import utility from "./../service/utility.js";


const cookieOptions = {
  expires: new Date(Date.now() + 15 * 60 * 1000),
  httpOnly: true,
  sameSite: "strict",
};


const register=async(req,res)=>{
    try{

        const {email,password,name,role}=req.body;

        if(!email || !password || !role){
            res.status(409).json({status:"Failed",message:"Insert into required areas"});
        };

        const userId=utility.genId();

        let savedObj;
        if(role=="user"){
            const newUser=new User({
                id: userId,
                email: email,
                name: name,
                password: logService.passHash(password),
            });
            savedObj=await newUser.save();
        } else{
            const newAdmin=new Admin({
                id:userId,
                name:name,
                email:email,
                pasword:logService.passHash(password),
            });
            savedObj=await newAdmin.save();
        };

        if(savedObj){
            const token=logService.signToken(savedObj.id,role);

            res.cookie("authToken", token, cookieOptions);

            return res.status(200).json({
                status:"Success",
                username: savedObj.name,
                message: 'User Created Successfully',
            });

        };

        return res.status(400).json({status:"Failed",message:"Failed creating User"});

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error In registering User"});
        console.log("Internal Server Error In Registering User - ",error);
    }
};

export default {
    register
}