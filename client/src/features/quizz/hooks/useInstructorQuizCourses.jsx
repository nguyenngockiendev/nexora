import { useState, useEffect } from "react";
import {
  GetRecordedCourses,
  ManagerResultQuizz,
  UpdateRetakebyIns,
} from "../api/quizz-api";

const useInstructorQuizCourses = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [resultQuizz, setResultQuizz] = useState([]);

  const fetchCourses = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await GetRecordedCourses();
      setCourses(Array.isArray(res) ? res : []);
      return res;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Lỗi khi lấy danh sách khóa học";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  const getResultquizz = async (courseId) => {
    try {
      setError(null);
      setLoading(true);
      const res = await ManagerResultQuizz(courseId);
      setResultQuizz(Array.isArray(res) ? res : []);
      return res;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Lỗi khi lấy danh sách khóa học";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  const updateStatusRetake = async (quizattempsId, courseId) => {
    try {
      setError(null);
      setLoading(true);
      const res = await UpdateRetakebyIns(quizattempsId, courseId);
      return res;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Lỗi khi cập nhật trạng thái";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
    getResultquizz,
    resultQuizz,
    updateStatusRetake
  };
};

export default useInstructorQuizCourses;
