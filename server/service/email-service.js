require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const ServiceEmail = async (data) => {
  try {
    const result = await resend.emails.send({
      from: "Learnova <noreply@learnova.top>",
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
