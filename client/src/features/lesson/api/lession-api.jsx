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
  const request = await api.post(`/create_quizz/${lessionId}`, data);
  return request;
};
const GetQuizzByid = async (lessionId) => {
  const request = await api.get(`/get_quizz/${lessionId}`);
  return request;
};
const UpdateQuizzByid = async (lessonId, data) => {
  const request = await api.put(`/upadate_quizz/${lessonId}`, data);
  return request;
};

const GetrecordedCourse = async () => {
  const request = await api.get(`/instructor/recorded-courses`);
  return request;
};
const GetLessionDetails = async (courseId) => {
  const request = await api.get(`/lessions/${courseId}`);
  return request;
};
export {
  GetTitle,
  CreateLession,
  DeleteLessionbyid,
  UpdateLessionbyid,
  GetLessionbyid,
  CreateQuiz,
  GetQuizzByid,
  UpdateQuizzByid,
  GetrecordedCourse,
  GetLessionDetails,
};
