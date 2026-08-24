import { useEffect, useState } from "react";
import { DashboartforAdmin } from "../api/dashboard-api";

const useAdminDashboard = () => {
  const [dashboartad, setdashboartad] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDashboart = async (day) => {
    try {
      setLoading(true);
      setError(null);
      const result = await DashboartforAdmin(day);
      setdashboartad(result);
    } catch (err) {
      const message = err.response?.data?.message || "lỗi";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboart();
  }, []);

  return { error, loading, dashboartad,getDashboart };
};

export default useAdminDashboard;
