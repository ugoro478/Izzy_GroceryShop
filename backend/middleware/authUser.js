import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.error("authUser middleware error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authUser;
