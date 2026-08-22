const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const user = require("../model/Users");
const classs = require("../model/Class");
const quizz = require("../model/Quizz");
const attempQuizz = require("../model/QuizAttempts");

const converttimeP = (time = "00:00") => {
  const [h, p] = time.split(":").map(Number);
  return h * 60 + p;
};
const converTimeH = (time) => {
  const hour = Math.floor(time / 60);
  const minute = time % 60;

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};
const CreateQuizByIntructor = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 404, message: "you not have auth!" };
    }

    const checkLession = await Lessons.findById(data?.lessonId);
    const resultForm = {
      ...data,
      status: "draft",
      courseId: checkLession.courseId,
    };
    const result = await quizz(resultForm).save();
    if (!checkLession) {
      throw { status: 400, message: "not found!" };
    }

    if (!result) {
      throw { status: 404, message: "create quizz failed!" };
    }
    return { result: result, message: "Create successfuly!" };
  } catch (error) {
    throw error;
    console.log(error);
  }
};

const GetQuizzById = async (data) => {
  try {
    const res = await quizz
      .findOne({ lessonId: data.lessonId })
      .select("-__v")
      .populate("courseId", "title")
      .lean();
    if (!res) {
      throw { status: 404, message: "not have quizz!" };
    }
    const result = {
      ...res,
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateQuizzbyIntructor = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 404, message: "you not have auth!" };
    }
    const checkLession = await Lessons.findById(data?.lessonId);
    const update = await quizz.findOneAndUpdate(
      { lessonId: data?.lessonId },

      {
        ...data,
        courseId: checkLession?.courseId,
        status: "draft",
      },
      { new: true },
    );
    return { message: "Cập nhật thành công!", result: update };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CreateAttempQuiz = async (data) => {
  try {
    const quiz = await quizz.findOne({ lessonId: data.lessonId });

    const ids = Object.keys(data.answers);

    const questions = quiz.questions.filter((question) =>
      ids.includes(question._id.toString()),
    );

    let correctCount = 0;
    let corecanwser = 0;
    const poin = 10 / quiz.questions.length;
    const answers = questions.map((question) => {
      const selectedAnswer = data.answers[question._id.toString()];
      const isCorrect = selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        corecanwser++;
        correctCount += poin;
      }

      return {
        questionId: question._id,
        selectedAnswer,
        correctAnswer: question.correctAnswer ?? 0,
        isCorrect,
      };
    });

    const result = {
      lessonId: data.lessonId,
      studentId: data.id,
      quizId: quiz._id,
      courseId: quiz.courseId,
      classId: null,

      answers,

      score: correctCount,
      totalQuestions: quiz.questions.length,
      correctAnswers: corecanwser,
      timeTaken: data.timeTaken,
    };

    const attempsId = await new attempQuizz(result).save();

    return attempsId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetAttempsQuiz = async ({ studentId, attempsId, lessonId }) => {
  try {
    const attepms = await attempQuizz
      .findOne({ studentId, lessonId, _id: attempsId })
      .populate("quizId", "passScore")
      .select("-__v")
      .lean();

    if (!attepms) {
      throw { status: 404, message: "you not have Attemps.will do quizz!" };
    }
    let pass = false;
    if (attepms.score >= attepms.quizId.passScore) {
      pass = true;
    }
    return { attepms: attepms, pass: pass };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetCourse = async (data) => {
  try {
    if (data.role === "student") {
      throw { status: 404, message: "không có quyền!" };
    }
    const listCourse = await Courses.findOne({
      instructor: data.userId,
    });
    if (!listCourse) {
      throw {
        status: 404,
        message:
          "khóa học không tồn tại! Bạn hãy tạo bài học trước rồi mới tạo Quiz nhé ",
      };
    }
    const listLession = await Lessons.find()
      .select("title status duration type")
      .populate("courseId", "title")
      .lean();
    if (listCourse.length === 0) {
      throw { status: 404, message: "bài học không tồn tại" };
    }
    return listLession;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetQuizzbyStudent = async (data) => {
  try {
    const listQuiz = await errollment
      .find({
        userId: data.userId,
      })
      .populate({
        path: "courseId",
        select: "title",
        populate: {
          path: "instructor",
          select: "name",
        },
      })
      .lean();
    const arr = await Promise.all(
      listQuiz.map(async (item) => {
        const course = item.courseId;
        if (!course) return null;

        const less = await Lessons.find({ courseId: course._id })
          .select("title")
          .lean();

        return {
          course: course,
          lession: less,
          Quizz: await Promise.all(
            less.map(async (e) => {
              const quiz = await quizz
                .findOne({ lessonId: e._id })
                .select("title duration passScore")
                .lean();
              if (!quiz) return null;
              const Attemps = await attempQuizz
                .findOne({ quizId: quiz._id, studentId: data.userId })
                .sort({ createdAt: -1 })
                .select("score status")
                .lean();
              return { quiz: quiz, Attemps: Attemps };
            }),
          ),
        };
      }),
    );
    const finalResult = arr.filter(Boolean).flatMap((item) => {
      if (!item || !item.lession || item.lession.length === 0) return [];
      return item.lession
        .map((lesson, index) => {
          const quizDetail = item.Quizz?.[index];
          if (!quizDetail) return null;
          let status = "NOT_STARTED";
          if (quizDetail.Attemps && quizDetail.Attemps.score !== undefined) {
            status =
              quizDetail.Attemps.score >= quizDetail.quiz.passScore
                ? "PASSED"
                : "FAILED";
          }

          return {
            courseId: item.course._id,
            courseTitle: item.course.title,
            instructorName: item.course.instructor?.name || "",
            lessonId: lesson._id,
            lessonTitle: lesson.title,
            quizId: quizDetail.quiz._id,
            quizTitle: quizDetail.quiz.title,
            duration: quizDetail.quiz.duration,
            passScore: quizDetail.quiz.passScore,
            status: status,
            lastAttempt: quizDetail.Attemps || null,
          };
        })
        .filter(Boolean);
    });
    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  CreateQuizByIntructor,
  GetQuizzById,
  UpdateQuizzbyIntructor,
  CreateAttempQuiz,
  GetAttempsQuiz,
  GetCourse,
  GetQuizzbyStudent,
};
