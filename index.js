import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index.js";
import logService from "./service/logService.js";
import db from "./config/db.js";

dotenv.config();

await db.connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const PORT=process.env.PORT || 3000;

logService.writePublicPrivate();
logService.loadKeyToMemory();

app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
);

app.use("/api/v1",router);

app.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`);

});