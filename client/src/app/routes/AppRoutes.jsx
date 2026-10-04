import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("../../layouts/DashboardLayout/Dashboard"));
const HomePage = lazy(() => import("../../demo/HomePage/HomePage"));
import courseRoute from "../../features/course/routes/courseRoute";
import authRoutes from "../../features/auth/routes/authRoutes";
import enrollmentsRoutes from "../../features/enrollments/routes/enrollmentsRoutes";
import ClassRoutes from "../../features/class/routes/classRoutes";
import userRoutes from "../../features/user/routes/userRoutes";
import lessionRoute from "../../features/lesson/routes/lessionRoute";
import quizzRoutes from "../../features/quizz/routes/quizzRoutes";
import dashboardRoutes from "../../features/dashboard/routes/dashboardRoutes";
import paymentRoute from "../../features/payment/routes/paymentRoute";
import cartRoute from "../../features/cart/routes/cartRoute";
import helpRoutes from "../../features/help/routes/helpRoutes";
import voucherRoutes from "../../features/voucher/routes/voucherRoutes";

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
    <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
    <span className="mt-3 text-xs font-bold text-slate-400 tracking-wider uppercase">
      Đang tải...
    </span>
  </div>
);

function AppRoutes() {
  const routes = [
    ...dashboardRoutes,
    ...courseRoute,
    ...enrollmentsRoutes,
    ...ClassRoutes,
    ...userRoutes,
    ...lessionRoute,
    ...quizzRoutes,
    ...paymentRoute,
    ...cartRoute,
    ...helpRoutes,
    ...voucherRoutes,
  ];

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

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
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
