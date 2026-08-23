const {
  SaveLessonProgress,
  getLessonProgress,
  getAllLessonProgress,
  GetrecentLession,
  DashboartforStudent,
} = require("../service/Process-service");

const SaveProcess = async (req, res) => {
  try {
    const data = {
      ...req.body,
      role: req.user.role,
      userId: req.user.userId,
      lessonId: req.params.lessonId,
      courseId: req.params.courseId,
    };
    const result = await SaveLessonProgress(data);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetProcess = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      lessonId: req.params.lessonId,
    };
    const result = await getLessonProgress(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetAllProcess = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      courseId: req.params.courseId,
    };
    const result = await getAllLessonProgress(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const Getrecenlession = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
    };
    const result = await GetrecentLession(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetDashboartfostudent = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
    };
    const result = await DashboartforStudent(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  SaveProcess,
  GetProcess,
  GetAllProcess,
  Getrecenlession,
  GetDashboartfostudent,
};
