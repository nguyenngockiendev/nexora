const {
  generateQuizAI,
} = require("../service/ModunAIgenerate/transcript.service");

const GenerateQuizAI = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      lessionId: req.params.lessionId,
      questionCount: req.query.questionCount,
    };
    const result = await generateQuizAI(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  GenerateQuizAI,
};
