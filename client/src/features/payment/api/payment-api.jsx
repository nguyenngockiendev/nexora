import api from "../../../shared/api/axiosClient";

const paymentCourse = async (newdata) => {
  const res = await api.put(`/create-payment`, newdata);
  return res;
};

const resumepaymentCourse = async (orderId) => {
  const res = await api.put(`/resume-payment/${orderId}`);
  return res;
};
const orderHistory = async () => {
  const res = await api.get(`order_history`);
  return res;
};
const deleteorderHistory = async (orderId) => {
  const res = await api.delete(`delete-order/${orderId}`);
  return res;
};
export { paymentCourse, orderHistory, resumepaymentCourse, deleteorderHistory };
