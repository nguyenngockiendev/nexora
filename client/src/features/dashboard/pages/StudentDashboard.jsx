import StudentDashboardView from "../components/StudentDashboardView";
import useStudentDashboard from "../hooks/useStudentDashboard";

const StudentDashboard = () => {
  const { recentlesson, error, loading, dashboart } = useStudentDashboard();

  return (
    <StudentDashboardView
      dashboart={dashboart}
      recentlesson={recentlesson}
      error={error}
      loading={loading}
    />
  );
};

export default StudentDashboard;
