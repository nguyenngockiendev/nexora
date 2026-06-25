import { Row } from "react-bootstrap";

import "../style/CreateExamPage.css";
import { useEffect, useState } from "react";
import QuizCreaatForm from "../components/QuizCreaatForm";
import useCreateLession from "../hooks/useCreateQuiz";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useUpdateQuizz from "../hooks/useUpdateQuizz";

function CreateExamPage() {
  const { lessionId, courseId } = useParams();
  const { Lession, notification, error } = useCreateLession(lessionId);
  const { quizz, update, loading, message } = useUpdateQuizz(lessionId);
  const [istrue, setIstrue] = useState(false);

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exam, setExam] = useState({
    title: "",
    duration: "",
    passScore: "",

    status: "",
    description: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ],
  });

  useEffect(() => {
    if (quizz) {
      setExam(quizz);
      setIstrue(true);
    }
  }, [quizz]);

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
        const result = await update(exam);
        if (result) {
          toast(message);
          navigate(`/courses/details_course/${courseId}`);
        }
      } else {
        const result = await Lession(exam);
        if (result) {
          toast(notification);
          navigate(`/courses/details_course/${courseId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <Row md={12}>
        <QuizCreaatForm
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
