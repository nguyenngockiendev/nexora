import HelpPage from "../pages/HelpPage";
import AdminTeacherRequests from "../../user/pages/AdminTeacherRequests";

const helpRoutes = [
  {
    path: "/help",
    element: <HelpPage />,
  },
  {
    path: "help",
    element: <HelpPage />,
  },
  {
    path: "user/help",
    element: <HelpPage />,
  },
  {
    path: "admin/support",
    element: <AdminTeacherRequests />,
  },
  {
    path: "admin/requests",
    element: <AdminTeacherRequests />,
  },
];

export default helpRoutes;
