import api from "../../../shared/api/axiosClient";

const SaveProcess = async ({ courseId, lessonId, lastPosition }) => {
  const request = await api.patch(`/process-lesson/${courseId}/${lessonId}`, {
    lastPosition,
  });
  return request;
};

export { SaveProcess };
