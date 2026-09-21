import api from "../../../shared/api/axiosClient";

const loginUser = async (email, password) => {
  const request = await api.post("/login", { email, password });
  return request;
};

const registerUser = async (data) => {
  const request = await api.post("/register", data);
  return request;
};

const senOtpAPI = async (data) => {
  const request = api.post("/send_otp", data);
  return request;
};
const forgotPassAPI = async (data) => {
  const request = api.post("/forgot-password", data);
  return request;
};
const loginByGooleAPI = async (googleToken) => {
  const request = await api.post("/login_google", { googleToken });
  return request;
};

export { loginUser, registerUser, senOtpAPI, loginByGooleAPI, forgotPassAPI };
