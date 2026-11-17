const RouterappAssistant = require("express").Router();
const {
  AIassistantController,
} = require("./app-assistant.controller");

RouterappAssistant.post("/appAssistant", AIassistantController);

module.exports = RouterappAssistant;
