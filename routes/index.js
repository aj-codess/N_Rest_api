import express from "express";
import authMiddleware from "./../middleware/authMiddleware.js";
import registerRouter from "./registerRouter.js";
import logRouter from "./logRouter.js";
import userRouter from "./userRouter.js";
import adminRouter from "./adminRouter.js";

const router=express.Router();

router.use("/",authMiddleware);
router.use("/register",registerRouter);
router.use("/login",logRouter);
router.use("/profile",userRouter);
router.use("/admin",adminRouter);

export default router;