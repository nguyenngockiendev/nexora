import { useEffect, useState, useMemo } from "react";
import { Enrollments } from "../../enrollments/api/enrollments-api";
import { GetRecordedCourses } from "../api/quizz-api";

const useExamBankCourses = () => {
  const [rawCourses, setRawCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          const enrolled = await Enrollments();
          if (Array.isArray(enrolled) && enrolled.length > 0) {
            setRawCourses(enrolled);
            return;
          }
        } catch {
          // Nếu tài khoản chưa mua khóa học (VD: Admin/Instructor), fallback lấy khóa học quản lý
        }

        const ownCourses = await GetRecordedCourses();
        if (Array.isArray(ownCourses) && ownCourses.length > 0) {
          setRawCourses(ownCourses);
        }
      } catch (err) {
        const message =
          err.response?.data?.message || "Không thể tải danh sách môn học";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const courses = useMemo(() => {
    if (!Array.isArray(rawCourses)) return [];
    const seen = new Set();
    const list = [];

    for (const item of rawCourses) {
      const courseObj = item?.courseId || item;
      const cid = courseObj?._id || courseObj?.id;
      if (!cid || seen.has(String(cid))) continue;
      seen.add(String(cid));

      let studied = 0;
      try {
        const saved = localStorage.getItem(
          `nexora_exam_progress_${cid}_focus_all`,
        );
        if (saved) {
          const parsed = JSON.parse(saved);
          studied = Object.keys(parsed.answers || {}).length;
        }
      } catch {
        // ignore
      }

      list.push({
        _id: cid,
        id: cid,
        courseCode: (courseObj.type || item.type || "COURSE").toUpperCase(),
        courseName:
          courseObj.title || courseObj.courseName || "Môn học ôn thi",
        semester: courseObj.level || "Đã kích hoạt",
        focusCount: 60,
        uniqueCount: "Toàn bộ",
        studiedQuestions: studied,
        status: studied >= 60 ? "COMPLETED" : "STUDYING",
      });
    }

    return list;
  }, [rawCourses]);

  return { courses, loading, error };
};

export default useExamBankCourses;
