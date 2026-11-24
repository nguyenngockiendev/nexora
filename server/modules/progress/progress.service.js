const { requireClassAccess } = require("../lessons/class-lesson-access");
const Lessons = require("../lessons/Lessons");

const ProcessLesson = require("./ProcessLessons");
const Enrollments = require("../enrollments/Enrollments");
const ProcessLessons = require("./ProcessLessons");
const Class = require("../classes/Class");
const QuizAttempts = require("../quizzes/QuizAttempts");

const SaveLessonProgress = async (data) => {
  try {
    if (!data.lessonId || !data.courseId) {
      throw { message: "lession hoặc course không tồn tại!" };
    }
    const lessionDuration = await Lessons.findById(data.lessonId).select(
      "duration courseId classId isLocked",
    );
    if (!lessionDuration) {
      throw { message: "lession không tồn tại!" };
    }
    if (String(lessionDuration.courseId) !== String(data.courseId)) throw { status: 400, message: "Bài học không thuộc khóa này." };
    if (lessionDuration.classId) {
      await requireClassAccess(lessionDuration.classId, data.courseId, data.userId);
      if (lessionDuration.isLocked) throw { status: 403, message: "Bài học đang bị khóa." };
    }

    const percen = Math.floor(
      (data.lastPosition / lessionDuration.duration) * 100,
    );
    let completed = false;
    let date = "";
    if (percen >= 90) {
      completed = true;
      date = Date.now();
    }
    const result = await ProcessLesson.findOneAndUpdate(
      {
        userId: data.userId,
        courseId: data.courseId,
        lessonId: data.lessonId,
      },
      {
        $set: {
          lastPosition: data.lastPosition,
          percent: percen,
          completed: completed,
          completedAt: date,
        },
      },
      { returnDocument: "after", upsert: true },
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getLessonProgress = async (data) => {
  try {

    const process = await ProcessLesson.findOne({
      userId: data.userId,
      lessonId: data.lessonId,
    });
    if (!process) {
      return null;
    }
    return process;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllLessonProgress = async (data) => {
  try {

    if (data.classId) await requireClassAccess(data.classId, data.courseId, data.userId);
    const lessonIds = await Lessons.distinct("_id", { courseId: data.courseId, classId: data.classId || null });
    const processes = await ProcessLesson.find({
      lessonId: { $in: lessonIds },
      userId: data.userId,
      courseId: data.courseId,
    });
    return processes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetrecentLession = async (data) => {
  try {
    const item = await ProcessLesson.findOne({ userId: data.userId })
      .populate("courseId", "title")
      .populate("lessonId", "title classId")
      .sort({
        updatedAt: -1,
      })
      .lean();
    if (!item?.lessonId || !item.courseId) {
      return null;
    }
    if (item.lessonId.classId) {
      try {
        await requireClassAccess(item.lessonId.classId, item.courseId._id, data.userId);
      } catch (error) {
        if ([403, 404].includes(error.status)) return null;
        throw error;
      }
    }
    if (item.completed == true) {
      const lessionOrder = await Lessons.findById(item.lessonId._id);
      const nextLession = await Lessons.findOne({
        courseId: item.courseId._id,
        classId: lessionOrder.classId || null,
        order: {
          $gt: lessionOrder.order,
        },
      })
        .populate("courseId")
        .sort({
          order: 1,
        });
      if (nextLession) {
        return {
          courseId: nextLession.courseId._id,
          classId: nextLession.classId,
          titleCourse: nextLession.courseId.title,
          titleLession: nextLession.title,
          percent: 0,
        };
      }
    }

    return {
      courseId: item.courseId._id,
      classId: item.lessonId.classId,
      titleCourse: item.courseId.title,
      titleLession: item.lessonId.title,
      percent: item.percent,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const DashboartforStudent = async (data) => {
  try {
    const result = await Enrollments.find({ userId: data.userId })
      .populate("courseId")
      .populate("classId")
      .lean();

    const avgQuizz = await QuizAttempts.find({
      studentId: data.userId,
    }).select("score");
    const avg = avgQuizz.reduce((sum, item) => {
      const q = sum + Number(item.score || 0);
      return q;
    }, 0);
    const avgScore = avgQuizz.length ? Math.round(avg / avgQuizz.length) : 0;

    const finalresult = await Promise.all(
      result.map(async (item) => {
        const toatalLessionsucsecc = await ProcessLessons.find({
          userId: data.userId,
          courseId: item.courseId._id,
          completed: true,
        })
          .populate("courseId")
          .populate({ path: "lessonId", match: { classId: item.classId?._id || null }, select: "title order duration" })
          .lean();
        const classLive = await Class.find({ courseId: item.courseId._id })
          .populate("instructorId", "name")
          .sort({
            updatedAt: -1,
          });

        return {
          course: item.courseId,
          CourseEnroill: result.length,
          LessonsSuccess: toatalLessionsucsecc.filter((entry) => entry.lessonId).length,
          LessonsSuccessData: toatalLessionsucsecc.filter((entry) => entry.lessonId),
          ClassLive: classLive.length,
          ClassLiveData: classLive,
          AvgQuizz: avgScore,
        };
      }),
    );
    return finalresult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  DashboartforStudent,
  SaveLessonProgress,
  getLessonProgress,
  getAllLessonProgress,
  GetrecentLession,
};
