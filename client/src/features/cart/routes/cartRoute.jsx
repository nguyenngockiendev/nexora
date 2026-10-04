import { lazy } from "react";

const CartPage = lazy(() => import("../pages/CartPage"));

const cartRoute = [
  {
    path: "cart",
    element: <CartPage />,
    icon: "",
  },
];

export default cartRoute;
