import { useEffect, useState } from "react";
import { CreateQuiz } from "../../lesson/api/lession-api";
import { GetCourseForQuizz } from "../api/quizz-api";

const useCreateQuizz = () => {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const [courses, setCourses] = useState([]);

  const Lession = async (lessionId, data) => {
    try {
      setError(null);
      const res = await CreateQuiz(lessionId, data);

      setNotification(res?.message);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "Đã xảy ra lỗi!";
      setError(message);
    }
  };
  useEffect(() => {
    const getCourse = async () => {
      try {
        const result = await GetCourseForQuizz();
        setCourses(result ? result : []);
      } catch (error) {
        const message = error.response?.data?.message || "Đã xảy ra lỗi!";
        setError(message);
      }
    };
    getCourse();
  }, []);

  return { error, Lession, notification, courses };
};
export default useCreateQuizz;
