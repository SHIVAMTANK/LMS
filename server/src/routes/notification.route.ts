import express from "express";
import {
  getNotification,
  updateNotification,
} from "../controllers/notification.controller";
import { authorizeRoles, updateAccessToken } from "../controllers/user.controller";
import { isAutheticated } from "../middleware/auth";
const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notification",
  authorizeRoles("admin"),

  updateAccessToken,
  isAutheticated,
  getNotification
);
notificationRouter.put(
  "/update-notification/:id",
  updateAccessToken,
  isAutheticated,
  updateNotification
);

export default notificationRouter;
