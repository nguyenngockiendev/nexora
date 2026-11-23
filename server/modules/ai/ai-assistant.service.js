const {
  getAppAssistantDecision,
  AIanserForUser,
} = require("./ai-assistant.ai");
const { AssistantAnswerPrompt } = require("./ai-assistant-answer-promt");
const usetools = require("./dispatcher-tool");
const AIConversation = require("./AIConversation");
const mongoose = require("mongoose");

const activeConversations = new Set();

const getConversationHistory = async (userId) => {
  const key = String(userId);
  // Không dọn trong lúc POST đang lưu câu trả lời.
  if (activeConversations.has(key)) {
    const conversation = await AIConversation.findOne({ userId });
    return conversation?.messages.slice(-20) || [];
  }
  activeConversations.add(key);
  try {
    const conversation = await AIConversation.findOne({ userId });
    if (!conversation) return [];
    let changed = false;
    for (const message of conversation.messages) {
      if (message.status === "PROCESSING") {
        message.status = "FAILED";
        changed = true;
      }
    }
    if (conversation.messages.length >= 100) {
      conversation.messages.splice(0, 40);
      changed = true;
    }
    if (changed) await conversation.save();
    return conversation.messages.slice(-20);
  } finally {
    activeConversations.delete(key);
  }
};

const deleteConversationHistory = async (userId) => {
  const key = String(userId);
  if (activeConversations.has(key)) {
    throw { status: 409, message: "Vui lòng đợi câu trả lời kết thúc rồi xóa lịch sử." };
  }
  activeConversations.add(key);
  try {
    await AIConversation.deleteOne({ userId });
  } finally {
    activeConversations.delete(key);
  }
};

const appAssistantService = async (data, onChunk = () => {}, options = {}) => {
  const userId = String(data.userId);
  if (activeConversations.has(userId)) {
    throw {
      status: 409,
      message: "Bạn đang có câu trả lời được xử lý. Vui lòng đợi.",
    };
  }
  activeConversations.add(userId);
  let conversation;
  let modelMessage;
  let answerText = "";
  const capacities = [];
  const sendChunk = (text) => {
    answerText += text;
    onChunk(text);
  };
  try {
    conversation = await AIConversation.findOne({
      userId: data.userId,
    });
    if (!conversation) {
      conversation = await AIConversation.create({
        userId: data.userId,
        messages: [],
      });
    }

    for (const message of conversation.messages) {
      if (message.status === "PROCESSING") message.status = "FAILED";
    }
    if (conversation.messages.length >= 100) {
      conversation.messages.splice(0, 40);
    }
    const completedTurns = new Set(
      conversation.messages
        .filter(
          (message) => message.role === "model" && message.status === "DONE",
        )
        .map((message) => String(message.turnId)),
    );
    const historymessage = conversation.messages
      .filter(
        (message) =>
          message.status === "DONE" &&
          completedTurns.has(String(message.turnId)),
      )
      .slice(-20);

    if (!Array.isArray(historymessage ?? [])) {
      throw { status: 400, message: "Lịch sử hội thoại không hợp lệ." };
    }

    for (const message of historymessage) {
      if (
        !message ||
        !["user", "model"].includes(message.role) ||
        typeof message.text !== "string" ||
        !message.text.trim()
      ) {
        throw { status: 400, message: "Tin nhắn trong lịch sử không hợp lệ." };
      }
    }
    const history = historymessage.map((message) => ({
      role: message.role,
      text: message.text.trim(),
    }));
    let historyLength = history.reduce(
      (total, message) => total + message.text.length,
      0,
    );
    while (historyLength > 28000) {
      const removed = history.splice(0, 2);
      historyLength -= removed.reduce(
        (sum, message) => sum + message.text.length,
        0,
      );
    }
    options.signal?.throwIfAborted();
    const turnId = new mongoose.Types.ObjectId();
    conversation.messages.push(
      { turnId, role: "user", text: data.quesion, status: "DONE" },
      { turnId, role: "model", text: "", status: "PROCESSING" },
    );
    modelMessage = conversation.messages[conversation.messages.length - 1];
    await conversation.save();
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
      data.lessonId &&
        data.courseId &&
        Number.isFinite(data.time) &&
        data.time >= 0
        ? { lessonId: data.lessonId, courseId: data.courseId, time: data.time }
        : null,
    );
    options.signal?.throwIfAborted();
    const result = responsAI1.functionCalls ?? [];
    if (result.length === 0) {
      if (!responsAI1.text?.trim()) {
        throw { status: 502, message: "Gemini chưa trả về nội dung trả lời." };
      }
      sendChunk(responsAI1.text);
      options.signal?.throwIfAborted();
      modelMessage.text = answerText;
      modelMessage.status = "DONE";
      await conversation.save();
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
    const usedTools = [];
    const toolResults = [];
    for (const call of result) {
      options.signal?.throwIfAborted();
      options.onStatus?.("Đang tìm thông tin phù hợp...");
      const toolResult = await usetools(call, options.signal, data);
      if (
        Number.isFinite(toolResult.capacity) &&
        !capacities.includes(toolResult.capacity)
      ) {
        capacities.push(toolResult.capacity);
      }
      toolResults.push({
        tool: call.name,
        data: toolResult.data,
        capacity: toolResult.capacity,
      });

      if (!usedTools.includes(call.name)) usedTools.push(call.name);
    }
    options.onStatus?.("Đang chuẩn bị câu trả lời...");
    const answer = await AIanserForUser(
      AssistantAnswerPrompt(data.quesion, toolResults, history, data.role),
      sendChunk,
      options.signal,
    );
    options.signal?.throwIfAborted();
    modelMessage.text = answer;
    modelMessage.capacities = capacities;
    modelMessage.status = "DONE";
    await conversation.save();
    return { answer, usedTools };
  } catch (error) {
    if (modelMessage) {
      modelMessage.text = answerText;
      modelMessage.capacities = capacities;
      modelMessage.status =
        options.signal?.aborted && !options.signal.reason?.status
          ? "STOPPED"
          : "FAILED";
      try {
        await conversation.save();
      } catch (saveError) {
        console.error("Lỗi lưu lịch sử hội thoại AI:", saveError);
      }
    }
    throw error;
  } finally {
    activeConversations.delete(userId);
  }
};
module.exports = {
  appAssistantService,
  getConversationHistory,
  deleteConversationHistory,
};
