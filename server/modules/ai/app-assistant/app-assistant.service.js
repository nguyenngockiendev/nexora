const {
  getAppAssistantDecision,
  AIanserForUser,
} = require("./app-assistant.ai");
const { AppAssistantAnswerPrompt } = require("./app-assistant-promt");
const usetools = require("./dispatcher-tool");

const appAssistantService = async (data, onChunk = () => {}, options = {}) => {
  try {
    if (!Array.isArray(data.historymess ?? [])) {
      throw { status: 400, message: "Lịch sử hội thoại không hợp lệ." };
    }
    const historymess = (data.historymess || []).slice(-15);
    for (const message of historymess) {
      if (
        !message ||
        !["user", "model"].includes(message.role) ||
        typeof message.text !== "string" ||
        !message.text.trim()
      ) {
        throw { status: 400, message: "Tin nhắn trong lịch sử không hợp lệ." };
      }
    }
    const history = historymess.map((message) => ({
      role: message.role,
      text: message.text.trim(),
    }));
    let historyLength = history.reduce(
      (total, message) => total + message.text.length,
      0,
    );
    while (historyLength > 28000) {
      historyLength -= history.shift().text.length;
    }
    const contents = [
      ...history.map((message) => ({
        role: message.role,
        parts: [{ text: message.text }],
      })),
      {
        role: "user",
        parts: [{ text: data.quesion }],
      },
    ];
    const responsAI1 = await getAppAssistantDecision(
      contents,
      options.signal,
      data.role,
    );
    options.signal?.throwIfAborted();
    const result = responsAI1.functionCalls ?? [];
    if (result.length === 0) {
      if (!responsAI1.text?.trim()) {
        throw { status: 502, message: "Gemini chưa trả về nội dung trả lời." };
      }
      onChunk(responsAI1.text);
      return {
        answer: responsAI1.text,
        usedTools: [],
      };
    }
    const ansermodel = responsAI1.candidates?.[0]?.content;
    if (!ansermodel) {
      throw {
        status: 404,
        message: "Không tìm thấy câu trả lời từ mô hình AI.",
      };
    }
    contents.push(ansermodel);
    const features = [];
    const usedTools = [];
    for (const call of result) {
      options.signal?.throwIfAborted();
      options.onStatus?.("Đang tìm tính năng phù hợp...");
      const toolResult = await usetools(call, options.signal, data.role);
      features.push(...(toolResult || []));
      if (!usedTools.includes(call.name)) usedTools.push(call.name);
    }
    options.onStatus?.("Đang chuẩn bị câu trả lời...");
    const answer = await AIanserForUser(
      AppAssistantAnswerPrompt(data.quesion, features, history, data.role),
      onChunk,
      options.signal,
    );
    return { answer, usedTools };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  appAssistantService,
};
