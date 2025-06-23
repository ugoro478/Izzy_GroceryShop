import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js";
import {
  placeOrder,
  placeOrderStripe,
  allOrder,
  userOrder,
  updateStatus,
  verifyStripe,
} from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrder);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/userorders", authUser, userOrder);

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter; // Export the router
