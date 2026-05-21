import api from "./api";

const GetAllUserByAdmin = async () => {
  const request = await api.get(`/admin/users`);
  return request;
};
const GetUserById = async (userId) => {
  const request = await api.get(`/admin/users/${userId}`);
  return request;
};
const ChangeStatusById = async (userId) => {
  const request = await api.patch(`/admin/users/${userId}/status`);
  return request;
};
const ChangerolesById = async (userId) => {
  const request = await api.patch(`/admin/users/${userId}/role`);
  return request;
};
const GetStudentOnClasss = async (classId) => {
  const request = await api.get(`/instructor/classes/${classId}/students`);
  return request;
};
const RemoveStudent= async (classId, studentId) => {
  const request = await api.get(
    `/instructor/classes/${classId}/students/${studentId}`,
  );
  return request;
};

export {
  GetAllUserByAdmin,
  GetUserById,
  ChangeStatusById,
  ChangerolesById,
  GetStudentOnClasss,
  RemoveStudent,
};
