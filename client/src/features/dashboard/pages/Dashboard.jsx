import { useEffect, useState } from "react";
import InstructorDashboard from "./InstructorDashboard";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const [role, setRole] = useState("student"); // default to student
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfor"));
      if (userInfo?.role) {
        setRole(userInfo.role);
      }
    } catch (e) {
      console.error("Error reading user role", e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-slate-500 font-medium">Đang tải bảng điều khiển...</div>;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }
  
  if (role === "instructor") {
    return <InstructorDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;
