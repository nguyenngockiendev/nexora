const DBconnection = require("../../config/db");
const Lessons = require("../../model/Lessons");
const LessonTranscripts = require("../../model/LessonTranscripts");
const { QuizzGenWithAI } = require("./quizAI.service");
const PromtsforAI = require("./transcript.prompt");

const DEFAULTQUESTION = 25;
const generateQuizAI = async (data) => {
  try {
    DBconnection();
    if (data.role === "" || data.role === null) {
      throw { status: 404, message: "Không có quyền!" };
    }
    const ExisLession = await Lessons.findById(data.lessionId);
    if (!ExisLession) {
      throw { status: 404, message: "Bài học này ko tồn tại!" };
    }
    const Exitstranc = await LessonTranscripts.find({
      lessonId: ExisLession._id,
    })
      .select("chunkIndex text")
      .lean();
    if (Exitstranc.some((e) => !e.text.trim())) {
      throw {
        status: 404,
        message: "Lỗi chưa tạo trancrip. hãy tạo Trancrip trước!",
      };
    }

    const count = Number(data.questionCount);
    if (!Number.isInteger(count) || count < 1 || count > DEFAULTQUESTION) {
      throw {
        status: 404,
        message:
          "Số lượng câu hỏi không đúng định dang! Hãy nhập số lượng câu hỏi",
      };
    }

    const arr = Exitstranc.sort((a, b) => a.chunkIndex - b.chunkIndex);
    const transcriptChunks = arr
      .map(
        (item) =>
          `=== CHUNK ${item.chunkIndex} === \nNỘI DUNG BÀI GIẢNG:\n${item.text}`,
      )
      .join(`\n\n`);
    const dataAI = PromtsforAI(data.questionCount, transcriptChunks);
    const finalResult = await QuizzGenWithAI(dataAI);
    console.log("dataAI", transcriptChunks);
    console.log("kết quả cuối cùng", finalResult);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

generateQuizAI({
  role: "instructor",
  lessionId: "6a7848c8b804a377ae7c95c7",
  questionCount: 10,
});

// module.exports={
//   generateQuizAI
// }
