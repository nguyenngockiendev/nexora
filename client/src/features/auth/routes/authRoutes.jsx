
import { lazy } from "react";

const FogotPassword = lazy(() => import("../pages/ForgotPassWord"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

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
