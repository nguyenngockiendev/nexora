const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");

const CreateClassbyIntructor = async (data) => {
  try {
    if (data.role !== "instructor") {
      throw { status: 403, message: "Chỉ giảng viên mới có quyền tạo lớp học" };
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
          "Lịch học có thông tin bị trùng lặp. Vui lòng tạo một lịch học khác với lịch hiện tại.",
      };
    }

    const newclass = await classs.create(data);
    return {
      result: newclass,
      message: "Tạo lớp học thành công!",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetClassbyInstructor = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw {
        status: 403,
        message: "Chỉ giảng viên mới có thể xem các lớp học của mình",
      };
    }
    const result = await classs
      .find({ instructorId: data.intructor, courseId: data.courseId })
      .populate("instructorId", "name")
      .lean();
    if (!result || result === 0) {
      throw {
        status: 403,
        message: "Bạn chưa có lớp học nào! Vui lòng tạo một lớp học mới.",
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
      throw { status: 403, message: "Bạn không có quyền chỉnh sửa lớp học!" };
    }
    const result = await classs.findById(data?.classId);
    if (!result) {
      throw { status: 404, message: "Lớp học không tồn tại!" };
    }
    if (
      data?.role !== "admin" &&
      result.instructorId.toString() !==
        (data.instructorId || data.userId || "").toString()
    ) {
      throw {
        status: 403,
        message: "Bạn không có quyền chỉnh sửa lớp học của giảng viên khác!",
      };
    }
    if (result?.currentStudents < data?.currentStudents) {
      throw {
        status: 400,
        message:
          "Số lượng học viên tối đa không được nhỏ hơn số học viên đã đăng ký!",
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
      throw {
        status: 403,
        message: "Bạn không có quyền chỉnh sửa trạng thái lớp học!",
      };
    }
    const result = await classs.findById(data?.classId);
    if (!result) {
      throw { status: 404, message: "Lớp học không tồn tại!" };
    }
    if (
      data?.role !== "admin" &&
      result.instructorId.toString() !==
        (data.instructorId || data.userId || "").toString()
    ) {
      throw {
        status: 403,
        message:
          "Bạn không có quyền thay đổi trạng thái lớp học của giảng viên khác!",
      };
    }
    const changestatus = await classs.findByIdAndUpdate(
      data?.classId,
      { status: data?.status },
      { new: true },
    );
    return {
      message: "Cập nhật trạng thái lớp học thành công!",
      changestatus: changestatus,
    };
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
      throw { status: 404, message: "Không tìm thấy lớp học của bạn!" };
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
    const getClass = await classs
      .find({ courseId: data?.courseId })
      .populate({
        path: "courseId",
        populate: {
          path: "instructor",
          select: "-password -createdAt -updatedAt",
        },
      })
      .populate("instructorId", "-password -createdAt -updatedAt")
      .lean();
    if (getClass.length === 0) {
      const singleCourse = await Courses.findById(data?.courseId)
        .populate("instructor", "-password -createdAt -updatedAt")
        .lean();
      if (singleCourse) {
        return [
          {
            courseId: singleCourse,
            instructorId: singleCourse.instructor,
            _emptyClass: true,
          },
        ];
      }
      return [];
    }
    const isEnroillment = await errollment.find({
      userId: data.userId,
      courseId: data?.courseId,
      status: "active",
    });
    const isClass = isEnroillment
      .filter((e) => e.type === "live")
      .map((e) => e.classId?.toString());
    const converTime = (time) => {
      const hour = Math.floor(time / 60);
      const minute = time % 60;

      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };

    const finnalResult = getClass.map((item) => ({
      ...item,
      isJoined: isClass.includes(item?._id?.toString()),
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
