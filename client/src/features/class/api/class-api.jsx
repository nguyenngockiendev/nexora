import api from "../../../shared/api/axiosClient";

const CreateClass = async (data, courseId) => {
  const request = await api.post(`/create-class/${courseId}`, data);
  return request;
};
const GetClassbyInstructor = async (courseId) => {
  const request = await api.get(`/get-class-by-instructor/${courseId}`);
  return request;
};
const UpdatClassById = async (data, classId) => {
  const request = await api.put(`/classes/${classId}`, data);

  return request;
};
const ChangeStatus = async (data) => {
  const request = await api.put(`/change/status/${data?.classId}`, {
    status: data?.status,
  });
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
const GetStudentsByIntructor = async (data) => {
  const request = await api.get(
    `/instructor/classes/${data?.classId}/students`,
  );
  return request;
};
const RemoveStudentinClass = async (data) => {
  const request = await api.patch(
    `instructor/classes/${data.classId}/students/${data.studentId}`,
    { status: data.status },
  );
  return request;
};

const RefectStudent = async (data) => {
  const request = await api.patch(
    `/instructor/refect-classes/${data.classId}/students/${data.studentId}`,
    { status: data.status },
  );
  return request;
};
export {
  CreateClass,
  GetClassbyInstructor,
  UpdatClassById,
  ChangeStatus,
  JoiClassByUser,
  CourseClassDetails,
  GetStudentsByIntructor,
  RemoveStudentinClass,
  RefectStudent,
};
