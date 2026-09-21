const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const Otp = require("../model/Otp");
const ServiceEmail = require("./email-service");

const forgotPasswordService = async (data) => {
  try {
    for (const item in data) {
      if (!data[item] || data[item] === "") {
        throw {
          status: 404,
          message: "Thông tin không chính xác , không đc để trống!",
        };
      }
    }
    if (data.newPassword.length < 6) {
      throw {
        status: 400,
        message: "Dữ liệu không hợp lệ hoặc thiếu thông tin!",
      };
    }
    if (data.otp.length < 6) {
      throw {
        status: 400,
        message: "OTP sai!",
      };
    }
    const isOtp = await Otp.findOne({
      email: data.email,
      otp: data.otp,
      type: data.type,
    });
    if (!isOtp) {
      throw {
        status: 400,
        message: "Mã OTP không chính xác hoặc đã hết hạn!",
      };
    }
    const isUser = await User.findOne({
      email: data.email,
    });
    if (!isUser) {
      throw {
        status: 404,
        message: "Tài khoản không tồn tại!",
      };
    }
    if (isUser.status === "inactive") {
      throw {
        status: 403,
        message: "Tài khoản của bạn đang bị khóa, không thể đổi mật khẩu!",
      };
    }

    const newPass = await bcrypt.hash(
      data.newPassword,
      parseInt(process.env.SALT_ROUNDS),
    );
    const result = await User.findOneAndUpdate(
      {
        email: data.email,
      },
      {
        isVerified: true,
        password: newPass,
      },
    );
    await Otp.deleteMany({
      email: data.email,
      type: data.type,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw { status: 401, message: "Tài khoản không chính xác!" };
    }
    if (user.password === null) {
      throw {
        status: 401,
        message:
          "Tài khoản này đăng nhập bằng Google, vui lòng dùng nút Đăng nhập với Google!",
      };
    }
    if (user.status === "inactive") {
      throw {
        status: 403,
        message: "Tài khoản của bạn đã bị khóa hoặc chưa được kích hoạt!",
      };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw { status: 401, message: "Sai mật khẩu hãy nhập lại!" };
    }

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  } catch (error) {
    console.error("Error occurred while logging in user:", error);
    throw error;
  }
};

const registerUser = async (data) => {
  try {
    for (const item in data) {
      if (!data[item] || data[item] === "") {
        throw {
          status: 404,
          message: "Thông tin không chính xác , không đc để trống!",
        };
      }
    }

    const exitUser = await User.findOne({ email: data.email });
    if (data.password < 6) {
      throw {
        status: 400,
        message: "Mật khẩu phải >= 6 kí tự",
      };
    }
    if (data.password !== data.repeatpassword) {
      throw { status: 400, message: "Mật khẩu xác nhận không khớp!" };
    }
    if (exitUser) {
      throw { status: 400, message: "Email đã tồn tại" };
    }

    const hashpassword = await bcrypt.hash(
      data.password,
      parseInt(process.env.SALT_ROUNDS),
    );

    const result = await User.create({
      name: data.name,
      email: data.email,
      password: hashpassword,
      role: "student",
      avatar: data.avatar || "",
      status: "active",
      phone: "",
      isVerified: true,
    });

    return result;
  } catch (error) {
    console.error("Error occurred while registering user:", error);
    throw error;
  }
};

const sendOtpEmailService = async (datas) => {
  try {
    if (datas.type === "forgot_password") {
      const emailUser = await User.findOne({ email: datas.email });
      if (!emailUser) {
        throw { status: 404, message: "Email không tồn tại hoặc không đúng!" };
      }
      if (datas.type === "register") {
        const exitUser = await User.findOne({ email: datas.email });
        if (exitUser) {
          throw {
            status: 400,
            message: "Email này đã được sử dụng, vui lòng đăng nhập!",
          };
        }
      }
      if (emailUser.status === "inactive") {
        throw {
          status: 404,
          message: "Tài khoản bị khóa hãy liên hệ với Admin!",
        };
      }
    }

    const antiSpam = await Otp.findOne({
      email: datas.email,
      type: datas.type,
    });
    if (
      antiSpam &&
      Date.now() - new Date(antiSpam.createdAt).getTime() < 60000
    ) {
      throw {
        status: 429,
        message: "Vui lòng đợi 60 giây trước khi yêu cầu gửi lại mã!",
      };
    }
    await Otp.deleteMany({
      email: datas.email,
      type: datas.type,
    });
    let otp = Math.floor(Math.random() * 900000 + 100000);
    await Otp.create({
      email: datas.email,
      otp: otp,
      type: datas.type,
    });
    const data = {
      email: datas.email,
      subject: "[Nexora LMS] Mã xác thực đặt lại mật khẩu của bạn",
      html: `
       <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 36px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      
      <!-- Header Logo -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%); width: 44px; height: 44px; border-radius: 12px; line-height: 44px; color: #ffffff; font-weight: 900; font-size: 20px;">
          N
        </div>
        <h2 style="color: #0f172a; margin: 12px 0 0 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">Nexora LMS</h2>
      </div>

      <!-- Tiêu đề chính -->
      <h3 style="color: #1e293b; font-size: 17px; font-weight: 700; margin-bottom: 12px; text-align: center;">
        Yêu cầu đặt lại mật khẩu
      </h3>

      <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
        Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản Nexora của bạn. Vui lòng sử dụng mã xác thực bên dưới để tiếp tục:
      </p>

      <!-- Khung hiển thị mã OTP -->
      <div style="background: #fff7ed; border: 2px dashed #fdba74; border-radius: 14px; padding: 20px; text-align: center; margin: 24px 0;">
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #ea580c; font-family: monospace;">
          ${otp}
        </span>
      </div>

      <!-- Cảnh báo thời gian -->
      <p style="color: #64748b; font-size: 13px; text-align: center; margin: 0 0 24px 0;">
        ⏱️ Mã này có hiệu lực trong vòng <strong>5 phút</strong>.
      </p>

      <!-- Ghi chú bảo mật -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; color: #94a3b8; font-size: 12px; line-height: 1.5;">
        <p style="margin: 0 0 6px 0;">• Tuyệt đối không chia sẻ mã này cho bất kỳ ai.</p>
        <p style="margin: 0;">• Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email hoặc đổi mật khẩu để bảo vệ tài khoản.</p>
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
      <p style="margin: 0;">© 2026 Nexora LMS. Nền tảng học tập trực tuyến thông minh.</p>
    </div>
  </div>
`,
    };
    const result = await ServiceEmail(data);
    return result;
  } catch (error) {
    console.log("Error occurred while resetting password:", error);
    throw error;
  }
};

const loginByGoogleService = async (googleToken) => {
  if (!googleToken) {
    throw { status: 400, message: "Thiếu Google Token!" };
  }
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  if (!client) {
    throw { status: 404, message: "Mã hết hạn hoặc không tồn tại!" };
  }
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { sub: googleId, email, name, picture } = ticket.getPayload();
  const isAccount = await User.findOne({
    $or: [{ googleId: googleId }, { email: email }],
  });
  if (isAccount && isAccount.status === "inactive") {
    throw { status: 403, message: "Tài khoản bị khóa!" };
  }
  if (isAccount) {
    if (isAccount.googleId != googleId) {
      isAccount.googleId = googleId;
      isAccount.isVerified = true;
      await isAccount.save();
    }
  }

  if (!isAccount) {
    const result = await User.create({
      name: name,
      email: email,
      password: null,
      role: "student",
      avatar: picture,
      status: "active",
      phone: "",
      isVerified: true,
      googleId: googleId,
    });
    const payload = { userId: result._id, role: result.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }
  const payload = { userId: isAccount._id, role: isAccount.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = {
  forgotPasswordService,
  loginUser,
  registerUser,
  sendOtpEmailService,
  loginByGoogleService,
};
