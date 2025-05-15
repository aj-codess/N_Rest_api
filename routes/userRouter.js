import express from "express";
import userController from "./../controller/userController.js";

const userRouter=express.Router();

userRouter.get("/",(req,res)=>{
    userController.getProfile(req,res);
});

export default userRouter;