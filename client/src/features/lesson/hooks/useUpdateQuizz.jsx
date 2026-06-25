import { useEffect, useState } from "react";
import { GetQuizzByid, UpdateQuizzByid } from "../api/lession-api";


const useUpdateQuizz = (lessonId) => {
  const [error, setError] = useState(null);
  const [quizz, setQuizz] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const update = async (data) => {
    try {
      setLoading(false);
      const updates = await UpdateQuizzByid(lessonId, data);
      setMessage(update?.message);
      setLoading(true);
      return updates;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const Quizz = async () => {
      try {
        setError(null);
        const res = await GetQuizzByid(lessonId);
        setQuizz(res);
        return res;
      } catch (error) {
        const message = error.response?.data?.message || "erron";
        setError(message);
      }
    };
    Quizz();
  }, []);

  return { error, quizz ,update,loading,message};
};
export default useUpdateQuizz;
