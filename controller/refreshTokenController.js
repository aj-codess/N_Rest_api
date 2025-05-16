import logServices from "../service/logService.js";

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

const refresh=async(req,res)=>{
    try{

        const refreshToken=req.cookies?.refreshToken;

        if(refreshToken){
            const decode=await logServices.verifyToken(token);

            if(decode){

                const token=logServices.signToken(decode.id,decode.role);
                const refreshToken=logServices.signToken(decode.id,decode.role);

                res.cookie("authToken", token, cookieOptions);
                res.cookie("refreshToken",refreshToken,refreshCookieOptions);

                return res.status(200).json({status:"Success",message:"Token Refreshed Successfully"});
            };
        };

        return res.status(401).json({status:"Failed",message:"refresh Token not found"});

    } catch(error){
        res.status(500).json({status:"Failed",message:"Internal server Error refreshing token"});
        console.log("Internal Server Error in refreshing Token - ",error);
    }
};

export default {
    refresh
}