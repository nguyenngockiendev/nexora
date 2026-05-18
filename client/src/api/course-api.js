import api from "./api";
const GetCourses = async () => {
  const res = api.get(`/courses`);
  return res;
};

const CreateCourses = async (data) => {
  const res = api.post(`/newcourses`, data);
  return res;
};
const GetLession = async (id) => {
  const res = api.get(`/get_lession/${id}`);
  return res;
};
const paymentCourse = async (courseId,newdata) => {
  const res = await api.put(`/create-payment/${courseId}`,newdata);
  window.location.href = res.url;
  return res;
};

export { GetCourses, CreateCourses, GetLession, paymentCourse };
