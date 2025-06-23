import orderModel from "../models/orderModels.js";
import productModel from "../models/productModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "usd";
const deliveryCharge = 12;

const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      res.status(404).json({ message: "User not found" });
    }

    const items = await Promise.all(
      Object.entries(userData.cartData).map(async ([itemId, quantity]) => {
        const product = await productModel.findById(itemId);

        if (!product) {
          throw new Error("Product not found");
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
    if (items.length === 0) {
      res.status(404).json({ message: "Cart is empty" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Cash on Delivery",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "order could not be placed" });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;
    const { origin } = await req.headers;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const items = await Promise.all(
      Object.entries(userData.cartData).map(async ([itemId, quantity]) => {
        const product = await productModel.findById(itemId);

        return {
          itemId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        };
      })
    );
    if (items.length === 0) {
      return res.json({ message: "Cart is empty" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery charge" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      await userModel.findByIdAndDelete(userId, { cartData: {} });

      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.messgae });
  }
};

const allOrder = async (req, res) => {
  try {
    const order = await orderModel.find({});
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "could not fetch orders" });
  }
};

const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const order = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "could not fetch orders" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.messgae });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  allOrder,
  userOrder,
  updateStatus,
  verifyStripe,
};
