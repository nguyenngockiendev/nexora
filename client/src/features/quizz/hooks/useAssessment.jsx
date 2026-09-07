import { useState } from "react";
import { Assessment } from "../api/quizz-api";
import { useEffect } from "react";

const useAssessment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assessmetshub, setAssessmetshub] = useState(null);

  const getAssessmenthub = async () => {
    try {
      setLoading(true);
      const res = await Assessment();
      setAssessmetshub(res);
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAssessmenthub();
  }, []);

  return {
    assessmetshub,
    loading,
    error,
    getAssessmenthub,
  };
};
export default useAssessment;
