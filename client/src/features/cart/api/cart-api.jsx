import api from "../../../shared/api/axiosClient";

const getVoucherPreviewAPI = async (data) => {
  const res = await api.post(`/vouchers_preview`,data);
  return res;
};
export { getVoucherPreviewAPI };
