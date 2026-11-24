const { buildCourseText } = require("./course-embedding-text");
const {
  GeminiEmbedding,
} = require("../modules/ai/providers/ai-provider.service");
const syncCourseEmbedding = async (course, purpose, lessons = [], signal) => {
  switch (purpose) {
    case "course_document": {
      return GeminiEmbedding(buildCourseText(course, lessons), signal);
    }
    default:
      throw new Error(`Mục đích embedding chưa được hỗ trợ: ${purpose}`);
  }
};

module.exports = syncCourseEmbedding;
