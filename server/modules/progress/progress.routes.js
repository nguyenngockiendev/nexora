const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
} = require("../../Middleware/Middleware");
const {
  SaveProcess,
  GetProcess,
  GetAllProcess,
  Getrecenlession,
  GetDashboartfostudent,
} = require("./progress.controller");

Router.patch(
  "/process-lesson/:courseId/:lessonId",
  authMiddleware,
  checkRole("student"),
  SaveProcess,
);
Router.get("/process/:lessonId", authMiddleware, checkRole("student"), GetProcess);
Router.get("/process/course/:courseId", authMiddleware, checkRole("student"), GetAllProcess);
Router.get("/user_recentlesson", authMiddleware, Getrecenlession);
Router.get(
  "/Student_Dashboart",
  authMiddleware,
  checkRole("student"),
  GetDashboartfostudent,
);

module.exports = Router;
