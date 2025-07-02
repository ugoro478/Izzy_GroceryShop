import userModel from "../models/userModels.js";
import mongoose from "mongoose";

// ✅ Use regular function declarations (no export keyword here)
const addToCart = async (req, res) => {
  console.log("Incoming userId from token:", req.userId);
  try {
    const userId = req.userId; // ✅ Get userId from token middleware
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.cartData[productId] = (user.cartData[productId] || 0) + 1;
    await user.save();

    return res
      .status(200)
      .json({ message: "Item added to cart", cartData: user.cartData });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    return res.status(500).json({ error: "Failed to add item to cart" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ message: "User not found" });

    let cartData = userData.cartData;
    cartData[itemId] = quantity;

    await userModel.findByIdAndUpdate("685abd7ad765dc2067a26b6c", {
      cartData: {},
    });

    res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Export them once at the bottom
export { addToCart, updateCart, getUserCart };
