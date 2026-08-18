const {
  paymemtCourese,
  createVNPayPaymentUrl,
  updateorder,
  ResumePayment,
  DeleteOrder,
  GethhistorysForAdmin,
} = require("../service/payment-service");

const payment = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,

      items: req.body.items,
    };

    const result = await paymemtCourese(data);
    if (!result) {
      throw { message: "not have course!" };
    }
    const paymentcourse = await createVNPayPaymentUrl(result);

    res.status(200).json({ url: paymentcourse });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const vnpayCallback = async (req, res) => {
  try {
    const vnpay = req.query;
    const createerollment = await updateorder(vnpay);
    if (!createerollment) {
      throw { message: "payment failed!" };
    }
    res.redirect(
      `http://localhost:5173/courses?payment=${createerollment.message}`,
    );
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
  payment,
  vnpayCallback,
  ResumePay,
  DeleteOrderbyUser,
  GetHistoryByadmin
};
