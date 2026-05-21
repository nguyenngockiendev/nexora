const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");

const CreateClassbyIntructor = async (data) => {
  try {
    if (data.role !== "instructor") {
      throw { status: 403, message: "Only instructors can create classes" };
    }

    const resultclass = await classs.findOne({
      instructorId: data.instructorId,
      status: { $in: ["open", "ongoing"] },
      "schedule.day": data?.schedule?.day,
      "schedule.startTime": { $lte: data?.schedule.startTime },
      "schedule.endTime": { $gte: data?.schedule.endTime },
    });

    if (resultclass) {
      return {
        result: resultclass,
        message:
          "The class schedule has conflicting information. Please create a different schedule than the current one.",
      };
    }

    const newclass = await classs.create(data);
    return {
      result: newclass,
      message: "Create class successfully",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetClassbyInstructor = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "Only instructors can view their classes" };
    }
    const result = await classs
      .find({ instructorId: data.courseId })
      .populate("instructorId", "name")
      .lean();
    if (!result || result === 0) {
      throw {
        status: 403,
        message: "You don't have a class yet! Please create a new one.",
      };
    }
    const converTime = (time) => {
      const hour = Math.floor(time / 60);
      const minute = time % 60;

      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };
    const finalResult = result.map((item) => ({
      ...item,
      schedule: {
        day: item?.schedule?.day,
        startTime: converTime(item?.schedule?.startTime),
        endTime: converTime(item?.schedule?.endTime),
      },
    }));

    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateclassByrole = async (data) => {
  try {
    if (data?.role === "student") {
      throw { status: 403, message: "You are not allowed to edit!" };
    }
    const result = await classs.findById(data?.classId);
    if (!result) {
      throw { status: 404, message: "The class doesn't exist!" };
    }
    if (result?.currentStudents < data?.currentStudents) {
      throw {
        status: 404,
        message:
          "The maximum number of students must not be less than the number of students who have registered.!",
      };
    }

    const update = await classs.findByIdAndUpdate(data?.classId, data, {
      new: true,
    });
    return update;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ChangeStatusClass = async (data) => {
  try {
    if (data?.role === "student") {
      throw { status: 403, message: "You are not allowed to edit!" };
    }
    const changestatus = await classs.findByIdAndUpdate(
      data?.classId,
      { status: data?.status },
      { new: true },
    );
    return { message: "Change success", changestatus: changestatus };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetClassByStudent = async (data) => {
  try {
    // if (data?.role !== "student") {
    //   throw { status: 404, message: "fobiden!" };
    // }
    const getClass = await classs
      .findById(data?.classId)
      .populate("courseId")
      .lean();
    if (!getClass) {
      throw { status: 404, message: "you not have class!" };
    }

    const intructor = await user
      .findById(getClass?.courseId?.instructor)
      .select("-password -createdAt -createdAt")
      .lean();
    const converTime = (time) => {
      const hour = Math.floor(time / 60);
      const minute = time % 60;

      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };

    const finnalResult = {
      ...getClass,
      startDate: new Date(getClass?.startDate).toLocaleDateString("vi-VN"),
      endDate: new Date(getClass?.endDate).toLocaleDateString("vi-VN"),
      schedule: {
        day: getClass?.schedule?.day,
        startTime: converTime(getClass?.schedule?.startTime),
        endTime: converTime(getClass?.schedule?.endTime),
      },
      instructorId: intructor,
    };
    return finnalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const CourseDetailsClass = async (data) => {
  try {
    // if (data?.role !== "student") {
    //   throw { status: 404, message: "fobiden!" };
    // }
    const getClass = await classs
      .find({ courseId: data?.courseId })
      .populate("courseId")
      .populate("instructorId","-password -createdAt -updatedAt")
      .lean();
    if (getClass.length === 0) {
      throw { status: 404, message: "you not have class!" };
    }

    const converTime = (time) => {
      const hour = Math.floor(time / 60);
      const minute = time % 60;

      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };

    const finnalResult = getClass.map((item) => ({
      ...item,
      registerDeadline: new Date(item?.registerDeadline).toLocaleDateString(
        "vi-VN",
      ),
      startDate: new Date(item?.startDate).toLocaleDateString("vi-VN"),
      endDate: new Date(item?.endDate).toLocaleDateString("vi-VN"),
      schedule: {
        day: item?.schedule?.day,
        startTime: converTime(item?.schedule?.startTime),
        endTime: converTime(item?.schedule?.endTime),
      },
    }));

    return finnalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  CreateClassbyIntructor,
  GetClassbyInstructor,
  UpdateclassByrole,
  ChangeStatusClass,
  GetClassByStudent,
  CourseDetailsClass,
};
