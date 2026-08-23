import { useState } from "react";
import {
  CreditCard,
  Play,
  Trash2,
  Video,
  BookOpen,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Layers,
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
    <div className="w-full space-y-6 pb-16">
      <div
        className="w-full rounded-[2.5rem] p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all"
        style={{
          background: "rgba(255, 255, 255, 0.82)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(32px)",
          boxShadow: "0 20px 50px rgba(194, 110, 30, 0.08)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold mb-2 shadow-2xs">
              <CreditCard size={13} className="text-orange-500" />
              <span>Lịch sử hóa đơn &amp; Giao dịch</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Lịch sử đơn hàng
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              Theo dõi các khóa học đã mua, hóa đơn thanh toán và tiếp tục thanh
              toán đơn hàng chờ
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/courses-all")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white/90 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <ShoppingBag size={14} />
            <span>Khám phá thêm khóa học</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-amber-200/60">
          <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tổng chi tiêu
            </p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {formatPrice
                ? formatPrice(totalSpent)
                : `${totalSpent.toLocaleString()} đ`}
            </p>
            <span className="text-[11px] font-semibold text-emerald-600">
              Đã thanh toán thành công
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Đơn hoàn thành
            </p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {totalCompleted}{" "}
              <span className="text-sm font-semibold text-slate-400">đơn</span>
            </p>
            <span className="text-[11px] font-semibold text-slate-500">
              Khóa học sẵn sàng học ngay
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Chờ thanh toán
            </p>
            <p className="text-xl sm:text-2xl font-black text-orange-600 mt-1">
              {totalPending}{" "}
              <span className="text-sm font-semibold text-slate-400">đơn</span>
            </p>
            <span className="text-[11px] font-semibold text-amber-600">
              Cần thanh toán qua VNPay
            </span>
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
              onClick={() => navigate("/courses-all")}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              Khám phá khóa học ngay
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
                            {course.title ||
                              classItem.className ||
                              "Khóa học Nexora"}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                            <span className="font-mono text-[11px] text-slate-400">
                              Mã: #{order._id.slice(-8).toUpperCase()}
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

                      <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
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
                        {order.status === "completed" && (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                isLive
                                  ? `/class/details/${classItem._id || firstItem.classId}`
                                  : `/courses/details/recorded/${course._id || firstItem.courseId}`,
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer shadow-2xs"
                          >
                            <Play size={12} className="fill-emerald-600" />
                            <span>Vào học</span>
                          </button>
                        )}

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
                                background:
                                  "linear-gradient(135deg, #f3a36a, #ab4006)",
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
                                    {subCourse.title ||
                                      subClass.className ||
                                      "Khóa học"}
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
