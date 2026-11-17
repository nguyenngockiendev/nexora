const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
} = require("../../Middleware/Middleware");
const {
  GetInstructorBusinessDashboard,
  DashboartforAdmin,
  GetClassSesion,
} = require("./dashboard.controller");

Router.get(
  "/instructor/dashboard/business",
  authMiddleware,
  checkRole("instructor"),
  GetInstructorBusinessDashboard,
);
Router.get(
  "/admin_dashboart",
  authMiddleware,
  checkRole("admin"),
  DashboartforAdmin,
);
Router.get("/Classion", authMiddleware, GetClassSesion);

module.exports = Router;
