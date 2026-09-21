require("dotenv").config();
const nodemailer = require("nodemailer");
const transpost = nodemailer.createTransport({
  service: "gmail",
   family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ServiceEmail = async (data) => {
  try {
    const result = await transpost.sendMail({
      from: `"Nexora LMS" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: data.subject,
      html: data.html,
    });
    return result;
  } catch (error) {
    throw error
  }
};
module.exports = ServiceEmail;
