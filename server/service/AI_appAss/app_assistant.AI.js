require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
const { AIassistantServiceDeclaration } = require("./functionDeclarations");

const Declarations = [AIassistantServiceDeclaration];
const getAppAssistantDecision = async (message) => {
  const response = await genAI.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: message,
    config: {
      tools: [
        {
          functionDeclarations: Declarations,
        },
      ],
    },
  });
  return response;
};

module.exports = {
  getAppAssistantDecision,
};
