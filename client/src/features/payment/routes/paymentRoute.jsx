import { lazy } from "react";

const OrderHistory = lazy(() => import("../pages/OrderHistory"));
const AdminPaymentManagement = lazy(() => import("../pages/AdminPaymentManagement"));

const paymentRoute = [
  {
    path: "payment_History",
    element: <OrderHistory />,
  },
  {
    path: "admin/payments",
    element: <AdminPaymentManagement />,
  },
];
export default paymentRoute;
