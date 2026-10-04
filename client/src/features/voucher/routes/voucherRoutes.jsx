import VoucherManagementPage from "../pages/VoucherManagementPage";

const voucherRoutes = [
  {
    path: "admin/vouchers",
    element: <VoucherManagementPage />,
  },
  {
    path: "instructor/vouchers",
    element: <VoucherManagementPage />,
  },
];

export default voucherRoutes;
