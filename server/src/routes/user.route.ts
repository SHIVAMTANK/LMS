import express from "express";
import { activateUser, authorizeRoles, loginUser, logoutUser, registrationUser } from "../controllers/user.controller";
import { isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post('/registration',registrationUser);
userRouter.post('/activate-user',activateUser);

userRouter.post('/login',loginUser);
userRouter.post('/logout',isAutheticated,authorizeRoles("admin"),logoutUser);

export default userRouter;