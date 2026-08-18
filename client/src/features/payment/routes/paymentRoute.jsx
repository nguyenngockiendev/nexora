import OrderHistory from "../pages/OrderHistory";
import AdminPaymentManagement from "../pages/AdminPaymentManagement";

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
