const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
  createLimiter,
} = require("../../Middleware/Middleware");
const {
  CreateQuiz,
  GetQuizzByLession,
  UpdateQuizz,
  CreateAttemp,
  GetCourseForQuizz,
  GetQuizBystuden,
  GetAssessmentHubData,
  GetResultQuizz,
  RetakeQuizz,
  UpdateQuizzAll,
} = require("./quizzes.controller");

Router.post(
  "/create_quizz/:lessionId",
  authMiddleware,
  checkRole("instructor", "admin"),
  CreateQuiz,
);
Router.get("/get_quizz/:lessonId", authMiddleware, GetQuizzByLession);
Router.put(
  "/upadate_quizz/:lessonId",
  authMiddleware,
  checkRole("instructor", "admin"),
  UpdateQuizz,
);
Router.post(
  "/create_attemp/quizz/:lessonId",

  authMiddleware,

  checkRole("student"),
  createLimiter(10, 5, true),
  CreateAttemp,
);
Router.get(
  "/instructor/courses-with-lessons",
  authMiddleware,
  checkRole("instructor", "admin"),
  GetCourseForQuizz,
);
Router.get(
  "/student/quizzes",
  authMiddleware,
  checkRole("student"),
  GetQuizBystuden,
);
Router.get("/Assessment", authMiddleware, checkRole("instructor", "admin"), GetAssessmentHubData);
Router.get("/result_quizz/:courseId", authMiddleware, checkRole("instructor", "admin"), GetResultQuizz);
Router.patch(
  "/update_status_Quizz/:quizattempsId",
  authMiddleware,
  RetakeQuizz,
);
Router.patch(
  "/retake_quizz/:quizId/all",
  authMiddleware,
  checkRole("admin", "instructor"),
  UpdateQuizzAll,
);

module.exports = Router;
