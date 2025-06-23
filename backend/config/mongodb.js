import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Mongodb connected"); // eslint-disable-line no-console
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/food`);
};

export default connectDB;
