import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import HistoryTable from "../components/OrderHistoryTable";
import usePayment from "../hooks/usePayment";
import { useEffect, useState } from "react";
import useShareSocket from "../../../shared/hooks/useSocket";
import { toast } from "react-toastify";

import usePagination from "../../../shared/hooks/usePagination";
import PaginationForm from "../../../shared/components/PaginationForm";

const OrderHistory = () => {
  const { order, Resumepayment, deleteOrder, orderhistory } = usePayment();
  const socket = useShareSocket();

  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [time, setTime] = useState(300);
  const [urlPayment, seUrlPayment] = useState("");

  useEffect(() => {
    orderhistory();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleSuccess = (data) => {
      toast.success(data?.message || "Thanh toán thành công!");
      seUrlPayment("");
      orderhistory();
    };
    socket.on("payment_success", handleSuccess);
    return () => socket.off("payment_success", handleSuccess);
  }, [socket]);

  useEffect(() => {
    if (!urlPayment) {
      setTime(300);
      return;
    }
    if (time <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [urlPayment, time]);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(16,185,129,0.1)",
              color: "#059669",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            <CheckCircle2 size={12} /> Thành công
          </span>
        );
      case "pending":
        return (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold animate-pulse"
            style={{
              background: "rgba(245,158,11,0.1)",
              color: "#d97706",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <AlertCircle size={12} /> Chờ thanh toán
          </span>
        );
      case "failed":
        return (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(239,68,68,0.1)",
              color: "#dc2626",
              border: "1px solid rgba(239,68,68,0.25)",
            }}
          >
            <XCircle size={12} /> Thất bại
          </span>
        );
      case "cancelled":
        return (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(100,116,139,0.1)",
              color: "#64748b",
              border: "1px solid rgba(100,116,139,0.25)",
            }}
          >
            <XCircle size={12} /> Đã hủy
          </span>
        );
      default:
        return null;
    }
  };

  const handleResumePayment = async (orderId) => {
    try {
      setActionLoadingId(orderId);
      const res = await Resumepayment(orderId);
      if (res?.url) {
        seUrlPayment(res.url);
        setTime(300);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?"))
      return;

    try {
      setActionLoadingId(orderId);
      await deleteOrder(orderId);
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };
  const pagination = usePagination(order, 5);

  return (
    <div>
      <HistoryTable
        time={time}
        urlPaymet={urlPayment}
        onClose={() => seUrlPayment("")}
        orders={pagination.currentData}
        formatPrice={formatPrice}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
        handleResumePayment={handleResumePayment}
        handleCancelOrder={handleCancelOrder}
        actionLoadingId={actionLoadingId}
      />
      {order?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <PaginationForm pagination={pagination} itemName="đơn hàng" />
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
