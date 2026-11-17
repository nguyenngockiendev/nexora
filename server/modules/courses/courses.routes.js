const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
} = require("../../Middleware/Middleware");
const {
  GetAllCourese,
  GetCoursesforevery,
  CreateCourses,
  GetLessonByIdcontroller,
  DetailsCourse,
  ManagerCourse,
  IsLookedCourseAndLession,
  UpdateCourse,
} = require("./courses.controller");
const {
  validateCourse,
} = require("../../Middleware/Validateform");
const upload = require("../../Middleware/Uploadfile");

Router.get("/courses", authMiddleware, GetAllCourese);
Router.get("/courses_all", authMiddleware, GetCoursesforevery);
Router.post(
  "/newcourses",
  authMiddleware,
  checkRole("admin", "instructor"),
  upload.single("thumbnail"),
  validateCourse,
  CreateCourses,
);
Router.get("/get_lession/:id", authMiddleware, GetLessonByIdcontroller);
Router.get("/details-course/:courseId", authMiddleware, DetailsCourse);
Router.get(
  "/admin/courses/quality-control",
  authMiddleware,
  checkRole("admin"),
  ManagerCourse,
);
Router.patch(
  "/admin/courses/:courseId/status",
  authMiddleware,
  checkRole("admin"),
  IsLookedCourseAndLession,
);
Router.put(
  "/update_course/:courseId",
  authMiddleware,
  checkRole("admin", "instructor"),
  upload.single("thumbnail"),
  UpdateCourse,
);

module.exports = Router;
