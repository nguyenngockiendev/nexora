const Router = require("express").Router();
const {
  authMiddleware,
} = require("../../Middleware/Middleware");
const {
  Getorderbyuser,
  Getcheckenrollment,
  GetOrderHistory,
} = require("./enrollments.controller");

Router.get("/enrollments", authMiddleware, Getorderbyuser);
Router.get("/courses/:courseId/classes/:classId/lessons", authMiddleware, Getcheckenrollment);
Router.get("/courses/:courseId/lession", authMiddleware, Getcheckenrollment);
Router.get("/order_history", authMiddleware, GetOrderHistory);

module.exports = Router;
