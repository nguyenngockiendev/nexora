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
const CreateAttempQuiz = async (lessonId, data) => {
  const request = await api.post(`/create_attemp/quizz/${lessonId}`, data);
  return request;
};
const GetAttemsp = async (lessonId) => {
  const request = await api.get(`/get_attemp/${lessonId}`);
  return request;
};
const GetCourseForQuizz = async () => {
  const res = await api.get("instructor/courses-with-lessons");
  return res;
};
const GetQuizExam = async () => {
  const res = await api.get(`student/quizzes`);
  return res;
};

const GenAIForQuizz = async (lessionId, questionCount) => {
  const res = await api.get(
    `generate/${lessionId}/quizz?questionCount=${questionCount}`,
  );
  return res;
};
export {
  CreateQuiz,
  GetQuizzByid,
  UpdateQuizzByid,
  CreateAttempQuiz,
  GetAttemsp,
  GetCourseForQuizz,
  GetQuizExam,
  GenAIForQuizz,
};
