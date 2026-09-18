require("dotenv").config();
const {
  paymemtCourese,

  updateorder,
  ResumePayment,
  DeleteOrder,
  GethhistorysForAdmin,
  createSepayPaymentUrl,
  checkVoucherPreview,
} = require("../service/payment-service");
require("dotenv").config();

const VoucherPreview = async (req, res) => {
  try {
    const data = {
      items: req.body.items || [],
      codevoucher: req.body.codevoucher || "",
      userId: req.user.userId,
    };

    const result = await checkVoucherPreview(data);
    res.status(201).json({
      success: true,
      message: "Xem trước thành công!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
const payment = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      items: req.body.items,
      codevoucher: req.body.codevoucher,
    };

    const result = await paymemtCourese(data);
    if (!result) {
      throw { message: "không có khóa học!" };
    }
    if (result.isFree) {
      res.status(200).json(result);
      return;
    }
    const paymentcourse = await createSepayPaymentUrl(result);
    console.log(paymentcourse);
    res.status(200).json({ url: paymentcourse });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const sepayCallback = async (req, res) => {
  try {
    const sepay = req.body;
    console.log(sepay);
    const createerollment = await updateorder(sepay);
    const io = req.app.get("io");
    if (io) {
      io.emit("payment_success", { message: "Thanh toán thành công!" });
    }

    res.status(200).json({ success: true, message: createerollment.message });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const ResumePay = async (req, res) => {
  try {
    const data = {
      orderId: req.params.orderId,
    };
    const result = await ResumePayment(data);
    res.status(200).json({ url: result });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const DeleteOrderbyUser = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      orderId: req.params.orderId,
    };
    const result = await DeleteOrder(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetHistoryByadmin = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
    };
    const result = await GethhistorysForAdmin(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  VoucherPreview,
  payment,
  sepayCallback,
  ResumePay,
  DeleteOrderbyUser,
  GetHistoryByadmin,
};
