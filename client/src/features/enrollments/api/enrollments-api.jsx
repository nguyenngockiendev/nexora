import api from "../../../shared/api/axiosClient";

const Enrollments = async () => {
  const request = await api.get("/enrollments");
  return request;
};
const CheckEnrollment = async (courseId) => {
  const request = await api.get(`/courses/${courseId}/lession`);
  return request;
};
export { Enrollments,CheckEnrollment };
