import api from "./api";

const enrollments = async () => {
  const request = await api.get("/enrollments");
  return request;
};
const checkEnrollment = async (courseId) => {
  const request = await api.get(`/courses/${courseId}/lession`);
  return request;
};
export { enrollments, checkEnrollment };
