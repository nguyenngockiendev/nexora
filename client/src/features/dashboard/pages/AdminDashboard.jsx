import { useState, useEffect } from "react";
import AdminDashboardView from "../components/AdminDashboardView";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("week"); // 'week' | 'month'

  const getDashboard = async (filter) => {
    try {
      setLoading(true);
      // Giả lập call API (Mock delay)
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Dữ liệu giả lập thay đổi theo bộ lọc
      const isWeek = filter === "week";

      const mockData = {
        overview: {
          totalRevenue: isWeek ? 150000000 : 1250000000,
          totalUsers: isWeek ? 542 : 15420,
          totalInstructors: isWeek ? 12 : 245,
          totalCourses: isWeek ? 5 : 128,
          activeSubscriptions: isWeek ? 45 : 850,
        },
        revenueChart: isWeek
          ? [
              { name: "T2", value: 15000000 },
              { name: "T3", value: 22000000 },
              { name: "T4", value: 18000000 },
              { name: "T5", value: 28000000 },
              { name: "T6", value: 25000000 },
              { name: "T7", value: 35000000 },
              { name: "CN", value: 32000000 },
            ]
          : [
              { name: "T1", value: 250000000 },
              { name: "T2", value: 310000000 },
              { name: "T3", value: 280000000 },
              { name: "T4", value: 380000000 },
              { name: "T5", value: 420000000 },
              { name: "T6", value: 390000000 },
            ],
        userChart: isWeek
          ? [
              { name: "T2", students: 40, instructors: 2 },
              { name: "T3", students: 55, instructors: 1 },
              { name: "T4", students: 45, instructors: 3 },
              { name: "T5", students: 70, instructors: 2 },
              { name: "T6", students: 65, instructors: 1 },
              { name: "T7", students: 90, instructors: 4 },
              { name: "CN", students: 85, instructors: 2 },
            ]
          : [
              { name: "T1", students: 400, instructors: 12 },
              { name: "T2", students: 550, instructors: 15 },
              { name: "T3", students: 480, instructors: 10 },
              { name: "T4", students: 620, instructors: 18 },
              { name: "T5", students: 750, instructors: 22 },
              { name: "T6", students: 690, instructors: 16 },
            ],
      };

      setDashboard(mockData);
      setError(null);
    } catch (err) {
      setError(err.message || "Không thể tải bảng điều khiển");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard(timeFilter);
  }, [timeFilter]);

  return (
    <AdminDashboardView
      dashboard={dashboard}
      error={error}
      loading={loading}
      onRetry={() => getDashboard(timeFilter)}
      timeFilter={timeFilter}
      setTimeFilter={setTimeFilter}
    />
  );
};

export default AdminDashboard;
