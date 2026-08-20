import api from "../../../shared/api/axiosClient";

const UsersendMess = async (data) => {
  const request = await api.post("/User_send", data);
  return request;
};
const AdminsendMess = async (receiverId, data) => {
  const request = await api.post(`/admin/Notification/${receiverId}`, data);
  return request;
};
const GetALLbyAdmin = async () => {
  const request = await api.get("/admin/getAll");
  return request;
};
const GetMessByuser = async () => {
  const request = await api.get("/user_getNotification");
  return request;
};
export { UsersendMess, AdminsendMess, GetALLbyAdmin, GetMessByuser };
