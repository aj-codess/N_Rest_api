import logService from "./../service/logService.js";

const register=async(req,res)=>{
    try{

        const {email,password,name,role}=req.body;

        if(!email || !password || !role){
            res.status(409).json({status:"Failed",message:"Insert into required areas"});
        };

        

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal Server Error In registering User"});
        console.log("Internal Server Error In Registering User - ",error);
    }
};

export default {
    register
}