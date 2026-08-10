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
  const { Lession, notification, error, courses } = useCreateQuizz();
  const { quizz, update, loading, message, Quizz } = useUpdateQuizz();
  const { quizzAI, errorAI, loadingAI, AIquizz } = useGenAIQuizz();
  const [istrue, setIstrue] = useState(false);
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

  const hanhId = (courseId, lessionId) => {
    setCourseId(courseId);
    setLessionId(lessionId);
    if (lessionId) {
      Quizz(lessionId);
    }
  };

  useEffect(() => {
    if (quizz) {
      setExam(quizz);
      setIstrue(true);
    } else {
      setIstrue(false);
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
  }, [quizz]);

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
      setIstrue(true);
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
      if (quizz) {
        const result = await update(lessionId, exam);
        if (result) {
          toast(message);
          navigate(`/courses/details_course/${courseId}`);
        }
      } else {
        const result = await Lession(lessionId, exam);
        if (result) {
          toast(notification);
          navigate(`/courses/details_course/${courseId}`);
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
    if (lessionId) {
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
          error={error}
          navigate={navigate}
          courseId={courseId}
          quizz={quizz}
          istrue={istrue}
          loading={loading}
        />
      </Row>
    </div>
  );
}

export default CreateExamPage;
