import { useState, useEffect } from "react";
import AdminDashboardView from "../components/AdminDashboardView";
import useAdminDashboard from "../hooks/useAdminDashboart";

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("week");
  const { error, loading, dashboartad, getDashboart } = useAdminDashboard();

  useEffect(() => {
    getDashboart(timeFilter);
  }, [timeFilter]);

  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
    getDashboart(filter);
  };

  return (
    <AdminDashboardView
      dashboards={dashboartad}
      error={error}
      loading={loading}
      onRetry={() => getDashboart(timeFilter)}
      timeFilter={timeFilter}
      setTimeFilter={handleFilterChange}
    />
  );
};

export default AdminDashboard;
