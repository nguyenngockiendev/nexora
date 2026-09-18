const {
  CreateVoucher,
  getVoucherByid,
  updateVoucherbyid,
  updateStatusVoucher,
  deleteVoucher,
} = require("../service/voucher-service");

const CreatenewVoucher = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      code: req.body.code,
      discountType: req.body.discountType,
      usageLimit: req.body.usageLimit,
      expiryDate: req.body.expiryDate,
      discountValue: req.body.discountValue,
      applicableCourses: req.body.applicableCourses,
      description: req.body.description,
    };
    const result = await CreateVoucher(data);
    res.status(201).json({
      success: true,
      message: "Tạo voucher thành công!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

const getVoucger = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
    };
    const result = await getVoucherByid(data);
    res.status(201).json({
      success: true,
      message: "lấy thành công voucher!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

const updateVoucher = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      code: req.body.code,
      vouchersid: req.params.vouchersid,
      discountType: req.body.discountType,
      usageLimit: req.body.usageLimit,
      expiryDate: req.body.expiryDate,
      discountValue: req.body.discountValue,
      applicableCourses: req.body.applicableCourses,
      description: req.body.description,
    };
    const result = await updateVoucherbyid(data);
    res.status(201).json({
      success: true,
      message: "Cập nhật voucher thành công!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
const updatesStatusVou = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      vouchersid: req.params.vouchersid,
      status: req.body.status,
    };
    const result = await updateStatusVoucher(data);
    res.status(201).json({
      success: true,
      message: "Cập nhật voucher thành công!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
const deleteVou = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      vouchersid: req.params.vouchersid,
    };
    await deleteVoucher(data);
    res.status(200).json({
      success: true,
      message: "Xóa voucher thành công!",
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

module.exports = {
  deleteVou,
  updatesStatusVou,
  updateVoucher,
  getVoucger,
  CreatenewVoucher,
};
