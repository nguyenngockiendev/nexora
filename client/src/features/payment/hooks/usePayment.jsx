import { useState } from "react";
import {
  deleteorderHistory,
  orderHistory,
  paymentCourse,
  resumepaymentCourse,
} from "../api/payment-api";
import { toast } from "react-toastify";

const usePayment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [qrpayment, setQrpayment] = useState(null);

  const orderhistory = async () => {
    try {
      setLoading(false);
      const res = await orderHistory();
      setOrder(res);
    } catch (error) {
      console.log(error);
    }
  };

  const payment = async (data) => {
    try {
      const isArr = Array.isArray(data) ? data : [data];
      const newdata = {
        items: isArr.map((item) => ({
          courseId: item.courseId?._id || item.courseId || item._id,
          classId: item?.classId || null,
          type: item.type,
          price: item.price,
        })),
      };
      setLoading(true);
      setError(null);
      const res = await paymentCourse(newdata);
      setQrpayment(res);
    } catch (error) {
      const message = error.response?.data?.message || "payment failed!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const Resumepayment = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await resumepaymentCourse(orderId);
      setQrpayment(res);
    } catch (error) {
      console.log("payment error", error);
      const message = error.response?.data?.message || "payment failed!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  const deleteOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await deleteorderHistory(orderId);
      setLoading(false);

      if (res) {
        toast.success("đã xóa đơn hàng thành công!");
        setOrder((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId),
        );
      } else {
        throw new Error("Delete order failed!");
      }
    } catch (error) {
      console.log("delete order error", error);
      const message = error.response?.data?.message || "Delete order failed!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return {
    qrpayment,
    setQrpayment,
    payment,
    error,
    loading,
    order,
    Resumepayment,
    deleteOrder,
    orderhistory,
  };
};

export default usePayment;
