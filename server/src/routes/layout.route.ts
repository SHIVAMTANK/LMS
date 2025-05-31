import express from "express";
import { isAutheticated } from "../middleware/auth";
import { authorizeRoles } from "../controllers/user.controller";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAutheticated,
  authorizeRoles("admin"),
  createLayout
);
layoutRouter.put(
  "/edit-layout",
  isAutheticated,
  authorizeRoles("admin"),
  editLayout
);

layoutRouter.get(
  "/get-layout",
  getLayoutByType
);

export default layoutRouter;
