const {
  loginUser,
  registerUser,
  resetPassword,
} = require("../service/auth-service");
const uploadFile = require("../service/uploadfile-service");

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
      avatar = await uploadFile(req?.file?.path);
    }

    const data = { ...req.body, avatar: avatar };
    const result = await registerUser(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const ResetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await resetPassword(email, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  AuthController,
  RegisterController,
  ResetPasswordController,
};
