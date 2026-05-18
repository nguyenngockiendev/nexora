import api from "./api";

const getTitle = async (id) => {
  const request = await api.get(`/lession/${id}`);

  return request;
};
const createLession = async (data) => {
  const request = await api.post(`/create_lession`,data);
  return request;
};
const DeleteLessionbyid = async (data)=>{
  const request = await api.delete(`/delete_lession/${data}`)
  return request;
}
const UpdateLessionbyid = async (data)=>{
  const request = await api.delete(`/update_lession/${data}`)
  return request;
}
export { getTitle ,createLession,DeleteLessionbyid,UpdateLessionbyid};
