import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard"));

const dashboardRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
];

export default dashboardRoutes;
