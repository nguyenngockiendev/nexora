import { useEffect, useState } from "react";
import { GetCourses } from "../../api/course-api";
import { CourseClassDetails } from "../../api/class-api";

const useDetailsCourse = (courseId) => {
  const [detalscourse, setDetalscourse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const detailsCoures = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await CourseClassDetails(courseId);
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
  return { detalscourse, error, loading };
};

export { useDetailsCourse };
