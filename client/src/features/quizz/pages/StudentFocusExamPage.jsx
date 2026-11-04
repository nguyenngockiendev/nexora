import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Flame,
  Sparkles,
  FileText,
  Shuffle,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-toastify";
import FocusExamTopBar from "../components/focusExam/FocusExamTopBar";
import FocusExamQuestionCard from "../components/focusExam/FocusExamQuestionCard";
import FocusExamSidebarInfo from "../components/focusExam/FocusExamSidebarInfo";
import FocusExamBottomNav from "../components/focusExam/FocusExamBottomNav";
import useFocusExam from "../hooks/useFocusExam";
import "../style/FocusExamPage.css";

const StudentFocusExamPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "focus";
  const examIdParam = searchParams.get("examId") || "";

  // Lấy dữ liệu câu hỏi qua custom hook
  const {
    questions,
    examList,
    selectedExamId,
    setSelectedExamId,
    examTitle,
    loading,
    shuffleQuestions,
  } = useFocusExam(courseId, mode, examIdParam);

  const storageKey = useMemo(
    () =>
      `nexora_exam_progress_${courseId || "mock"}_${mode}_${
        mode === "regular" ? selectedExamId : "all"
      }`,
    [courseId, mode, selectedExamId],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealedQuestions, setRevealedQuestions] = useState({});
  const [filterMode, setFilterMode] = useState("all");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrentIndex(parsed.currentIndex || 0);
      } else {
        setAnswers({});
        setCurrentIndex(0);
      }
      setRevealedQuestions({});
    } catch {
      setAnswers({});
      setCurrentIndex(0);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || loading) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ answers, currentIndex }),
      );
    } catch {
      // ignore quota error
    }
  }, [answers, currentIndex, storageKey, loading]);

  const handleSwitchMode = (newMode) => {
    setFilterMode("all");
    setSearchParams({ mode: newMode });
  };

  const handleShuffleQuestions = () => {
    if (questions.length <= 1) return;
    shuffleQuestions();
    setCurrentIndex(0);
    toast.info("🔀 Đã đảo ngẫu nhiên thứ tự câu hỏi!");
  };

  const handleResetProgress = () => {
    if (!window.confirm("Bạn muốn xóa các đáp án đã chọn để làm lại từ đầu?")) {
      return;
    }
    setAnswers({});
    setRevealedQuestions({});
    setCurrentIndex(0);
    setFilterMode("all");
    localStorage.removeItem(storageKey);
    toast.success("🔄 Đã làm mới bài ôn luyện!");
  };

  const filteredQuestions = useMemo(() => {
    if (filterMode === "wrong") {
      return questions.filter(
        (q) =>
          answers[q._id] !== undefined && answers[q._id] !== q.correctAnswer,
      );
    }
    if (filterMode === "unanswered") {
      return questions.filter((q) => answers[q._id] === undefined);
    }
    return questions;
  }, [questions, filterMode, answers]);

  const activeQuestions =
    filteredQuestions.length > 0 ? filteredQuestions : questions;
  const safeIndex = Math.min(
    Math.max(0, currentIndex),
    Math.max(0, activeQuestions.length - 1),
  );
  const currentQuestion = activeQuestions[safeIndex];

  const handleSelectOption = useCallback(
    (optionIndex) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion._id]: optionIndex,
      }));
    },
    [currentQuestion],
  );

  const handleToggleReveal = useCallback(() => {
    if (!currentQuestion) return;
    setRevealedQuestions((prev) => ({
      ...prev,
      [currentQuestion._id]: !prev[currentQuestion._id],
    }));
  }, [currentQuestion]);

  const handlePrevQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1));
  }, [activeQuestions.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      const key = e.key;
      if (key === "ArrowLeft") {
        e.preventDefault();
        handlePrevQuestion();
      } else if (key === "ArrowRight") {
        e.preventDefault();
        handleNextQuestion();
      } else if (key === " " || key === "Spacebar") {
        e.preventDefault();
        handleToggleReveal();
      } else if (["1", "a", "A"].includes(key)) {
        handleSelectOption(0);
      } else if (["2", "b", "B"].includes(key)) {
        handleSelectOption(1);
      } else if (["3", "c", "C"].includes(key)) {
        handleSelectOption(2);
      } else if (["4", "d", "D"].includes(key)) {
        handleSelectOption(3);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handlePrevQuestion,
    handleNextQuestion,
    handleToggleReveal,
    handleSelectOption,
  ]);

  return (
    <div className="focus-exam-container p-2 md:p-4 max-w-7xl mx-auto">
      {/* Thanh công cụ chuyển nhanh chế độ */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 bg-white/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <ArrowLeft size={14} />
            Quay lại
          </button>

          <button
            type="button"
            onClick={() => handleSwitchMode("focus")}
            className={`px-3.5 py-1.5 rounded-full font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              mode === "focus"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs"
                : "bg-orange-50 text-orange-700 hover:bg-orange-100"
            }`}
          >
            <Flame size={14} />
            60 Câu Trọng Tâm
          </button>

          <button
            type="button"
            onClick={() => handleSwitchMode("dedup")}
            className={`px-3.5 py-1.5 rounded-full font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              mode === "dedup"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            <Sparkles size={14} />
            Kho Khử Trùng ({mode === "dedup" ? questions.length : "Tất cả"})
          </button>

          <button
            type="button"
            onClick={() => handleSwitchMode("regular")}
            className={`px-3.5 py-1.5 rounded-full font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              mode === "regular"
                ? "bg-slate-800 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <FileText size={14} />
            Làm Từng Đề
          </button>

          {mode === "regular" && examList.length > 0 && (
            <select
              value={selectedExamId}
              onChange={(e) => {
                setSelectedExamId(e.target.value);
                setSearchParams({ mode: "regular", examId: e.target.value });
              }}
              className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-slate-300 text-slate-800 shadow-xs cursor-pointer"
            >
              {examList.map((ex) => (
                <option key={ex._id} value={ex._id}>
                  📄 {ex.title} ({ex.questionCount} câu)
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffleQuestions}
            disabled={questions.length <= 1}
            className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Đảo ngẫu nhiên vị trí các câu hỏi"
          >
            <Shuffle size={13} />
            Đảo câu
          </button>
          <button
            type="button"
            onClick={handleResetProgress}
            disabled={Object.keys(answers).length === 0}
            className="px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Xóa đáp án đã chọn để làm lại từ đầu"
          >
            <RotateCcw size={13} />
            Làm lại
          </button>
        </div>
      </div>

      {loading ? (
        <div className="focus-question-card text-center py-16">
          <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-slate-600 font-bold text-sm mb-0">
            Đang tải bộ câu hỏi ôn luyện...
          </p>
        </div>
      ) : questions.length === 0 ? (
        <div className="focus-question-card text-center py-16">
          <p className="text-slate-700 font-bold text-base mb-2">
            Chưa có câu hỏi nào trong chế độ này!
          </p>
          <p className="text-slate-500 text-sm mb-4">
            Hãy nạp đề PDF vào Kho Đề Thi của khóa học trước khi bắt đầu ôn luyện.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-full bg-orange-500 text-white font-bold text-sm"
          >
            ← Quay lại
          </button>
        </div>
      ) : (
        <>
          {/* 1. Header & Dải tiến độ câu hỏi */}
          <FocusExamTopBar
            currentNumber={currentQuestion?.number || safeIndex + 1}
            totalQuestions={questions.length}
            questions={questions}
            answers={answers}
            currentIndex={safeIndex}
            onSelectQuestion={(idx) => setCurrentIndex(idx)}
            filterMode={filterMode}
            setFilterMode={(val) => {
              setFilterMode(val);
              setCurrentIndex(0);
            }}
            title={examTitle}
          />

          <div className="focus-workspace-grid">
            <FocusExamQuestionCard
              question={currentQuestion}
              totalQuestions={activeQuestions.length}
              userAnswer={answers[currentQuestion?._id]}
              isRevealed={Boolean(revealedQuestions[currentQuestion?._id])}
              onSelectOption={handleSelectOption}
              onToggleReveal={handleToggleReveal}
            />

            <FocusExamSidebarInfo
              sources={currentQuestion?.sources}
              repeatCount={currentQuestion?.repeatCount}
              explanation={currentQuestion?.explanation}
              onSelectKey={handleSelectOption}
              currentSelectedKey={answers[currentQuestion?._id]}
              correctAnswer={currentQuestion?.correctAnswer}
              isRevealed={Boolean(revealedQuestions[currentQuestion?._id])}
            />
          </div>

          <FocusExamBottomNav
            onPrev={handlePrevQuestion}
            onNext={handleNextQuestion}
            hasPrev={safeIndex > 0}
            hasNext={safeIndex < activeQuestions.length - 1}
            isLast={safeIndex === activeQuestions.length - 1}
          />
        </>
      )}
    </div>
  );
};

export default StudentFocusExamPage;
