const Enrollments = require("../../enrollments/Enrollments");
const LessonNormalizedContent = require("../../lessons/LessonNormalizedContent");
const Lessons = require("../../lessons/Lessons");
const LessonTranscripts = require("../../lessons/LessonTranscripts");

const AIlearningassistantService = async (datas, signal) => {
  try {
    signal?.throwIfAborted();
    const isExiterron = await Enrollments.findOne({
      userId: datas.userId,
      courseId: datas.courseId,
      status: "active",
    });
    if (!isExiterron) {
      return {
        status: "ACCESS_DENIED",
        reason: "COURSE_ACCESS_REQUIRED",
        message: "Tài khoản chưa có quyền học bài này.",
      };
    }
    const lessionIsexit = await Lessons.findOne({
      _id: datas.lessonId,
      courseId: datas.courseId,
      isLocked: false,
    });
    if (!lessionIsexit) {
      return {
        status: "LESSON_UNAVAILABLE",
        message:
          "Không tìm thấy bài học này hoặc bài học đang bị khóa.",
      };
    }
    if (lessionIsexit.status !== "TRANSCRIPT_READY") {
      return {
        status: "TRANSCRIPT_NOT_READY",
        message: "Hiện giáo viên chưa chuẩn hóa nội dung bài học này. Bạn vui lòng đợi và quay lại sau nhé!",
      };
    }
    signal?.throwIfAborted();
    const lessiontrancrip = await LessonTranscripts.findOne({
      lessonId: lessionIsexit._id,
      status: "DONE",
      startTime: { $lte: datas.time },
      endTime: { $gt: datas.time },
    });
    if (!lessiontrancrip) {
      return {
        status: "CONTEXT_NOT_FOUND",
        message: "Không tìm thấy bản chép lời tại thời điểm này.",
      };
    }
    signal?.throwIfAborted();
    const lessionContentnormal = await LessonNormalizedContent.findOne({
      lessonId: lessionIsexit._id,
      status: "READY",
    });
    signal?.throwIfAborted();
    const result = [];
    for (const item of lessionContentnormal?.normalizedChunks || []) {
      if (
        item.sources.some(
          (source) => source.chunkIndex === lessiontrancrip.chunkIndex,
        )
      ) {
        result.push({
          index: item.index,
          title: item.title,
          content: item.content,
          sources: item.sources.map((source) => ({
            chunkIndex: source.chunkIndex,
          })),
        });
      }
    }
    return {
      status: result.length > 0 ? "READY" : "NORMALIZED_CONTENT_MISSING",
      lessonId: lessionIsexit._id,
      time: datas.time,
      transcript: {
        chunkIndex: lessiontrancrip.chunkIndex,
        startTime: lessiontrancrip.startTime,
        endTime: lessiontrancrip.endTime,
        text: lessiontrancrip.text,
      },
      normalizedChunks: result,
      message:
        result.length > 0
          ? "Đã tìm thấy ngữ cảnh bài học."
          : "Đoạn này chưa có nội dung chuẩn hóa để đối chiếu. Có thể giải thích dựa trên bản chép lời nếu người dùng đồng ý, nhưng bản chép lời có thể nhận dạng sai.",
    };
  } catch (error) {
    throw error;
  }
};
AIlearningassistantService.capacity = 3;
module.exports = {
  AIlearningassistantService,
};
