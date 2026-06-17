import api from "../../../shared/api/axiosClient";

const GetTitle = async (id) => {
  const request = await api.get(`/lession/${id}`);

  return request;
};
const CreateLession = async (data) => {
  const request = await api.post(`/create_lession`, data);
  return request;
};
const DeleteLessionbyid = async (data) => {
  const request = await api.delete(`/delete_lession/${data}`);
  return request;
};
const UpdateLessionbyid = async (lessionId, formData) => {
  const request = await api.put(`/update_lession/${lessionId}`, formData);
  return request;
};
const GetLessionbyid = async (lessionId) => {
  const request = await api.get(`/get_lessionbyupdate/${lessionId}`);
  return request;
};
const CreateQuiz = async (lessionId, data) => {
  const request = await api.put(`/create_quizz/${lessionId}`, data);
  return request;
};
export {
  GetTitle,
  CreateLession,
  DeleteLessionbyid,
  UpdateLessionbyid,
  GetLessionbyid,
  CreateQuiz,
};
