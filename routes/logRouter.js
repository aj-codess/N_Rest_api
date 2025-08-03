import express from "express";
import loginController from "./../controller/loginController.js";

const logRouter = express.Router();

logRouter.post("/",(req,res)=>{
    loginController.login(req,res);
});

export default logRouter;
