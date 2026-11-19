const { AIassistantService } = require("./app-assistant.tools");

const usetools = async (toolname, signal, role) => {
  if (toolname.name != "AIassistantService") {
    throw {
      status: 400,
      message: "Tên công cụ không được hỗ trợ!.",
    };
  }
  const message = toolname.args.query;
  try {
    return await AIassistantService(message, signal, role);
  } catch (error) {
    if (error.status === 404) return [];
    throw error;
  }
};

module.exports = usetools;
