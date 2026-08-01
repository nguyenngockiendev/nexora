const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const ProcessLession = require("../model/ProcessLessons");
const Message = require("../model/ClassMessages");

const GetorderByUserId = async (data) => {
  try {
    const result = await errollment
      .find({ userId: data?.userId })
      .select("-_id type createdAt status completedAt enrolledAt classId")
      .populate("courseId")
      .lean();
    if (!result || result.length === 0) {
      throw {
        status: 404,
        message: "You don't have any courses. Please start buying new courses.",
      };
    }

    const resultInstructorNam = await Promise.all(
      result.map(async (item) => {
        const intructorName = await user
          .findById(item?.courseId?.instructor)
          .select("name -_id avatar email")
          .lean();
        const numberStudy = await Lessons.find({ courseId: item.courseId });
        const completeds = await ProcessLession.find({
          userId: data.userId,
          courseId: item.courseId,
          completed: true,
        }).populate("lessonId");
        const process = Math.round(
          (completeds.length / numberStudy.length) * 100,
        );
        return {
          ...item,
          instructor: intructorName,
          numberStudy: numberStudy.length,
          completed: completeds.length,
          process:process
        };
      }),
    );

    return resultInstructorNam;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CheckEnrollment = async (data) => {
  try {
    const result = await errollment
      .findOne({ userId: data?.userId, courseId: data?.courseId })
      .lean();
    if (!result) {
      throw { status: 404, message: "You are not enrolled in this course." };
    }
    const fullLesons = await Lessons.find({ courseId: data?.courseId }).lean();
    return fullLesons;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { GetorderByUserId, CheckEnrollment };
