import { useState } from "react";
import {
  IsLookedCourseAndLessionByAdmin,
  ManagerCoursebyAdmin,
} from "../api/course-api";

const useManagerCoursebyAdmin = () => {
  const [courses, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getcourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ManagerCoursebyAdmin();
      setCourse(result);
    } catch (error) {
      const message = error.response?.data?.message || "no result courses";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  const updateStatusCourseAndLession = async (courseId, status) => {
    try {
      setLoading(true);
      setError(null);
      const res = await IsLookedCourseAndLessionByAdmin(courseId, status);
      if (res) {
        return res;
      }
    } catch (error) {
      const message = error.response?.data?.message || "no result courses";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { courses, error, loading, getcourses, updateStatusCourseAndLession };
};

export default useManagerCoursebyAdmin;
