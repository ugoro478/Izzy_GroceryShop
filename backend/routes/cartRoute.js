import express from "express";

import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartControllers.js";
import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/get", authUser, getUserCart);

export default cartRouter; //export the router to use in other files
