const jwt = require("jsonwebtoken");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "NOT AUTHORIZED" });
  }
  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "NOT AUTHORIZED" });
  }
};
const createLimiter = (countlimit, time) => {
  const limit = rateLimit({
    windowMs: time * 60 * 1000,
    max: countlimit,
    handler: (req, res, next) => {
      return res.status(429).json({
        success: false,
        message: `bạn đã quá ${countlimit}lần.Hãy đợi trong ${time} phút nữa!`,
      });
    },
  });
  return limit;
};
module.exports = { authMiddleware, createLimiter };
