const Lessons = require("../model/Lessons");
const Courses = require("../model/Courses");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");
const quizz = require("../model/Quizz");
const ProcessLesson = require("../model/ProcessLessons");
const Enrollments = require("../model/Enrollments");
const ProcessLessons = require("../model/ProcessLessons");
const Class = require("../model/Class");
const QuizAttempts = require("../model/QuizAttempts");

const SaveLessonProgress = async (data) => {
  try {
    if (data.role != "student") {
      throw { message: "bạn không có quyền tạo" };
    }
    if (!data.lessonId || !data.courseId) {
      throw { message: "lession hoặc course không tồn tại!" };
    }
    const lessionDuration = await Lessons.findById(data.lessonId).select(
      "duration",
    );
    if (!lessionDuration) {
      throw { message: "lession không tồn tại!" };
    }
    const process = await ProcessLesson.findOne({
      userId: data.userId,
      courseId: data.courseId,
      lessonId: data.lessonId,
    }).lean();
    if (!process) {
      await ProcessLesson.create({
        userId: data.userId,
        courseId: data.courseId,
        lessonId: data.lessonId,
        lastPosition: 0,
        percent: 0,
        completed: false,
        completedAt: null,
      });
    }

    const percen = Math.floor(
      (data.lastPosition / lessionDuration.duration) * 100,
    );
    let completed = false;
    let date = "";
    if (percen >= 70) {
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
      { new: true },
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getLessonProgress = async (data) => {
  try {
    if (data.role != "student") {
      throw { message: "bạn không có quyền xem" };
    }

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
    if (data.role != "student") {
      throw { message: "bạn không có quyền xem" };
    }

    const processes = await ProcessLesson.find({
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
      .populate("lessonId", "title")
      .sort({
        updatedAt: -1,
      })
      .lean();
    if (!item) {
      throw { message: "không có bài học gần đây!" };
    }
    if (item.completed == true) {
      const lessionOrder = await Lessons.findById(item.lessonId._id);
      const nextLession = await Lessons.findOne({
        courseId: item.courseId._id,
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
          titleCourse: nextLession.courseId.title,
          titleLession: nextLession.title,
          percent: 0,
        };
      }
    }

    return {
      courseId: item.courseId._id,
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
          .populate("lessonId")
          .lean();
        const classLive = await Class.find({ courseId: item.courseId._id })
          .populate("instructorId", "name")
          .sort({
            updatedAt: -1,
          });

        return {
          course: item.courseId,
          CourseEnroill: result.length,
          LessonsSuccess: toatalLessionsucsecc.length,
          LessonsSuccessData: toatalLessionsucsecc,
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
