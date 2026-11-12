import { useRef, useState } from "react";
import { GetQuizzByid, UpdateQuizzByid } from "../../lesson/api/lession-api";


const useUpdateQuizz = () => {
  const [error, setError] = useState(null);
  const [quizz, setQuizz] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadedLessonId, setLoadedLessonId] = useState(null);
  const currentLessonId = useRef(null);
  const quizRequest = useRef(0);

  const setSavedQuiz = (lessonId, quiz) => {
    if (currentLessonId.current === lessonId) setQuizz(quiz);
  };

  const update = async (lessonId, data) => {
    try {
      setLoading(true);
      setError(null);
      const updates = await UpdateQuizzByid(lessonId, data);
      setMessage(updates?.message);
      return updates;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
 
  const Quizz = async (lessonId) => {
    const request = ++quizRequest.current;
    currentLessonId.current = lessonId;
    setLoadedLessonId(null);
    setQuizz(null);
    setError(null);
    if (!lessonId || lessonId === "undefined") {
      return;
    }
    try {
      const res = await GetQuizzByid(lessonId);
      if (request === quizRequest.current) {
        setQuizz(res);
        setLoadedLessonId(lessonId);
      }

      return res;
    } catch (error) {
      if (request !== quizRequest.current) return;
      if (error.response?.status === 404) {
        setLoadedLessonId(lessonId);
        return;
      }
      const message = error.response?.data?.message || "erron";
      setError(message);
    }
  };

  return {
    error,
    quizz,
    update,
    loading,
    message,
    Quizz,
    loadedLessonId,
    setSavedQuiz,
  };
};
export default useUpdateQuizz;
