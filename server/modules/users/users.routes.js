const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
} = require("../../Middleware/Middleware");
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
} = require("./users.controller");
const upload = require("../../Middleware/Uploadfile");

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
Router.get("/user/information", authMiddleware, GetUserInfor);
Router.put(
  "/user_update/profile",
  authMiddleware,
  upload.single("avatar"),
  ChangeUserProfile,
);
Router.patch("/user_change_pass", authMiddleware, ChangePassWord);

module.exports = Router;
