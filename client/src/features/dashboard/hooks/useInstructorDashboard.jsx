import { useEffect, useState } from "react";
import { GetInstructorBusinessDashboard } from "../api/dashboard-api";

const useInstructorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await GetInstructorBusinessDashboard();
      setDashboard(result);
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to load instructor dashboard";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return { dashboard, error, loading, getDashboard };
};

export default useInstructorDashboard;
