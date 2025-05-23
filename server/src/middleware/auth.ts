import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import Jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../utils/redis";
dotenv.config();

export const isAutheticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    const decoded = Jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN || ''
    ) as JwtPayload;
    const user = await redis.get(decoded.id);

    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    req.user = JSON.parse(user);

    next();
  }
);
