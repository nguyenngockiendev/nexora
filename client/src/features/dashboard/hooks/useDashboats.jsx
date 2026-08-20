import { useEffect, useState } from "react";
import { GetUserInformation } from "../api/dashboard-api";

const useDashboats = () => {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await GetUserInformation();
        setDashboard(result);
      } catch (err) {
        const message =
          err.response?.data?.message || "Unable to load instructor dashboard";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    getDashboard();
  }, []);

  return { dashboard, error, loading ,setDashboard };
};

export default useDashboats;
