import { useState } from "react";
import {
  HelpCircle,
  Send,
  Mail,
  Phone,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  CreditCard,
  BookOpen,
  User,
  Settings,
  HelpCircle as QuestionIcon,
} from "lucide-react";

const CATEGORIES = [
  { id: "payment", label: "Thanh toán", icon: CreditCard },
  { id: "course", label: "Khóa học & Video", icon: BookOpen },
  { id: "account", label: "Tài khoản", icon: User },
  { id: "technical", label: "Kỹ thuật", icon: Settings },
  { id: "other", label: "Khác", icon: QuestionIcon },
];

export default function HelpCenterView({
  formData,
  handleInputChange,
  handleCategoryChange,
  handleSubmitTicket,
  notifications = [],
  teacherRequests = [],
  activeFilter,
  setActiveFilter,
  openFaqId,
  toggleFaq,
  isSubmitting = false,
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("support@nexora.edu.vn");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const displayList = [
    ...(teacherRequests || []).map((t, idx) => ({
      id: `teacher_${t._id || idx}`,
      code: `#GV-${String(t._id || idx)
        .slice(-5)
        .toUpperCase()}`,
      categoryLabel: "Đăng ký Giảng viên",
      subject: `Xét duyệt trở thành Giảng viên (${t.specialty || "Tổng quát"})`,
      message:
        t.opinion ||
        "Đơn đăng ký tham gia giảng dạy và phát triển khóa học tại Nexora.",
      status:
        t.status === "approved"
          ? "resolved"
          : t.status === "rejected"
            ? "rejected"
            : "pending",
      createdAt: t.createdAt
        ? new Date(t.createdAt).toLocaleDateString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Vừa xong",
      adminReply:
        t.status === "approved"
          ? {
              author: "Hội Đồng Xét Duyệt Nexora",
              role: "Admin",
              time: t.createdAt
                ? new Date(t.createdAt).toLocaleDateString("vi-VN")
                : "Gần đây",
              avatar: null,
              content:
                "🎉 Chúc mừng! Hồ sơ của bạn đã được phê duyệt. Bạn hiện có đầy đủ quyền hạn của Giảng viên.",
            }
          : t.status === "rejected"
            ? {
                author: "Hội Đồng Xét Duyệt Nexora",
                role: "Admin",
                time: t.createdAt
                  ? new Date(t.createdAt).toLocaleDateString("vi-VN")
                  : "Gần đây",
                avatar: null,
                content:
                  "❌ Rất tiếc, hồ sơ của bạn chưa đáp ứng đủ tiêu chuẩn hiện tại của Nexora.",
              }
            : null,
    })),

    ...(notifications || []).map((n, idx) => {
      const isResolved = n.type === "help_reply";
      return {
        id: n._id || idx,
        code: `#TK-${String(n._id || idx)
          .slice(-5)
          .toUpperCase()}`,
        categoryLabel:
          n.type === "help_reply"
            ? "Đã phản hồi"
            : n.type === "help_request"
              ? "Yêu cầu hỗ trợ"
              : n.type === "admin_note"
                ? "Ghi chú Admin"
                : "Thông báo",
        subject: n.title,
        message: n.message,
        status: isResolved ? "resolved" : "pending",
        createdAt: n.createdAt
          ? new Date(n.createdAt).toLocaleDateString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Vừa xong",
        adminReply: isResolved
          ? {
              author: n.senderId?.name || "Ban Quản Trị Nexora",
              role: n.senderId?.role === "admin" ? "Admin" : "Support Team",
              time: n.createdAt
                ? new Date(n.createdAt).toLocaleDateString("vi-VN")
                : "Gần đây",
              avatar: n.senderId?.avatar,
              content: n.message,
            }
          : null,
      };
    }),
  ];

  const filteredTickets = displayList.filter((t) => {
    if (activeFilter === "pending") return t.status === "pending";
    if (activeFilter === "resolved")
      return t.status === "resolved" || t.status === "rejected";
    return true;
  });

  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      <div
        className="rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all shadow-sm"
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

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold shadow-2xs"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fb923c",
              }}
            >
              <Sparkles size={13} className="text-orange-400 animate-pulse" />
              <span>Nexora Support Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-serif">
              Trung Tâm Trợ Giúp &amp; Hỗ Trợ
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Gửi thắc mắc, theo dõi tiến độ giải quyết sự cố và nhận câu trả
              lời trực tiếp từ Đội ngũ Hỗ trợ Nexora.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="px-4 py-2.5 rounded-2xl shadow-xs flex items-center gap-2.5"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-slate-200">
                Đội ngũ hỗ trợ:{" "}
                <span className="text-emerald-400 font-extrabold">
                  Đang Online
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cam kết thời gian phản hồi banner - Full width above the 2 columns */}
      <div
        className="rounded-3xl p-5 relative overflow-hidden transition-all"
        style={{
          background:
            "linear-gradient(135deg, rgba(254, 243, 199, 0.85) 0%, rgba(255, 237, 213, 0.65) 100%)",
          border: "1px solid rgba(251, 146, 60, 0.3)",
          boxShadow: "0 10px 30px rgba(245, 158, 11, 0.08)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <Clock size={20} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-amber-950 tracking-tight flex items-center gap-2">
                <span>Cam kết phản hồi: 15 - 30 phút</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-200/80 text-amber-900">
                  SLA Guarantees
                </span>
              </h3>
              <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
                Đội ngũ kỹ thuật trực hỗ trợ từ{" "}
                <strong>8:00 đến 22:00</strong> tất cả các ngày trong tuần. Mọi
                câu hỏi gửi sau 22:00 sẽ được ưu tiên giải quyết vào đầu giờ
                sáng hôm sau.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-amber-900/90 font-semibold shrink-0">
            <span
              className="inline-flex items-center gap-1 bg-white/70 px-3 py-1 border border-amber-200/70 shadow-2xs"
              style={{ borderRadius: "9999px" }}
            >
              <ShieldAlert size={13} className="text-amber-700" />
              Không chia sẻ mật khẩu
            </span>
            <span
              className="inline-flex items-center gap-1 bg-emerald-50 px-3 py-1 border border-emerald-200/80 text-emerald-900 shadow-2xs"
              style={{ borderRadius: "9999px" }}
            >
              <CheckCircle2 size={13} className="text-emerald-700" />
              Bảo mật thông tin 100%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-6 items-stretch">
        <div
          className="rounded-3xl p-6 relative overflow-hidden transition-all flex flex-col h-full"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 250, 245, 0.6) 100%)",
            backdropFilter: "blur(32px) saturate(190%)",
            WebkitBackdropFilter: "blur(32px) saturate(190%)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 20px 50px rgba(180, 100, 20, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
            height: "100%",
          }}
        >
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                boxShadow: "0 6px 16px rgba(249, 115, 22, 0.35)",
              }}
            >
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 tracking-tight">
                Gửi Yêu Cầu Hỗ Trợ
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Chúng tôi thường phản hồi trong vòng 15-30 phút
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmitTicket}
            className="flex-1 flex flex-col justify-between gap-4 pt-1"
          >
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="space-y-1.5 shrink-0">
                <label className="block text-xs font-bold text-slate-700">
                  Chọn chủ đề cần hỗ trợ:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryChange(cat.id)}
                        style={{ borderRadius: "9999px" }}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-500/25 scale-[1.02]"
                            : "bg-white/80 text-slate-600 border border-slate-200/90 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        <Icon size={12} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5 shrink-0">
                <label className="block text-xs font-bold text-slate-700">
                  Tiêu đề vấn đề <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Lỗi thanh toán khóa học React..."
                  className="w-full h-11 px-3.5 rounded-2xl text-xs font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col min-h-0">
                <label className="block text-xs font-bold text-slate-700 shrink-0">
                  Nội dung chi tiết <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Mô tả cụ thể sự cố bạn gặp phải, tên bài học hoặc mã giao dịch..."
                  className="w-full flex-1 min-h-[160px] p-3.5 rounded-2xl text-xs font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none leading-relaxed"
                  required
                />
              </div>
            </div>

            <div className="pt-2 shrink-0">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  boxShadow: "0 10px 25px rgba(234, 88, 12, 0.35)",
                  borderRadius: "9999px",
                }}
              >
                <Send size={15} />
                <span>
                  {!isSubmitting
                    ? "Gửi Yêu Cầu Hỗ Trợ"
                    : "Đang gửi yêu cầu..."}
                </span>
              </button>
            </div>
          </form>
        </div>

        <div
          className="rounded-[32px] p-6 sm:p-7 relative overflow-hidden transition-all flex flex-col h-full lg:max-h-[720px]"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 250, 245, 0.6) 100%)",
            backdropFilter: "blur(32px) saturate(190%)",
            WebkitBackdropFilter: "blur(32px) saturate(190%)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 20px 50px rgba(180, 100, 20, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
            height: "100%",
          }}
        >
          {/* Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 shrink-0">
            <div>
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <MessageSquare size={18} className="text-orange-500" />
                <span>Lịch Sử Yêu Cầu &amp; Kết Quả</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Theo dõi trạng thái và xem câu trả lời chi tiết của Ban Quản
                Trị
              </p>
            </div>

            {/* Filter Pills */}
            <div
              className="flex items-center gap-1 bg-white/80 p-1 rounded-full border border-slate-200/70 shadow-2xs"
              style={{ borderRadius: "9999px" }}
            >
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                style={{ borderRadius: "9999px" }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-orange-500 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tất cả ({displayList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("pending")}
                style={{ borderRadius: "9999px" }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "pending"
                    ? "bg-amber-500 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Đang xử lý (
                {displayList.filter((t) => t.status === "pending").length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("resolved")}
                style={{ borderRadius: "9999px" }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "resolved"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Đã phản hồi (
                {
                  displayList.filter(
                    (t) => t.status === "resolved" || t.status === "rejected",
                  ).length
                }
                )
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-4 pt-3.5 scrollbar-thin">
              {filteredTickets.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100/70 text-orange-500 flex items-center justify-center mx-auto">
                    <MessageSquare size={22} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    Chưa có yêu cầu hỗ trợ nào trong mục này
                  </p>
                  <p className="text-xs text-slate-400">
                    Nếu bạn gặp bất kỳ sự cố nào, hãy điền form bên trái để gửi
                    yêu cầu nhé.
                  </p>
                </div>
              ) : (
                filteredTickets.map((ticket) => {
                  const isResolved = ticket.status === "resolved";
                  const isRejected = ticket.status === "rejected";
                  const isPending = ticket.status === "pending";

                  return (
                    <div
                      key={ticket.id}
                      className="rounded-2xl p-4 sm:p-5 bg-white/75 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                            {ticket.code}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                            {ticket.categoryLabel}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {ticket.createdAt}
                          </span>
                        </div>

                        {isResolved && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                            <CheckCircle2 size={13} />
                            <span>Đã phản hồi</span>
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                            <XCircle size={13} />
                            <span>Đã từ chối</span>
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs animate-pulse">
                            <AlertCircle size={13} />
                            <span>Đang xử lý</span>
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-800 tracking-tight">
                          {ticket.subject}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {ticket.message}
                        </p>
                      </div>

                      {isResolved && ticket.adminReply && (
                        <div className="pt-2">
                          <div
                            className="rounded-2xl p-4 relative overflow-hidden"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(240, 253, 244, 0.9) 0%, rgba(236, 253, 245, 0.75) 100%)",
                              border: "1px solid rgba(16, 185, 129, 0.25)",
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={
                                  ticket.adminReply.avatar ||
                                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                }
                                alt={ticket.adminReply.author}
                                className="w-8 h-8 rounded-full object-cover border-2 border-emerald-300 shrink-0 shadow-xs"
                              />
                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-extrabold text-emerald-950">
                                      {ticket.adminReply.author}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-200/80 text-emerald-800">
                                      {ticket.adminReply.role}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-medium text-emerald-800/70">
                                    {ticket.adminReply.time}
                                  </span>
                                </div>
                                <p className="text-xs text-emerald-950/90 leading-relaxed font-medium">
                                  {ticket.adminReply.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {isRejected && ticket.adminReply && (
                        <div className="pt-2">
                          <div
                            className="rounded-2xl p-4 relative overflow-hidden"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(255, 241, 242, 0.9) 0%, rgba(255, 228, 230, 0.75) 100%)",
                              border: "1px solid rgba(244, 63, 94, 0.25)",
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                                <XCircle size={16} />
                              </div>
                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-extrabold text-rose-950">
                                      {ticket.adminReply.author}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-200/80 text-rose-800">
                                      {ticket.adminReply.role}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-medium text-rose-800/70">
                                    {ticket.adminReply.time}
                                  </span>
                                </div>
                                <p className="text-xs text-rose-950/90 leading-relaxed font-medium">
                                  {ticket.adminReply.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {isPending && (
                        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
                          <AlertCircle
                            size={14}
                            className="text-amber-600 shrink-0"
                          />
                          <span>
                            Yêu cầu của bạn đã được chuyển tới bộ phận kỹ thuật
                            và đang được đối soát xử lý.
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
