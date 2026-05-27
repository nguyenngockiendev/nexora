import api from "../../../shared/api/axiosClient";

const loginUser = async (email, password) => {
  const request = await api.post("/login", { email, password });
  return request;
};

const registerUser = async (data) => {
  const request = await api.post("/register", data);
  return request;
};

const forgotpasswordUser = async (data) => {
  const request = api.post("/fogot-password", {
    email: data.email,
    newPassword: data.newpassword,
  });
  return request;
};

export { loginUser, registerUser, forgotpasswordUser };
