// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import productModel from "./models/productModels.js";

// dotenv.config();

// const productList = [
//   {
//     name: "Fresh Carrots",
//     description: "Good for your eyes 😎",
//     price: 100,
//     image: "https://example.com/carrot.jpg",
//     category: "Fruits & Vegetable",
//     date: Date.now(),
//   },
//   {
//     name: "Fresh Carrots ",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 100,
//     image: food1,
//     category: "Fruits & Vegetable",
//     date: Date.now(),
//   },
//   {
//     name: "Canned Frozen Meat",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 200,
//     image: food2,
//     category: "Frozen Foods",
//     date: Date.now(),
//   },
//   {
//     name: "Bottle of Milk ",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 220,
//     image: food3,
//     category: "Dairy Products",
//     date: Date.now(),
//   },
//   {
//     name: "Red Ball Pepper",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 110,
//     image: food4,
//     category: "Fruits & Vegetable",
//     date: Date.now(),
//   },
//   {
//     name: "Baked Cinnamon Buns",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 130,
//     image: food5,
//     category: "Bakery Items",
//     date: Date.now(),
//   },
//   {
//     name: "Fresh Organic Apples",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 140,
//     image: food6,
//     category: "Fruits & Vegetable",
//     date: Date.now(),
//   },
//   {
//     name: "Fresh Fish from sea",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 190,
//     image: food7,
//     category: "Meat & Seafood",
//     date: Date.now(),
//   },
//   {
//     name: "Bottle of Organic Oil",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 140,
//     image: food8,
//     category: "Dairy Products",
//     date: Date.now(),
//   },
//   {
//     name: "Canned Steak Meat",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 100,
//     image: food9,
//     category: "Meat & Seafood",
//     date: Date.now(),
//   },
//   {
//     name: "Tasty Bakery Bagels",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 110,
//     image: food10,
//     category: "Bakery Items",
//     date: Date.now(),
//   },
//   {
//     name: "Bag of 1kg Oats",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 120,
//     image: food11,
//     category: "Pantry Staples",
//     date: Date.now(),
//   },
//   {
//     name: "Bottle of peanut butter",
//     description:
//       "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     price: 150,
//     image: food12,
//     category: "Pantry Staples",
//     date: Date.now(),
//   },
//   // 🧼 Add more but DO NOT use `_id`
// ];

// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(async () => {
//     console.log("Connected to MongoDB");

//     await productModel.deleteMany({});
//     const inserted = await productModel.insertMany(productList);

//     console.log("Products inserted:", inserted.length);
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error("Seeding DB failed:", err);
//     process.exit(1);
//   });
