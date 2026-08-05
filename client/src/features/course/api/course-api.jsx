import api from "../../../shared/api/axiosClient";

const GetCourses = async () => {
  const res = await api.get(`/courses`);
  return res;
};

const CreateCourses = async (data) => {
  const res = await api.post(`/newcourses`, data);
  return res;
};
const GetLession = async (id) => {
  const res = await api.get(`/get_lession/${id}`);
  return res;
};
const GetDetailsCourse = async (courseId) => {
  const res = await api.get(`/details-course/${courseId}`);
  console.log("res", res);
  return res;
};

export { GetCourses, CreateCourses, GetLession, GetDetailsCourse };
