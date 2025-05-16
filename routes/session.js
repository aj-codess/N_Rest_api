import express from "express";
import userController from "../controller/userController.js";

const sessionRouter=express.Router();

sessionRouter.post("/",(req,res)=>{
    userController.logout(req,res);
});

export default sessionRouter;