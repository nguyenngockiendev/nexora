require("dotenv").config();
const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
    throw error;
  }
};

const TranscribeAI = async (audioPath) => {
  try {
    const res = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-large-v3",
      language: "vi",
      response_format: "verbose_json",
      temperature: 0,
    });

    return res;
  } catch (error) {
    console.error("Lỗi khi gọi Groq API:", error);
    throw error;
  }
};

const QuizzGenWithAI = async (promt) => {
  try {
    const respons = await GenAI(promt);
    return JSON.parse(respons.text);
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    throw error;
  }
};

module.exports = {
  QuizzGenWithAI,
  TranscribeAI,
};
