import {useState } from "react";
import { GetCourses, GetCoursesforevery } from "../api/course-api";

const useGetCourses = () => {
  const [courses, setCourse] = useState([]);
  const [coursesall, setCourseall] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getcourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await  GetCoursesforevery();
      setCourse(result);
      setLoading(false);
    } catch (error) {
      const message = error.response?.data?.message || "no result courses";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getcoursesAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await GetCourses();
      setCourseall(result);
      setLoading(false);
    } catch (error) {
      const message = error.response?.data?.message || "no result courses";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { courses,coursesall, error, loading ,getcourses ,getcoursesAll};
};

export default useGetCourses;
