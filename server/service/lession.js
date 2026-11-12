const Lessons = require("../model/Lessons");
const Courses = require("../model/Courses");

const quizz = require("../model/Quizz");

const { default: mongoose } = require("mongoose");
const { Worker2 } = require("./Worker/worker.service");
const LessonTranscripts = require("../model/LessonTranscripts");
const LessonNormalizedContent = require("../model/LessonNormalizedContent");
const { LessonNormalized } = require("./ModunAIgenerate/transcript.service");

const GetLession = async (data) => {
  try {
    let result = [];
    if (data?.role === "instructor") {
      result = await Lessons.find({ courseId: data.id }).lean();
    } else if (data?.role === "student") {
      result = await Lessons.find({
        courseId: data.id,
        isPreview: true,
      }).lean();
    } else if (data?.role === "admin") {
      result = await Lessons.find({ courseId: data.id }).lean();
    }

    if (!result || result.length === 0) {
      throw { status: 404, message: "not lession" };
    }

    const Quizzexist = Promise.all(
      result.map(async (item) => {
        const quizzExits = await quizz.findOne({ lessonId: item._id });

        return { ...item, QuizExits: quizzExits };
      }),
    );
    return Quizzexist;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const CreateLession = async (data) => {
  try {
    const numberOrder = await Lessons.findOne({ courseId: data.courseId }).sort(
      { order: -1 },
    );
    let order = numberOrder?.order || 0;
    order++;
    const newlession = await Lessons.create({ ...data, order: order });
    if (data.status === "PROCESSING") {
      if (Worker2) {
        Worker2({ _id: newlession._id.toString() }, data.io);
      }
    }
    return { message: "create successfully", newlession: newlession };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const DeleteLessionByid = async (data) => {
  try {
    const lession = await Lessons.findById(data._id);
    if (!lession) {
      throw { status: 404, message: "Bài học không tồn tại!" };
    }
    const isOwner = await Courses.findOne({
      _id: lession.courseId,
      instructor: data.userId,
    });
    if (!isOwner) {
      throw {
        status: 403,
        message: "Bạn không có quyền xóa bài học của giảng viên khác!",
      };
    }
    const deletelession = await Lessons.findByIdAndDelete(data._id);
    await LessonTranscripts.deleteMany({ lessonId: deletelession._id });
    await LessonNormalizedContent.deleteOne({ lessonId: deletelession._id });
    return { message: "Xóa bài học thành công!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateLessionByid = async (data) => {
  try {
    const lession = await Lessons.findById(data.lessionId);
    if (!lession) {
      throw { status: 404, message: "Bài học không tồn tại!" };
    }
    const isOwner = await Courses.findOne({
      _id: lession.courseId,
      instructor: data.userId,
    });
    if (!isOwner) {
      throw {
        status: 403,
        message: "Bạn không có quyền thay đổi bài học của giảng viên khác!",
      };
    }

    const updateData = {};

    for (let item in data) {
      if (data[item] !== undefined && item !== "lessionId" && item !== "io") {
        updateData[item] = data[item];
      }
    }
    const updatelession = await Lessons.findByIdAndUpdate(
      data.lessionId,

      {
        $set: updateData,
      },
      {
        new: true,
      },
    );
    if (!updatelession) {
      throw { status: 404, message: "Lesson not found" };
    }
    if (data.videoUrl || data.status === "PROCESSING") {
      await LessonNormalizedContent.deleteOne({ lessonId: data.lessionId });
      await LessonTranscripts.deleteMany({ lessonId: data.lessionId });
    }
    if (data.status === "PROCESSING") {
      if (Worker2) {
        Worker2({ _id: updatelession._id.toString() }, data.io);
      }
    }
    if (updatelession) {
      return { message: " Update Lession Succesfully!", data: updatelession };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetLessionByid = async (data) => {
  try {
    const getlession = await Lessons.findById({ _id: data?.lessionId }).lean();
    if (!getlession) {
      throw { status: 404, message: "Lesson not found" };
    }

    return getlession;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetCoursewithLessionById = async (data) => {
  try {
    const result = await Courses.aggregate([
      {
        $match: {
          instructor: new mongoose.Types.ObjectId(data.userId),
          type: "recorded",
        },
      },
      {
        $lookup: {
          from: "lessons",
          localField: "_id",
          foreignField: "courseId",
          as: "lessionlist",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "IntructorName",
        },
      },
      {
        $unwind: "$IntructorName",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          type: 1,
          instructor: "$IntructorName.name",
          lessonCount: { $size: "$lessionlist" },
        },
      },
    ]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getLessionDetails = async (data) => {
  try {
    const listlession = await Lessons.find({
      courseId: data.courseId,
    }).populate("courseId", "type");
    if (listlession.length === 0) {
      throw { status: 404, message: "bạn không có bài học nào!" };
    }
    const normalized = await LessonNormalizedContent.find({
      lessonId: { $in: listlession.map((lesson) => lesson._id) },
    })
      .select("lessonId status")
      .lean();
    const normalizationStatuses = new Map(
      normalized.map((item) => [String(item.lessonId), item.status]),
    );
    const result = listlession.map((e) => {
      return {
        _id: e._id,
        title: e.title,
        type: e.courseId.type,
        status: e.status,
        normalizationStatus: normalizationStatuses.get(String(e._id)) || null,
        videoUrl: e.videoUrl,
        content: e.content,
        resources: e.resources,
      };
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const RetryLessonNormalization = async (lessionId, userId) => {
  if (!mongoose.isObjectIdOrHexString(lessionId)) {
    throw { status: 400, message: "Mã bài học không hợp lệ!" };
  }
  const lesson = await Lessons.findById(lessionId);
  if (!lesson || !userId || !(await Courses.exists({
    _id: lesson.courseId,
    instructor: userId,
  }))) {
    throw { status: 404, message: "Không tìm thấy bài học của bạn!" };
  }
  if (lesson.status !== "TRANSCRIPT_READY") {
    throw { status: 409, message: "Video chưa chuyển thành text xong!" };
  }

  try {
    const normalized = await LessonNormalized(lesson._id);
    if (normalized) return { normalizationStatus: normalized.status };
  } catch (error) {
    console.error("Lỗi khi thử lại chuẩn hóa:", error);
    throw {
      status: error.status === 503 ? 503 : 502,
      message:
        error.status === 503
          ? "Gemini đang quá tải. Bạn có thể thử lại sau."
          : "Chưa thể chuẩn hóa nội dung. Bạn có thể thử lại.",
    };
  }
  throw { status: 409, message: "Bài học đã thay đổi. Hãy tải lại danh sách." };
};

module.exports = {
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
  GetLessionByid,
  GetCoursewithLessionById,
  getLessionDetails,
  RetryLessonNormalization,
};
