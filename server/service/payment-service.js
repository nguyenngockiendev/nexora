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
const Class = require("../model/Class");
const mongoose = require("mongoose");
const paymemtCourese = async (data) => {
  try {
    for (const item of data.items) {
      const exitorder = await order.findOne({
        userId: data.userId,
        courseId: item.courseId,
        status: "pending",
      });
      if (exitorder) {
        throw { message: "Đơn hàng này chưa thanh toán!" };
      }
    }

    for (const item of data.items) {
      const erollment = await errollment
        .findOne({
          userId: data.userId,
          courseId: item.courseId,
          classId: item.classId,
        })
        .populate("courseId", "title")
        .lean();
      if (erollment) {
        throw {
          message: `Khóa học ${erollment.courseId.title} bạn đã mua!`,
        };
      }
    }
    let newItems = [];
    let finalTotal = 0;
    for (const item of data.items) {
      const course = await Courses.findById(item.courseId);
      const PriceClas = await Class.findOne({
        courseId: item.classId,
      });
      const finalPrice = Number(PriceClas?.price || course?.price || 0);
      finalTotal += finalPrice;

      newItems.push({
        courseId: item.courseId,
        classId: item.classId || null,
        type: item.type,
        price: finalPrice,
      });
    }

    const neworder = new order({
      userId: data.userId,
      Totalprice: finalTotal,

      items: newItems,

      status: "pending",
      paymentMethod: "vnpay",
    });

    await neworder.save();
    return neworder;
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
      testMode: true,
      hashAlgorithm: "SHA512",
      loggerFn: ignoreLogger,
    });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const vnpayResponse = vnpay.buildPaymentUrl({
      vnp_Amount: Number(data.Totalprice || data.price || 0),
      vnp_IpAddr: "127.0.0.1",
      vnp_TxnRef: `${data._id}`,
      vnp_OrderInfo: `Course payment successful_${data.courseId || "cart"}_${data.classId || "items"}`,
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

    if (data.vnp_ResponseCode == "00") {
      if (Number(data.vnp_Amount) === Number(orderpayment.Totalprice) * 100) {
        orderpayment.status = "completed";
        await orderpayment.save();

        for (const item of orderpayment.items) {
          const newerrollment = await errollment.create({
            userId: orderpayment.userId,
            courseId: item.courseId,
            classId: item?.classId || null,
            type: item?.type,
            status: "active",
          });

          if (item?.type === "live") {
            await classs.updateOne(
              {
                _id: item?.classId,
                courseId: item?.courseId,
              },
              { $inc: { currentStudents: 1 } },
            );
          }
        }

        return {
          message: data.vnp_OrderInfo.split("_")[0],
        };
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
    const result = await order.findByIdAndDelete(data.orderId);
    return result;
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
