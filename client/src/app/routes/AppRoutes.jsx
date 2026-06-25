import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../../layouts/DashboardLayout/Dashboard";
import courseRoute from "../../features/course/routes/courseRoute";
import authRoutes from "../../features/auth/routes/authRoutes";
import enrollmentsRoutes from "../../features/enrollments/routes/enrollmentsRoutes";
import ClassRoutes from "../../features/class/routes/classRoutes";
import userRoutes from "../../features/user/routes/userRoutes";
import lessionRoute from "../../features/lesson/routes/lessionRoute";
import HomePage from "../../demo/HomePage/HomePage";

function AppRoutes() {
  const token = localStorage.getItem("token");

  const routes = [
    ...courseRoute,
    ...enrollmentsRoutes,
    ...ClassRoutes,
    ...userRoutes,
    ...lessionRoute,
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/courses" replace />
            ) : (
              <Navigate to="/demo/home" replace />
            )
          }
        />
        <Route path="/demo/home" element={<HomePage />} />

        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route path="/" element={<Dashboard />}>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
