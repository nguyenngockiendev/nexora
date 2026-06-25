const { CreateQuizByIntructor, GetQuizzById, UpdateQuizzbyIntructor } = require("../service/quiz-service");

const CreateQuiz = async (req, res) => {
  try {
    const data = {
      lessonId: req.params.lessionId,
      role: req.user.role,
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
module.exports = { CreateQuiz,GetQuizzByLession,UpdateQuizz};
