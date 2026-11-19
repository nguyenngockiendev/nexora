const { authMiddleware } = require("../../Middleware/Middleware");
const { AIassistantController } = require("./ap-ai.controller");

const RouterappAssistant = require("express").Router();

RouterappAssistant.post("/appAssistant", authMiddleware, AIassistantController);

module.exports = RouterappAssistant;
