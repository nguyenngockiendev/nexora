const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");

const GetAllUserByrole = async (data) => {
  try {
    if (data?.role !== "admin") {
      throw { status: 404, message: "You don't have enough authority." };
    }
    const userList = await user.find().select("-password").lean();
    if (userList.length === 0) {
      throw { status: 404, message: "no users." };
    }
    return userList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetUserById = async (data) => {
  try {
    if (data?.role !== "admin") {
      throw { status: 404, message: "You don't have enough authority." };
    }
    const users = await user.findById(data?.userId).lean();
    const userInfor = await errollment
      .find({ userId: users._id })
      .populate("courseId")
      .select()
      .populate({
        path: "classId",
        populate: [
          {
            path: "courseId",
            select: "title description price thumbnail type",
          },
          { path: "instructorId", select: "name role avatar email" },
        ],
      })
      .lean();
    if (userInfor.length === 0) {
      throw { status: 404, message: "no users." };
    }
    const finalResult = userInfor.map((item) => ({
      _id: item._id,
      userId: item.userId,

      courseId: item.courseId?._id,
      title: item.courseId?.title,
      description: item.courseId?.description,
      coursePrice: item.courseId?.price,
      thumbnail: item.courseId?.thumbnail,
      level: item.courseId?.level,
      courseType: item.courseId?.type,
      instructor: item.courseId?.instructor,

      classId: item.classId?._id || null,
      className: item.classId?.className || null,
      classDescription: item.classId?.description || null,
      maxStudents: item.classId?.maxStudents || null,
      currentStudents: item.classId?.currentStudents || null,
      startDate: item.classId?.startDate || null,
      endDate: item.classId?.endDate || null,
      meetingLink: item.classId?.meetingLink || null,
      classStatus: item.classId?.status || null,
      classPrice: item.classId?.price || null,

      type: item.type,
      status: item.status,
      enrolledAt: item.enrolledAt,
      completedAt: item.completedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ChangeStatusByAdmin = async (data) => {
  try {
    if (data?.role !== "admin") {
      throw { status: 404, message: "You don't have enough authority." };
    }

    const upadaterole = await user.findByIdAndUpdate(
      data?.userId,
      { status: data?.status },
      { new: true },
    );
    return { upadaterole: upadaterole, message: "Change succesfullly!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const UpdateroleByAdmin = async (data) => {
  try {
    if (data?.role !== "admin") {
      throw { status: 404, message: "You don't have enough authority." };
    }
    if (data?.role === "admin") {
      throw {
        status: 404,
        message: "You are not allowed to change your main role!",
      };
    }

    const upadaterole = await user.findByIdAndUpdate(
      data?.userId,
      { role: data?.roles },
      { new: true },
    );
    return { upadaterole: upadaterole, message: "Update succesfullly!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetAllStudentByIdClass = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 404, message: "You don't have enough authority." };
    }
    const student = await errollment
      .find({ classId: data?.classId, status: "active", type: "live" })
      .select("userId type");

    const finalResult = await Promise.all(
      student.map(async (item) => {
        const userclass = await user
          .find(item?.userId)
          .select("-password")
          .lean();
        return { students: userclass };
      }),
    );

    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const RemoveStudentinClass = async (data) => {
  try {
    if (data?.role === "student") {
      throw { status: 404, message: "You don't have enough authority." };
    }
    const enrollmentforstudent = await errollment.findOne({
      classId: data?.classId,
      userId: data?.studentId,
      type: "live",
    });
    const removeinclass = await errollment.findByIdAndUpdate(
      enrollmentforstudent._id,
      { status: data?.status },
      { new: true },
    );
    return { removeinclass: removeinclass, message: "Change status success!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  GetAllUserByrole,
  GetUserById,
  ChangeStatusByAdmin,
  UpdateroleByAdmin,
  GetAllStudentByIdClass,
  RemoveStudentinClass,
};
