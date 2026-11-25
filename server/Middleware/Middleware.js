const jwt = require("jsonwebtoken");
const { rateLimit, ipKeyGenerator } = require("express-rate-limit");
const aiUsageToken = require("../modules/ai/aiUsageToken");
const { CountTokenInput } = require("../modules/ai/ai-model.service");
require("dotenv").config();
const MAX_TOKEN = 300000;
const limitToken = MAX_TOKEN * 0.8;
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
const createLimiter = (countlimit, time, byuser = false) => {
  const limit = rateLimit({
    windowMs: time * 60 * 1000,
    max: countlimit,
    skip: (req) => req.user?.role === "admin",
    keyGenerator: (req) => {
      if (byuser && req.user?.userId) {
        return `user_${req.user.userId}`;
      }
      return ipKeyGenerator(req.ip);
    },
    handler: (req, res, next) => {
      return res.status(429).json({
        success: false,
        message: `bạn đã quá ${countlimit}lần.Hãy đợi trong ${time} phút nữa!`,
      });
    },
  });
  return limit;
};

const checkRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập!",
      });
    }
    next();
  };
};

const tokenLimitUsage = async (req, res, next) => {
  try {
    const userid = req.user.userId;
    const quesion = req.body.quesion;
    const role = req.user.role;

    if (role === "admin") {
      return next();
    }
    const isuser = await aiUsageToken.findOne({ userId: userid });

    if (!isuser) {
      await aiUsageToken.create({
        userId: userid,
        usedTokens: 0,
      });
      return next();
    }
    if (isuser.usedTokens >= MAX_TOKEN) {
      return res.status(429).json({
        message: "hạn mức đã hết hãy đợi 12h nữa để hỏi tiếp!",
      });
    }

    if (isuser.status == true) {
      if (isuser.usedTokens < limitToken) {
        return next();
      } else {
        const numberTokeninput = await CountTokenInput(quesion);
        if (numberTokeninput + isuser.usedTokens < MAX_TOKEN) {
          return next();
        }
        return res.status(429).json({
          message: "Câu hỏi quá dài!",
        });
      }
    } else {
      return res.status(429).json({
        message: "hạn mức đã hết hãy đợi 12h nữa để hỏi tiếp!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "lỗi server!", error: error });
  }
};

module.exports = { authMiddleware, createLimiter, checkRole, tokenLimitUsage };
