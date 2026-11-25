const {
  authMiddleware,
  createLimiter,
  tokenLimitUsage,
} = require("../../Middleware/Middleware");
const {
  AIassistantController,
  getConversationController,
  deleteConversationController,
} = require("./ai-chat.controller");

const RouterappAssistant = require("express").Router();

RouterappAssistant.post(
  "/appAssistant",
  authMiddleware,
  createLimiter(20, 10, true),
  tokenLimitUsage,
  AIassistantController,
);
RouterappAssistant.get(
  "/appAssistant",
  authMiddleware,
  getConversationController,
);
RouterappAssistant.delete(
  "/appAssistant",
  authMiddleware,
  deleteConversationController,
);

module.exports = RouterappAssistant;
