import express from 'express';
import { isAutheticated } from '../middleware/auth';
import { createOrder, getAllOrders } from '../controllers/order.controller';
import { authorizeRoles, updateAccessToken } from '../controllers/user.controller';

const orderRouter = express.Router();
orderRouter.post("/create-order", updateAccessToken,isAutheticated,createOrder);
orderRouter.get("/get-orders", updateAccessToken,isAutheticated,authorizeRoles("admin"),getAllOrders)


export default orderRouter;