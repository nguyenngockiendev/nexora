const ExamBank = require("../model/ExamBank");
const FocusExam = require("../model/FocusExam");
const Courses = require("../model/Courses");
const Enrollment = require("../model/Enrollments");
const DedupExam = require("../model/DedupExam");
const createExamBank = async ({ courseId, title, questions }) => {
  if (!courseId) {
    throw { status: 400, message: "Thiếu courseId!" };
  }
  if (!title || !title.trim()) {
    throw { status: 400, message: "Tiêu đề bộ đề không được để trống!" };
  }
  if (!Array.isArray(questions) || questions.length === 0) {
    throw { status: 400, message: "Bộ đề phải có ít nhất 1 câu hỏi!" };
  }

  const course = await Courses.findById(courseId);
  if (!course) {
    throw { status: 404, message: "Không tìm thấy khóa học!" };
  }

  const newExam = await ExamBank.create({
    courseId,
    title: title.trim(),
    questions,
  });

  return newExam;
};

const getExamsByCourse = async (courseId) => {
  if (!courseId) {
    throw { status: 400, message: "Thiếu courseId!" };
  }
  const exams = await ExamBank.find({ courseId })
    .select("title createdAt updatedAt questions")
    .sort({ createdAt: -1 });

  return exams.map((exam) => ({
    _id: exam._id,
    title: exam.title,
    questionCount: exam.questions?.length || 0,
    createdAt: exam.createdAt,
    updatedAt: exam.updatedAt,
  }));
};

const getExamDetail = async (examId) => {
  if (!examId) {
    throw { status: 400, message: "Thiếu examId!" };
  }
  const exam = await ExamBank.findById(examId);
  if (!exam) {
    throw { status: 404, message: "Không tìm thấy đề thi!" };
  }
  return exam;
};

const deleteExam = async (examId) => {
  if (!examId) {
    throw { status: 400, message: "Thiếu examId!" };
  }
  const exam = await ExamBank.findByIdAndDelete(examId);
  if (!exam) {
    throw { status: 404, message: "Đề thi không tồn tại hoặc đã bị xóa!" };
  }
  return exam;
};

const normalizeQuestionText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’“”]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const getDedupExam = async (data) => {
  try {
   
    const totalExambank = await ExamBank.find({ courseId: data.courseId });
    if (totalExambank.length === 0) {
      throw { status: 404, message: "Khóa học này chưa tồn tại đề nào!" };
    }
    const newDedup = new Map();
    for (const exmabankitem of totalExambank) {
      if (!Array.isArray(exmabankitem.questions)) continue;
      for (const item of exmabankitem.questions) {
        const keys = normalizeQuestionText(item.question);
        if (!keys) continue;

        if (newDedup.has(keys)) {
          const existing = newDedup.get(keys);
          const isExist = existing.sources.some(
            (s) => s.examId.toString() === exmabankitem._id.toString()
          );
          if (!isExist) {
            existing.sources.push({
              examId: exmabankitem._id,
              title: exmabankitem.title,
            });
          }
          if (!existing.explanation && item.explanation) {
            existing.explanation = item.explanation;
          }
        } else {
          newDedup.set(keys, {
            question: item.question,
            options: item.options,
            correctAnswer: item.correctAnswer,
            explanation: item.explanation || "",
            sources: [
              {
                examId: exmabankitem._id,
                title: exmabankitem.title,
              },
            ],
          });
        }
      }
    }
    const arr = Array.from(newDedup.values());
    const updateDedup = await DedupExam.findOneAndUpdate(
      {
        courseId: data.courseId,
      },
      {
        courseId: data.courseId,
        totalExamsAnalyzed: totalExambank.length,
        totalQuestions: arr.length,
        questions: arr,
      },
      {
        upsert: true,
        new: true,
      },
    );
    return updateDedup;
  } catch (error) {
    throw error;
  }
};
const syncFocusExam = async (courseId) => {
  if (!courseId) {
    throw { status: 400, message: "Thiếu courseId!" };
  }

  const exams = await ExamBank.find({ courseId });
  if (!exams || exams.length === 0) {
    return {
      message: "Chưa có đề thi nào trong kho để tổng hợp!",
      totalExamsAnalyzed: 0,
      questions: [],
    };
  }
  const questionMap = new Map();

  for (const exam of exams) {
    if (!Array.isArray(exam.questions)) continue;

    for (const q of exam.questions) {
      const key = normalizeQuestionText(q.question);
      if (!key) continue;

      if (questionMap.has(key)) {
        const existing = questionMap.get(key);
        existing.repeatCount += 1;
        if (
          (!existing.explanation || existing.explanation.length < 5) &&
          q.explanation
        ) {
          existing.explanation = q.explanation;
        }
      } else {
        questionMap.set(key, {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "",
          repeatCount: 1,
        });
      }
    }
  }

  const allAggregated = Array.from(questionMap.values());

  const arrQuesionfoucus = allAggregated.sort(
    (a, b) => b.repeatCount - a.repeatCount,
  );

  const top60 = arrQuesionfoucus.slice(0, 60);

  const updatedFocus = await FocusExam.findOneAndUpdate(
    { courseId },
    {
      courseId,
      totalExamsAnalyzed: exams.length,
      questions: top60,
    },
    { upsert: true, new: true },
  );

  return updatedFocus;
};

const getFocusExam = async (courseId) => {
  if (!courseId) {
    throw { status: 400, message: "Thiếu courseId!" };
  }
  const focus = await FocusExam.findOne({ courseId });
  return focus || { totalExamsAnalyzed: 0, questions: [] };
};

module.exports = {
  createExamBank,
  getExamsByCourse,
  getExamDetail,
  deleteExam,
  syncFocusExam,
  getFocusExam,
  getDedupExam,
};
