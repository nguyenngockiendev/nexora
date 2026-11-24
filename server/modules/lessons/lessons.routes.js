const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
  createLimiter,
} = require("../../Middleware/Middleware");
const {
  ReorderLessons,
  GetLessons,
  CreateLessons,
  DeleteLession,
  UpdateLession,
  getLessionbyIntructor,
  GetCoursewithLession,
  GetLessionDetails,
  RetryNormalization,
} = require("./lessons.controller");
const multer = require("multer");
const os = require("node:os");
const upload = multer({ dest: os.tmpdir() });

Router.get("/lession/:id", authMiddleware, GetLessons);
Router.post(
  "/create_lession",
  authMiddleware,
  checkRole("instructor"),
  upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "resourcesurl", maxCount: 1 },
  ]),
  CreateLessons,
);
Router.delete(
  `/delete_lession/:id`,
  authMiddleware,
  checkRole("instructor"),
  DeleteLession,
);
Router.put(
  `/update_lession/:lessionId`,
  authMiddleware,
  checkRole("instructor"),
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "resourcesurl", maxCount: 1 },
  ]),
  UpdateLession,
);
Router.get(
  `/get_lessionbyupdate/:lessionId`,
  authMiddleware,
  checkRole("instructor"),
  getLessionbyIntructor,
);
Router.get(
  "/instructor/recorded-courses",
  authMiddleware,
  checkRole("instructor", "admin"),
  GetCoursewithLession,
);
Router.put("/lessions/:courseId/classes/:classId/order", authMiddleware, checkRole("instructor"), ReorderLessons);
Router.get("/lessions/:courseId/classes/:classId", authMiddleware, checkRole("instructor"), GetLessionDetails);
Router.get("/lessions/:courseId", authMiddleware, checkRole("instructor", "admin"), GetLessionDetails);
Router.post(
  "/lessons/:lessionId/normalization/retry",
  authMiddleware,
  checkRole("instructor"),
  createLimiter(3, 3, true),
  RetryNormalization,
);

module.exports = Router;
