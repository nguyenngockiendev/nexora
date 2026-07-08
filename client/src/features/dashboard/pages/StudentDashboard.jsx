import { useState, useEffect } from "react";
import StudentDashboardView from "../components/StudentDashboardView";

const StudentDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDashboard = async () => {
    try {
      setLoading(true);
      // Giả lập call API (Mock delay)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setDashboard({
        overview: {
          enrolledCourses: 4,
          completedLessons: 42,
          upcomingClasses: 2,
          avgScore: 85
        }
      });
      setError(null);
    } catch (err) {
      setError(err.message || "Không thể tải bảng điều khiển");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <StudentDashboardView
      dashboard={dashboard}
      error={error}
      loading={loading}
    />
  );
};

export default StudentDashboard;
