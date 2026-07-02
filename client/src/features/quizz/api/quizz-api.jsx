import api from "../../../shared/api/axiosClient";

const CreateQuiz = async (lessionId, data) => {
  const request = await api.post(`/create_quizz/${lessionId}`, data);
  return request;
};
const GetQuizzByid = async (lessonId) => {
  const request = await api.get(`/get_quizz/${lessonId}`);
  return request;
};
const UpdateQuizzByid = async (lessonId, data) => {
  const request = await api.put(`/upadate_quizz/${lessonId}`, data);
  return request;
};
const CreateAttempQuiz = async(lessonId,data)=>{
  const request = await api.post(`/create_attemp/quizz/${lessonId}`, data);
  return request;
}
const GetAttemsp = async(lessonId)=>{
  const request = await api.get(`/get_attemp/${lessonId}`);
  return request;
}
export { CreateQuiz, GetQuizzByid, UpdateQuizzByid,CreateAttempQuiz,GetAttemsp};
