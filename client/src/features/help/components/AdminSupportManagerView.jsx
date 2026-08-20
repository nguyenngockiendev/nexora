import React, { useState } from "react";
import {
  Shield,
  MessageSquare,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Send,
  Eye,
  X,
  Mail,
  Phone,
  User,
  ExternalLink,
  BookOpen,
  CreditCard,
  Settings,
  Sparkles,
} from "lucide-react";

export default function AdminSupportManagerView({
  combinedList = [],
  selectedItem,
  setSelectedItem,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  replyText,
  setReplyText,
  handleSendReply,
  handleTeacherAction,
  handleBroadcastNote,
  loading = false,
  isActionLoading = false,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openBroadcastModal, setOpenBroadcastModal] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    targetRole: "all",
    receiverId: "",
    title: "",
    message: "",
  });

  // Thống kê số lượng
  const totalCount = combinedList.length;
  const pendingCount = combinedList.filter(
    (item) => item.status === "pending"
  ).length;
  const teacherCount = combinedList.filter(
    (item) => item.type === "teacher"
  ).length;
  const resolvedCount = combinedList.filter(
    (item) => item.status === "resolved" || item.status === "approved"
  ).length;

  // Lọc theo tab & search query
  const filteredList = combinedList.filter((item) => {
    // 1. Tab filter
    if (activeTab === "help" && item.type !== "help") return false;
    if (activeTab === "teacher" && item.type !== "teacher") return false;
    if (activeTab === "pending" && item.status !== "pending") return false;

    // 2. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const senderName = (item.sender?.name || "").toLowerCase();
      const senderEmail = (item.sender?.email || "").toLowerCase();
      const title = (item.title || "").toLowerCase();
      const message = (item.message || "").toLowerCase();
      return (
        senderName.includes(q) ||
        senderEmail.includes(q) ||
        title.includes(q) ||
        message.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full p-4 sm:p-6 space-y-5">
      {/* 🌟 1. STATS BANNER (SLIM HORIZONTAL PILLS) 🌟 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total */}
        <div
          className="rounded-2xl px-4 py-2.5 flex items-center justify-between transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
          }}
        >
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Tổng đơn: <strong className="font-black text-slate-900">{totalCount}</strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-xl text-xs font-black bg-amber-100/80 text-amber-900 border border-amber-200/60">
            {totalCount}
          </span>
        </div>

        {/* Pending */}
        <div
          className="rounded-2xl px-4 py-2.5 flex items-center justify-between transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
          }}
        >
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Chờ xử lý: <strong className="font-black text-slate-900">{pendingCount}</strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-xl text-xs font-black bg-orange-100 text-orange-900 border border-orange-200/60 animate-pulse">
            {pendingCount}
          </span>
        </div>

        {/* Teacher Requests */}
        <div
          className="rounded-2xl px-4 py-2.5 flex items-center justify-between transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
          }}
        >
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Duyệt Giảng viên: <strong className="font-black text-slate-900">{teacherCount}</strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-xl text-xs font-black bg-rose-100 text-rose-900 border border-rose-200/60">
            {teacherCount}
          </span>
        </div>

        {/* Resolved */}
        <div
          className="rounded-2xl px-4 py-2.5 flex items-center justify-between transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
          }}
        >
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Đã giải quyết: <strong className="font-black text-slate-900">{resolvedCount}</strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-xl text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-200/60">
            {resolvedCount}
          </span>
        </div>
      </div>

      {/* 🌟 2. SEARCH & FILTER TABS 🌟 */}
      <div
        className="rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 250, 245, 0.65) 100%)",
          backdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.85)",
        }}
      >
        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-white/70 p-1 rounded-2xl border border-slate-200/70 overflow-x-auto shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "all"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tất cả ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("help")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "help"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Hỗ trợ học viên ({combinedList.filter((x) => x.type === "help").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("teacher")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "teacher"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Duyệt Giảng viên ({teacherCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "pending"
                ? "bg-amber-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Chờ xử lý ({pendingCount})
          </button>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, email, tiêu đề..."
              className="w-full h-10 pl-9 pr-4 rounded-2xl text-xs font-semibold text-slate-800 bg-white/80 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
            />
          </div>

          {/* Broadcast / Direct Note Button */}
          <button
            type="button"
            onClick={() => setOpenBroadcastModal(true)}
            className="h-10 px-4 rounded-2xl text-xs font-bold text-white shadow-md shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            }}
          >
            <Sparkles size={14} />
            <span>Phát Thông Báo / Note</span>
          </button>
        </div>
      </div>

      {/* 🌟 3. MASTER-DETAIL 2-COLUMN LAYOUT 🌟 */}
      <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-6 items-start">
        {/* ════════════════ LEFT COLUMN: REQUEST QUEUE ════════════════ */}
        <div
          className="rounded-[32px] p-5 sm:p-6 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 250, 245, 0.6) 100%)",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow: "0 20px 50px rgba(180, 100, 20, 0.08)",
          }}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare size={16} className="text-orange-500" />
              <span>Danh Sách Đơn Đến ({filteredList.length})</span>
            </h2>
          </div>

          {filteredList.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto">
                <CheckCircle2 size={22} />
              </div>
              <p className="text-sm font-bold text-slate-700">
                Không có đơn nào trong danh sách này
              </p>
              <p className="text-xs text-slate-400">
                Hệ thống đang hoạt động trơn tru không có yêu cầu tồn đọng!
              </p>
            </div>
          ) : (
            filteredList.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const isTeacher = item.type === "teacher";
              const isPending = item.status === "pending";
              const isResolved =
                item.status === "resolved" || item.status === "approved";
              const isRejected = item.status === "rejected";

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`rounded-2xl p-4 transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-white shadow-md border-orange-400/80 ring-2 ring-orange-500/20 translate-x-1"
                      : "bg-white/65 hover:bg-white/90 border-slate-200/70 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={
                          item.sender?.avatar ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                        }
                        alt={item.sender?.name || "User"}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                      />
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          isPending
                            ? "bg-amber-500"
                            : isResolved
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-black text-slate-900 truncate">
                          {item.sender?.name || "Người dùng"}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                          {item.createdAtFormatted || "Gần đây"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Category Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${
                            isTeacher
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-orange-50 text-orange-700 border-orange-200"
                          }`}
                        >
                          {item.categoryBadge}
                        </span>

                        {/* Role */}
                        <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-slate-100 text-slate-600">
                          {item.sender?.role || "student"}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                        {item.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ════════════════ RIGHT COLUMN: DETAIL & ACTION PANEL ════════════════ */}
        <div
          className="rounded-[32px] p-6 sm:p-8 space-y-6 min-h-[500px]"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 250, 245, 0.65) 100%)",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow: "0 20px 50px rgba(180, 100, 20, 0.08)",
          }}
        >
          {selectedItem ? (
            <div className="space-y-6">
              {/* Header: User Info & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70">
                <div className="flex items-center gap-3.5">
                  <img
                    src={
                      selectedItem.sender?.avatar ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                    }
                    alt={selectedItem.sender?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-200 shadow-sm"
                  />
                  <div className="space-y-0.5">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      {selectedItem.sender?.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-400" />
                      <span>{selectedItem.sender?.email || "Chưa có email"}</span>
                    </p>
                    {selectedItem.sender?.phone && (
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" />
                        <span>{selectedItem.sender?.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {selectedItem.status === "pending" && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs animate-pulse">
                      <Clock size={13} />
                      <span>Chờ xử lý</span>
                    </span>
                  )}
                  {selectedItem.status === "approved" && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                      <CheckCircle2 size={13} />
                      <span>Đã phê duyệt</span>
                    </span>
                  )}
                  {selectedItem.status === "resolved" && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                      <CheckCircle2 size={13} />
                      <span>Đã phản hồi</span>
                    </span>
                  )}
                  {selectedItem.status === "rejected" && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                      <XCircle size={13} />
                      <span>Đã từ chối</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Message Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-orange-100 text-orange-800">
                    {selectedItem.categoryBadge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {selectedItem.createdAtFormatted}
                  </span>
                </div>
                <h4 className="text-base font-black text-slate-800">
                  {selectedItem.title}
                </h4>
                <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedItem.message}
                </div>
              </div>

              {/* 🎓 IF TEACHER REQUEST: SHOW SPECIALTY & PROOF CERTIFICATE IMAGE 🎓 */}
              {selectedItem.type === "teacher" && (
                <div className="space-y-3 pt-2 border-t border-slate-200/60">
                  {selectedItem.specialty && (
                    <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200/60 flex items-center gap-2 text-xs">
                      <BookOpen size={15} className="text-purple-600 shrink-0" />
                      <span className="text-purple-950 font-bold">
                        Chuyên môn đăng ký:{" "}
                        <span className="text-purple-700 font-extrabold">
                          {selectedItem.specialty}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Certificate Image Preview */}
                  {selectedItem.proofImage && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Award size={14} className="text-amber-500" />
                        <span>Bằng cấp / Chứng chỉ đính kèm:</span>
                      </p>
                      <div className="relative group max-w-sm rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
                        <img
                          src={selectedItem.proofImage}
                          alt="Chứng chỉ"
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedImage(selectedItem.proofImage)}
                          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-bold cursor-pointer"
                        >
                          <Eye size={16} />
                          <span>Xem ảnh gốc</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Teacher Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={isActionLoading || selectedItem.status === "approved"}
                      onClick={() =>
                        handleTeacherAction(
                          selectedItem.id,
                          selectedItem.sender?._id,
                          "approved"
                        )
                      }
                      className="px-6 h-11 rounded-2xl text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      }}
                    >
                      <CheckCircle2 size={15} />
                      <span>Duyệt làm Giảng viên</span>
                    </button>

                    <button
                      type="button"
                      disabled={isActionLoading || selectedItem.status === "rejected"}
                      onClick={() =>
                        handleTeacherAction(
                          selectedItem.id,
                          selectedItem.sender?._id,
                          "rejected"
                        )
                      }
                      className="px-6 h-11 rounded-2xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle size={15} />
                      <span>Từ chối</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 💬 IF HELP TICKET: SHOW REPLY TEXTAREA & SEND BUTTON 💬 */}
              {selectedItem.type === "help" && (
                <div className="space-y-3 pt-2 border-t border-slate-200/60">
                  <label className="block text-xs font-bold text-slate-800">
                    Phản hồi giải đáp thắc mắc cho học viên:
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Nhập câu trả lời chi tiết hoặc hướng dẫn khắc phục sự cố..."
                    className="w-full p-3.5 rounded-2xl text-xs font-semibold text-slate-800 bg-white/80 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none leading-relaxed"
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={isActionLoading || !replyText.trim()}
                      onClick={() =>
                        handleSendReply(
                          selectedItem.sender?._id,
                          selectedItem.title
                        )
                      }
                      className="px-7 h-11 rounded-2xl text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                        borderRadius: "16px",
                      }}
                    >
                      <Send size={14} />
                      <span>
                        {!isActionLoading
                          ? "Gửi phản hồi cho học viên"
                          : "Đang gửi..."}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center space-y-3">
              <div className="w-14 h-14 rounded-3xl bg-orange-100/70 text-orange-500 flex items-center justify-center mx-auto shadow-2xs">
                <Sparkles size={24} />
              </div>
              <h3 className="text-base font-black text-slate-800">
                Chọn một đơn từ danh sách bên trái
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Bấm vào bất kỳ thẻ nào để xem chi tiết thông tin, ảnh bằng cấp
                và gửi phản hồi trực tiếp cho người dùng.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 🌟 MODAL PHÓNG TO ẢNH CHỨNG CHỈ 🌟 */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                Bằng cấp / Chứng chỉ gốc
              </span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <img
              src={selectedImage}
              alt="Bằng cấp phóng to"
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* 🌟 MODAL PHÁT THÔNG BÁO / GỬI NOTE TỰ DO 🌟 */}
      {openBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="relative max-w-xl w-full rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 transition-all"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 245, 0.9) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Phát Thông Báo / Lời Nhắn
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Gửi thông báo toàn hệ thống hoặc nhắn tin riêng cho người dùng
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpenBroadcastModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Target Audience Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Phạm vi người nhận:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "all", label: "🌐 Toàn server" },
                  { id: "student", label: "🎓 Học viên" },
                  { id: "instructor", label: "👨‍🏫 Giảng viên" },
                  { id: "direct", label: "👤 Người đang chọn" },
                ].map((target) => (
                  <button
                    key={target.id}
                    type="button"
                    onClick={() =>
                      setBroadcastForm((prev) => ({
                        ...prev,
                        targetRole: target.id,
                        receiverId:
                          target.id === "direct"
                            ? selectedItem?.sender?._id || ""
                            : "",
                      }))
                    }
                    className={`p-2.5 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer border ${
                      broadcastForm.targetRole === target.id
                        ? "bg-orange-500 text-white border-orange-600 shadow-sm"
                        : "bg-white/80 text-slate-700 border-slate-200 hover:bg-white"
                    }`}
                  >
                    {target.label}
                  </button>
                ))}
              </div>

              {broadcastForm.targetRole === "direct" && (
                <p className="text-[11px] text-orange-600 font-bold mt-1">
                  Đang gửi riêng tới:{" "}
                  {selectedItem?.sender?.name
                    ? `${selectedItem.sender.name} (${selectedItem.sender.email})`
                    : "Chưa chọn người dùng nào ở danh sách!"}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Tiêu đề thông báo <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                value={broadcastForm.title}
                onChange={(e) =>
                  setBroadcastForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Ví dụ: Thông báo bảo trì hệ thống, Lịch nghỉ lễ..."
                className="w-full h-11 px-3.5 rounded-2xl text-xs font-semibold text-slate-800 bg-white border border-slate-200/90 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Nội dung thông báo <span className="text-orange-500">*</span>
              </label>
              <textarea
                rows={4}
                value={broadcastForm.message}
                onChange={(e) =>
                  setBroadcastForm((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                placeholder="Nhập chi tiết nội dung cần thông báo..."
                className="w-full p-3.5 rounded-2xl text-xs font-semibold text-slate-800 bg-white border border-slate-200/90 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOpenBroadcastModal(false)}
                className="px-5 h-11 rounded-2xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                disabled={
                  isActionLoading ||
                  !broadcastForm.title.trim() ||
                  !broadcastForm.message.trim()
                }
                onClick={async () => {
                  if (handleBroadcastNote) {
                    const ok = await handleBroadcastNote(broadcastForm);
                    if (ok) {
                      setOpenBroadcastModal(false);
                      setBroadcastForm({
                        targetRole: "all",
                        receiverId: "",
                        title: "",
                        message: "",
                      });
                    }
                  }
                }}
                className="px-7 h-11 rounded-2xl text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                }}
              >
                <Send size={14} />
                <span>
                  {!isActionLoading ? "Phát Thông Báo Ngay" : "Đang gửi..."}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
