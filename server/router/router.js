const Router = require("express").Router();

Router.use(require("../modules/auth/auth.routes"));
Router.use(require("../modules/courses/courses.routes"));
Router.use(require("../modules/lessons/lessons.routes"));
Router.use(require("../modules/payments/payments.routes"));
Router.use(require("../modules/enrollments/enrollments.routes"));
Router.use(require("../modules/classes/classes.routes"));
Router.use(require("../modules/users/users.routes"));
Router.use(require("../modules/dashboard/dashboard.routes"));
Router.use(require("../modules/quizzes/quizzes.routes"));
Router.use(require("../modules/progress/progress.routes"));
Router.use(require("../modules/ratings/ratings.routes"));
Router.use(require("../modules/ai/content-generation/content-generation.routes"));
Router.use(require("../modules/support/support.routes"));
Router.use(require("../modules/vouchers/vouchers.routes"));
Router.use(require("../modules/exam-bank/exam-bank.routes"));

module.exports = Router;
