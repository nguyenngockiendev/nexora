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
        message: "Không tìm thấy bài học này hoặc bài học đang bị khóa.",
      };
    }
    if (lessionIsexit.status !== "TRANSCRIPT_READY") {
      return {
        status: "TRANSCRIPT_NOT_READY",
        message:
          "Hiện giáo viên chưa chuẩn hóa nội dung bài học này. Bạn vui lòng đợi và quay lại sau nhé!",
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

const AIleaninganalyze = async (datas, signal) => {
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
        message:
          "Tài khoản chưa có quyền học khóa này nên chưa thể tóm tắt bài học. Không có nội dung bài học được cung cấp.",
      };
    }
    const isExitlession = await Lessons.findOne({
      _id: datas.lessonId,
      courseId: datas.courseId,
      isLocked: false,
    });
    if (!isExitlession) {
      return {
        status: "LESSON_UNAVAILABLE",
        reason: "LESSON_NOT_FOUND_OR_LOCKED",
        message:
          "Không lấy được bài học được yêu cầu trong khóa này. Bài có thể không tồn tại, không thuộc khóa này hoặc đang bị khóa nên chưa thể tóm tắt.",
      };
    }

    const lessionAnalyze = await LessonNormalizedContent.findOne({
      lessonId: isExitlession._id,
      status: "READY",
    });
    if (!lessionAnalyze) {
      return {
        status: "CONTENT_NOT_READY",
        reason: "NORMALIZED_CONTENT_NOT_READY",
        message:
          "Nội dung chuẩn hóa của bài học chưa sẵn sàng nên chưa thể tóm tắt. Bạn vui lòng đợi giáo viên chuẩn bị nội dung và quay lại sau.",
      };
    }
    const lessionnomar = lessionAnalyze.normalizedChunks.sort(
      (a, b) => a.index - b.index,
    );
    let arrlession = [];
    for (const itemChunk of lessionnomar) {
      let timesr = [];
      for (const time of itemChunk.sources) {
        const timesrc = await LessonTranscripts.findOne({
          chunkIndex: time.chunkIndex,
          lessonId: lessionAnalyze.lessonId,
          status: "DONE",
        });
        if (!timesrc) continue;
        timesr.push({
          startTimeSRC: timesrc.startTime,
          endTimeSRC: timesrc.endTime,
        });
      }

      arrlession.push({
        status: "READY",
        message:
          "Đây là một mục kiến thức đã chuẩn hóa của bài học. Hãy tổng hợp tất cả các mục trả về để tóm tắt bài, không chỉ dùng mục đầu tiên.",
        lessonId: isExitlession._id,
        lessonTitle: isExitlession.title,
        normalizedChunks: [
          {
            index: itemChunk.index,
            title: itemChunk.title,
            content: itemChunk.content,
            timeSRC: timesr,
          },
        ],
      });
    }
    if (arrlession.length === 0) {
      return {
        status: "CONTENT_NOT_READY",
        reason: "NORMALIZED_CONTENT_EMPTY",
        message:
          "Bài học có bản chuẩn hóa nhưng chưa có mục kiến thức nào để tóm tắt. Bạn vui lòng đợi giáo viên cập nhật nội dung và quay lại sau.",
      };
    }
    return arrlession;
  } catch (error) {
    throw error;
  }
};
AIlearningassistantService.capacity = 3;
AIleaninganalyze.capacity = 4;
module.exports = {
  AIlearningassistantService,
  AIleaninganalyze,
};
