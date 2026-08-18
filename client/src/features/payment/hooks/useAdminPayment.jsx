import { useState } from "react";
import { managerHistoryByadmin } from "../api/payment-api";
import { toast } from "react-toastify";

export const useAdminPayment = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const GetHistory = async () => {
    try {
      setLoading(true);
      const res = await managerHistoryByadmin();
      if (!res) {
        toast.error(`lỗi hệ thống ${res}`);
      }
      setTransactions(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,

    currentPage,
    setCurrentPage,
    GetHistory,
    loading,
  };
};

export default useAdminPayment;
