import AdminUserPage from "../pages/AdminUserPage";
import DetailsPage from "../pages/DetailsUserPage";

const userRoutes = [
  {
    path: "/user",
    element: <AdminUserPage />,
  },
  {
    path: "user/details/:userId",
    element: <DetailsPage/>,
  },
   {
    path: "user/edit/:editUserId",
    element: <AdminUserPage/>,
  },
];
export default userRoutes;
