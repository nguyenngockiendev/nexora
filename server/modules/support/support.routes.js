const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
} = require("../../Middleware/Middleware");
const {
  UsertSendNotifi,
  ReplybyAdmin,
  GetAllNotifi,
  GetNotifiByUser,
} = require("./support.controller");

Router.post("/User_send", authMiddleware, UsertSendNotifi);
Router.post(
  "/admin/Notification/:receiverId",
  authMiddleware,
  checkRole("admin"),
  ReplybyAdmin,
);
Router.get("/admin/getAll", authMiddleware, checkRole("admin"), GetAllNotifi);
Router.get("/user_getNotification", authMiddleware, GetNotifiByUser);

module.exports = Router;
