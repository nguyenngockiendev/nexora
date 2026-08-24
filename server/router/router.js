const {
  AuthController,
  RegisterController,
  ResetPasswordController,
} = require("../controller/auth-controller");
const {
  CreateClass,
  GetclassbyId,
  UpdateClass,
  ChangeStatus,
  GetClass,
  DetaiCourseClass,
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
  vnpayCallback,
  ResumePay,
  DeleteOrderbyUser,
  GetHistoryByadmin,
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
  GetAttemsp,
  GetCourseForQuizz,
  GetQuizBystuden,
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
} = require("../controller/dashboard-controller");

const { authMiddleware } = require("../Middleware/Middleware");

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

const Router = require("express").Router();

Router.post("/login", AuthController);
Router.post("/register", upload.single("avatar"), RegisterController);
Router.post("/fogot-password", ResetPasswordController);
Router.get("/courses", authMiddleware, GetAllCourese);
Router.get("/courses_all", authMiddleware, GetCoursesforevery);
Router.post(
  "/newcourses",
  authMiddleware,

  upload.single("thumbnail"),
  validateCourse,
  CreateCourses,
);
Router.get("/get_lession/:id", authMiddleware, GetLessonByIdcontroller);
Router.get("/lession/:id", authMiddleware, GetLessons);
Router.post(
  "/create_lession",
  authMiddleware,

  upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "resourcesurl", maxCount: 1 },
  ]),
  CreateLessons,
);
Router.delete(`/delete_lession/:id`, authMiddleware, DeleteLession);
Router.put(
  `/update_lession/:lessionId`,
  authMiddleware,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "resourcesurl", maxCount: 1 },
  ]),
  UpdateLession,
);
Router.get(
  `/get_lessionbyupdate/:lessionId`,
  authMiddleware,
  getLessionbyIntructor,
);

Router.put("/create-payment", authMiddleware, payment);

Router.get("/payment/vnpay-callback", vnpayCallback);
Router.get("/enrollments", authMiddleware, Getorderbyuser);
Router.get("/courses/:courseId/lession", authMiddleware, Getcheckenrollment);
Router.post("/create-class/:courseId", authMiddleware, CreateClass);
Router.get("/get-class-by-instructor/:courseId", authMiddleware, GetclassbyId);
Router.put("/classes/:classId", authMiddleware, UpdateClass);
Router.put("/change/status/:classId", authMiddleware, ChangeStatus);
Router.get("/get-class/:classId", authMiddleware, GetClass);
Router.get("/details-class/:courseId", authMiddleware, DetaiCourseClass);

Router.get("/admin/users", authMiddleware, GetAlluser);
Router.get("/admin/users/:userId", authMiddleware, GetUser);
Router.patch("/admin/users/:userId/status", authMiddleware, ChangeStatusUser);
Router.patch("/admin/users/:userId/role", authMiddleware, UpdateRole);

Router.get(
  "/instructor/classes/:classId/students",
  authMiddleware,
  GetStudentOnClasss,
);
Router.patch(
  "/instructor/classes/:classId/students/:studentId",
  authMiddleware,
  RemoveStudent,
);
Router.patch(
  "/instructor/refect-classes/:classId/students/:studentId",
  authMiddleware,
  RefectStudent,
);
Router.get(
  "/instructor/dashboard/business",
  authMiddleware,
  GetInstructorBusinessDashboard,
);

//////
Router.post("/create_quizz/:lessionId", authMiddleware, CreateQuiz);
Router.get("/get_quizz/:lessonId", authMiddleware, GetQuizzByLession);
Router.put("/upadate_quizz/:lessonId", authMiddleware, UpdateQuizz);
Router.post("/create_attemp/quizz/:lessonId", authMiddleware, CreateAttemp);
////
Router.patch(
  "/process-lesson/:courseId/:lessonId",
  authMiddleware,
  SaveProcess,
);
Router.get("/process/:lessonId", authMiddleware, GetProcess);
Router.get("/process/course/:courseId", authMiddleware, GetAllProcess);
(Router.get("/sendMessage/:classId", SenMessLimit),
  Router.get("/order_history", authMiddleware, GetOrderHistory));

Router.put("/resume-payment/:orderId", ResumePay);
Router.delete("/delete-order/:orderId", DeleteOrderbyUser);
Router.get("/details-course/:courseId", DetailsCourse);
Router.post(
  "/become-instructor",
  authMiddleware,
  upload.single("proofImage"),
  BecomeInstructor,
);
Router.put("/res-instructor", authMiddleware, ResInstructor);
Router.get("/admin/teacher-requests", authMiddleware, GetPendingRequests);
///rating

Router.post(
  "/courses/:courseId/ratings",
  authMiddleware,
  CreateAndUpdateRating,
);
Router.get("/courses/:courseId/ratings", GetRating);
Router.delete("/ratings/:ratingId", authMiddleware, DeleteRatingByuser);
Router.get("/generate/:lessionId/quizz", authMiddleware, GenerateQuizAI);
Router.get(
  "/instructor/courses-with-lessons",
  authMiddleware,
  GetCourseForQuizz,
);
Router.get("/student/quizzes", authMiddleware, GetQuizBystuden);
Router.get(
  "/instructor/recorded-courses",
  authMiddleware,
  GetCoursewithLession,
);
Router.get("/lessions/:courseId", authMiddleware, GetLessionDetails);
Router.get("/admin/courses/quality-control", authMiddleware, ManagerCourse);
Router.get("/admin/history", authMiddleware, GetHistoryByadmin);

Router.get("/user/information", authMiddleware, GetUserInfor);

Router.patch(
  "/admin/courses/:courseId/status",
  authMiddleware,
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
Router.post("/admin/Notification/:receiverId", authMiddleware, ReplybyAdmin);
Router.get("/admin/getAll", authMiddleware, GetAllNotifi);
Router.get("/user_getNotification", authMiddleware, GetNotifiByUser);
Router.get("/user_recentlesson", authMiddleware, Getrecenlession);
Router.get("/Student_Dashboart", authMiddleware, GetDashboartfostudent);
Router.put(
  "/update_course/:courseId",
  authMiddleware,
  upload.single("thumbnail"),
  UpdateCourse,
);
Router.get("/admin_dashboart", DashboartforAdmin);
module.exports = Router;
