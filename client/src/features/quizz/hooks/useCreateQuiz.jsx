import { useState } from "react";
import { CreateQuiz } from "../../lesson/api/lession-api";

const useCreateLession = (lessionId) => {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");

  const Lession = async (data) => {
    try {
      setError(null);
      const res = await CreateQuiz(lessionId, data);
      setNotification(res?.message);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setError(message);
    }
  };
  return { error, Lession, notification };
};
export default useCreateLession;
