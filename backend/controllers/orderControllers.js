import orderModel from "../models/orderModels.js";
import productModel from "../models/productModels.js";
import userModel from "../models/userModels.js";
import mongoose from "mongoose";

import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "usd";
const deliveryCharge = 12;

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

const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount, address, cartItems } = req.body;

    const items = await Promise.all(
      Object.entries(cartItems).map(async ([itemId, quantity]) => {
        if (!mongoose.isValidObjectId(itemId)) {
          throw new Error(`Invalid product ID: ${itemId}`);
        }
        const product = await productModel.findById(itemId);
        if (!product) {
          throw new Error(`Product not found: ${itemId}`);
        }
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
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery charge" },
        unit_amount: 1200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.ORIGIN}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.ORIGIN}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
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
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  allOrder, // ✅ make sure this is included
  userOrder,
  updateStatus,
  verifyStripe,
};
