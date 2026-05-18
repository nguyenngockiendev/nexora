import { useEffect, useState } from "react";
import { GetCourses } from "../../api/course-api";

const useGetCourses = () => {
  const [courses, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
useEffect(() => {
  getcourses();
}, []);

  const getcourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await GetCourses();
      
      setCourse(result);
      setLoading(false);
    } catch (error) {
      const message = error.response?.data?.message || "no result courses";
      setError(message);
    }
  };
  return { courses, error, loading, getcourses };
};


export { useGetCourses };
