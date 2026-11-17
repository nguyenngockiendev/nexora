const { AIassistantService } = require("./app-assistant.tools");
const { getAppAssistantDecision } = require("./app-assistant.ai");

const usetools = async (toolname) => {
  if (toolname.name != "AIassistantService") {
    throw {
      status: 400,
      message: "Tên công cụ không được hỗ trợ!.",
    };
  }
  const message = toolname.args.query;
  return await AIassistantService(message);
};

const appAssistantService = async (data) => {
  try {
    const contents = [
      {
        role: "user",
        parts: [{ text: data.quesion }],
      },
    ];
    const responsAI1 = await getAppAssistantDecision(contents);
    const result = responsAI1.functionCalls ?? [];
    if (result.length === 0) {
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
    for (const call of result) {
      const result = await usetools(call);
      return result;
    }
  } catch (error) {
    throw error;
  }
};
module.exports = {
  appAssistantService,
};
