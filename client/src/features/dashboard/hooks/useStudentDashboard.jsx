import { useEffect, useState } from "react";
import {
  Getrecentlesson,
  DashboartforStudent,
  Classion,
} from "../api/dashboard-api";

const useStudentDashboard = () => {
  const [recentlesson, setRecentlesson] = useState(null);
  const [dashboart, setdashboart] = useState(null);
  const [classRecent, setclassRecent] = useState(null);
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

  const getClassSession = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await Classion();
      setclassRecent(result);
    } catch (err) {
      const message = err.response?.data?.message || "lỗi";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  const arr = [recentlesson];
  useEffect(() => {
    getrecentlesson();
    getDashboart();
    getClassSession();
  }, []);

  return { recentlesson, error, loading, dashboart, arr, classRecent };
};

export default useStudentDashboard;
