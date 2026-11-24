const mongoose = require("mongoose");
const Class = require("../classes/Class");
const Enrollments = require("../enrollments/Enrollments");

const requireClassAccess = async (classId, courseId, userId, manage = false) => {
  if (![classId, courseId].every((id) => mongoose.isObjectIdOrHexString(id))) {
    throw { status: 400, message: "Mã lớp hoặc khóa học không hợp lệ." };
  }
  const classroom = await Class.findOne({ _id: classId, courseId, isLocked: { $ne: true } });
  if (!classroom) throw { status: 404, message: "Không tìm thấy lớp học." };
  if (String(classroom.instructorId) === String(userId)) return;
  if (!manage) {
    const enrolled = await Enrollments.exists({
      userId, courseId, classId, status: { $in: ["active", "completed"] },
    });
    if (enrolled) return;
  }
  throw { status: 403, message: "Bạn chưa có quyền truy cập bài học của lớp này." };
};

module.exports = { requireClassAccess };
