const Router = require("express").Router();
const {
  authMiddleware,
  createLimiter,
  checkRole,
} = require("../../Middleware/Middleware");
const {
  payment,
  sepayCallback,
  ResumePay,
  DeleteOrderbyUser,
  GetHistoryByadmin,
  VoucherPreview,
} = require("./payments.controller");

Router.put(
  "/create-payment",
  authMiddleware,
  createLimiter(5, 5, true),
  payment,
);
Router.post("/payment/sepay-webhook", sepayCallback);
Router.put(
  "/resume-payment/:orderId",

  authMiddleware,
  createLimiter(5, 5, true),
  ResumePay,
);
Router.delete("/delete-order/:orderId", authMiddleware, DeleteOrderbyUser);
Router.get(
  "/admin/history",
  authMiddleware,
  checkRole("admin"),
  GetHistoryByadmin,
);
Router.post(
  "/vouchers_preview",
  createLimiter(10, 5),
  authMiddleware,
  VoucherPreview,
);

module.exports = Router;
