import { useState } from "react";
import {
  Search,
  Calendar,
  Download,
  ChevronDown,
  ChevronRight,
  Settings,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Receipt,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPaymentTable = ({
  transactions,
  filteredOrders,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  currentPage,
  setCurrentPage,
  loading,
}) => {
  const navigate = useNavigate();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price || 0);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <CheckCircle2 size={12} className="text-emerald-500" />
            Đã thanh toán
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
            <AlertCircle size={12} className="text-amber-500" />
            Chờ xử lý
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
            <XCircle size={12} className="text-rose-500" />
            Thất bại
          </span>
        );
      default:
        return null;
    }
  };

  const orderList =
    filteredOrders ||
    (Array.isArray(transactions)
      ? transactions
      : transactions?.OrderHistory || []);

  const totalComplete = transactions?.totalPurchasesComplete || 0;
  const countComplete = transactions?.TotalComplete || 0;

  const totalFailed = transactions?.totalPurchasesfalse || 0;
  const countFailed = transactions?.TotalFalse || 0;

  const totalPending = transactions?.totalPurchasespending || 0;
  const countPending = transactions?.TotalPending || 0;

  return (
    <div className="w-full space-y-7 pb-16">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Lịch Sử Thanh Toán &amp; Doanh Thu
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
          Xem toàn bộ lịch sử mua khóa học, hóa đơn học viên và thanh quyết toán doanh thu
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          className="rounded-3xl p-6 relative overflow-hidden transition-all hover:scale-[1.01]"
          style={{
            background: "rgba(255, 255, 255, 0.78)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 10px 30px rgba(194, 110, 30, 0.05)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tổng hoàn tất
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {formatPrice(totalComplete)}
              </h3>
              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {countComplete} Đơn đã thanh toán
              </span>
            </div>
          </div>
        </div>

        <div
          className="rounded-3xl p-6 relative overflow-hidden transition-all hover:scale-[1.01]"
          style={{
            background: "rgba(255, 255, 255, 0.78)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 10px 30px rgba(194, 110, 30, 0.05)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tổng thất bại / Đã hủy
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {formatPrice(totalFailed)}
              </h3>
              <span className="inline-block mt-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                {countFailed} Đơn thất bại
              </span>
            </div>
          </div>
        </div>

        <div
          className="rounded-3xl p-6 relative overflow-hidden transition-all hover:scale-[1.01]"
          style={{
            background: "rgba(255, 255, 255, 0.78)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 10px 30px rgba(194, 110, 30, 0.05)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tổng chờ xử lý
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {formatPrice(totalPending)}
              </h3>
              <span className="inline-block mt-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {countPending} Đơn chờ duyệt
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tên hoặc email"
            className="w-full pl-11 pr-4 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-orange-500/20"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.02)",
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 cursor-pointer hover:bg-white transition-all shadow-2xs"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
            }}
          >
            <Calendar size={15} className="text-orange-500" />
            <span>Tháng 8, 2026</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>

          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black text-white shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #eca776, #9a3b08)",
              borderRadius: "9999px",
            }}
          >
            <Download size={14} />
            <span>Xuất Báo Cáo PDF</span>
          </button>
        </div>
      </div>

      <div
        className="rounded-[2.2rem] p-3 sm:p-5 relative overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.78)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 10px 35px rgba(194, 110, 30, 0.05)",
        }}
      >
        <div className="hidden lg:grid grid-cols-[3fr_1.5fr_1.2fr_1.4fr_1fr_1.1fr_0.5fr] items-center gap-4 px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400 select-none">
          <div>Học viên</div>
          <div>Ngày giao dịch</div>
          <div>Khóa học</div>
          <div>Số tiền</div>
          <div>Cổng thanh toán</div>
          <div>Trạng thái</div>
          <div className="text-right">Thao tác</div>
        </div>

        <div className="space-y-3 mt-1">
          {orderList?.map((trx) => {
            const isExpanded = expandedOrderId === trx._id;
            const studentName =
              trx.userId?.name || trx.student?.name || "Học viên";
            const studentEmail =
              trx.userId?.email || trx.student?.email || "student@example.com";
            const studentAvatar =
              trx.userId?.avatar ||
              trx.student?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80";

            const orderDate =
              trx.date ||
              (trx.createdAt
                ? new Date(trx.createdAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Hôm nay");
            const billingPeriod =
              trx.billingPeriod || `${trx.items?.length || 1} Khóa học`;
            const orderAmount = trx.Totalprice ?? trx.totalPrice ?? 0;
            const gateway = trx.paymentMethod?.toUpperCase() || "VNPAY";

            return (
              <div
                key={trx._id}
                className={`rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                  isExpanded
                    ? "bg-amber-50/70 border border-amber-300/80 shadow-lg ring-2 ring-amber-400/25"
                    : "bg-white/85 border border-white hover:bg-white hover:shadow-md"
                }`}
              >
                <div
                  onClick={() => toggleExpand(trx._id)}
                  className="flex items-center justify-between p-4 sm:p-5 md:p-6 cursor-pointer select-none"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_1.5fr_1.2fr_1.4fr_1fr_1.1fr_0.5fr] items-center gap-4 w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-xl bg-slate-100/90 flex items-center justify-center text-slate-700 transition-transform duration-300 shadow-2xs flex-shrink-0">
                        {isExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                      <img
                        src={studentAvatar}
                        alt={studentName}
                        className="w-10 h-10 rounded-xl object-cover border border-white shadow-xs flex-shrink-0"
                      />
                      <div className="truncate min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {studentName}
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                          {studentEmail}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-slate-600 truncate">
                      {orderDate}
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-slate-700 truncate">
                      {billingPeriod}
                    </div>

                    <div className="text-sm sm:text-base md:text-lg font-black text-orange-600 truncate">
                      {formatPrice(orderAmount)}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-700 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/60 inline-block shadow-2xs">
                        {gateway}
                      </span>
                    </div>

                    <div>{getStatusBadge(trx.status)}</div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 sm:px-7 pb-6 pt-3 border-t border-amber-200/80 mt-1">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3">
                      <div className="lg:col-span-2 space-y-3.5">
                        <p className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                          Chi tiết khóa học đã mua ({trx.items?.length || 0})
                        </p>

                        <div className="space-y-3">
                          {trx.items?.map((item, idx) => {
                            const courseTitle =
                              item.courseId?.title || item.title || "Khóa học";
                            const instructorName =
                              item.courseId?.instructor?.name ||
                              item.classId?.instructorId?.name ||
                              item.instructor ||
                              "Giảng viên";
                            const thumbnail =
                              item.courseId?.thumbnail ||
                              item.thumbnail ||
                              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&q=80";

                            return (
                              <div
                                key={item._id || idx}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200/70 shadow-xs gap-4"
                              >
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <span className="text-sm font-black text-slate-400 w-5">
                                    {idx + 1}.
                                  </span>
                                  <img
                                    src={thumbnail}
                                    alt={courseTitle}
                                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-100 shadow-xs flex-shrink-0"
                                  />
                                  <div className="truncate">
                                    <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                                      {courseTitle}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      Giảng viên:{" "}
                                      <span className="font-semibold text-slate-700">
                                        {instructorName}
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                  <span className="text-sm sm:text-base font-black text-slate-900">
                                    {formatPrice(item.price)}
                                  </span>
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/instructor/lessons/${item.courseId?._id || item.courseId}`,
                                      )
                                    }
                                    type="button"
                                    className="px-4 py-2 rounded-full text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200/80 hover:bg-orange-100 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-2xs"
                                  >
                                    Xem giáo trình
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 border border-slate-200/70 shadow-xs space-y-3">
                        <p className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-wider flex items-center justify-between">
                          <span>Giao Dịch VNPay</span>
                          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-black shadow-2xs">
                            ĐÃ XÁC THỰC
                          </span>
                        </p>

                        <div className="space-y-2 text-xs sm:text-sm text-slate-600 pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 font-medium">
                              Ngày thanh toán:
                            </span>
                            <span className="font-bold text-slate-800">
                              {orderDate}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 font-medium">
                              Mã giao dịch:
                            </span>
                            <span className="font-mono font-black text-slate-900 text-xs sm:text-sm">
                              {trx.transactionId ||
                                `VNP-${trx._id?.slice(-8).toUpperCase()}`}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 font-medium">
                              Trạng thái:
                            </span>
                            <span className="font-black text-emerald-600 capitalize">
                              {trx.status === "completed"
                                ? "Hoàn tất"
                                : trx.status === "pending"
                                  ? "Chờ xử lý"
                                  : "Thất bại"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 font-medium">
                              Số tiền:
                            </span>
                            <span className="text-base sm:text-lg font-black text-orange-600">
                              {formatPrice(orderAmount)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center border-t border-slate-100 pt-2.5">
                            <span className="text-slate-500 font-medium">
                              Thông tin thanh toán:
                            </span>
                            <span className="font-bold text-slate-700">
                              Cổng thanh toán VNPay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 border-t border-amber-200/60 mt-5 pt-4">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        <Receipt size={16} className="text-slate-500" />
                        <span>Xem hóa đơn</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 hover:bg-orange-50/70 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        <FileText size={16} className="text-orange-500" />
                        <span>Tải hóa đơn PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
          >
            &lt;
          </button>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-600 bg-white border border-slate-200 shadow-2xs">
            1-5 trên {transactions?.length || 5}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentTable;
