const fs = require("fs");
const { setTimeout: wait } = require("node:timers/promises");
const Courses = require("../../courses/Courses");
const Lessons = require("../../lessons/Lessons");
const LessonTranscripts = require("../../lessons/LessonTranscripts");
const {
  QuizzGenWithAI,
  ScanPDFWithAI,
  responsOpenAI,
  GenAIquiz,
} = require("../providers/ai-provider.service");
const {
  PromtsforAI,
  PromtsPdfforAI,
  NormalizeTranscriptPrompt,
} = require("./prompts");
const { PDFDocument } = require("pdf-lib");
const LessonNormalizedContent = require("../../lessons/LessonNormalizedContent");

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

    const Exitstranc = await LessonNormalizedContent.findOne({
      lessonId: ExisLession._id,
      status: "READY",
    })
      .select("normalizedChunks")
      .lean();
    if (!Exitstranc || Exitstranc.normalizedChunks.length === 0) {
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
    const arr = Exitstranc.normalizedChunks.map((item) => {
      return { index: item.index, title: item.title, content: item.content };
    });
    const dataAI = PromtsforAI(data.questionCount, arr);
    const finalResult = await GenAIquiz(dataAI);

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
const LessonNormalized = async (lessonId) => {
  const lesson = await Lessons.findById(lessonId);
  if (!lesson || lesson.status !== "TRANSCRIPT_READY") {
    throw new Error("Bài học chưa có transcript sẵn sàng để chuẩn hóa!");
  }

  const chunks = await LessonTranscripts.find({ lessonId }).sort({
    chunkIndex: 1,
  });
  if (
    chunks.length === 0 ||
    chunks.some((chunk) => chunk.status !== "DONE" || !chunk.text?.trim())
  ) {
    throw new Error("Transcript thiếu nội dung hoặc chưa xử lý xong!");
  }

  const existing = await LessonNormalizedContent.findOne({ lessonId });
  if (existing && existing.status !== "FAILED") return existing;
  if (existing) {
    await LessonNormalizedContent.deleteOne({
      _id: existing._id,
      status: "FAILED",
    });
  }

  let run;
  try {
    run = await LessonNormalizedContent.create({
      lessonId,
      status: "PROCESSING",
    });
  } catch (error) {
    if (error.code !== 11000) throw error;
    return LessonNormalizedContent.findOne({ lessonId });
  }

  try {
    const currentLesson = await Lessons.exists({
      _id: lessonId,
      status: "TRANSCRIPT_READY",
      updatedAt: lesson.updatedAt,
    });
    if (!currentLesson) {
      throw new Error("Bài học đã thay đổi trong lúc chuẩn bị chuẩn hóa!");
    }

    const input = chunks.map(({ chunkIndex, text }) => ({ chunkIndex, text }));
    const sourceIndexes = new Set(input.map(({ chunkIndex }) => chunkIndex));
    const prompt = NormalizeTranscriptPrompt(input);
    const retryDelays = [2000, 5000];
    let result;
    for (let attempt = 0; ; attempt++) {
      try {
        result = await QuizzGenWithAI(prompt);
        break;
      } catch (error) {
        if (error.status !== 503 || attempt === retryDelays.length) throw error;
        await wait(retryDelays[attempt]);
        const active = await LessonNormalizedContent.exists({
          _id: run._id,
          status: "PROCESSING",
        });
        if (!active) return null;
      }
    }
    if (
      !Array.isArray(result?.normalizedChunks) ||
      !result.normalizedChunks.length
    ) {
      throw new Error("AI không trả về nội dung chuẩn hóa!");
    }

    const normalizedChunks = result.normalizedChunks.map((item, index) => {
      if (
        typeof item?.title !== "string" ||
        !item.title.trim() ||
        typeof item.content !== "string" ||
        !item.content.trim() ||
        !Array.isArray(item.sources) ||
        item.sources.length === 0 ||
        item.sources.some((source) => !sourceIndexes.has(source?.chunkIndex))
      ) {
        throw new Error(
          `Mục chuẩn hóa ${index + 1} thiếu nội dung hoặc có nguồn không hợp lệ!`,
        );
      }

      return {
        index,
        title: item.title.trim(),
        content: item.content.trim(),
        sources: [...new Set(item.sources.map(({ chunkIndex }) => chunkIndex))]
          .sort((a, b) => a - b)
          .map((chunkIndex) => ({ chunkIndex })),
      };
    });

    return await LessonNormalizedContent.findOneAndUpdate(
      { _id: run._id, status: "PROCESSING" },
      { $set: { status: "READY", normalizedChunks } },
      { new: true, runValidators: true },
    );
  } catch (error) {
    await LessonNormalizedContent.updateOne(
      { _id: run._id, status: "PROCESSING" },
      { $set: { status: "FAILED" } },
    );
    throw error;
  }
};

module.exports = {
  generateQuizAI,
  ScanPDFAI,
  LessonNormalized,
};
