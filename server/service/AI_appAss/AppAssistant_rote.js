const RouterappAssistant = require("express").Router();
const { AIassistantController } = require("./AppAssistant_controller");

RouterappAssistant.post("/appAssistant", AIassistantController);

module.exports = RouterappAssistant;
