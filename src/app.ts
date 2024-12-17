import Express from "express";
import mongoose from "mongoose";
import { authenticateToken } from "./middleware/auth";
import cors from "cors";
import  studentRouter  from "./router/studentRouter";
import authRouter from "./router/authRouter";

const app = Express();

const DBURL = 'mongodb://localhost:27017/STUDENT_MANAGEMENT_SYSTEM'

const PORT = 3000;

mongoose.connect(DBURL)
.then(() => {
    console.log("MongoDb Connected Successfully");
}).catch((err) => {
    console.log(err);
});

app.use(Express.json());

app.use(cors());

app.use('/api',authRouter);

app.use('/api/student',authenticateToken,studentRouter);

app.listen(PORT,()=>console.log("Listen On port 3000"));