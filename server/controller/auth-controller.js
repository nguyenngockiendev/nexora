const {
  loginUser,
  registerUser,
  loginByGoogleService,
  sendOtpEmailService,
  forgotPasswordService,
} = require("../service/auth-service");
const uploadFile = require("../service/uploadfile-service");

const forgotPasswordController = async (req, res) => {
  try {
    const data = {
      newPassword: req.body.newPassword,
      otp: req.body.otp,
      email: req.body.email,
      type: req.body.type,
    };

    const result = await forgotPasswordService(data);
    res.status(200).json({
      success: true,
      message:
        "Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
const LoginByGoogleController = async (req, res) => {
  try {
    const googleToken = req.body.googleToken;
    const result = await loginByGoogleService(googleToken);
    res.status(201).json({
      success: true,
      message: "Thành công!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
const AuthController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const RegisterController = async (req, res) => {
  try {
    let avatar = "";
    if (req?.file) {
      avatar = await uploadFile(req?.file?.path, false);
    }

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      repeatpassword: req.body.repeatpassword,
      avatar: avatar.secure_url,
    };
    const result = await registerUser(data);
    res.status(201).json({
      success: true,
      message: "Tạo Tài Khoản Thành công!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

const SenOtpController = async (req, res) => {
  try {
    const datas = { email: req.body.email, type: req.body.type };
    await sendOtpEmailService(datas);
    res.status(201).json({
      success: true,
      message: "Gửi OTP thành công,hãy kiểm tra hòm thư của bạn!",
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

module.exports = {
  forgotPasswordController,
  AuthController,
  RegisterController,
  SenOtpController,
  LoginByGoogleController,
};
