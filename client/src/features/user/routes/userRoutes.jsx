import AdminUserPage from "../pages/AdminUserPage";
import DetailsPage from "../pages/DetailsUserPage";
import BecomeInstructor from "../pages/BecomeInstructor";
import AdminTeacherRequests from "../pages/AdminTeacherRequests";
import ProfilePage from "../pages/ProfilePage";

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

