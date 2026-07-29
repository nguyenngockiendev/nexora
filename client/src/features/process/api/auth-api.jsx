import api from "../../../shared/api/axiosClient";

const SaveProcess = async ({ courseId, lessonId, lastPosition }) => {
  const request = await api.patch(`/process-lesson/${courseId}/${lessonId}`, {
    lastPosition,
  });
  return request;
};

const GetProcessbyLession = async (lessonId) => {
  const request = await api.get(`/process/${lessonId}`,);
  return request;
};

const GetAllProcess = async (courseId) => {
  const request = await api.get(`/process/course/${courseId}`);
  return request;
};

export { SaveProcess, GetProcessbyLession, GetAllProcess };
