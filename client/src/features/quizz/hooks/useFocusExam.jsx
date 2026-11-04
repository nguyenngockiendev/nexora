import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  GetFocusExam,
  SyncFocusExam,
  GetDedupExam,
  GetExamsByCourse,
  GetExamDetail,
} from "../../lesson/api/examBank-api";

const normalizeQuestions = (rawList = []) => {
  if (!Array.isArray(rawList)) return [];
  return rawList.map((q, idx) => {
    const correctArr = Array.isArray(q.correctAnswer)
      ? q.correctAnswer
      : typeof q.correctAnswer === "number"
        ? [q.correctAnswer]
        : [0];
    return {
      _id: q._id ? String(q._id) : `q-${idx + 1}`,
      number: idx + 1,
      questionText: q.question || q.questionText || "",
      options: Array.isArray(q.options) ? q.options : [],
      correctAnswer: correctArr[0] ?? 0,
      correctAnswers: correctArr,
      explanation: q.explanation || "",
      repeatCount: q.repeatCount || q.sources?.length || 1,
      sources: Array.isArray(q.sources)
        ? q.sources.map((s) => (typeof s === "object" ? s.title : s))
        : [],
    };
  });
};

const useFocusExam = (courseId, mode = "focus", initialExamId = "") => {
  const [questions, setQuestions] = useState([]);
  const [examList, setExamList] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(initialExamId);
  const [examTitle, setExamTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExamQuestions = useCallback(async () => {
    const isRealObjectId = courseId && /^[0-9a-fA-F]{24}$/.test(courseId);
    if (!isRealObjectId) {
      setQuestions([]);
      setExamTitle("Chưa chọn khóa học");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (mode === "focus") {
        let res = await GetFocusExam(courseId);
        let focusData = res?.data?.data || res?.data;

        if (!focusData?.questions || focusData.questions.length === 0) {
          const syncRes = await SyncFocusExam(courseId);
          focusData = syncRes?.data?.data || syncRes?.data;
        }

        const list = normalizeQuestions(focusData?.questions || []);
        setQuestions(list);
        setExamTitle(`🔥 Bộ Đề Trọng Tâm (${list.length} câu hay ra nhất)`);
      } else if (mode === "dedup") {
        const res = await GetDedupExam(courseId);
        const dedupData = res?.data?.data || res?.data;
        const list = normalizeQuestions(dedupData?.questions || []);
        setQuestions(list);
        setExamTitle(
          `💎 Kho Đề Khử Trùng Toàn Diện (${list.length} câu độc nhất)`,
        );
      } else if (mode === "regular") {
        const listRes = await GetExamsByCourse(courseId);
        const exams = listRes?.data?.data || listRes?.data || [];
        setExamList(exams);

        const targetId = selectedExamId || exams[0]?._id;
        if (targetId) {
          setSelectedExamId(targetId);
          const detailRes = await GetExamDetail(targetId);
          const detailData = detailRes?.data?.data || detailRes?.data;
          const list = normalizeQuestions(detailData?.questions || []);
          setQuestions(list);
          setExamTitle(
            `📄 Đề thi: ${detailData?.title || "Đề luyện tập"} (${list.length} câu)`,
          );
        } else {
          setQuestions([]);
          setExamTitle("📄 Chưa có đề thi nào trong khóa học");
        }
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Không thể tải bộ câu hỏi ôn luyện!";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [courseId, mode, selectedExamId]);

  useEffect(() => {
    fetchExamQuestions();
  }, [fetchExamQuestions]);

  const shuffleQuestions = useCallback(() => {
    setQuestions((prev) => {
      if (prev.length <= 1) return prev;
      return [...prev]
        .sort(() => Math.random() - 0.5)
        .map((q, idx) => ({ ...q, number: idx + 1 }));
    });
  }, []);

  return {
    questions,
    examList,
    selectedExamId,
    setSelectedExamId,
    examTitle,
    loading,
    error,
    shuffleQuestions,
    refetch: fetchExamQuestions,
  };
};

export default useFocusExam;
