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
export { GetAlluserByAdmin, GetDatelsuserByAdmin, Changerole };
