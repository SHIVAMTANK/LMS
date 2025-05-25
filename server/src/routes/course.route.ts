import express from "express";
import {
  addAnwser,
  addQuestion,
  editCouser,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { isAutheticated } from "../middleware/auth";
import { authorizeRoles } from "../controllers/user.controller";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAutheticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAutheticated,
  authorizeRoles("admin"),
  editCouser
);

courseRouter.get("/get-courses",getAllCourses);
courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-course-content/:id",isAutheticated,getCourseByUser)
courseRouter.put("/add-question",isAutheticated,addQuestion);

courseRouter.put("/add-answer",isAutheticated,addAnwser);

export default courseRouter;
