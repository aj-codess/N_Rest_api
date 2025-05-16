import express from "express";
import loginController from "./../controller/loginController.js";

const xlogRouter = express.Router();

logRouter.post("/",(req,res)=>{
    loginController.login(req,res);
});
x
export default logRouter;