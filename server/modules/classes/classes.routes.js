const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
  createLimiter,
} = require("../../Middleware/Middleware");
const {
  CreateClass,
  GetclassbyId,
  UpdateClass,
  ChangeStatus,
  GetClass,
  DetaiCourseClass,
  SumbitAssignment,
  GetAssesmentClass,
  GradeAssignments,
  GetAllLiveClasses,
  GetTrackingAssignments,
  GradeAssignmentSubmission,
} = require("./classes.controller");
const { SenMessLimit } = require("./messages.controller");
const upload = require("../../Middleware/Uploadfile");

Router.post(
  "/create-class/:courseId",
  authMiddleware,
  checkRole("instructor"),
  CreateClass,
);
Router.get(
  "/get-class-by-instructor/:courseId",
  authMiddleware,
  checkRole("instructor"),
  GetclassbyId,
);
Router.put(
  "/classes/:classId",
  authMiddleware,
  checkRole("admin", "instructor"),
  UpdateClass,
);
Router.put(
  "/change/status/:classId",
  authMiddleware,
  checkRole("admin", "instructor"),
  ChangeStatus,
);
Router.get("/get-class/:classId", authMiddleware, GetClass);
Router.get("/details-class/:courseId", authMiddleware, DetaiCourseClass);
Router.get(
  "/sendMessage/:classId",
  authMiddleware,
  createLimiter(20, 1, true),
  SenMessLimit,
);
Router.put(
  "/create_Ass/:classId",
  authMiddleware,
  checkRole("instructor", "admin"),
  upload.single("fileAss"),
  SumbitAssignment,
);
Router.get("/Assesment_Class/:classId", authMiddleware, GetAssesmentClass);
Router.put(
  "/Assesment_sumbit/:classId",
  authMiddleware,
  checkRole("student"),
  upload.single("fileAss"),
  GradeAssignments,
);
Router.get(
  "/instructor/live-classes",
  authMiddleware,
  checkRole("instructor", "admin"),
  GetAllLiveClasses,
);
Router.get(
  "/instructor/assignments-tracking/:classId",
  authMiddleware,
  checkRole("instructor", "admin"),
  GetTrackingAssignments,
);
Router.patch(
  "/instructor/grade-submission/:submissionId",
  authMiddleware,
  checkRole("instructor", "admin"),
  GradeAssignmentSubmission,
);

module.exports = Router;
