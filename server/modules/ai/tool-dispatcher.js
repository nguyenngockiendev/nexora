const tools = require("./app-assistant/app-tool");
const CourseAdvisortools = require("./course-advisor/course-tool");
const LearningAssistantTools = require("./learning-assistant/learning-tool");

const toolsElement = [
  ...tools,
  ...CourseAdvisortools,
  ...LearningAssistantTools,
];

const usetools = async (toolname, signal, data) => {
  try {
    for (const item of toolsElement) {
      const nameTool = item.path;
      if (!nameTool || nameTool === "") continue;
      if (toolname.name === nameTool) {
        const datas = {
          ...data,
          message: toolname.args.query,
        };

        try {
          const result = await item.name(datas, signal);
          return {
            data: result,
            capacity: item.name.capacity,
          };
        } catch (error) {
          if (error.status === 404) {
            return { data: [], capacity: item.name.capacity };
          }
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
