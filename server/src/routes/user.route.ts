import express from "express";
import {
  activateUser,
  authorizeRoles,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from "../controllers/user.controller";
import { isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAutheticated, logoutUser);

userRouter.get("/refreshtoken", updateAccessToken);

userRouter.get("/me", isAutheticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", isAutheticated, updateUserInfo);

userRouter.put("/update-user-password", isAutheticated, updatePassword);

userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);

export default userRouter;
