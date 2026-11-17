const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
  createLimiter,
} = require("../../../Middleware/Middleware");
const {
  GenerateQuizAI,
  GeneratePDFAI,
} = require("./content-generation.controller");
const upload = require("../../../Middleware/Uploadfile");

Router.get(
  "/generate/:lessionId/quizz",

  authMiddleware,
  checkRole("instructor", "admin"),
  createLimiter(3, 3, true),
  GenerateQuizAI,
);
Router.post(
  "/scan_pdf/:courseId",
  authMiddleware,
  checkRole("admin"),
  upload.single("file"),
  GeneratePDFAI,
);

module.exports = Router;
