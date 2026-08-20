const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw { status: 401, message: "Tài khoản không chính xác!" };
    }
    if (user.status === "inactive") {
      throw {
        status: 401,
        message: "Tài khoản bị cấm hoặc chưa được kích hoạt !",
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
    const exitUser = await User.findOne({ email: data.email });
    if (exitUser) {
      throw { status: 400, message: "Email đã tồn tại" };
    }
    if (data.password !== data.repeatpassword) {
      throw { status: 400, message: "Mật khẩu không trùng" };
    }
    const hashpassword = await bcrypt.hash(
      data.password,
      parseInt(process.env.SALT_ROUNDS),
    );

    const newUser = new User({
      ...data,
      password: hashpassword,
      role: "student",
      avatar: data.avatar || "",
    });

    await newUser.save();
    return { message: "Create account succesfully" };
  } catch (error) {
    console.error("Error occurred while registering user:", error);
    throw error;
  }
};

const resetPassword = async (email, newPassword) => {
  try {
    const emailUser = await User.findOne({ email: email });
    if (!emailUser) {
      throw { status: 404, message: "Email không tồn tại" };
    }

    const hashpassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS),
    );
    emailUser.password = hashpassword;

    await emailUser.save();
    return { message: "đổi mật khẩu thành công" };
  } catch (error) {
    console.log("Error occurred while resetting password:", error);
    throw error;
  }
};
module.exports = { loginUser, registerUser, resetPassword };
