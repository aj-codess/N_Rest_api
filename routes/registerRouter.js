import express from "express";
import registerController from "../controller/registerController.js";

const registerRouter = express.Router();

registerRouter.post("/",(req,res)=>{
    registerController.register(req,res);
});

export default registerRouter;