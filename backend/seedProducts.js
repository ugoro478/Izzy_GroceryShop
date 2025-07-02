import mongoose from "mongoose";
import dotenv from "dotenv";
import productModel from "./models/productModels.js";

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Dummy products
const staticProductList = [
  {
    _id: "665b1f1a1b2c3d4e5f678901",
    name: "Fresh Carrots",
    description: "Crisp and organic carrots.",
    price: 100,
    image: "https://images.unsplash.com/photo-1582515073490-dcdbddf156d6",
    category: "Fruits & Vegetable",
    date: Date.now(),
  },
  // ... (other products same as before)
];

const seedProducts = async () => {
  try {
    await productModel.deleteMany(); // Clear old data
    const result = await productModel.insertMany(staticProductList); // Insert new
    console.log("✅ Products seeded:", result.length);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedProducts();
