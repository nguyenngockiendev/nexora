import {  useState } from "react";
import { GetQuizzByid, UpdateQuizzByid } from "../../lesson/api/lession-api";

const useUpdateQuizz = () => {
  const [error, setError] = useState(null);
  const [quizz, setQuizz] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const update = async (lessonId, data) => {
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
  const Quizz = async (lessonId) => {
    if (!lessonId || lessonId === "undefined") {
      setQuizz(null);
      return;
    }
    try {
      setError(null);
      const res = await GetQuizzByid(lessonId);
      setQuizz(res);
      
      return res;
    } catch (error) {
      setQuizz(null);
      const message = error.response?.data?.message || "erron";
      setError(message);
    }
  };

  return { error, quizz, update, loading, message, Quizz };
};
export default useUpdateQuizz;
