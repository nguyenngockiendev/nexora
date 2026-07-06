import InstructorDashboardView from "../components/InstructorDashboardView";
import useInstructorDashboard from "../hooks/useInstructorDashboard";

const InstructorDashboard = () => {
  const { dashboard, error, loading, getDashboard } = useInstructorDashboard();

  return (
    <InstructorDashboardView
      dashboard={dashboard}
      error={error}
      loading={loading}
      onRetry={getDashboard}
    />
  );
};

export default InstructorDashboard;
