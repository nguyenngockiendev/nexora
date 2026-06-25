const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");
const quizz = require("../model/Quizz");

const converttimeP = (time = "00:00") => {
  const [h, p] = time.split(":").map(Number);
  return h * 60 + p;
};
const converTimeH = (time) => {
  const hour = Math.floor(time / 60);
  const minute = time % 60;

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};
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
      duration: converttimeP(data.duration),
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

const GetQuizzById = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 404, message: "you not have auth!" };
    }
    const res = await quizz
      .findOne({ lessonId: data.lessonId })
      .select("-__v")
      .lean();
    if (!res) {
      throw { status: 404, message: "not have quizz!" };
    }
    const result = {
      ...res,
      duration: converTimeH(res.duration),
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateQuizzbyIntructor = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 404, message: "you not have auth!" };
    }
    const checkLession = await Lessons.findById(data?.lessonId);
    const update = await quizz.findOneAndUpdate(
      { lessonId: data?.lessonId },

      {
        ...data,
        courseId: checkLession?.courseId,
        status: "draft",
        duration: converttimeP(data.duration),
      },
      { new: true },
    );
    return { message: "Cập nhật thành công!", result: update };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  CreateQuizByIntructor,
  GetQuizzById,
  UpdateQuizzbyIntructor,
};
