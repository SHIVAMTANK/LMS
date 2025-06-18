import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";

dotenv.config();

export const app = express();

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Body parser with increased size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Cookie parser
app.use(cookieParser());

// Test route
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API IS WORKING",
  });
});

// Routers
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);

// Error middleware
app.use(ErrorMiddleware);
