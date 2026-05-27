import api from "../../../shared/api/axiosClient";

const GetTitle = async (id) => {
  const request = await api.get(`/lession/${id}`);

  return request;
};
const CreateLession = async (data) => {
  const request = await api.post(`/create_lession`, data);
  return request;
};
const DeleteLessionbyid = async (data) => {
  const request = await api.delete(`/delete_lession/${data}`);
  return request;
};
const UpdateLessionbyid = async (data) => {
  const request = await api.delete(`/update_lession/${data}`);
  return request;
};
export { GetTitle, CreateLession, DeleteLessionbyid, UpdateLessionbyid };
