const { SaveLessonProgress, getLessonProgress } = require("../service/Process-service");

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
module.exports = { SaveProcess,GetProcess };
