const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");
const quizz = require("../model/Quizz");

const CreateQuizByIntructor = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 404, message: "you not have auth!" };
    }

    const checkLession = await Lessons.findById(data?.lessonId);

    const resultForm = {
      ...data,
      status: "draft",
      courseId: checkLession.courseId,
    };
    const result = await quizz(resultForm).save();
    if (!checkLession) {
      throw { status: 400, message: "not found!" };
    }

    if (!result) {
      throw { status: 404, message: "create quizz failed!" };
    }
    return { result: result, message: "Create successfuly!" };
  } catch (error) {
    throw error;
    console.log(error);
  }
};
module.exports = { CreateQuizByIntructor };
