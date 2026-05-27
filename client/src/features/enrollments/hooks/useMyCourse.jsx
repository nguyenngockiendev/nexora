import { useEffect, useState } from "react";
import { Enrollments } from "../api/enrollments-api";

const useMycourse = () => {
  const [courses, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getenrollment = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await Enrollments();
        setCourse(result);
        setLoading(false);
      } catch (error) {
        const message = error.response?.data?.message || "no result courses";
        setError(message);
      }
    };
    getenrollment();
  }, []);

  return { courses, error, loading };
};

export { useMycourse };
