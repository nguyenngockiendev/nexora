import { useState } from "react";
import { CreateCourses, UpdateCourses } from "../api/course-api";

const useCoursesService = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const updateCourse = async (courseId, data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await UpdateCourses(courseId, data);
      setError(res?.data?.message);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return { error, Create, updateCourse,loading };
};
export default useCoursesService;
