import { useState } from "react";
import { CreateAttempQuiz } from "../api/quizz-api";

const useCreateAttempQuiz = (lessionId) => {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  const CreateAttempquiz = async (payload) => {
    try {
      setLoading(false);
      const res = await CreateAttempQuiz(lessionId, payload);
      setNotification(res?.message);
      setLoading(true);
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { CreateAttempquiz, loading, notification, error };
};
export default useCreateAttempQuiz;
