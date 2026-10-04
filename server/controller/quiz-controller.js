const {
  CreateQuizByIntructor,
  GetQuizzById,
  UpdateQuizzbyIntructor,
  CreateAttempQuiz,
  GetAttempsQuiz,
  GetCourse,
  GetQuizzbyStudent,
  GetAssessments,
  TrackingQuizz,
  UpdateAttempQuizz,
  UpdateAttempQuizzAll,
} = require("../service/quiz-service");

const CreateQuiz = async (req, res) => {
  try {
    const data = {
      lessonId: req.params.lessionId,
      role: req.user.role,
      userId: req.user.userId,
      ...req.body,
    };
    const result = await CreateQuizByIntructor(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetQuizzByLession = async (req, res) => {
  try {
    const data = {
      lessonId: req.params.lessonId,
      userId: req.user.userId,
      role: req.user.role,
    };
    const result = await GetQuizzById(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const UpdateQuizz = async (req, res) => {
  try {
    const data = {
      lessonId: req.params.lessonId,
      userId: req.user.userId,
      role: req.user.role,
      ...req.body,
    };
    const result = await UpdateQuizzbyIntructor(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const UpdateQuizzAll = async (req, res) => {
  try {
    const data = {
      quizId: req.params.quizId,
      userId: req.user.userId,
    };
    const result = await UpdateAttempQuizzAll(data);
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

const CreateAttemp = async (req, res) => {
  try {
    const data = {
      lessonId: req.params.lessonId,
      id: req.user.userId,
      ...req.body,
    };
    const result = await CreateAttempQuiz(data);
    const resultAttemps = await GetAttempsQuiz({
      studentId: req.user.userId,
      attempsId: result._id,
      lessonId: req.params.lessonId,
    });
    res.status(200).json(resultAttemps);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetCourseForQuizz = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      role: req.user.role,
    };

    const result = await GetCourse(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetQuizBystuden = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
    };
    const result = await GetQuizzbyStudent(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetAssessmentHubData = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      role: req.user.role,
    };
    const result = await GetAssessments(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetResultQuizz = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      role: req.user.role,
      courseId: req.params.courseId,
    };
    const result = await TrackingQuizz(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const RetakeQuizz = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      courseId: req.body.courseId,
      quizattempsId: req.params.quizattempsId,
    };
    const result = await UpdateAttempQuizz(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  RetakeQuizz,
  UpdateQuizzAll,
  GetResultQuizz,
  GetAssessmentHubData,
  CreateQuiz,
  GetQuizzByLession,
  UpdateQuizz,
  CreateAttemp,
  GetCourseForQuizz,
  GetQuizBystuden,
};
