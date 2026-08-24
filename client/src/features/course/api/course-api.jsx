import api from "../../../shared/api/axiosClient";

const GetCourses = async () => {
  const res = await api.get(`/courses`);
  return res;
};
const GetCoursesforevery = async () => {
  const res = await api.get(`/courses_all`);
  return res;
};

const CreateCourses = async (data) => {
  const res = await api.post(`/newcourses`, data);
  return res;
};
const UpdateCourses = async (courseId,data) => {
  const res = await api.put(`/update_course/${courseId}`, data);
  return res;
};
const GetLession = async (id) => {
  const res = await api.get(`/get_lession/${id}`);
  return res;
};
const GetDetailsCourse = async (courseId) => {
  const res = await api.get(`/details-course/${courseId}`);
  return res;
};

const CreateAndUpRating = async (courseId, data) => {
  const res = await api.post(`/courses/${courseId}/ratings`, data);
  return res;
};
const GetRatings = async (courseId) => {
  const res = await api.get(`/courses/${courseId}/ratings`);
  return res;
};
const DeleteRating = async (ratingId) => {
  const res = await api.delete(`/ratings/${ratingId}`);
  return res;
};
const ManagerCoursebyAdmin = async () => {
  const res = await api.get(`/admin/courses/quality-control`);
  return res;
};
const IsLookedCourseAndLessionByAdmin = async (courseId, status) => {
  console.log(courseId,status)
  const res = await api.patch(`/admin/courses/${courseId}/status`, {
    status: status,
  });
  return res;
};

export {
  UpdateCourses,
  GetCourses,
  CreateCourses,
  GetLession,
  GetDetailsCourse,
  CreateAndUpRating,
  GetRatings,
  DeleteRating,
  ManagerCoursebyAdmin,
  IsLookedCourseAndLessionByAdmin,
  GetCoursesforevery
};
