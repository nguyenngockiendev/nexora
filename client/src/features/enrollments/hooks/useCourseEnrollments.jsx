import { useEffect, useState } from "react";
import { CheckEnrollment } from "../api/enrollments-api";



const useCourseEnrollments = (data, classId) => {
  const [enrollment, setEnrollment] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
useEffect(() => {
   const checkEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await CheckEnrollment(data, classId);
      setEnrollment(result);
      setLoading(false);
    } catch (error) {
      const message = error.response?.data?.message || "no result courses";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  checkEnrollments();
}, [data, classId]);

 
  return { enrollment, error, loading};
};


export { useCourseEnrollments };
