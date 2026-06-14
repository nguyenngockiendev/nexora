import { useEffect, useState } from "react";
import { GetClassbyInstructor } from "../api/class-api";

const useGetclassByIntructor = (classId) => {
  const [classs, setClasss] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getclass = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await GetClassbyInstructor(classId);

      setClasss(result);

      setLoading(false);
    } catch (error) {
      const message = error.response?.data?.message || "no result courses";
      setError(message);
    }
  };
  useEffect(() => {
    getclass();
  }, [classId]);

  return { classs, error, loading,getclass};
};

export { useGetclassByIntructor };
