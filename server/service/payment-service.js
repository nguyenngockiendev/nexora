require("dotenv").config();
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
      const PriceClas = await Class.findById(item.classId);
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
      paymentMethod: "QR",
    });

    await neworder.save();
    return neworder;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const createVNPayPaymentUrl = async (data) => {
//   try {
//     const vnpay = new VNPay({
//       tmnCode: "6NZPQZ03",
//       secureSecret: "NV6V6GQJZOU8T2TRKFZAOOGMUARDTN4X",
//       vnpayHost: "https://sandbox.vnpayment.vn",
//       testMode: true,
//       hashAlgorithm: "SHA512",
//       loggerFn: ignoreLogger,
//     });

//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     const vnpayResponse = vnpay.buildPaymentUrl({
//       vnp_Amount: Number(data.Totalprice || data.price || 0),
//       vnp_IpAddr: "127.0.0.1",
//       vnp_TxnRef: `${data._id}`,
//       vnp_OrderInfo: `Course payment successful_${data.courseId || "cart"}_${data.classId || "items"}`,
//       vnp_OrderType: ProductCode.Other,
//       vnp_ReturnUrl: `http://localhost:5000/api/payment/vnpay-callback`,
//       vnp_Locale: VnpLocale.VN,
//       vnp_CreateDate: dateFormat(new Date()),
//       vnp_ExpireDate: dateFormat(tomorrow),
//     });
//     return vnpayResponse;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const createSepayPaymentUrl = async (data) => {
  try {
    const bank = process.env.SEPAY_BANK_NAME;
    const acc = process.env.SEPAY_ACC_NUMBER;
    const amount = Number(data.Totalprice || data.price || 0);
    const holder = process.env.SEPAY_ACC_NAME;

    const des = `NEX${data._id}`;
    const qrUrl = `https://qr.sepay.vn/img?acc=${acc}&bank=${bank}&amount=${amount}&des=${des}&template=compact&showinfo=true`;
    return qrUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateorder = async (data) => {
  try {
    const sepaycontent = data.content.replace("NEX", "").trim();
    const orderpayment = await order.findById(sepaycontent);

    if (data.transferType === "in") {
      if (Number(data.transferAmount) === Number(orderpayment.Totalprice)) {
        orderpayment.status = "completed";
        await orderpayment.save();

        for (const item of orderpayment.items) {
          await errollment.create({
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
          message: "Thanh toán thành công!",
        };
      }
    } else {
      orderpayment.status = "failed";
      await orderpayment.save();
      return { message: "Thanh toán thất bại!" };
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
    const Resumepayment = await createSepayPaymentUrl(ExitsOrder);
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
const GethhistorysForAdmin = async (data) => {
  try {
    if (data.role !== "admin") {
      throw { status: 404, message: "Quyền hạn không đủ!" };
    }
    const OrderHistory = await Orders.find()
      .populate("userId", "name email avatar")
      .populate({
        path: "items.courseId",
        select: "title thumbnail price",
        populate: {
          path: "instructor",
          select: "name",
        },
      })
      .populate({
        path: "items.classId",
        select: "className price",

        populate: [
          {
            path: "instructorId",
            select: "name",
          },
          {
            path: "courseId",
            select: "title thumbnail  ",
          },
        ],
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    const totalPurchases = OrderHistory.reduce(
      (sum, order) => {
        if (order.status === "completed") {
          sum.completed += Number(order.Totalprice);
        }
        if (order.status === "failed") {
          sum.failed += Number(order.Totalprice);
        }

        if (order.status === "pending") {
          sum.pending += Number(order.Totalprice);
        }
        return sum;
      },
      {
        failed: 0,
        completed: 0,
        pending: 0,
      },
    );
    let TotalComplete = 0;
    let TotalFalse = 0;
    let TotalPending = 0;

    OrderHistory.filter((e) => {
      if (e.status === "completed") {
        TotalComplete++;
      }
      if (e.status === "pending") {
        TotalPending++;
      }
      if (e.status === "failed") {
        TotalFalse++;
      }
    });
    const finalResultTotal = {
      totalPurchasesComplete: totalPurchases.completed,
      totalPurchasesfalse: totalPurchases.failed,
      totalPurchasespending: totalPurchases.pending,
      totalCoursesCount: OrderHistory.length,
      recentPayment: OrderHistory.sort((k, n) => n.addedAt - k.addedAt)[0],
      TotalComplete: TotalComplete,
      TotalFalse: TotalFalse,
      TotalPending: TotalPending,
      OrderHistory: OrderHistory,
    };

    return finalResultTotal;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  paymemtCourese,
  // createVNPayPaymentUrl,
  updateorder,
  ResumePayment,
  DeleteOrder,
  GethhistorysForAdmin,
  createSepayPaymentUrl,
};
