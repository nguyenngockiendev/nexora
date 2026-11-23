const Courses = require("../../courses/Courses");
const Lessons = require("../../lessons/Lessons");
const { GeminiEmbedding } = require("../providers/ai-provider.service");

const AIcourseadvisorService = async (datas, signal) => {
  try {
    if (typeof datas.message !== "string" || !datas.message.trim()) {
      throw {
        status: 400,
        message: "Câu truy vấn tìm khóa học không hợp lệ.",
      };
    }
    const topsimilar = [];
    const query = `task: search result | query: ${datas.message.trim()}`;
    signal?.throwIfAborted();
    const questionEmbedding = await GeminiEmbedding(query, signal);
    signal?.throwIfAborted();
    const questionNorm = Math.sqrt(
      questionEmbedding.reduce((sum, value) => sum + value ** 2, 0),
    );
    if (questionNorm === 0) return [];
    const courses = await Courses.find({ status: "active" })
      .populate("instructor", "name")
      .lean();

    for (const course of courses) {
      const courseEmb = course.embedding;
      if (!Array.isArray(courseEmb)) continue;
      if (questionEmbedding.length != courseEmb.length) continue;
      let dot = 0;
      let courseSquaredNorm = 0;
      for (let i = 0; i < courseEmb.length; i++) {
        dot += questionEmbedding[i] * courseEmb[i];
        courseSquaredNorm += courseEmb[i] ** 2;
      }
      const denominator = questionNorm * Math.sqrt(courseSquaredNorm);
      if (denominator == 0) continue;
      const similar = dot / denominator;
      if (Number.isFinite(similar)) {
        signal?.throwIfAborted();
        const lessons = await Lessons.find({ courseId: course._id })
          .select("title duration content")
          .sort({ order: 1, _id: 1 })
          .lean();
        signal?.throwIfAborted();
        topsimilar.push({
          courseId: course._id,
          lessonCount: lessons.length,
          totalDuration: lessons.reduce(
            (sum, lesson) => sum + (lesson.duration || 0),
            0,
          ),
          lessons: lessons.map((lesson) => ({
            title: lesson.title,
            duration: lesson.duration || 0,
            content: lesson.content,
          })),
          instructorName: course.instructor?.name || "Không xác định",
          title: course.title,
          description: course.description,
          price: course.price,
          level: course.level,
          type: course.type,
          route:
            course.type === "live"
              ? `/courses-all/details/class/live/${course._id}`
              : `/courses-all/details/recorded/${course._id}`,
          similar,
          
        });
      }
    }
    topsimilar.sort((a, b) => b.similar - a.similar);
    return topsimilar.slice(0, 4);
  } catch (error) {
    throw error;
  }
};
AIcourseadvisorService.capacity = 2;
module.exports = {
  AIcourseadvisorService,
};
