
import FogotPassword from "../pages/ForgotPassWord";
import Login from "../pages/Login";
import Register from "../pages/Register";

const authRoutes = [
 
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <FogotPassword />,
  },
];

export default authRoutes;
