import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

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

//Get all user
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  try {
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
    //update the role and return the new updated objected
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {}
};
