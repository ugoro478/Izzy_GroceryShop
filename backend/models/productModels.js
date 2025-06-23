import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Number, required: true }, // Unix timestamp
});

const productModels =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModels; // export the model
