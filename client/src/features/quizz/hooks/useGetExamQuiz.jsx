import { useEffect, useState } from "react";
import { GetQuizExam } from "../api/quizz-api";

const useExamQuizz = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        setLoading(true);
        const result = await GetQuizExam();
        setQuizList(result);
      } catch (error) {
        const message = error.response?.data?.message || "erron";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, []);

  return { error, loading, quizList };
};
export default useExamQuizz;
