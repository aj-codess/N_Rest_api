import express from "express";
import refreshTokenController from "./../controller/refreshTokenController.js";

const refreshTokenRouter=express.Router();

refreshTokenRouter.all("/",(req,res)=>{
    refreshTokenController.refresh(req,res);
});

export default refreshTokenRouter;