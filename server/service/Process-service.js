const Lessons = require("../model/Lessons");
const Courses = require("../model/Courses");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");
const quizz = require("../model/Quizz");
const ProcessLesson = require("../model/ProcessLessons");

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
    let date='';
    if (percen >= 70) {
      completed = true;
      date = Date.now();
    }
    await ProcessLesson.findOneAndUpdate(
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
          completedAt: date
        },
      },
    );
    return { message: "cập nhật thành công!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = { SaveLessonProgress };
