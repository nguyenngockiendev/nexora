import api from "../../../shared/api/axiosClient";

const Enrollments = async () => {
  const request = await api.get("/enrollments");
  return request;
};
const CheckEnrollment = async (courseId, classId) => {
  const request = await api.get(classId ? `/courses/${courseId}/classes/${classId}/lessons` : `/courses/${courseId}/lession`);
  return request;
};
export { Enrollments,CheckEnrollment };
