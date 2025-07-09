import express from 'express';
import { isAutheticated } from '../middleware/auth';
import { createOrder, getAllOrders, newPayment, sendStripePublishableKey } from '../controllers/order.controller';
import { authorizeRoles, updateAccessToken } from '../controllers/user.controller';
import sendMail from '../utils/sendMail';

const orderRouter = express.Router();
orderRouter.post("/create-order", updateAccessToken,isAutheticated,createOrder);
orderRouter.get("/get-orders", updateAccessToken,isAutheticated,authorizeRoles("admin"),getAllOrders)

orderRouter.get("/payment/stripepublishkey",sendStripePublishableKey);

orderRouter.post("/payment",isAutheticated,newPayment);

export default orderRouter;