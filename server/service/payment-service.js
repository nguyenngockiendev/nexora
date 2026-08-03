const Courses = require("../model/Courses");
const order = require("../model/Orders");
const errollment = require("../model/Enrollments");
const classs = require("../model/Class");
const {
  VNPay,
  ignoreLogger,
  ProductCode,
  VnpLocale,
  dateFormat,
} = require("vnpay");
const Orders = require("../model/Orders");

const paymemtCourese = async (data) => {
  try {
    const course = await Courses.findById(data.courseId);
    if (!course) {
      throw { message: "course not found!" };
    }
    const exitorder = await order.findOne({
      userId: data.userId,
      courseId: data.courseId,
      status: "pending",
    });
    if (exitorder) {
      throw { message: "you have a pending order for this course!" };
    }
    const erollment = await errollment.findOne({
      userId: data.userId,
      courseId: data.courseId,
    });
    if (erollment) {
      throw {
        message:
          "courese had exitsYou have registered for this course. Please go to My course!",
      };
    }

    if (data?.type === "recorded") {
      const price = await Courses.findById(data.courseId).select("-_id price");
      const neworder = new order({
        userId: data.userId,
        courseId: data.courseId,
        price: price.price,
        status: "pending",
        classId: data?.classId,
        paymentMethod: "vnpay",
      });
      await neworder.save();
      return neworder;
    }
    if (data?.type === "live") {
      const priceClass = await classs
        .findById(data.classId)
        .select("-_id price");
      const neworder = new order({
        userId: data.userId,
        courseId: data.courseId,
        price: priceClass.price,
        status: "pending",
        classId: data?.classId,
        paymentMethod: "vnpay",
      });
      await neworder.save();
      return neworder;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createVNPayPaymentUrl = async (data) => {
  try {
    const vnpay = new VNPay({
      tmnCode: "6NZPQZ03",
      secureSecret: "NV6V6GQJZOU8T2TRKFZAOOGMUARDTN4X",
      vnpayHost: "https://sandbox.vnpayment.vn",
      testMode: true, // tùy chọn
      hashAlgorithm: "SHA512", // tùy chọn
      loggerFn: ignoreLogger, // tùy chọn
    });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const vnpayResponse = vnpay.buildPaymentUrl({
      vnp_Amount: Number(data.courseId ? data.price : data.price),
      vnp_IpAddr: "127.0.0.1",
      vnp_TxnRef: `${data._id}`,
      vnp_OrderInfo: `Course payment successful_${data.courseId}_${data.classId}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: `http://localhost:5000/api/payment/vnpay-callback`,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(tomorrow),
    });
    return vnpayResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateorder = async (data) => {
  try {
    const orderpayment = await order.findById(data.vnp_TxnRef);

    const pricecourse = await Courses.findById(orderpayment.courseId);

    if (data.vnp_ResponseCode == "00") {
      if (Number(data.vnp_Amount) === Number(orderpayment.price) * 100) {
        orderpayment.status = "completed";
        await orderpayment.save();
        if (pricecourse?.type === "recorded") {
          const newerrollment = new errollment({
            userId: orderpayment.userId,
            courseId: orderpayment.courseId,
            classId: pricecourse?.classId,
            type: pricecourse?.type,
            status: "active",
          });
          await newerrollment.save();
          return {
            newerrollment: newerrollment,
            message: data.vnp_OrderInfo.split("_")[0],
          };
        }
        if (pricecourse?.type === "live") {
          const newerrollment = new errollment({
            userId: orderpayment.userId,
            courseId: orderpayment.courseId,
            classId: orderpayment?.classId,
            type: pricecourse?.type,
            status: "active",
          });
          await newerrollment.save();
          await classs.updateOne(
            {
              _id: orderpayment?.classId,
              courseId: orderpayment?.courseId,
            },
            { $inc: { currentStudents: 1 } },
          );
          return {
            newerrollment: newerrollment,
            message: data.vnp_OrderInfo.split("_")[0],
          };
        }
      }
    } else {
      orderpayment.status = "failed";
      await orderpayment.save();
      return { message: "payment failed!" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ResumePayment = async (data) => {
  try {
    const ExitsOrder = await Orders.findById(data.orderId);

    if (!ExitsOrder) {
      throw { status: 404, message: "không tìm thấy đơn hàng này!" };
    }
    const Resumepayment = await createVNPayPaymentUrl(ExitsOrder);
    return Resumepayment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const DeleteOrder = async (data) => {
  try {
    const Resumepayment = await Orders.findByIdAndDelete(data.orderId);

    return Resumepayment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  paymemtCourese,
  createVNPayPaymentUrl,
  updateorder,
  ResumePayment,
  DeleteOrder,
};
