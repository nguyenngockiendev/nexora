import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import HistoryTable from "../components/OrderHistoryTable";
import usePayment from "../hooks/usePayment";
import { useState } from "react";

const OrderHistory = () => {
  const { order, Resumepayment, deleteOrder } = usePayment();

  const [actionLoadingId, setActionLoadingId] = useState(null);

  console.log("orders in OrderHistory", order);
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
      await Resumepayment(orderId);
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

  return (
    <div>
      <HistoryTable
        orders={order}
        formatPrice={formatPrice}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
        handleResumePayment={handleResumePayment}
        handleCancelOrder={handleCancelOrder}
        actionLoadingId={actionLoadingId}
      />
    </div>
  );
};

export default OrderHistory;
