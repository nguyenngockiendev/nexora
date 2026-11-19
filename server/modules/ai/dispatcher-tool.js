const tools = require("./app-assistant/app-tool");
const CourseAdvisortools = require("./course-advisor/course-tool");

const toolsElement = [...tools, ...CourseAdvisortools];

const usetools = async (toolname, signal, role) => {
  try {
    for (const item of toolsElement) {
      const nameTool = item.path;
      if (!nameTool || nameTool === "") continue;
      if (toolname.name === nameTool) {
        const message = toolname.args.query;
        try {
          return await item.name(message, signal, role);
        } catch (error) {
          if (error.status === 404) return [];
          throw error;
        }
      }
    }
    throw {
      status: 400,
      message: "Tên công cụ không được hỗ trợ!",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = usetools;
