import api from "../../../shared/api/axiosClient";

const CreateClass = async (data, courseId) => {
  const request = await api.post(`/create-class/${courseId}`, data);
  return request;
};
const GetClassbyInstructor = async () => {
  const request = await api.get(`/get-class-by-instructor`);

  return request;
};
const UpdatClassById = async (data, classId) => {
  const request = await api.put(`/classes/${classId}`, data);

  return request;
};
const ChangeStatus = async (classId, status) => {
  const request = await api.put(`/change/status/${classId}`, { status });
  return request;
};

const JoiClassByUser = async (classId) => {
  const request = await api.get(`/get-class/${classId}`);
  
  return request;
};

const CourseClassDetails = async (courseId) => {
  const request = await api.get(`/details-class/${courseId}`);

  return request;
};
export {
  CreateClass,
  GetClassbyInstructor,
  UpdatClassById,
  ChangeStatus,
  JoiClassByUser,
  CourseClassDetails
};
