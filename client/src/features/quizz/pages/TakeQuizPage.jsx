import { useCallback, useEffect,  useState } from "react";
import TakeQuizForm from "../components/TakeQuizForm";
import useUpdateQuizz from "../hooks/useUpdateQuizz";

import useCreateAttempQuiz from "../hooks/useAttempQuiz";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function TakeQuizPage() {
  const { lessionId } = useParams();
  const { CreateAttempquiz,  attemps } =
    useCreateAttempQuiz(lessionId);

  const { quizz, Quizz } = useUpdateQuizz(lessionId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (lessionId) {
      Quizz(lessionId);
    }
  }, [lessionId]);
  useEffect(() => {
    if (quizz) {
      setTimeLeft(quizz?.duration * 60);
    }
  }, [quizz]);
  const result = attemps;
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
      const payload = {
        answers,
        timeTaken: quizz.duration * 60 - timeLeft,
        attempsId: quizz.IdsAttemps,
      };

      const res = await CreateAttempquiz(payload);

      if (res) {
        setSubmitted(true);
        toast.success("Nộp bài thành công");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      submitted={submitted}
      result={result}
      timeLeft={timeLeft}
    />
  );
}

export default TakeQuizPage;
