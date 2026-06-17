import { Row } from "react-bootstrap";

import "../style/CreateExamPage.css";
import { useState } from "react";
import QuizCreaatForm from "../components/QuizCreaatForm";
import useCreateLession from "../hooks/useCreateQuiz";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function CreateExamPage() {
  const { Lession, notification, error } = useCreateLession();
  const { lessionId,courseId} = useParams();

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
      const result = await Lession(lessionId, exam);
      if (result) {
        navigate(`/courses/details_course/${courseId}`);
        toast(notification);
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
        />
      </Row>
    </div>
  );
}

export default CreateExamPage;
