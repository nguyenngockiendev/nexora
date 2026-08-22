import { useState } from "react";
import { GenAIForQuizz } from "../api/quizz-api";

const useGenAIQuizz = () => {
  const [quizzAI, setQuizzAI] = useState([]);
  const [errorAI, setErrorAI] = useState("");
  const [loadingAI, setLoading] = useState(false);

  const AIquizz = async (lessionId, questionCount) => {
    try {
      setLoading(true);
      const listQuizzAI = await GenAIForQuizz(lessionId, questionCount);
      setQuizzAI(listQuizzAI);
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setErrorAI(message);
    } finally {
      setLoading(false);
    }
  };
  return { quizzAI, errorAI, loadingAI, AIquizz };
};
export default useGenAIQuizz;
