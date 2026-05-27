import { useState } from "react";
import { CreateCourses } from "../api/course-api";


const useCoursesService = () => {
  const [error, setError] = useState(null);
 
  const Create = async (data) => {
    try {
      setError(null);
      const res = await CreateCourses(data);
      setError(res?.data?.message);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setError(message);
    }
  };
  return { error, Create };
};
export default useCoursesService;
