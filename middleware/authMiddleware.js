import express from "express";
import logServices from "./../service/logService.js";

const authMiddleware=express.Router();

class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = new Map();
  }

  isAllowed(userId) {
    const now = Date.now();
    const requests = this.requests.get(userId);

    if (!requests) {
      this.requests.set(userId, [{ timestamp: now }]);
      return true;
    }


    const filteredRequests = requests.filter((request) => now - request.timestamp < this.timeWindow);

    if (filteredRequests.length >= this.maxRequests) {
      return false;
    }

    filteredRequests.push({ timestamp: now });
    this.requests.set(userId, filteredRequests);
    return true;
  }
}



const rateLimiter = new RateLimiter(5, 60 * 1000);


authMiddleware.use(async(req,res,next)=>{
    try{

        // if (req.path=="/register" || req.path.startsWith("/register/") || req.path=="/login" || req.path.startsWith("/register/")) {
            
        //     return next();
    
        // };

        const authHeader = req.headers.authorization;

        const tokenFromHeader = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        const tokenFromCookie = req.cookies?.authToken;

        const token = tokenFromHeader || tokenFromCookie;
        
        if(token){
            const decoded = await logServices.verifyToken(token);

            if(decoded){
                req.user = decoded.id;
                req.role = decoded.role;
                
                if(rateLimiter.isAllowed(req.user)){
                  return next();
                } else{
                    return res.status(429).json({status:"Failed",message:"Too Many Request"});
                };

            };

                return res.status(401).json({error: "Unauthorized access"});
        };

        return res.status(401).json({error: "Unauthorized access"});

    } catch(error){
        console.error("Error in User Authentication middleware: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export default authMiddleware;