import InstructorDashboard from "./InstructorDashboard";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import useDashboats from "../hooks/useDashboats";

const Dashboard = () => {
  const { dashboard, error, loading } = useDashboats();

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        Đang tải bảng điều khiển...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        Đang tải bảng điều khiển...
      </div>
    );
  }

  if (dashboard?.role === "admin") {
    return <AdminDashboard />;
  }

  if (dashboard?.role === "instructor") {
    return <InstructorDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;
