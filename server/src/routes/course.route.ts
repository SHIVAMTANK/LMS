import express from "express";
import {
  addAnwser,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getAllCoursesforAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { isAutheticated } from "../middleware/auth";
import { authorizeRoles, updateAccessToken } from "../controllers/user.controller";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-courses", getAllCourses);
courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-course-content/:id",updateAccessToken ,isAutheticated, getCourseByUser);
courseRouter.put("/add-question", updateAccessToken,isAutheticated, addQuestion);

courseRouter.put("/add-answer",updateAccessToken ,isAutheticated, addAnwser);

courseRouter.put("/add-review/:id", updateAccessToken,isAutheticated, addReview);

courseRouter.put(
  "/add-reply",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  addReplyToReview
);

courseRouter.get(
  "/get-courses-admin",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  getAllCoursesforAdmin
);

courseRouter.post("/course/getVdoCipherOTP",updateAccessToken ,isAutheticated, generateVideoUrl);

courseRouter.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
