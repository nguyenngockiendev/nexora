const Lessons = require("./Lessons");
const { requireClassAccess } = require("./class-lesson-access");
const Courses = require("../courses/Courses");

const quizz = require("../quizzes/Quizz");

const { default: mongoose } = require("mongoose");
const { Worker2 } = require("./workers/worker.service");
const LessonTranscripts = require("./LessonTranscripts");
const LessonNormalizedContent = require("./LessonNormalizedContent");
const {
  LessonNormalized,
} = require("../ai/content-generation/content-generation.service");

const AttachLessonQuizzes = async (lessons) => {
  const quizzes = await quizz
    .find({
      lessonId: { $in: lessons.map((lesson) => lesson._id) },
    })
    .select("lessonId title")
    .lean();
  const quizByLessonId = new Map(
    quizzes.map((quiz) => [String(quiz.lessonId), quiz]),
  );

  return lessons.map((lesson) => ({
    ...lesson,
    QuizExits: quizByLessonId.get(String(lesson._id)) || null,
  }));
};

const GetLession = async (data) => {
  try {
    let result = [];
    if (data?.role === "instructor") {
      result = await Lessons.find({ courseId: data.id, classId: null }).lean();
    } else if (data?.role === "student") {
      result = await Lessons.find({
        courseId: data.id,
        classId: null,
        isPreview: true,
      }).lean();
    } else if (data?.role === "admin") {
      result = await Lessons.find({ courseId: data.id, classId: null }).lean();
    }

    if (!result || result.length === 0) {
      throw { status: 404, message: "not lession" };
    }

    return await AttachLessonQuizzes(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const CreateLession = async (data) => {
  try {
    const numberOrder = await Lessons.findOne({
      courseId: data.courseId,
      classId: data.classId || null,
    }).sort({ order: -1 });
    let order = numberOrder?.order || 0;
    order++;
    const newlession = await Lessons.create({
      ...data,
      isPreview: data.classId ? false : data.isPreview,
      order,
    });
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
const requireLessonOwner = async (lesson, userId) => {
  if (lesson.classId)
    return requireClassAccess(lesson.classId, lesson.courseId, userId, true);
  if (!(await Courses.exists({ _id: lesson.courseId, instructor: userId }))) {
    throw { status: 403, message: "Bạn không có quyền quản lý bài học này." };
  }
};

const ReorderClassLessons = async ({
  courseId,
  classId,
  userId,
  lessonIds,
}) => {
  await requireClassAccess(classId, courseId, userId, true);
  if (
    !Array.isArray(lessonIds) ||
    !lessonIds.every(
      (id) => typeof id === "string" && mongoose.isObjectIdOrHexString(id),
    ) ||
    new Set(lessonIds).size !== lessonIds.length
  ) {
    throw { status: 400, message: "Danh sách bài học không hợp lệ." };
  }
  await mongoose.connection.transaction(async (session) => {
    const lessons = await Lessons.find({ courseId, classId })
      .select("_id")
      .session(session);
    const ids = new Set(lessons.map((lesson) => String(lesson._id)));
    if (
      ids.size !== lessonIds.length ||
      !lessonIds.every((id) => ids.has(id))
    ) {
      throw {
        status: 409,
        message: "Danh sách bài học đã thay đổi. Hãy tải lại trang.",
      };
    }
    if (lessonIds.length)
      await Lessons.bulkWrite(
        lessonIds.map((_id, index) => ({
          updateOne: {
            filter: { _id, courseId, classId },
            update: { $set: { order: index + 1 } },
          },
        })),
        { session },
      );
  });
};

const DeleteLessionByid = async (data) => {
  try {
    const lession = await Lessons.findById(data._id);
    if (!lession) {
      throw { status: 404, message: "Bài học không tồn tại!" };
    }
    await requireLessonOwner(lession, data.userId);
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
    await requireLessonOwner(lession, data.userId);

    const updateData = {};

    const fields = [
      "title",
      "content",
      "duration",
      "videoUrl",
      "isPreview",
      "status",
      "resources",
      "isLocked",
    ];
    if (!lession.classId) fields.push("order");
    for (const field of fields) {
      if (data[field] !== undefined) updateData[field] = data[field];
    }
    if (data.resourceUrl)
      updateData.resources = [
        {
          type: data.resourceType,
          title: data.resourceTitle,
          url: data.resourceUrl,
        },
      ];
    if (lession.classId) updateData.isPreview = false;
    const updatelession = await Lessons.findByIdAndUpdate(
      data.lessionId,

      {
        $set: updateData,
      },
      {
        returnDocument: "after",
        runValidators: true,
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

    if (getlession.classId || data.role !== "admin")
      await requireLessonOwner(getlession, data.userId);
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
          pipeline: [{ $match: { classId: null } }],
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
    if (data.classId)
      await requireClassAccess(data.classId, data.courseId, data.userId, true);
    const listlession = await Lessons.find({
      courseId: data.courseId,
      classId: data.classId || null,
    })
      .sort({ order: 1, _id: 1 })
      .populate("courseId", "type");
    if (!data.classId && listlession.length === 0) {
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
        order: e.order,
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
  if (!lesson || !userId) {
    throw { status: 404, message: "Không tìm thấy bài học của bạn!" };
  }
  await requireLessonOwner(lesson, userId);
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
  ReorderClassLessons,
  AttachLessonQuizzes,
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
  GetLessionByid,
  GetCoursewithLessionById,
  getLessionDetails,
  RetryLessonNormalization,
};
