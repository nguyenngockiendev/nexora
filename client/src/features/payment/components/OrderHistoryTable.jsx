import { useState } from "react";
import {
  CreditCard,
  Trash2,
  Video,
  BookOpen,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Layers,
  QrCode,
  CheckCircle2,
  Clock,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HistoryTable = ({
  orders,
  formatPrice,
  formatDate,
  getStatusBadge,
  handleResumePayment,
  handleCancelOrder,
  actionLoadingId,
}) => {
  const navigate = useNavigate();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const orderList = Array.isArray(orders)
    ? orders
    : orders?.items || orders?.OrderHistory || [];

  const totalSpent = orderList
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + (o.Totalprice || o.totalPrice || 0), 0);

  const totalCompleted = orderList.filter(
    (o) => o.status === "completed",
  ).length;
  const totalPending = orderList.filter((o) => o.status === "pending").length;

  return (
    <div className="w-full space-y-5 pb-12">
      <div
        className="w-full rounded-3xl p-5 sm:p-6 md:py-5 md:px-7 relative overflow-hidden transition-all"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.90) 60%, rgba(15, 23, 42, 0.96) 100%)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow:
            "0 18px 48px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1 shadow-2xs"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fb923c",
              }}
            >
              <CreditCard size={12} className="text-orange-400" />
              <span>Lịch sử hóa đơn &amp; Giao dịch</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Lịch sử đơn hàng
            </h1>
            <p className="text-xs font-medium text-slate-300 mt-0.5">
              Theo dõi các khóa học đã mua, hóa đơn thanh toán và tiếp tục thanh
              toán đơn hàng chờ
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/courses-all")}
            style={{
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white hover:bg-white/20 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <ShoppingBag size={13} className="text-slate-300" />
            <span>Khám phá thêm khóa học</span>
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4 pt-4 border-t border-white/10">
          <div
            className="p-3.5 sm:p-4 rounded-xl shadow-sm flex items-center justify-between transition-all hover:border-white/25"
            style={{
              background:
                "linear-gradient(145deg, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.70) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.12)",
            }}
          >
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Tổng chi tiêu
              </p>
              <p className="text-lg sm:text-xl font-black text-white mt-0.5">
                {formatPrice
                  ? formatPrice(totalSpent)
                  : `${totalSpent.toLocaleString()} đ`}
              </p>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 size={10} />
                Đã thanh toán thành công
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <Wallet size={17} />
            </div>
          </div>

          <div
            className="p-3.5 sm:p-4 rounded-xl shadow-sm flex items-center justify-between transition-all hover:border-white/25"
            style={{
              background:
                "linear-gradient(145deg, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.70) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.12)",
            }}
          >
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Đơn hoàn thành
              </p>
              <p className="text-lg sm:text-xl font-black text-white mt-0.5">
                {totalCompleted}{" "}
                <span className="text-xs font-semibold text-slate-400">
                  đơn hàng
                </span>
              </p>
              <span className="inline-block mt-1 text-[10px] font-semibold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                Khóa học sẵn sàng học ngay
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 text-slate-300 flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 size={17} />
            </div>
          </div>

          <div
            className="p-3.5 sm:p-4 rounded-xl shadow-sm flex items-center justify-between transition-all hover:border-white/25"
            style={{
              background:
                "linear-gradient(145deg, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.70) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.12)",
            }}
          >
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Chờ thanh toán
              </p>
              <p className="text-lg sm:text-xl font-black text-orange-400 mt-0.5">
                {totalPending}{" "}
                <span className="text-xs font-semibold text-slate-400">
                  đơn hàng
                </span>
              </p>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                <Clock size={10} />
                Cần thanh toán qua VNPay
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0 shadow-xs">
              <Clock size={17} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full rounded-[2.5rem] p-4 sm:p-6 md:p-8 relative overflow-hidden transition-all"
        style={{
          background: "rgba(255, 255, 255, 0.82)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 20px 50px rgba(194, 110, 30, 0.07)",
        }}
      >
        {orderList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="w-16 h-16 rounded-3xl bg-orange-100/80 flex items-center justify-center text-orange-600 mb-4 shadow-inner">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">
              Bạn chưa có đơn hàng nào
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6">
              Các khóa học bạn đăng ký hoặc thanh toán sẽ được lưu trữ và hiển
              thị chi tiết tại đây.
            </p>
            <button
              type="button"
              onClick={() => navigate("/courses-all")}
              style={{
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              }}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              <span>Khám phá khóa học ngay</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-4">
              {orderList.map((order) => {
                const items = Array.isArray(order.items) ? order.items : [];
                const firstItem = items[0] || {};
                const course = firstItem.courseId || {};
                const classItem = firstItem.classId || {};
                const isLive =
                  firstItem.type === "live" ||
                  course.type === "live" ||
                  !!classItem.className;
                const displayTitle = isLive
                  ? course.title && classItem.className
                    ? `${course.title} - ${classItem.className}`
                    : classItem.className || course.title || "Lớp học trực tuyến"
                  : course.title || "Khóa học";
                const isExpanded = expandedOrderId === order._id;
                const totalPrice =
                  order.Totalprice || order.totalPrice || firstItem.price || 0;

                return (
                  <div
                    key={order._id}
                    className="rounded-2xl sm:rounded-3xl bg-white/90 border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-all overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                        <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-inner">
                          <img
                            src={
                              course.thumbnail ||
                              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=160&auto=format&fit=crop&q=80"
                            }
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="truncate min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isLive
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : "bg-orange-50 text-orange-700 border border-orange-200"
                              }`}
                            >
                              {isLive ? (
                                <Video size={10} />
                              ) : (
                                <BookOpen size={10} />
                              )}
                              <span>{isLive ? "Trực tuyến" : "Tự học"}</span>
                            </span>

                            {items.length > 1 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                                <Layers size={10} />
                                <span>+{items.length - 1} khóa khác</span>
                              </span>
                            )}
                          </div>

                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate mt-1">
                            {displayTitle}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                            <span className="font-mono text-[11px] text-slate-400">
                              Mã: {order.paymentCode}
                            </span>
                            <span>•</span>
                            <span>
                              {formatDate
                                ? formatDate(order.createdAt)
                                : new Date(order.createdAt).toLocaleDateString(
                                    "vi-VN",
                                  )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-5 sm:gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 flex-wrap sm:flex-nowrap">
                        {/* Cột Phương thức thanh toán */}
                        <div className="text-left md:text-center">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase">
                            Phương thức
                          </p>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                            <QrCode size={11} className="text-blue-500" />
                            <span>
                              {order.paymentMethod === "QR" || order.paymentMethod === "sepay"
                                ? "VietQR"
                                : (order.paymentMethod || "VietQR").toUpperCase()}
                            </span>
                          </span>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase">
                            Tổng tiền
                          </p>
                          <p className="text-base sm:text-lg font-black text-slate-900">
                            {formatPrice
                              ? formatPrice(totalPrice)
                              : `${totalPrice.toLocaleString()} đ`}
                          </p>
                        </div>

                        <div>
                          {getStatusBadge ? (
                            getStatusBadge(order.status)
                          ) : (
                            <span className="font-bold text-xs">
                              {order.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0">
                        {order.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={actionLoadingId !== null}
                              onClick={() =>
                                handleResumePayment &&
                                handleResumePayment(order._id)
                              }
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-white shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                              style={{
                                borderRadius: "9999px",
                                background:
                                  "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                              }}
                            >
                              {actionLoadingId === order._id ? (
                                "Đang mở VNPay..."
                              ) : (
                                <>
                                  <CreditCard size={12} />
                                  <span>Thanh toán</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              disabled={actionLoadingId !== null}
                              onClick={() =>
                                handleCancelOrder &&
                                handleCancelOrder(order._id)
                              }
                              style={{ borderRadius: "9999px" }}
                              className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all cursor-pointer disabled:opacity-50"
                              title="Hủy đơn hàng"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}

                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(order._id)}
                            style={{ borderRadius: "9999px" }}
                            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                            title="Xem chi tiết các khóa học"
                          >
                            {isExpanded ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && items.length > 1 && (
                      <div className="p-4 sm:p-6 bg-slate-50/80 border-t border-slate-100 space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Chi tiết các khóa học trong đơn:
                        </p>
                        <div className="divide-y divide-slate-200/60">
                          {items.map((item, idx) => {
                            const subCourse = item.courseId || {};
                            const subClass = item.classId || {};
                            const subIsLive =
                              item.type === "live" || subCourse.type === "live";

                            return (
                              <div
                                key={item._id || idx}
                                className="py-2.5 flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-10 h-8 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                                    <img
                                      src={
                                        subCourse.thumbnail ||
                                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80"
                                      }
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-bold text-slate-800 truncate max-w-sm">
                                    {subIsLive
                                      ? subCourse.title && subClass.className
                                        ? `${subCourse.title} - ${subClass.className}`
                                        : subClass.className || subCourse.title || "Khóa học"
                                      : subCourse.title || "Khóa học"}
                                  </span>
                                </div>

                                <div className="flex items-center gap-4 flex-shrink-0">
                                  <span className="font-semibold text-slate-500">
                                    {subIsLive ? "Trực tuyến" : "Tự học"}
                                  </span>
                                  <span className="font-black text-slate-900">
                                    {formatPrice
                                      ? formatPrice(item.price)
                                      : `${item.price?.toLocaleString()} đ`}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTable;
