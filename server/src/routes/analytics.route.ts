import express from 'express';
import { isAutheticated } from '../middleware/auth';
import { authorizeRoles } from '../controllers/user.controller';
import { getCoursesAnalytics, getOrderAnalytics, getUsersAnalytics } from '../controllers/analytics.controller';
const analyticsRouter = express.Router();


analyticsRouter.get("/get-users-analytics",isAutheticated,authorizeRoles("admin"),getUsersAnalytics);
analyticsRouter.get("/get-courses-analytics",isAutheticated,authorizeRoles("admin"),getCoursesAnalytics);
analyticsRouter.get("/get-orders-analytics",isAutheticated,authorizeRoles("admin"),getOrderAnalytics);


export default analyticsRouter;