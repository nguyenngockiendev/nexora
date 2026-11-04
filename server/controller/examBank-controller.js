const {
  createExamBank,
  getExamsByCourse,
  getExamDetail,
  deleteExam,
  syncFocusExam,
  getFocusExam,
  getDedupExam,
} = require("../service/examBank-service");

const CreateExamBankController = async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;
    const result = await createExamBank({ courseId, title, questions });
    res.status(201).json({
      success: true,
      message: "Đã lưu bộ đề vào Kho Đề Thi thành công!",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi CreateExamBankController:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Lỗi máy chủ khi tạo đề thi!",
    });
  }
};

const GetExamsByCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await getExamsByCourse(courseId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Lỗi GetExamsByCourseController:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Lỗi khi lấy danh sách đề thi!",
    });
  }
};

const GetExamDetailController = async (req, res) => {
  try {
    const { examId } = req.params;
    const result = await getExamDetail(examId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Lỗi GetExamDetailController:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Lỗi khi lấy chi tiết đề thi!",
    });
  }
};

const DeleteExamController = async (req, res) => {
  try {
    const { examId } = req.params;
    await deleteExam(examId);
    res.status(200).json({
      success: true,
      message: "Đã xóa đề thi thành công!",
    });
  } catch (error) {
    console.error("Lỗi DeleteExamController:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Lỗi khi xóa đề thi!",
    });
  }
};

const SyncFocusExamController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await syncFocusExam(courseId);
    res.status(200).json({
      success: true,
      message: "Cập nhật bộ đề trọng tâm thành công!",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi SyncFocusExamController:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Lỗi khi đồng bộ đề trọng tâm!",
    });
  }
};

const GetFocusExamController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await getFocusExam(courseId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Lỗi GetFocusExamController:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Lỗi khi lấy đề trọng tâm!",
    });
  }
};
const GetDedupExamController = async (req, res) => {
  try {
    const data = {
      courseId: req.params.courseId,
    };
    const result = await getDedupExam(data);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Lỗi GetFocusExamController:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  GetDedupExamController,
  CreateExamBankController,
  GetExamsByCourseController,
  GetExamDetailController,
  DeleteExamController,
  SyncFocusExamController,
  GetFocusExamController,
};
