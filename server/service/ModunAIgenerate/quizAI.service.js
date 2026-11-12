require("dotenv").config();
const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");
const OpenAI = require("openai");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
const genOpenAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const responsOpenAI = async (prompt) => {
  try {
    const res = await genOpenAI.responses.create({
      model: "gpt-6-luna",
      input: prompt,
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi gọi ChatGPT API:", error);
    throw error;
  }
};

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

const GenAIquiz = async (prompt) => {
  const abortSignal = AbortSignal.timeout(60_000);
  try {
    const res = await genAI.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        abortSignal,
      },
    });
    return JSON.parse(res.text);
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    if (abortSignal.aborted || error.cause?.code === "UND_ERR_HEADERS_TIMEOUT") {
      throw Object.assign(
        new Error("Gemini phản hồi quá lâu. Bạn có thể thử tạo quiz lại."),
        { status: 504 },
      );
    }
    if (error.status === 503) {
      throw Object.assign(
        new Error("Gemini đang quá tải. Bạn có thể thử tạo quiz lại sau."),
        { status: 503 },
      );
    }
    throw error;
  }
};

const ScanPDFWithAI = async (promt) => {
  try {
    const respons = await GenAI(promt);
    if (!respons?.text) {
      console.error(
        "Gemini không có text, candidates:",
        JSON.stringify(respons?.candidates, null, 2),
      );
      throw new Error("Gemini không trả về nội dung text hoặc bị chặn!");
    }
    return JSON.parse(respons.text);
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
  ScanPDFWithAI,
  responsOpenAI,
  GenAIquiz
};
