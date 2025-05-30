import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {ErrorMiddleware} from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";

dotenv.config();

export const app = express();

// Enable CORS
app.use(cors({
    origin:process.env.ORIGIN
}));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API IS WORKING",
  });
});

app.use(ErrorMiddleware);

app.use("/api/v1",userRouter,courseRouter,orderRouter,notificationRouter,analyticsRouter);
