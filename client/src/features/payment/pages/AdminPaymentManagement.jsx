import { useEffect } from "react";
import AdminPaymentTable from "../components/AdminPaymentTable";
import useAdminPayment from "../hooks/useAdminPayment";
import PaginationForm from "../../../shared/components/PaginationForm";
import usePagination from "../../../shared/hooks/usePagination";

const AdminPaymentManagement = () => {
  const {
    transactions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
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
  const pagination = usePagination(filteredOrders, 5);
  return (
    <div className="w-full min-h-screen py-4 md:py-6 px-2 sm:px-4 md:px-5">
      <AdminPaymentTable
        transactions={transactions}
        filteredOrders={pagination.currentData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        loading={loading}
      />

      {!loading && filteredOrders?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <PaginationForm pagination={pagination} itemName="giao dịch" />
        </div>
      )}
    </div>
  );
};

export default AdminPaymentManagement;
