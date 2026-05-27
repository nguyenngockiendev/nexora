import api from "../../../shared/api/axiosClient";

const paymentCourse = async (courseId,newdata) => {
  const res = await api.put(`/create-payment/${courseId}`,newdata);
  window.location.href = res.url;
  return res;
};
export {paymentCourse}