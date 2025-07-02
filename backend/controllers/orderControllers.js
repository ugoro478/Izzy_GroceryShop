import orderModel from "../models/orderModels.js";
import productModel from "../models/productModels.js";
import userModel from "../models/userModels.js";
import mongoose from "mongoose";

const deliveryCharge = 12;

// 🛒 Place order (COD)
const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const { amount, address, cartItems } = req.body;

    if (!Array.isArray(Object.entries(cartItems))) {
      throw new Error("Invalid cart items");
    }

    const items = await Promise.all(
      Object.entries(cartItems).map(async ([itemId, quantity]) => {
        if (!mongoose.isValidObjectId(itemId)) {
          throw new Error(`Invalid product ID: ${itemId}`);
        }

        const product = await productModel.findById(itemId).session(session);
        if (!product) throw new Error(`Product ${itemId} not found`);
        if (product.stock < quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        await productModel.findByIdAndUpdate(
          itemId,
          { $inc: { stock: -quantity } },
          { session }
        );

        return {
          itemId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        };
      })
    );

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Cash on Delivery",
      payment: false,
      date: Date.now(),
    };

    await orderModel.create([orderData], { session });
    await userModel.findByIdAndUpdate(userId, { cartData: {} }, { session });

    await session.commitTransaction();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    await session.abortTransaction();
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// 👤 Get all orders
const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// ✅ Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧍‍♂️ Get user-specific orders
const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const order = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Could not fetch orders" });
  }
};

export { placeOrder, allOrder, userOrder, updateStatus };
