import StudentDashboardView from "../components/StudentDashboardView";
import useStudentDashboard from "../hooks/useStudentDashboard";

const StudentDashboard = () => {
  const { recentlesson, error, loading, dashboart, classRecent } =
    useStudentDashboard();

  return (
    <StudentDashboardView
      dashboart={dashboart}
      recentlesson={recentlesson}
      error={error}
      loading={loading}
      classRecent={classRecent}
    />
  );
};

export default StudentDashboard;
