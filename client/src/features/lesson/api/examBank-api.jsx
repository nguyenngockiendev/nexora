import api from "../../../shared/api/axiosClient";

export const ScanPdfAI = async (courseId, formData) => {
  const response = await api.post(`/scan_pdf/${courseId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const CreateExamBank = async (data) => {
  const response = await api.post(`/exam-bank/create`, data);
  return response;
};

export const GetExamsByCourse = async (courseId) => {
  const response = await api.get(`/exam-bank/${courseId}`);
  return response;
};

export const GetExamDetail = async (examId) => {
  const response = await api.get(`/exam-bank/detail/${examId}`);
  return response;
};

export const DeleteExam = async (examId) => {
  const response = await api.delete(`/exam-bank/${examId}`);
  return response;
};

export const SyncFocusExam = async (courseId) => {
  const response = await api.post(`/exam-bank/focus/sync/${courseId}`);
  return response;
};

export const GetFocusExam = async (courseId) => {
  const response = await api.get(`/exam-bank/focus/${courseId}`);
  return response;
};

export const GetDedupExam = async (courseId) => {
  const response = await api.post(`/exam-bank/dedup/${courseId}`);
  return response;
};
