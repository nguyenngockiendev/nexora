require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const GenAI = async (prompt) => {
  try {
    const res = await genAI.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
  }
};

const QuizzGenWithAI = async (promt) => {
  try {
    const respons = await GenAI(promt);
    return JSON.parse(respons.text);
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
  }
};

module.exports = {
  QuizzGenWithAI,
};
