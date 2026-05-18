import { useState } from "react";
import { paymentCourse } from "../../api/course-api";

const usePayment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const payment = async (courseId,data) => {
    try {
      const newdata ={
        type:data.type,
        classId:data.classId || null
      }
      console.log("newdata ",newdata)
      console.log("courseId ",courseId)
      setLoading(true);
      setError(null);
      const res = await paymentCourse(courseId,newdata);
      console.log("payment res",res);
      setLoading(false);
      
    } catch (error) {
        console.log("payment error",error);
        const message = error.response?.data?.message || "payment failed!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return { payment, error, loading };
};
export default usePayment;
