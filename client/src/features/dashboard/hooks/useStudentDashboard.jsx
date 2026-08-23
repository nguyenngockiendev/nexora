import { useEffect, useState } from "react";
import { Getrecentlesson, DashboartforStudent } from "../api/dashboard-api";

const useStudentDashboard = () => {
  const [recentlesson, setRecentlesson] = useState(null);
  const [dashboart, setdashboart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getrecentlesson = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await Getrecentlesson();
      setRecentlesson(result);
    } catch (err) {
      const message = err.response?.data?.message || "lỗi";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  const getDashboart = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await DashboartforStudent();
      setdashboart(result);
    } catch (err) {
      const message = err.response?.data?.message || "lỗi";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getrecentlesson();
    getDashboart();
  }, []);

  return { recentlesson, error, loading, dashboart };
};

export default useStudentDashboard;
