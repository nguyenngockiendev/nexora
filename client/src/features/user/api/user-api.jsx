import api from "../../../shared/api/axiosClient";

const GetAlluserByAdmin = () => {
  const request = api.get(`/admin/users`);
  return request;
};
const GetDatelsuserByAdmin = (userId) => {
  const request = api.get(`/admin/users/${userId}`);
  return request;
};
const Changerole = (data) => {
  const request = api.patch(`/admin/users/${data.id}/status`, {
    status: data?.status,
  });
  return request;
};
const BecomeInstructor = (data) => {
  const request = api.post(`/become-instructor`, data);
  return request;
};
const ResponInstructor = (data) => {
  const request = api.put(`/res-instructor`, data);
  return request;
};
const GetPendingRequestsByAdmin = () => {
  const request = api.get(`/admin/teacher-requests`);
  return request;
};
export {
  GetAlluserByAdmin,
  GetDatelsuserByAdmin,
  Changerole,
  BecomeInstructor,
  ResponInstructor,
  GetPendingRequestsByAdmin,
};
