import express from "express";
import authMiddleware from "./../middleware/authMiddleware.js";
import registerRouter from "./registerRouter.js";
import logRouter from "./logRouter.js";

const router=express.Router();

router.use("/",authMiddleware);
router.use("/register",registerRouter);
router.use("/login",logRouter);

export default router;