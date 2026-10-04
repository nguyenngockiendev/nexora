import { lazy } from "react";

const AdminUserPage = lazy(() => import("../pages/AdminUserPage"));
const DetailsPage = lazy(() => import("../pages/DetailsUserPage"));
const BecomeInstructor = lazy(() => import("../pages/BecomeInstructor"));
const AdminTeacherRequests = lazy(() => import("../pages/AdminTeacherRequests"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

const userRoutes = [
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "user/profile",
    element: <ProfilePage />,
  },
  {
    path: "/user",
    element: <AdminUserPage />,
  },
  {
    path: "user/details/:userId",
    element: <DetailsPage />,
  },
  {
    path: "user/edit/:editUserId",
    element: <AdminUserPage />,
  },
  {
    path: "user/become-instructor",
    element: <BecomeInstructor />,
  },
  {
    path: "admin/teacher-requests",
    element: <AdminTeacherRequests />,
  },
];
export default userRoutes;

