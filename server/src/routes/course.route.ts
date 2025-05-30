import express from "express";
import {
  addAnwser,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCouser,
  getAllCourses,
  getAllCoursesforAdmin,
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

courseRouter.put("/add-review/:id",isAutheticated,addReview);

courseRouter.put("/add-reply",isAutheticated,authorizeRoles("admin"),addReplyToReview);

courseRouter.get("/get-courses-admin",isAutheticated,authorizeRoles("admin"),getAllCoursesforAdmin)

courseRouter.delete("/delete-course/:id",isAutheticated,authorizeRoles("admin"),deleteCourse);


export default courseRouter;
