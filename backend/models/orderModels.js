import mongoose from "mongoose";

const orderScheme = new mongoose.Schema({
  userId: { type: String, required: true },
  itmes: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, requried: true },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderScheme);

export default orderModel;
