const Courses = require("../courses/Courses");
const errollment = require("../enrollments/Enrollments");
const user = require("../users/Users");
const classs = require("./Class");
const Assignments = require("./Assignments");
const AssignmentSubmissions = require("./AssignmentSubmissions");

const ValidateClassSchedule = async (data, classId) => {
  const days = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  if (!data.startDate || !data.endDate || !data.registerDeadline) {
    throw {
      status: 400,
      message:
        "Vui lòng nhập đủ hạn đăng ký, ngày khai giảng và ngày kết thúc!",
    };
  }
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const registerDeadline = new Date(data.registerDeadline);
  if (
    [startDate, endDate, registerDeadline].some(
      (date) => !Number.isFinite(date.getTime()),
    )
  ) {
    throw {
      status: 400,
      message: "Vui lòng nhập ngày đăng ký, khai giảng và kết thúc hợp lệ!",
    };
  }
  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(0, 0, 0, 0);
  registerDeadline.setUTCHours(0, 0, 0, 0);
  if (startDate > endDate) {
    throw {
      status: 400,
      message: "Ngày kết thúc không được trước ngày khai giảng!",
    };
  }
  if (registerDeadline > startDate) {
    throw {
      status: 400,
      message: "Hạn đăng ký không được sau ngày khai giảng!",
    };
  }
  const schedule = data.schedule;
  if (
    !schedule ||
    !Object.hasOwn(days, schedule.day) ||
    !Number.isInteger(schedule.startTime) ||
    !Number.isInteger(schedule.endTime) ||
    schedule.startTime < 0 ||
    schedule.endTime >= 1440 ||
    schedule.startTime >= schedule.endTime
  ) {
    throw {
      status: 400,
      message:
        "Lịch học không hợp lệ. Giờ bắt đầu phải trước giờ kết thúc trong cùng ngày!",
    };
  }
  const firstSession = new Date(startDate);
  firstSession.setUTCDate(
    firstSession.getUTCDate() +
      ((days[schedule.day] - firstSession.getUTCDay() + 7) % 7),
  );
  if (firstSession > endDate) {
    throw {
      status: 400,
      message: "Khoảng ngày tổ chức không có buổi nào trùng thứ học đã chọn!",
    };
  }
  if (
    !Number.isInteger(Number(data.maxStudents)) ||
    Number(data.maxStudents) < 1
  ) {
    throw { status: 400, message: "Sĩ số tối đa phải là số nguyên lớn hơn 0!" };
  }
  if (
    data.price === "" ||
    data.price == null ||
    !Number.isFinite(Number(data.price)) ||
    Number(data.price) < 0
  ) {
    throw { status: 400, message: "Giá lớp học phải là số không âm!" };
  }
  if (!["open", "ongoing", "closed", "closes"].includes(data.status)) {
    throw { status: 400, message: "Trạng thái lớp học không hợp lệ!" };
  }
  if (!["open", "ongoing"].includes(data.status)) return;

  const countQuery = {
    courseId: data.courseId,
    status: { $in: ["open", "ongoing"] },
  };
  if (classId) countQuery._id = { $ne: classId };
  const count = await classs.countDocuments(countQuery);
  if (count >= 4) {
    throw {
      status: 400,
      message: "Mỗi khóa học chỉ được có tối đa 4 lớp đang mở hoặc đang học!",
    };
  }
  const scheduleQuery = {
    instructorId: data.instructorId,
    status: { $in: ["open", "ongoing"] },
    "schedule.day": schedule.day,
    "schedule.startTime": { $lt: schedule.endTime },
    "schedule.endTime": { $gt: schedule.startTime },
  };
  if (classId) scheduleQuery._id = { $ne: classId };
  const otherClasses = await classs.find(scheduleQuery);
  for (const item of otherClasses) {
    const otherStart = new Date(item.startDate);
    const otherEnd = new Date(item.endDate);
    otherStart.setUTCHours(0, 0, 0, 0);
    otherEnd.setUTCHours(0, 0, 0, 0);
    const overlapStart = new Date(
      Math.max(startDate.getTime(), otherStart.getTime()),
    );
    const overlapEnd = new Date(
      Math.min(endDate.getTime(), otherEnd.getTime()),
    );
    overlapStart.setUTCDate(
      overlapStart.getUTCDate() +
        ((days[schedule.day] - overlapStart.getUTCDay() + 7) % 7),
    );
    if (overlapStart <= overlapEnd) {
      throw {
        status: 409,
        message: `Lịch học trùng với lớp "${item.className}". Vui lòng chọn thứ hoặc giờ khác!`,
      };
    }
  }
};

const CreateClassbyIntructor = async (data) => {
  try {
    const isCourse = await Courses.findOne({
      _id: data.courseId,
      instructor: data.instructorId,
    });
    if (!isCourse) {
      throw {
        status: 404,
        message: "Bạn không phải giảng viên của khóa học này!",
      };
    }

    data.status = data.status || "open";
    await ValidateClassSchedule(data);

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
    const result = await classs.findById(data?.classId);
    if (!result) {
      throw { status: 404, message: "Lớp học không tồn tại!" };
    }
    if (
      data?.role !== "admin" &&
      result.instructorId.toString() !== (data.userId || "").toString()
    ) {
      throw {
        status: 403,
        message: "Bạn không có quyền chỉnh sửa lớp học của giảng viên khác!",
      };
    }
    if (
      data.maxStudents !== undefined &&
      Number(data.maxStudents) < result.currentStudents
    ) {
      throw {
        status: 400,
        message:
          "Số lượng học viên tối đa không được nhỏ hơn số học viên đã đăng ký!",
      };
    }

    const updateData = {};
    const fields = [
      "className",
      "description",
      "maxStudents",
      "registerDeadline",
      "startDate",
      "endDate",
      "meetingLink",
      "schedule",
      "status",
      "price",
    ];
    for (const field of fields) {
      if (data[field] !== undefined) updateData[field] = data[field];
    }
    const finalData = { ...result.toObject(), ...updateData };
    if (updateData.schedule) {
      finalData.schedule = {
        ...result.toObject().schedule,
        ...updateData.schedule,
      };
      updateData.schedule = finalData.schedule;
    }
    await ValidateClassSchedule(finalData, result._id);
    const update = await classs.findByIdAndUpdate(data?.classId, updateData, {
      returnDocument: "after",
      runValidators: true,
    });
    return update;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ChangeStatusClass = async (data) => {
  try {
    const result = await classs.findById(data?.classId);
    if (!result) {
      throw { status: 404, message: "Lớp học không tồn tại!" };
    }
    if (
      data.role !== "admin" &&
      result.instructorId.toString() !== (data.userId || "").toString()
    ) {
      throw {
        status: 403,
        message:
          "Bạn không có quyền thay đổi trạng thái lớp học của giảng viên khác!",
      };
    }
    if (!["open", "ongoing", "closed", "closes"].includes(data.status)) {
      throw { status: 400, message: "Trạng thái lớp học không hợp lệ!" };
    }
    if (["open", "ongoing"].includes(data.status)) {
      await ValidateClassSchedule(
        { ...result.toObject(), status: data.status },
        result._id,
      );
    }
    const changestatus = await classs.findByIdAndUpdate(
      data?.classId,
      { status: data?.status },
      { returnDocument: "after", runValidators: true },
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
    const getClass = await classs
      .findById(data?.classId)
      .populate("courseId")
      .lean();
    if (!getClass) {
      throw { status: 404, message: "Không tìm thấy lớp học của bạn!" };
    }

    if (
      data.role !== "admin" &&
      getClass.instructorId.toString() !== (data.userId || "").toString()
    ) {
      const isEnrollment = await errollment.findOne({
        userId: data.userId,
        classId: getClass._id,
        status: { $in: ["active", "completed"] },
      });
      if (!isEnrollment) {
        throw { status: 403, message: "Bạn chưa được cấp quyền vào lớp này!" };
      }
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

const SelectSessionClass = async (data) => {
  try {
    const dayMap = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };

    const now = new Date();
    const dayIndex = now.getDay();
    const currentDay = dayIndex === 0 ? 7 : dayIndex;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentWeeklyMinutes = currentDay * 1440 + currentMinutes;

    const myLiveEnrollments = await errollment
      .find({
        userId: data.userId,
        type: "live",
        status: "active",
      })
      .populate({
        path: "classId",
        match: { isLocked: false },
        populate: {
          path: "instructorId",
          select: "name avatar email",
        },
      })
      .populate("courseId", "title thumbnail category")
      .lean();

    const validClasses = myLiveEnrollments
      .filter((item) => item.classId)
      .map((item) => {
        const cls = item.classId;
        const course = item.courseId || {};
        return {
          ...cls,
          courseTitle: course.title,
          courseThumbnail: course.thumbnail,
          courseCategory: course.category,
        };
      });

    if (validClasses.length === 0) {
      return {
        message: "Bạn chưa đăng ký lớp học trực tuyến nào!",
        nextSessionClass: null,
        totalLiveClasses: 0,
      };
    }

    const formatTime = (time) => {
      const hour = Math.floor(time / 60);
      const minute = time % 60;
      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };

    const classesWithTime = validClasses.map((cls) => {
      const classDay = dayMap[cls.schedule?.day] || 1;
      const startTime = Number(cls.schedule?.startTime || 0);
      const weeklyMinutes = classDay * 1440 + startTime;

      return {
        ...cls,
        weeklyMinutes: weeklyMinutes,
        schedule: {
          day: cls.schedule?.day,
          startTime: formatTime(cls.schedule?.startTime),
          endTime: formatTime(cls.schedule?.endTime),
        },
      };
    });

    const upcomingThisWeek = classesWithTime
      .filter((cls) => cls.weeklyMinutes >= currentWeeklyMinutes)
      .sort((a, b) => a.weeklyMinutes - b.weeklyMinutes);

    const nextSessionClass =
      upcomingThisWeek.length > 0
        ? upcomingThisWeek[0]
        : classesWithTime.sort((a, b) => a.weeklyMinutes - b.weeklyMinutes)[0];

    return {
      nextSessionClass: nextSessionClass || null,
      totalLiveClasses: validClasses.length,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const AssesmentClass = async (data) => {
  try {
    if (!data.fileUrl) {
      throw { status: 403, message: "File không tồn tại!" };
    }
    const isClass = await classs.findOne({
      _id: data.classId,
      instructorId: data.userId,
    });
    if (!isClass) {
      throw { status: 404, message: "Bạn không phải giáo viên trong lớp này!" };
    }
    let isAssignmentId = null;
    if (data.assignmentId) {
      isAssignmentId = await Assignments.findById(data.assignmentId);
    }

    if (!isAssignmentId) {
      const result = await Assignments.create({
        classId: data.classId,
        instructorId: data.userId,
        title: data.title,
        description: data.description,
        fileUrl: data.fileUrl,
        deadline: data.deadline,
      });
      return result;
    }

    const saveAss = await Assignments.findByIdAndUpdate(
      isAssignmentId._id,
      {
        title: data.title,
        description: data.description,
        fileUrl: data.fileUrl,
        deadline: data.deadline,
      },
      { new: true },
    );
    return saveAss;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetAssesment = async (data) => {
  try {
    const result = await Assignments.find({
      classId: data.classId,
    })
      .populate("instructorId", "name avatar")
      .sort({ createdAt: -1 })
      .lean();
    return result || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const SumbitAssments = async (data) => {
  try {
    if (!data.fileUrl) {
      throw { status: 403, message: "File không tồn tại!" };
    }
    let isAssignmentId = null;
    if (data.assignmentSubmissionsid) {
      isAssignmentId = await AssignmentSubmissions.findById(
        data.assignmentSubmissionsid,
      );
    }

    if (!isAssignmentId) {
      const result = await AssignmentSubmissions.create({
        classId: data.classId,
        assignmentId: data.assignmentId,
        studentId: data.userId,
        fileUrl: data.fileUrl,
        score: null,
        feedback: null,
        status: "pending",
      });
      return result;
    }

    const saveAss = await AssignmentSubmissions.findByIdAndUpdate(
      isAssignmentId._id,
      {
        fileUrl: data.fileUrl,
        score: null,
        feedback: null,
        status: "pending",
      },
      { new: true },
    );
    return saveAss;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetAllClassesForInstructor = async (data) => {
  try {
    const classes = await classs
      .find({ instructorId: data.userId })
      .populate("courseId", "title thumbnail category")
      .populate("instructorId", "name email avatar")
      .sort({ createdAt: -1 })
      .lean();

    const converTime = (time) => {
      const hour = Math.floor(time / 60);
      const minute = time % 60;
      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };

    const finalResult = await Promise.all(
      classes.map(async (cls) => {
        const assignmentCount = await Assignments.countDocuments({
          classId: cls._id,
        });
        const myAssignmentIds = await Assignments.find({
          classId: cls._id,
        }).distinct("_id");
        const pendingCount = await AssignmentSubmissions.countDocuments({
          assignmentId: { $in: myAssignmentIds },
          status: "pending",
        });

        return {
          ...cls,
          title:
            cls.name ||
            cls.title ||
            cls.courseId?.title ||
            "Lớp Học Trực Tuyến",
          courseTitle: cls.courseId?.title || "Khóa học",
          assignmentCount,
          pendingCount,
          schedule: {
            day: cls?.schedule?.day,
            startTime: converTime(cls?.schedule?.startTime || 0),
            endTime: converTime(cls?.schedule?.endTime || 0),
          },
        };
      }),
    );

    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const TrackingAssignments = async (data) => {
  try {
    const isClass = await classs.findOne({
      _id: data.classId,
      instructorId: data.userId,
    });
    if (!isClass) {
      throw { status: 404, message: "Bạn không phải giáo viên trong lớp này!" };
    }
    const targetClass = await classs
      .findById(data.classId)
      .populate("courseId", "title")
      .populate("instructorId", "name")
      .lean();

    if (!targetClass) {
      throw { status: 404, message: "Lớp học không tồn tại!" };
    }

    const assignments = await Assignments.find({ classId: data.classId })
      .sort({ createdAt: -1 })
      .lean();

    const finalResult = await Promise.all(
      assignments.map(async (ass) => {
        const submissions = await AssignmentSubmissions.find({
          assignmentId: ass._id,
        })
          .populate("studentId", "name email avatar")
          .sort({ createdAt: -1 })
          .lean();

        return {
          _id: ass._id,
          classId: ass.classId,
          className:
            targetClass.name ||
            targetClass.title ||
            targetClass.courseId?.title ||
            "Lớp Học",
          title: ass.title,
          description: ass.description || "",
          fileUrl: ass.fileUrl,
          deadline: ass.deadline,
          createdAt: ass.createdAt,
          submissions: submissions.map((sub) => ({
            _id: sub._id,
            assignmentId: sub.assignmentId,
            classId: sub.classId,
            student: {
              _id: sub.studentId?._id,
              name: sub.studentId?.name || "Học viên",
              email: sub.studentId?.email || "",
              avatar: sub.studentId?.avatar || "",
            },
            fileUrl: sub.fileUrl,
            submittedAt: sub.submittedAt || sub.createdAt,
            score: sub.score,
            feedback: sub.feedback || "",
            status: sub.status || "pending",
          })),
        };
      }),
    );

    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GradeStudentSubmission = async (data) => {
  try {
    const submission = await AssignmentSubmissions.findById(data.submissionId);
    if (!submission) {
      throw { status: 404, message: "Không tìm thấy bài nộp!" };
    }
    if (data?.role !== "admin") {
      const isClass = await classs.findOne({
        _id: submission.classId,
        instructorId: data.userId,
      });
      if (!isClass) {
        throw {
          status: 403,
          message: "Bạn không phải giáo viên của lớp học này!",
        };
      }
    }
    const update = await AssignmentSubmissions.findByIdAndUpdate(
      data.submissionId,
      {
        score: Number(data.score),
        feedback: data.feedback || "",
        status: "graded",
      },
      { new: true },
    );
    return {
      message: "Chấm điểm bài tập thành công!",
      result: update,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  GradeStudentSubmission,
  TrackingAssignments,
  GetAllClassesForInstructor,
  SumbitAssments,
  GetAssesment,
  AssesmentClass,
  CreateClassbyIntructor,
  GetClassbyInstructor,
  UpdateclassByrole,
  ChangeStatusClass,
  GetClassByStudent,
  CourseDetailsClass,
  SelectSessionClass,
};
