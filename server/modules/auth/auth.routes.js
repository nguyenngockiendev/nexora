const Router = require("express").Router();
const { createLimiter } = require("../../Middleware/Middleware");
const {
  AuthController,
  RegisterController,
  SenOtpController,
  LoginByGoogleController,
  forgotPasswordController,
} = require("./auth.controller");
const upload = require("../../Middleware/Uploadfile");

Router.post("/login", createLimiter(10, 5), AuthController);
Router.post(
  "/register",
  createLimiter(3, 5),
  upload.single("avatar"),
  RegisterController,
);
Router.post("/send_otp", createLimiter(3, 1), SenOtpController);
Router.post("/login_google", createLimiter(3, 5), LoginByGoogleController);
Router.post("/forgot-password", createLimiter(3, 10), forgotPasswordController);

module.exports = Router;
