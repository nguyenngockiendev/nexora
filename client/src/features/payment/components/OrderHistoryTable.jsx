import { CreditCard, Play, Trash2, Video, BookOpen } from "lucide-react";
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
  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen bg-transparent">
      {/* ── Page Header ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-6"
        style={{
          background: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.8)",
          backdropFilter: "blur(32px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(194,110,30,0.08)",
        }}
      >
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3"
              style={{
                background: "rgba(249,115,22,0.12)",
                border: "1px solid rgba(249,115,22,0.25)",
                color: "#ea580c",
              }}
            >
              <CreditCard size={12} />
              Billing
            </div>
            <h1 className="text-3xl font-black text-slate-800">
              Lịch sử đơn hàng
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý hóa đơn mua khóa học và trạng thái thanh toán của bạn
            </p>
          </div>
        </div>
      </div>

      {/* ── Orders Table / List ── */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(194,110,30,0.06)",
        }}
      >
        {orders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center p-16">
            <CreditCard size={48} className="text-slate-400 opacity-40 mb-4" />
            <h4 className="text-xl font-bold text-slate-700 mb-2">
              Chưa có đơn hàng nào
            </h4>
            <p className="text-sm text-slate-500">
              Các giao dịch mua khóa học của bạn sẽ hiển thị tại đây.
            </p>
          </div>
        ) : (
          /* Responsive Layout */
          <div>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ background: "rgba(249,115,22,0.04)" }}>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Khóa Học
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Mã Đơn
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Ngày Tạo
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Loại Lớp
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Giá Tiền
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Trạng Thái
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-orange-500/[0.02] transition-colors"
                      onClick={() => navigate(`/courses/details/recorded/${order.courseId._id}`)}
                      className="cursor-pointer"
                    >
                      {/* Course info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                            <img
                              src={order.courseId.thumbnail}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-bold text-sm text-slate-700 line-clamp-1 max-w-[250px]">
                            {order.courseId.title}
                          </span>
                        </div>
                      </td>
                      {/* Order ID */}
                      <td className="p-4 text-xs font-mono text-slate-400">
                        {order._id}
                      </td>
                      {/* Date */}
                      <td className="p-4 text-xs text-slate-500">
                        {formatDate(order.createdAt)}
                      </td>
                      {/* Type Badge */}
                      <td className="p-4">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                          style={
                            order.courseId.type === "live"
                              ? {
                                  background: "rgba(244,63,94,0.1)",
                                  color: "#e11d48",
                                }
                              : {
                                  background: "rgba(249,115,22,0.1)",
                                  color: "#ea580c",
                                }
                          }
                        >
                          {order.courseId.type === "live" ? (
                            <Video size={10} />
                          ) : (
                            <BookOpen size={10} />
                          )}
                          {order.courseId.type === "live"
                            ? "Live Class"
                            : "Recorded"}
                        </span>
                      </td>
                      {/* Price */}
                      <td className="p-4 font-black text-sm text-slate-700">
                        {formatPrice(order.price)}
                      </td>
                      {/* Status */}
                      <td className="p-4">{getStatusBadge(order.status)}</td>
                      {/* Actions */}
                      <td className="p-4 text-center">
                        {order.status === "pending" ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              disabled={actionLoadingId !== null}
                              onClick={() => handleResumePayment(order._id)}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1 shadow-md shadow-orange-500/10 hover:scale-[1.03] active:scale-95 disabled:opacity-50"
                              style={{
                                background:
                                  "linear-gradient(135deg, #f97316, #fb923c)",
                              }}
                            >
                              {actionLoadingId === order._id ? (
                                "..."
                              ) : (
                                <>
                                  <Play size={12} /> Thanh toán
                                </>
                              )}
                            </button>
                            <button
                              disabled={actionLoadingId !== null}
                              onClick={() => handleCancelOrder(order._id)}
                              className="p-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all disabled:opacity-50"
                              title="Hủy đơn hàng"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List View (< md) */}
            <div className="md:hidden divide-y divide-slate-100">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 space-y-4 hover:bg-orange-500/[0.02]"
                >
                  {/* Top info */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                        <img
                          src={order.courseId.thumbnail}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 line-clamp-2 leading-tight">
                          {order.courseId.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">
                          {order._id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs pt-2 border-t border-slate-100/50">
                    <div>
                      <span className="text-slate-400 block mb-0.5">
                        Ngày tạo:
                      </span>
                      <span className="font-semibold text-slate-600">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">
                        Loại lớp học:
                      </span>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                        style={
                          order.type === "live"
                            ? {
                                background: "rgba(244,63,94,0.1)",
                                color: "#e11d48",
                              }
                            : {
                                background: "rgba(249,115,22,0.1)",
                                color: "#ea580c",
                              }
                        }
                      >
                        {order.type === "live" ? "Live" : "Recorded"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">
                        Thành tiền:
                      </span>
                      <span className="font-black text-slate-700 text-sm">
                        {formatPrice(order.price)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">
                        Trạng thái:
                      </span>
                      <div>{getStatusBadge(order.status)}</div>
                    </div>
                  </div>

                  {/* Actions mobile */}
                  {order.status === "pending" && (
                    <div className="flex gap-2 pt-2">
                      <button
                        disabled={actionLoadingId !== null}
                        onClick={() => handleResumePayment(order._id)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10 disabled:opacity-50"
                        style={{
                          background:
                            "linear-gradient(135deg, #f97316, #fb923c)",
                        }}
                      >
                        {actionLoadingId === order._id ? (
                          "Đang xử lý..."
                        ) : (
                          <>
                            <Play size={12} /> Thanh toán ngay
                          </>
                        )}
                      </button>
                      <button
                        disabled={actionLoadingId !== null}
                        onClick={() => handleCancelOrder(order._id)}
                        className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 border border-slate-200 hover:bg-rose-50 hover:border-rose-100 transition-all flex items-center justify-center disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HistoryTable;
