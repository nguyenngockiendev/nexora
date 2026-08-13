import { useEffect, useState } from "react";

import { GetrecordedCourse } from "../api/lession-api";

const useInsLessionCourse = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lsCourse, setLscourse] = useState([]);

  useEffect(() => {
    const getlescouses = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await GetrecordedCourse();

        setLscourse(res);
      } catch (error) {
        const message = error.response?.data?.message || "error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    getlescouses();
  }, []);

  return { loading, error, lsCourse };
};
export default useInsLessionCourse;
