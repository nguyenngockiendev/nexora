import { useEffect, useState } from "react";
import { GetDetailsCourse } from "../api/course-api";

const useDetails = (courseId) => {
  const [detalscourse, setDetalscourse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const detailsCoures = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await GetDetailsCourse(courseId);
        setDetalscourse(result);
        setLoading(false);
      } catch (error) {
        const message = error.response?.data?.message || "no result courses";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    detailsCoures();
  }, [courseId]);
  console.log("detalscourse", detalscourse);
 return { detalscourse, error, loading };
};

export { useDetails };
