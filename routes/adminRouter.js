import express from "express";
import adminController from "./../controller/adminController.js";

const adminRouter=express.Router();

adminRouter.get("/data",(req,res)=>{
    adminController.getData(req,res);
});

export default adminRouter;