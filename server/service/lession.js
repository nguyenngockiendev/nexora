const Lessons = require("../model/Lessons");

const Courses = require("../model/Courses");

const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");
const quizz = require("../model/Quizz");
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
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    const newlession = new Lessons(data);
    await newlession.save();
    return { message: "create successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const DeleteLessionByid = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    const deletelession = await Lessons.findByIdAndDelete(data._id);
    if (deletelession) {
      return { message: "Delete Lession Succesfully!" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateLessionByid = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    const updatelession = await Lessons.findByIdAndUpdate(
      data.lessionId,
      data,
      {
        returnDocument: true,
      },
    );
    if (!updatelession) {
      throw { status: 404, message: "Lesson not found" };
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
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
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

module.exports = {
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
  GetLessionByid,
};
