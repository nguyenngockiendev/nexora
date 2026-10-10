const {
  AuthController,
  RegisterController,
  SenOtpController,
  LoginByGoogleController,
  forgotPasswordController,
} = require("../controller/auth-controller");
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
} = require("../controller/class-manager-controller");
const {
  GetAllCourese,
  CreateCourses,
  GetLessonByIdcontroller,
  DetailsCourse,
  ManagerCourse,
  IsLookedCourseAndLession,
  GetCoursesforevery,
  UpdateCourse,
} = require("../controller/course-controller");
const {
  payment,
  ResumePay,
  DeleteOrderbyUser,
  GetHistoryByadmin,
  sepayCallback,
  VoucherPreview,
} = require("../controller/payment-controller");
const {
  Getorderbyuser,
  Getcheckenrollment,
  GetOrderHistory,
} = require("../controller/enrollments-controller");
const {
  GetLessons,
  CreateLessons,
  DeleteLession,
  UpdateLession,
  getLessionbyIntructor,
  GetCoursewithLession,
  GetLessionDetails,
} = require("../controller/lession-controller");
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
} = require("../controller/quiz-controller");
const {
  GetAlluser,
  GetUser,
  ChangeStatusUser,
  UpdateRole,
  GetStudentOnClasss,
  RemoveStudent,
  RefectStudent,
  BecomeInstructor,
  ResInstructor,
  GetPendingRequests,
  GetUserInfor,
  ChangeUserProfile,
  ChangePassWord,
} = require("../controller/user-controllsers");
const {
  GetInstructorBusinessDashboard,
  DashboartforAdmin,
  GetClassSesion,
} = require("../controller/dashboard-controller");

const {
  authMiddleware,
  createLimiter,
  checkRole,
} = require("../Middleware/Middleware");

const upload = require("../Middleware/Uploadfile");
const { validateCourse } = require("../Middleware/Validateform");
const {
  SaveProcess,
  GetProcess,
  GetAllProcess,
  Getrecenlession,
  GetDashboartfostudent,
} = require("../controller/Process-controller");
const { SenMessLimit } = require("../controller/message-controller");
const { ResumePayment } = require("../service/payment-service");
const {
  CreateAndUpdateRating,
  GetRating,
  DeleteRatingByuser,
} = require("../controller/rating-controller");
const { GenerateQuizAI } = require("../controller/AIgenerete");
const {
  ReplybyAdmin,
  GetAllNotifi,
  GetNotifiByUser,
  UsertSendNotifi,
} = require("../controller/Notification-controller");
const {
  CreatenewVoucher,
  getVoucger,
  updateVoucher,
  updatesStatusVou,
  deleteVou,
} = require("../controller/voucher-controller");

const Router = require("express").Router();

Router.post("/login", createLimiter(10, 5), AuthController);
Router.post(
  "/register",
  createLimiter(3, 5),
  upload.single("avatar"),
  RegisterController,
);
Router.post("/send_otp", createLimiter(3, 1), SenOtpController);
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
Router.get("/lession/:id", authMiddleware, GetLessons);
Router.post(
  "/create_lession",
  authMiddleware,
  checkRole("admin", "instructor"),
  upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "resourcesurl", maxCount: 1 },
  ]),
  CreateLessons,
);
Router.delete(
  `/delete_lession/:id`,
  authMiddleware,
  checkRole("admin", "instructor"),
  DeleteLession,
);
Router.put(
  `/update_lession/:lessionId`,
  authMiddleware,
  checkRole("admin", "instructor"),
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "resourcesurl", maxCount: 1 },
  ]),
  UpdateLession,
);
Router.get(
  `/get_lessionbyupdate/:lessionId`,
  authMiddleware,
  checkRole("admin", "instructor"),
  getLessionbyIntructor,
);

Router.put(
  "/create-payment",
  authMiddleware,
  createLimiter(5, 5, true),
  payment,
);

Router.post("/payment/sepay-webhook", sepayCallback);
Router.get("/enrollments", authMiddleware, Getorderbyuser);
Router.get("/courses/:courseId/lession", authMiddleware, Getcheckenrollment);
Router.post(
  "/create-class/:courseId",
  authMiddleware,
  checkRole("admin", "instructor"),
  CreateClass,
);
Router.get(
  "/get-class-by-instructor/:courseId",
  authMiddleware,
  checkRole("admin", "instructor"),
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

Router.get("/admin/users", authMiddleware, checkRole("admin"), GetAlluser);
Router.get("/admin/users/:userId", authMiddleware, checkRole("admin"), GetUser);
Router.patch(
  "/admin/users/:userId/status",
  authMiddleware,
  checkRole("admin"),
  ChangeStatusUser,
);
Router.patch(
  "/admin/users/:userId/role",
  authMiddleware,
  checkRole("admin"),
  UpdateRole,
);

Router.get(
  "/instructor/classes/:classId/students",
  authMiddleware,
  checkRole("instructor", "admin"),
  GetStudentOnClasss,
);
Router.patch(
  "/instructor/classes/:classId/students/:studentId",
  authMiddleware,
  checkRole("instructor", "admin"),
  RemoveStudent,
);
Router.patch(
  "/instructor/refect-classes/:classId/students/:studentId",
  authMiddleware,
  checkRole("instructor", "admin"),
  RefectStudent,
);
Router.get(
  "/instructor/dashboard/business",
  authMiddleware,
  checkRole("instructor"),
  GetInstructorBusinessDashboard,
);

//////
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
////
Router.patch(
  "/process-lesson/:courseId/:lessonId",
  authMiddleware,
  SaveProcess,
);
Router.get("/process/:lessonId", authMiddleware, GetProcess);
Router.get("/process/course/:courseId", authMiddleware, GetAllProcess);
(Router.get(
  "/sendMessage/:classId",
  authMiddleware,
  createLimiter(20, 1, true),
  SenMessLimit,
),
  Router.get("/order_history", authMiddleware, GetOrderHistory));

Router.put(
  "/resume-payment/:orderId",

  authMiddleware,
  createLimiter(5, 5, true),
  ResumePay,
);
Router.delete("/delete-order/:orderId", authMiddleware, DeleteOrderbyUser);
Router.get("/details-course/:courseId", authMiddleware, DetailsCourse);
Router.post(
  "/become-instructor",
  authMiddleware,
  checkRole("student"),
  upload.single("proofImage"),
  BecomeInstructor,
);
Router.put(
  "/res-instructor",
  authMiddleware,
  checkRole("admin"),
  ResInstructor,
);
Router.get(
  "/admin/teacher-requests",
  authMiddleware,
  checkRole("admin"),
  GetPendingRequests,
);
///rating

Router.post(
  "/courses/:courseId/ratings",

  authMiddleware,
  createLimiter(10, 3, true),
  CreateAndUpdateRating,
);
Router.get("/courses/:courseId/ratings", GetRating);
Router.delete("/ratings/:ratingId", authMiddleware, DeleteRatingByuser);
Router.get(
  "/generate/:lessionId/quizz",

  authMiddleware,
  checkRole("instructor", "admin"),
  createLimiter(3, 3, true),
  GenerateQuizAI,
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
Router.get(
  "/instructor/recorded-courses",
  authMiddleware,
  checkRole("instructor", "admin"),
  GetCoursewithLession,
);
Router.get("/lessions/:courseId", authMiddleware, GetLessionDetails);
Router.get(
  "/admin/courses/quality-control",
  authMiddleware,
  checkRole("admin"),
  ManagerCourse,
);
Router.get(
  "/admin/history",
  authMiddleware,
  checkRole("admin"),
  GetHistoryByadmin,
);

Router.get("/user/information", authMiddleware, GetUserInfor);

Router.patch(
  "/admin/courses/:courseId/status",
  authMiddleware,
  checkRole("admin"),
  IsLookedCourseAndLession,
);
Router.put(
  "/user_update/profile",
  authMiddleware,
  upload.single("avatar"),
  ChangeUserProfile,
);

Router.patch("/user_change_pass", authMiddleware, ChangePassWord);

Router.post("/User_send", authMiddleware, UsertSendNotifi);
Router.post(
  "/admin/Notification/:receiverId",
  authMiddleware,
  checkRole("admin"),
  ReplybyAdmin,
);
Router.get("/admin/getAll", authMiddleware, checkRole("admin"), GetAllNotifi);
Router.get("/user_getNotification", authMiddleware, GetNotifiByUser);
Router.get("/user_recentlesson", authMiddleware, Getrecenlession);
Router.get(
  "/Student_Dashboart",
  authMiddleware,
  checkRole("student"),
  GetDashboartfostudent,
);
Router.put(
  "/update_course/:courseId",
  authMiddleware,
  checkRole("admin", "instructor"),
  upload.single("thumbnail"),
  UpdateCourse,
);
Router.get(
  "/admin_dashboart",
  authMiddleware,
  checkRole("admin"),
  DashboartforAdmin,
);
Router.get("/Classion", authMiddleware, GetClassSesion);
Router.put(
  "/create_Ass/:classId",
  authMiddleware,
  checkRole("student"),
  upload.single("fileAss"),
  SumbitAssignment,
);
Router.get("/Assesment_Class/:classId", authMiddleware, GetAssesmentClass);
Router.put(
  "/Assesment_sumbit/:classId",
  authMiddleware,
  checkRole("instructor", "admin"),
  upload.single("fileAss"),
  GradeAssignments,
);
Router.get("/Assessment", authMiddleware, GetAssessmentHubData);
Router.get("/result_quizz/:courseId", authMiddleware, GetResultQuizz);
Router.patch(
  "/update_status_Quizz/:quizattempsId",
  authMiddleware,
  RetakeQuizz,
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
////
Router.post(
  "/vouchers",
  authMiddleware,
  checkRole("admin", "instructor"),
  CreatenewVoucher,
);
Router.get(
  "/vouchers",
  authMiddleware,
  checkRole("admin", "instructor"),
  getVoucger,
);
Router.put(
  "/vouchers/:vouchersid",
  authMiddleware,
  checkRole("admin", "instructor"),
  updateVoucher,
);
Router.patch(
  "/vouchers/:vouchersid/status",
  authMiddleware,
  checkRole("admin", "instructor"),
  updatesStatusVou,
);
Router.delete(
  "/vouchers/:vouchersid",
  authMiddleware,
  checkRole("admin", "instructor"),
  deleteVou,
);
Router.patch(
  "/retake_quizz/:quizId/all",
  authMiddleware,
  checkRole("admin", "instructor"),
  UpdateQuizzAll,
);
Router.post(
  "/vouchers_preview",
  createLimiter(10, 5),
  authMiddleware,
  VoucherPreview,
);
Router.post("/login_google", createLimiter(3, 5), LoginByGoogleController);
Router.post("/forgot-password", createLimiter(3, 10), forgotPasswordController);
module.exports = Router;
