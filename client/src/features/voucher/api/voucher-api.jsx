import api from "../../../shared/api/axiosClient";

const createVoucherAPI = (data) => {
  const request = api.post(`/vouchers`, data);
  return request;
};
const getVoucherAPI = () => {
  const request = api.get(`/vouchers`);
  return request;
};
const updateVoucherAPI = (vouchersid, data) => {
  const request = api.put(`/vouchers/${vouchersid}`, data);
  return request;
};
const updateStatusVoucherAPI = (vouchersid, status) => {
  const request = api.patch(`/vouchers/${vouchersid}/status`, {
    status: status,
  });
  return request;
};
const deleteVoucherAPI = (vouchersid) => {
  const request = api.delete(`/vouchers/${vouchersid}`);
  return request;
};
export {
  deleteVoucherAPI,
  createVoucherAPI,
  getVoucherAPI,
  updateVoucherAPI,
  updateStatusVoucherAPI,
};
