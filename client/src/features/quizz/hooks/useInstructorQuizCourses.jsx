import { useState, useEffect, useCallback } from "react";
import {
  GetRecordedCourses,
  ManagerResultQuizz,
  UpdateRetakebyIns,
  GetInstructorLiveClasses,
  GetTrackingAssignments,
  GradeAssignmentSubmission,
} from "../api/quizz-api";

const useInstructorQuizCourses = (mode = "recorded") => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [resultQuizz, setResultQuizz] = useState([]);

  const fetchCourses = useCallback(async (customMode = mode) => {
    try {
      setError(null);
      setLoading(true);
      const res =
        customMode === "assessments"
          ? await GetInstructorLiveClasses()
          : await GetRecordedCourses();
      setCourses(Array.isArray(res) ? res : []);
      return res;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Lỗi khi lấy danh sách khóa học / lớp học";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [mode]);

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
        err.response?.data?.message || "Lỗi khi lấy kết quả bài thi";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getTrackingAssignments = async (classId) => {
    try {
      setError(null);
      setLoading(true);
      const res = await GetTrackingAssignments(classId);
      setResultQuizz(Array.isArray(res) ? res : []);
      return res;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Lỗi khi lấy danh sách bài tập";
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

  const gradeSubmission = async (submissionId, data) => {
    try {
      setError(null);
      setLoading(true);
      const res = await GradeAssignmentSubmission(submissionId, data);
      return res;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Lỗi khi chấm điểm bài tập";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(mode);
  }, [mode, fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: () => fetchCourses(mode),
    getResultquizz,
    getTrackingAssignments,
    resultQuizz,
    setResultQuizz,
    updateStatusRetake,
    gradeSubmission,
  };
};

export default useInstructorQuizCourses;
