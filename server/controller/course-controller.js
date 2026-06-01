const { request } = require("express");
const {
  GetAllCourses,
  CreatenewCourses,
  GetLessonById,
  paymemtCourese,
  createVNPayPaymentUrl,
  updateorder,
} = require("../service/courses-service");
const uploadFile = require("../service/uploadfile-service");
const { validationResult } = require("express-validator");
const { GetClassbyInstructor } = require("../service/class-manager-service");

const GetAllCourese = async (req, res) => {
  try {
    const data = req.user;
    const result = await GetAllCourses(data);
  
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const CreateCourses = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array()[0].msg });
    }
    let thumbnail = "";
    if (req?.file) {
      thumbnail = await uploadFile(req?.file?.path);
    }
    const data = {
      ...req.body,
      instructor: req.user.userId,
      role: req.user.role,
      thumbnail: thumbnail,
    };

    const result = await CreatenewCourses(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetLessonByIdcontroller = async (req, res) => {
  try {
    const data = {
      id: req.params.id,
      instructor: req.user.userId,
      role: req.user.role,
    };
    const result = await GetLessonById(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const payment = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      courseId: req.params.courseId,
      type: req.body.type,
      classId :req.body.classId || null,
    };
    const result = await paymemtCourese(data);
    if (!result) {
      throw { message: "not have course!" };
    }
    const paymentcourse = await createVNPayPaymentUrl(result);

    console.log("paymentcourse", paymentcourse);
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

module.exports = {
  GetAllCourese,
  CreateCourses,
  GetLessonByIdcontroller,
  payment,
  vnpayCallback,
};
