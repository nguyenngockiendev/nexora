const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
} = require("../../Middleware/Middleware");
const {
  CreateExamBankController,
  GetExamsByCourseController,
  GetExamDetailController,
  DeleteExamController,
  SyncFocusExamController,
  GetDedupExamController,
  GetFocusExamController,
} = require("./exam-bank.controller");

Router.post(
  "/exam-bank/create",
  authMiddleware,
  checkRole("admin"),
  CreateExamBankController,
);
Router.get(
  "/exam-bank/:courseId",
  authMiddleware,
  checkRole("admin", "instructor", "student"),
  GetExamsByCourseController,
);
Router.get(
  "/exam-bank/detail/:examId",
  authMiddleware,
  checkRole("admin", "instructor", "student"),
  GetExamDetailController,
);
Router.delete(
  "/exam-bank/:examId",
  authMiddleware,
  checkRole("admin"),
  DeleteExamController,
);
Router.post(
  "/exam-bank/focus/sync/:courseId",
  authMiddleware,
  checkRole("admin", "instructor", "student"),
  SyncFocusExamController,
);
Router.post(
  "/exam-bank/dedup/:courseId",
  authMiddleware,
  checkRole("admin", "instructor", "student"),
  GetDedupExamController,
);
Router.get(
  "/exam-bank/focus/:courseId",
  authMiddleware,
  checkRole("admin", "instructor", "student"),
  GetFocusExamController,
);

module.exports = Router;
