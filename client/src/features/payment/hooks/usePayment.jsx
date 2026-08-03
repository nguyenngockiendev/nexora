import { useEffect, useState } from "react";
import { deleteorderHistory, orderHistory, paymentCourse, resumepaymentCourse } from "../api/payment-api";
import { toast } from "react-toastify";

const usePayment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const orderhistory = async () => {
      try {
        setLoading(false);
        const res = await orderHistory();
        setOrder(res);
      } catch (error) {
        console.log(error);
      }
    };
    orderhistory();
  }, []);
  

  const payment = async (courseId, data) => {
    try {
      const newdata = {
        type: data.type,
        classId: data.classId || null,
      };
      setLoading(true);
      setError(null);
      const res = await paymentCourse(courseId, newdata);
      console.log("payment res", res);
      setLoading(false);

      if (res && res.url) {
        window.location.href = res.url;
      } else if (res && res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log("payment error", error);
      const message = error.response?.data?.message || "payment failed!";
      setError(message);
      toast.error(message); // 🔔 HIỂN THỊ TOAST LỖI CHO NGƯỜI DÙNG
    } finally {
      setLoading(false);
    }
  };

   const Resumepayment = async (orderId) => {
    try {
     ;
      setLoading(true);
      setError(null);
      const res = await resumepaymentCourse(orderId);
      console.log("payment res", res);
      setLoading(false);

      if (res && res.url) {
        window.location.href = res.url;
      } else if (res && res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log("payment error", error);
      const message = error.response?.data?.message || "payment failed!";
      setError(message);
      toast.error(message); // 🔔 HIỂN THỊ TOAST LỖI CHO NGƯỜI DÙNG
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
        setOrder((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        throw new Error("Delete order failed!");
      }
    } catch (error) {
      console.log("delete order error", error);
      const message = error.response?.data?.message || "Delete order failed!";
      setError(message);
      toast.error(message); 

    }
    finally {
      setLoading(false);
    }
  }
  return { payment, error, loading ,order,Resumepayment,deleteOrder};
};
export default usePayment;
