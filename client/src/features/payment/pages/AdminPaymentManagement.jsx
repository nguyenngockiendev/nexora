import { useEffect } from "react";
import AdminPaymentTable from "../components/AdminPaymentTable";
import useAdminPayment from "../hooks/useAdminPayment";

const AdminPaymentManagement = () => {
  const {
    transactions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    GetHistory,
    loading,
  } = useAdminPayment();
  useEffect(() => {
    GetHistory();
  }, []);
  const orderList = transactions?.OrderHistory || [];
  const filteredOrders = orderList.filter((order) => {
    const matchStatus = statusFilter === "all" || order.status === statusFilter;

    const search = searchQuery.toLowerCase().trim();
    const studentName = (order.userId?.name || "").toLowerCase();
    const studentEmail = (order.userId?.email || "").toLowerCase();

    const matchSearch =
      !search || studentName.includes(search) || studentEmail.includes(search);

    return matchStatus && matchSearch;
  });
  return (
    <div className="w-full min-h-screen py-4 md:py-6 px-2 sm:px-4 md:px-5">
      <AdminPaymentTable
        transactions={transactions}
        filteredOrders={filteredOrders}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
      />
    </div>
  );
};

export default AdminPaymentManagement;
