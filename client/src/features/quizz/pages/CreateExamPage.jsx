import { Row } from "react-bootstrap";

import "../style/CreateExamPage.css";
import { useEffect, useState } from "react";
import QuizCreaatForm from "../components/QuizCreaatForm";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useUpdateQuizz from "../hooks/useUpdateQuizz";
import useCreateQuizz from "../hooks/useCreateQuiz";
import useGenAIQuizz from "../hooks/useGenAIQuizz";
function CreateExamPage() {
  const [courseId, setCourseId] = useState(null);
  const [lessionId, setLessionId] = useState(null);
  const [numQuestions, setNumQuestions] = useState(10);
  const { Lession, error, courses } = useCreateQuizz();
  const {
    quizz,
    update,
    loading,
    error: quizError,
    Quizz,
    loadedLessonId,
    setSavedQuiz,
  } = useUpdateQuizz();
  const { quizzAI, errorAI, loadingAI, AIquizz } = useGenAIQuizz();
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [exam, setExam] = useState({
    title: "",
    duration: "",
    passScore: "",

    status: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ],
  });
  const header =
    exam.title.trim() !== "" &&
    exam.duration !== "" &&
    exam.passScore !== "" &&
    lessionId !== null;
  const canSave = Boolean(lessionId && loadedLessonId === lessionId);

  const hanhId = (courseId, lessionId) => {
    if (creating || loading || loadingAI) return;
    setCourseId(courseId);
    setLessionId(lessionId);
    setCurrentIndex(0);
    Quizz(lessionId);
  };

  useEffect(() => {
    if (quizz) {
      setExam(quizz);
    } else {
      setExam({
        title: "",
        duration: "",
        passScore: "",
        status: "",

        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
            explanation: "",
          },
        ],
      });
    }
  }, [quizz, lessionId]);

  useEffect(() => {
    if (quizzAI.length > 0) {
      setExam({
        title: exam.title,
        duration: exam.duration,
        passScore: exam.passScore,

        status: "",
        questions: quizzAI.map((e) => ({
          question: e.question,
          options: e.options,
          correctAnswer: e.correctAnswer,
          explanation: e.explanation,
        })),
      });
      setCurrentIndex(0);
      setShowModal(false);
      toast.success("AI đã sinh bộ câu hỏi Quiz thành công! ✨");
    }
  }, [quizzAI]);

  const addQuestion = () => {
    setExam((prev) => {
      const newquestion = {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      };
      return {
        ...prev,
        questions: [...prev.questions, newquestion],
      };
    });
  };

  const handSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!canSave || loading || creating || loadingAI) return;
      if (quizz) {
        const result = await update(lessionId, exam);
        if (result) {
          toast.success("Cập nhật Quizz thành công!");
        }
      } else {
        setCreating(true);
        try {
          const result = await Lession(lessionId, exam);
          if (result?.result) {
            setSavedQuiz(lessionId, result.result);
            toast.success("Tạo bài Quizz thành công!");
          }
        } finally {
          setCreating(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuickSelect = (count) => {
    setNumQuestions(count);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave && !creating && !loading && !loadingAI) {
      await AIquizz(lessionId, numQuestions);
    }
  };
  return (
    <div>
      {" "}
      <Row md={12}>
        <QuizCreaatForm
          header={header}
          handleSubmit={handleSubmit}
          handleQuickSelect={handleQuickSelect}
          setNumQuestions={setNumQuestions}
          numQuestions={numQuestions}
          showModal={showModal}
          setShowModal={setShowModal}
          hanhId={hanhId}
          courses={courses}
          setExam={setExam}
          addQuestion={addQuestion}
          exam={exam}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          handSubmit={handSubmit}
          error={quizError || error}
          navigate={navigate}
          courseId={courseId}
          lessionId={lessionId}
          quizz={quizz}
          canSave={canSave}
          loading={loading || creating}
          loadingAI={loadingAI}
          errorAI={errorAI}
        />
      </Row>
    </div>
  );
}

export default CreateExamPage;
