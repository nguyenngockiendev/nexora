const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");

const errollment = require("../model/Enrollments");

const quizz = require("../model/Quizz");
const attempQuizz = require("../model/QuizAttempts");
const Quizz = require("../model/Quizz");
const QuizAttempts = require("../model/QuizAttempts");
const AssignmentSubmissions = require("../model/AssignmentSubmissions");
const Assignments = require("../model/Assignments");

const CreateQuizByIntructor = async (data) => {
  try {
    if (data?.role !== "instructor" && data?.role !== "admin") {
      throw { status: 403, message: "Bạn không có quyền tạo bài kiểm tra!" };
    }

    const checkLession = await Lessons.findById(data?.lessonId);
    if (!checkLession) {
      throw { status: 404, message: "Bài học không tồn tại!" };
    }

    const isOwner = await Courses.findOne({
      _id: checkLession.courseId,
      instructor: data.userId,
    });
    if (!isOwner) {
      throw {
        status: 403,
        message:
          "Bạn không có quyền tạo bài kiểm tra cho khóa học của giảng viên khác!",
      };
    }

    const resultForm = {
      ...data,
      status: "draft",
      courseId: checkLession.courseId,
    };
    const result = await quizz(resultForm).save();

    if (!result) {
      throw { status: 400, message: "Tạo bài kiểm tra thất bại!" };
    }
    return { result: result, message: "Tạo bài kiểm tra thành công!" };
  } catch (error) {
    throw error;
  }
};

const GetQuizzById = async (data) => {
  try {
    const res = await quizz
      .findOne({ lessonId: data.lessonId })
      .populate("courseId", "title")
      .lean();
    if (!res) {
      throw { status: 404, message: "Bài học này chưa có bài kiểm tra!" };
    }

    if (data.role === "instructor" || data.role === "admin") {
      return res;
    }

    return {
      ...res,
      questions: res.questions.map(
        ({ correctAnswer, explanation, ...rest }) => rest,
      ),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateQuizzbyIntructor = async (data) => {
  try {
    if (data?.role !== "instructor" && data?.role !== "admin") {
      throw {
        status: 403,
        message: "Bạn không có quyền chỉnh sửa bài kiểm tra!",
      };
    }
    const checkLession = await Lessons.findById(data?.lessonId);
    if (!checkLession) {
      throw { status: 404, message: "Bài học không tồn tại!" };
    }

    const isOwner = await Courses.findOne({
      _id: checkLession.courseId,
      instructor: data.userId,
    });
    if (!isOwner) {
      throw {
        status: 403,
        message:
          "Bạn không có quyền chỉnh sửa bài kiểm tra của giảng viên khác!",
      };
    }

    const update = await quizz.findOneAndUpdate(
      { lessonId: data?.lessonId },
      {
        ...data,
        courseId: checkLession?.courseId,
        status: "draft",
      },
      { new: true },
    );
    return { message: "Cập nhật bài kiểm tra thành công!", result: update };
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

    const isErronment = await errollment.findOne({
      userId: data.id,
      courseId: quiz.courseId,
      status: "active",
    });
    if (!isErronment) {
      throw { status: 404, message: "Bạn chưa đăng ký khóa học này!" };
    }
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
    const IsExitAttemps = await QuizAttempts.findOne({
      lessonId: data.lessonId,
      studentId: data.id,
    });
    if (IsExitAttemps) {
      const result = {
        answers,
        score: correctCount,
        totalQuestions: quiz.questions.length,
        correctAnswers: corecanwser,
        timeTaken: data.timeTaken,
        status: "submitted",
      };
      const update = await QuizAttempts.findByIdAndUpdate(
        IsExitAttemps._id,
        result,
        {
          new: true,
        },
      );
      return update;
    }
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
      status: "submitted",
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
    const listCourse = await Courses.find({
      instructor: data.userId,
      type: "recorded",
    });
    if (!listCourse) {
      throw {
        status: 404,
        message:
          "khóa học không tồn tại! Bạn hãy tạo bài học trước rồi mới tạo Quiz nhé ",
      };
    }
    const courseIds = listCourse.map((c) => c._id);
    const listLession = await Lessons.find({
      courseId: { $in: courseIds },
    })
      .select("title status duration type")
      .populate("courseId", "title")
      .lean();
    if (listLession.length === 0) {
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

const GetAssessments = async (data) => {
  try {
    if (data.role === "student") {
      throw { status: 404, message: "Không đủ quyền!" };
    }
    const Courseid = await Courses.find({ instructor: data.userId }).distinct(
      "_id",
    );
    const myAssignmentIds = await Assignments.find({
      instructorId: data.userId,
    }).distinct("_id");
    const totalQuizz = await Quizz.countDocuments({
      courseId: { $in: Courseid },
    });

    const completeQuiz = await QuizAttempts.countDocuments({
      courseId: { $in: Courseid },
      status: "submitted",
    });

    const pendingAssignments = await AssignmentSubmissions.countDocuments({
      assignmentId: { $in: myAssignmentIds },
      status: "pending",
    });

    const gradedAssignments = await AssignmentSubmissions.countDocuments({
      assignmentId: { $in: myAssignmentIds },
      status: "graded",
    });

    const totalAssignments = myAssignmentIds.length;
    const totalTests = totalQuizz + totalAssignments;
    const completedGraded = completeQuiz + gradedAssignments;

    const totalSubmissions = completedGraded + pendingAssignments;
    const percen =
      totalSubmissions > 0
        ? Math.round((completedGraded / totalSubmissions) * 100)
        : 100;

    const finalResult = {
      totalTests: totalTests,
      completedGraded: completedGraded,
      gradedPercent: percen,
      pendingManual: pendingAssignments,
      totalQuizzes: totalQuizz,
      totalAssignments: totalAssignments,
    };
    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const TrackingQuizz = async (data) => {
  try {
    if (data.role === "student") {
      throw { status: 403, message: "Không đủ quyền!" };
    }
    const IsexitCour = await Courses.findOne({
      _id: data.courseId,
      instructor: data.userId,
    });
    if (!IsexitCour) {
      throw { status: 404, message: "Bạn không có quyền vào nguồn này!" };
    }

    const quizzes = await Quizz.find({
      courseId: data.courseId,
    })
      .populate("lessonId", "title")
      .lean();

    if (!quizzes || quizzes.length === 0) {
      return [];
    }

    const quizIds = quizzes.map((q) => q._id);
    const attempts = await QuizAttempts.find({
      quizId: { $in: quizIds },
    })
      .populate("studentId", "name email avatar")
      .lean();

    const attemptsByQuizId = {};
    attempts.forEach((item) => {
      const qId = item.quizId ? item.quizId.toString() : null;
      if (!qId) return;
      if (!attemptsByQuizId[qId]) {
        attemptsByQuizId[qId] = [];
      }

      const student = item.studentId || {};
      attemptsByQuizId[qId].push({
        _id: item._id,
        student: {
          _id: student._id,
          name: student.name || "Học viên",
          email: student.email || "",
          avatar: student.avatar || "",
        },
        score: item.score,
        timeTaken: item.timeTaken,
        createdAt: item.createdAt,
        status: item.status,
        retakeCount: item.retakeCount || 0,
        answers: (item.answers || []).map((answer) => ({
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          isCorrect: answer.isCorrect,
        })),
      });
    });

    const finalResult = quizzes.map((quiz) => {
      const lesson = quiz.lessonId || {};
      const qIdStr = quiz._id.toString();
      const quizAttempts = attemptsByQuizId[qIdStr] || [];

      return {
        _id: quiz._id,
        lessonId: lesson._id,
        quizId: quiz._id,
        courseId: quiz.courseId,
        lessonTitle: lesson.title || "Bài học",
        title: quiz.title || lesson.title || "Bài Kiểm Tra",
        duration: quiz.duration || 15,
        passScore: quiz.passScore ?? 7.0,
        questions: (quiz.questions || []).map((question) => ({
          _id: question._id,
          questionText: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        })),
        attempts: quizAttempts,
      };
    });

    return finalResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateAttempQuizz = async (data) => {
  try {
    const IsexitCour = await Courses.findOne({
      _id: data.courseId,
      instructor: data.userId,
    });
    if (!IsexitCour) {
      throw { status: 404, message: "Bạn không có quyền vào nguồn này!" };
    }
    const isRetake = await QuizAttempts.findOne({
      _id: data.quizattempsId,
      status: "retake",
    });
    if (isRetake) {
      throw { status: 400, message: "Bài kiểm tra này đang cho làm lại!" };
    }
    const update = await QuizAttempts.findByIdAndUpdate(
      data.quizattempsId,
      {
        status: "retake",
        $inc: { retakeCount: 1 },
      },
      { new: true },
    );
    return update;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateAttempQuizzAll = async (data) => {
  try {
    const isExitAttemps = await QuizAttempts.findOne({ quizId: data.quizId });
    if (!isExitAttemps) {
      throw { status: 404, message: "Không tìm thấy bài kiểm tra!" };
    }
    const IsexitCour = await Courses.findOne({
      _id: isExitAttemps.courseId,
      instructor: data.userId,
    });
    if (!IsexitCour) {
      throw { status: 404, message: "Bạn không có quyền vào nguồn này!" };
    }

    if (isExitAttemps.status === "retake") {
      throw {
        status: 400,
        message: "Đang có học sinh trong trạng thái thi lại chưa nộp bài!",
      };
    }
    const update = await QuizAttempts.updateMany(
      { quizId: data.quizId },
      {
        status: "retake",
        $inc: { retakeCount: 1 },
      },
      { new: true },
    );
    return update;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  UpdateAttempQuizz,
  UpdateAttempQuizzAll,
  TrackingQuizz,
  GetAssessments,
  CreateQuizByIntructor,
  GetQuizzById,
  UpdateQuizzbyIntructor,
  CreateAttempQuiz,
  GetAttempsQuiz,
  GetCourse,
  GetQuizzbyStudent,
};
