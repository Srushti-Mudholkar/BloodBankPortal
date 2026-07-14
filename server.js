import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import inventoryRouter from "./routes/inventoryRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import testRouter from "./routes/testRoutes.js";
import protectedRouter from "./routes/protectedRoutes.js";
import requestRouter from "./routes/requestRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from './routes/authRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

const logger = (req,res,next) => {
    console.log(`Request method is ${req.method} and request url is ${req.url}`);
    next();
}

// Routes
app.use("/api/v1/test", testRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/protected", protectedRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 8080;

app.get('/',(req,res) => {
    res.status(200).json({message : 'hello from server'})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})





