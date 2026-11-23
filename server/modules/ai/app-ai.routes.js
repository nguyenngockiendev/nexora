const { authMiddleware } = require("../../Middleware/Middleware");
const {
  AIassistantController,
  getConversationController,
  deleteConversationController,
} = require("./ap-ai.controller");

const RouterappAssistant = require("express").Router();

RouterappAssistant.post("/appAssistant", authMiddleware, AIassistantController);
RouterappAssistant.get("/appAssistant", authMiddleware, getConversationController);
RouterappAssistant.delete("/appAssistant", authMiddleware, deleteConversationController);

module.exports = RouterappAssistant;
