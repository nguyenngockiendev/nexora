const Router = require("express").Router();
const {
  authMiddleware,
  checkRole,
} = require("../../Middleware/Middleware");
const {
  CreatenewVoucher,
  getVoucger,
  updateVoucher,
  updatesStatusVou,
  deleteVou,
} = require("./vouchers.controller");

Router.post(
  "/vouchers",
  authMiddleware,
  checkRole("admin", "instructor"),
  CreatenewVoucher,
);
Router.get(
  "/vouchers",
  authMiddleware,
  checkRole("admin", "instructor"),
  getVoucger,
);
Router.put(
  "/vouchers/:vouchersid",
  authMiddleware,
  checkRole("admin", "instructor"),
  updateVoucher,
);
Router.patch(
  "/vouchers/:vouchersid/status",
  authMiddleware,
  checkRole("admin", "instructor"),
  updatesStatusVou,
);
Router.delete(
  "/vouchers/:vouchersid",
  authMiddleware,
  checkRole("admin", "instructor"),
  deleteVou,
);

module.exports = Router;
