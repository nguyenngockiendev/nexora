const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const classs = require("../model/Class");

const GetAllCourses = async (data) => {
  try {
    let course = [];
    if (data?.role === "admin") {
      course = await Courses.find().populate("instructor", "name type").lean();
    }
    if (data?.role === "instructor") {
      course = await Courses.find({ instructor: data?.userId })
        .populate("instructor", "name type")
        .lean();
    }
    if (data?.role === "student") {
      course = await Courses.find().populate("instructor", "name type").lean();
    }
    const resultFinal = await Promise.all(
      course?.map(async (co) => {
        const numbserclass = await classs.find({ courseId: co?._id });
        return {
          ...co,
          instructor: co?.instructor?.name,
          numberClass: numbserclass.length,
        };
      }),
    );

    return resultFinal;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CreatenewCourses = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { message: "you can not create courses!" };
    }

    const newCourses = new Courses(data);

    await newCourses.save();
    return { message: " Create Courses successfully!", result: newCourses };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetLessonById = async (data) => {
  try {
    let result = [];
    if (data?.role == "instructor") {
      result = await Lessons.find({ courseId: data.id });
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetDetailsCourse = async (data) => {
  try {
    const list = await Courses.findById(data.courseId)
      .populate("instructor")
      .lean();
    if (!list) {
      throw { status: 404, message: "Course không tồn tại!" };
    }
    const lessionbycou = await Lessons.find({ courseId: list._id }).lean();
    const result = {
      ...list,
      lessons: lessionbycou,
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  GetAllCourses,
  CreatenewCourses,
  GetLessonById,
  GetDetailsCourse,
};
