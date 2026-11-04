const fs = require("fs");
const Courses = require("../../model/Courses");
const Lessons = require("../../model/Lessons");
const LessonTranscripts = require("../../model/LessonTranscripts");
const { QuizzGenWithAI, ScanPDFWithAI } = require("./quizAI.service");
const { PromtsforAI, PromtsPdfforAI } = require("./transcript.prompt");
const { PDFDocument } = require("pdf-lib");

const DEFAULTQUESTION = 25;
const generateQuizAI = async (data) => {
  try {
    if (data.questionCount === null) {
      throw { status: 404, message: "chưa nhập số lượng câu mong muốn!" };
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
    if (Exitstranc.length === 0 || Exitstranc.some((e) => !e.text.trim())) {
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
          "Số lượng câu hỏi không đúng định dang hoặc quá 25 câu Quizz , hãy nhập lại số lượng câu hỏi <= 25 và > 0",
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

    if (Number(finalResult.length) !== count) {
      throw {
        status: 404,
        message: "AI trả về dữ liệu không đủ câu hỏi .Hãy làm lại!",
      };
    }

    if (finalResult.options > 4 || finalResult.options < 0) {
      throw {
        status: 404,
        message:
          "Lỗi sinh bài thi: Đáp án câu hỏi do AI tạo ra bị thiếu hoặc sai chỉ số!!",
      };
    }

    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ScanPDFAI = async (data) => {
  try {
    if (!data.file) {
      throw {
        status: 400,
        message: "Vui lòng chọn file PDF đề thi!",
      };
    }

    const isExampdf = await Courses.findById(data.courseId);

    if (!isExampdf) {
      throw {
        status: 404,
        message:
          "Lỗi sinh nộp bài scan PDF. Không tồn tại Course, hãy chắc chắn bạn tạo course!",
      };
    }

    const pdfBuffer = fs.readFileSync(data.file);
    const sourcePdf = await PDFDocument.load(pdfBuffer);
    const totalPages = sourcePdf.getPageCount();
    const pagesPerChunk = 12;

    const uniqueQuestions = new Map();

    for (let start = 0; start < totalPages; start += pagesPerChunk) {
      const end = Math.min(start + pagesPerChunk + 1, totalPages);
      const subPdf = await PDFDocument.create();

      const pageIndices = [];
      for (let i = start; i < end; i++) {
        pageIndices.push(i);
      }

      const copiedPages = await subPdf.copyPages(sourcePdf, pageIndices);
      copiedPages.forEach((page) => subPdf.addPage(page));

      const subPdfBytes = await subPdf.save();
      const chunkBase64 = Buffer.from(subPdfBytes).toString("base64");

      const resultpromt = PromtsPdfforAI(chunkBase64);
      const chunkResult = await ScanPDFWithAI(resultpromt);

      if (Array.isArray(chunkResult)) {
        for (const q of chunkResult) {
          if (
            !q?.question ||
            !Array.isArray(q.options) ||
            q.options.length < 2 ||
            q.correctAnswer === undefined
          ) {
            continue;
          }
          const key = q.question
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’“”]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          if (key && !uniqueQuestions.has(key)) {
            uniqueQuestions.set(key, q);
          }
        }
      }

      if (end === totalPages) break;
    }

    const result = Array.from(uniqueQuestions.values());
    if (result.length === 0) {
      throw {
        status: 400,
        message: "Không trích xuất được câu hỏi hợp lệ nào từ file PDF!",
      };
    }

    for (const question of result) {
      if (
        !question.question ||
        !question.options ||
        question.options.length < 2 ||
        question.correctAnswer === undefined
      ) {
        throw {
          status: 400,
          message:
            "Lỗi sinh bài thi: Câu hỏi không hợp lệ, thiếu trường hoặc số lượng phương án không đúng!",
        };
      }
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (data.file && fs.existsSync(data.file)) {
      fs.unlinkSync(data.file);
    }
  }
};

module.exports = {
  generateQuizAI,
  ScanPDFAI,
};
