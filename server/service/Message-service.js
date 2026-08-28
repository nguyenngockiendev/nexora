const Message = require("../model/ClassMessages");
const Class = require("../model/Class");
const Enrollment = require("../model/Enrollments");

const InserMessage = async (data) => {
  try {
    if (!data.userId || !data.classId || !data.message?.trim()) {
      throw { status: 400, message: "Thiếu thông tin người gửi hoặc nội dung tin nhắn!" };
    }

    if (data?.role !== "admin") {
      const isTeacher = await Class.findOne({
        _id: data.classId,
        instructorId: data.userId,
      });
      const isStudent = await Enrollment.findOne({
        classId: data.classId,
        userId: data.userId,
      });

      if (!isTeacher && !isStudent) {
        throw {
          status: 403,
          message: "Bạn không phải là thành viên của lớp học này!",
        };
      }
    }

    const newMessage = await Message.create({
      ...data,
      classId: data.classId,
      sender: data.userId,
    });
    return await newMessage.populate("sender", "name avatar role");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetMessage = async (classId) => {
  try {
    const listMes = await Message.find({ classId })
      .populate("sender", "name avatar role")
      .sort({
        createdAt: -1,
      })
      .limit(50)
      .lean();
    return listMes.reverse();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  InserMessage,
  GetMessage,
};
