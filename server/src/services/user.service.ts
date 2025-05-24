import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

//get user by id
export const getUserById = async (id: string, res: Response) => {
  //we have redis so we get user from there rather than mongo
  const userJson = await redis.get(id);

  const user = JSON.parse(userJson as string);
  res.status(201).json({
    success: true,
    user,
  });
};
