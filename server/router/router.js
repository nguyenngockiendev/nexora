const {
  AuthController,
  RegisterController,
  ResetPasswordController,
} = require("../controller/auth-controller");
const { CreateClass, GetclassbyId, UpdateClass, ChangeStatus, GetClass, DetaiCourseClass } = require("../controller/class-manager-controller");
const {
  GetAllCourese,
  CreateCourses,
  GetLessonByIdcontroller,
  payment,
  createPaymentUrl,
  vnpayCallback,
} = require("../controller/course-controller");
const { Getorderbyuser, Getcheckenrollment } = require("../controller/enrollments-controller");
const {
  GetLessons,
  CreateLessons,
  DeleteLession,
  UpdateLession,
} = require("../controller/lession-controller");

const { authMiddleware } = require("../Middleware/Middleware");

const upload = require("../Middleware/Uploadfile");
const { validateCourse } = require("../Middleware/Validateform");

const Router = require("express").Router();

Router.post("/login", AuthController);
Router.post("/register", upload.single("avatar"), RegisterController);
Router.post("/fogot-password", ResetPasswordController);
Router.get("/courses", authMiddleware, GetAllCourese);
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
Router.put(`/update_lession/:id`, authMiddleware, UpdateLession);

Router.put("/create-payment/:courseId", authMiddleware, payment);

Router.get("/payment/vnpay-callback", vnpayCallback);
Router.get("/enrollments",authMiddleware,Getorderbyuser);
Router.get("/courses/:courseId/lession",authMiddleware,Getcheckenrollment);
Router.post("/create-class/:courseId",authMiddleware,CreateClass);
Router.get("/get-class-by-instructor",authMiddleware,GetclassbyId);
Router.put("/classes/:classId",authMiddleware,UpdateClass)
Router.put("/change/status/:classId",authMiddleware,ChangeStatus)
Router.get("/get-class/:classId",authMiddleware,GetClass)
Router.get("/details-class/:courseId",authMiddleware,DetaiCourseClass)
module.exports = Router;
