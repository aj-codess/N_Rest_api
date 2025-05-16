import express from "express";
import authMiddleware from "./../middleware/authMiddleware.js";
import registerRouter from "./registerRouter.js";
import logRouter from "./logRouter.js";
import userRouter from "./userRouter.js";
import adminRouter from "./adminRouter.js";
import sessionRouter from "./session.js";
import metricsRouter from "./metricsRouter.js";
import refreshTokenRouter from "./refreshTokenRouter.js";

const router=express.Router();

router.use("/register",registerRouter);
router.use("/login",logRouter);

router.use(authMiddleware);

router.use("/profile",userRouter);
router.use("/admin",adminRouter);
router.use("/logout",sessionRouter);
router.use("/metrics",metricsRouter);
router.use("/refresh-token",refreshTokenRouter);

export default router;