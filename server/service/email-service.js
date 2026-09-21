require("dotenv").config();
const nodemailer = require("nodemailer");

const dns = require("dns");
// 👉 Ép Node.js luôn dùng IPv4, fix triệt để lỗi IPv6 trên Render / Railway / Cloud
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}
const transpost = nodemailer.createTransport({
  service: "gmail", 
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
    throw error;
  }
};
module.exports = ServiceEmail;
