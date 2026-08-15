const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");
const TeacherRequests = require("../model/TeacherRequests");
const Users = require("../model/Users");

const GetAllUserByrole = async (data) => {
  try {
    if (data?.role !== "admin") {
      throw { status: 404, message: "You don't have enough authority." };
    }
    const userList = await user.find().select("-password").lean();
    if (userList.length === 0) {
      throw { status: 404, message: "no users." };
    }
    const result = await Promise.all(
      userList.map(async (item) => {
        const totalcourse = await order.find({ userId: item._id });
        const joid = totalcourse.filter((item) => item.status === "completed");
        return {
          ...item,
          totalcourse: totalcourse.length,
          joid: joid.length,
        };
      }),
    );

    return result;
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
    const orders = await order.find({ userId: data?.userId }).lean();
    const userInfor = await errollment
      .find({ userId: data?.userId })
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

    return { finalresult: finalResult || [], user: users, order: orders || [] };
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
      .find({ classId: data?.classId, type: "live" })
      .populate("userId", "name email avatar status phone")
      .lean();
    const students = student.filter((item) => item.status === "active");
    const studentinactive = student.filter((item) => item.status !== "active");
    const totalStudents = student.length;
    const activeStudents = student.filter(
      (item) => item.status === "active",
    ).length;
    const inactiveStudents = student.filter(
      (item) => item.status !== "active",
    ).length;
    return {
      student: students || [],
      studentinactive: studentinactive || [],
      totalStudents,
      activeStudents,
      inactiveStudents,
      Refectstudent: student.map((item) => item.classId)[0],
    };
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
    const enrollmentforstudent = await errollment.findOneAndUpdate(
      {
        classId: data?.classId,
        userId: data?.studentId,
        type: "live",
      },
      { status: data?.status },
    );

    if (!enrollmentforstudent) {
      throw { status: 404, message: "not found!" };
    }
    await classs.findByIdAndUpdate(
      { _id: enrollmentforstudent.classId, currentStudents: { $gt: 0 } },

      {
        $inc: { currentStudents: -1 },
      },
    );

    return {
      removeinclass: enrollmentforstudent,
      message: "Change status success!",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const RefectStudentoutclass = async (data) => {
  try {
    if (data?.role === "student") {
      throw { status: 404, message: "You don't have enough authority." };
    }
    const enrollmentforstudent = await errollment.findOneAndUpdate(
      {
        classId: data?.classId,
        userId: data?.studentId,
        type: "live",
      },
      { status: data?.status },
    );

    if (!enrollmentforstudent) {
      throw { status: 404, message: "not found!" };
    }
    const classMaxstudent = await classs
      .findById(enrollmentforstudent.classId)
      .select("maxStudents currentStudents")
      .lean();
    await classs.findOneAndUpdate(
      {
        _id: enrollmentforstudent.classId,
        currentStudents: { $lt: classMaxstudent.maxStudents },
      },

      {
        $inc: { currentStudents: 1 },
      },
    );

    return {
      removeinclass: enrollmentforstudent,
      message: "Change status success!",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const RequestInstructor = async (data) => {
  try {
    if (data.role != "student") {
      throw { status: 404, message: "không thể yêu cầu làm Intructor!" };
    }
    const existingRequest = await TeacherRequests.findOne({
      userId: data.userId,
      status: "pending",
    });
    if (existingRequest) {
      throw { status: 400, message: "Bạn đã có đơn đăng ký đang chờ duyệt!" };
    }
    const result = await TeacherRequests.create({
      userId: data.userId,
      specialty:data.specialty,
      opinion: data.opinion,
      proofImage: data.proofImage,
      status: "pending",
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ResponInstructor = async (data) => {
  try {
    if (data.role != "admin") {
      throw { status: 404, message: "không có quyền thay đổi!" };
    }
    if (data.approved === "approved") {
      const result = await Users.findByIdAndUpdate(data.userId, {
        role: "instructor",
      });
      await TeacherRequests.findOneAndUpdate(
        { _id: data.requestId },
        {
          status: "approved",
        },
      );
      return result;
    }
    return await TeacherRequests.findOneAndUpdate(
      { userId: data.userId },
      {
        status: "rejected",
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetPendingTeacherRequests = async (data) => {
  try {
    if (data.role !== "admin") {
      throw { status: 403, message: "Bạn không có quyền xem thông tin này!" };
    }
    const requests = await TeacherRequests.find({ status: "pending" })
      .populate("userId", "name email avatar")
      .lean();
    return requests;
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
  RefectStudentoutclass,
  RequestInstructor,
  ResponInstructor,
  GetPendingTeacherRequests,
};
