import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, message: "Login successful", token });
    } else {
      res.json({ success: false, message: "Invalid password" }); // 401 Unauthorized
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" }); // return error
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter strong password" }); // return error
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // hash the password
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, message: "Account created successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  // res.json({ msg: "Admin Login Succesfull" });
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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

export { loginUser, registerUser, adminLogin, userOrder }; // Exporting the functions
