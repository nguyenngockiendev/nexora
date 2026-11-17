const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
  createLimiter,
} = require("../../Middleware/Middleware");
const {
  CreateAndUpdateRating,
  GetRating,
  DeleteRatingByuser,
} = require("./ratings.controller");

Router.post(
  "/courses/:courseId/ratings",

  authMiddleware,
  checkRole("student"),
  createLimiter(10, 3, true),
  CreateAndUpdateRating,
);
Router.get("/courses/:courseId/ratings", GetRating);
Router.delete("/ratings/:ratingId", authMiddleware, checkRole("student"), DeleteRatingByuser);

module.exports = Router;
