const {
  generateQuizAI,
  ScanPDFAI,
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
const GeneratePDFAI = async (req, res) => {
  let filepath = "";
  if (req.file) {
    filepath = req.file.path;
  }
  try {
    const data = {
      userId: req.user.userId,
      courseId: req.params.courseId,
      file: filepath,
    };
    const result = await ScanPDFAI(data);
    res.status(200).json({
      success: true,
      message: "Scan PDF thành công",
      data: result,
      namePDF: req.file.originalname,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  GenerateQuizAI,
  GeneratePDFAI,
};
