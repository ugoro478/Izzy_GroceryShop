import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js";
import {
  placeOrder,
  allOrder,
  userOrder,
  updateStatus,
  // ⛔ Do NOT import placeOrderStripe anymore
} from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrder);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", authUser, placeOrder);

// ⛔ Remove this line completely
// orderRouter.post("/stripe", authUser);

orderRouter.post("/userorders", authUser, userOrder);

export default orderRouter;
