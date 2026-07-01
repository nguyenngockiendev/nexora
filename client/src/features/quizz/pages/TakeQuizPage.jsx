import { useCallback, useEffect, useMemo, useState } from "react";
import TakeQuizForm from "../components/TakeQuizForm";
import "../style/TakeQuizPage.css";
import useUpdateQuizz from "../hooks/useUpdateQuizz";
import { useNavigate, useParams } from "react-router-dom";
import useCreateAttempQuiz from "../hooks/useAttempQuiz";
import { toast } from "react-toastify";

function TakeQuizPage() {
  const { lessionId } = useParams();
  const { CreateAttempquiz, loading, notification, error } =
    useCreateAttempQuiz(lessionId);

  const { quizz } = useUpdateQuizz(lessionId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (quizz) {
      setTimeLeft(quizz?.duration * 60);
    }
  }, [quizz]);
  const result = useMemo(() => {
    const total = quizz?.questions.length;
    let correct = 0;

    quizz?.questions?.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) correct += 1;
    });

    const score = Math.round((correct / total) * 100);
    const passed = score >= quizz?.passScore;

    return { total, correct, score, passed };
  }, [answers, quizz]);

  const handleSelectAnswer = useCallback(
    (questionId, optionIndex) => {
      if (submitted) return;

      setAnswers((prev) => ({
        ...prev,
        [questionId]: optionIndex,
      }));
    },
    [submitted],
  );

  const handleSubmit = async () => {
    try {
      console.log(result);
      console.log(answers);
      const payload = {
        result,
        answers,
        timeTaken: quizz.duration * 60 - timeLeft,
      };
      const res = await CreateAttempquiz(payload);

      if (res) {
        setSubmitted(true);
        toast.success("Nộp bài thành công");
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(quizz?.duration * 60);
  }, []);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, timeLeft, quizz]);

  return (
    <TakeQuizForm
      quiz={quizz}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      answers={answers}
      onSelectAnswer={handleSelectAnswer}
      onSubmit={handleSubmit}
      onRetry={handleRetry}
      submitted={submitted}
      result={result}
      timeLeft={timeLeft}
    />
  );
}

export default TakeQuizPage;
