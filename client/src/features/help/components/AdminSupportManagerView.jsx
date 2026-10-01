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
      {/* 🌟 1. TOP BAR: 4 STATS CARDS + SEARCH + BROADCAST BUTTON 🌟 */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
          {[
            {
              label: "Tổng đơn",
              count: totalCount,
              icon: <MessageSquare size={17} />,
              color: "text-orange-600 bg-orange-100/80",
            },
            {
              label: "Chờ xử lý",
              count: pendingCount,
              icon: <Clock size={17} />,
              color: "text-amber-600 bg-amber-100/80",
              pulse: true,
            },
            {
              label: "Duyệt GV",
              count: teacherCount,
              icon: <Award size={17} />,
              color: "text-indigo-600 bg-indigo-100/80",
            },
            {
              label: "Đã giải quyết",
              count: resolvedCount,
              icon: <CheckCircle2 size={17} />,
              color: "text-emerald-600 bg-emerald-100/80",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl px-3.5 py-2.5 flex items-center gap-3 transition-all bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_4px_16px_rgba(180,100,20,0.04)]"
            >
              <div
                className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p
                  className={`text-lg font-black text-slate-900 leading-none mt-0.5 ${
                    stat.pulse ? "animate-pulse" : ""
                  }`}
                >
                  {stat.count}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Broadcast Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-full sm:w-56">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full h-10 pl-9 pr-4 rounded-full text-xs font-semibold text-slate-800 bg-white/80 border border-slate-200/80 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-2xs"
            />
          </div>

          <button
            type="button"
            onClick={() => setOpenBroadcastModal(true)}
            className="h-10 px-5 rounded-full text-xs font-black text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            }}
          >
            <Sparkles size={14} />
            <span>Phát Thông Báo</span>
          </button>
        </div>
      </div>

      {/* 🌟 2. MODERN CAPSULE FILTER TABS 🌟 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <div
          className="p-1.5 flex items-center gap-1.5 border transition-all"
          style={{
            borderRadius: "9999px",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 4px 20px rgba(180, 100, 20, 0.04)",
          }}
        >
          {[
            {
              id: "all",
              label: "Tất cả",
              count: totalCount,
              icon: <Sparkles size={13} />,
            },
            {
              id: "pending",
              label: "Chờ xử lý",
              count: pendingCount,
              icon: <Clock size={13} />,
              pulse: true,
            },
            {
              id: "teacher",
              label: "Duyệt GV",
              count: teacherCount,
              icon: <Award size={13} />,
            },
            {
              id: "help",
              label: "Hỗ trợ",
              count: combinedList.filter((x) => x.type === "help").length,
              icon: <MessageSquare size={13} />,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center gap-2 select-none ${
                  isActive
                    ? "text-white shadow-md shadow-orange-500/30 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
                style={{
                  borderRadius: "9999px",
                  background: isActive
                    ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                    : "transparent",
                }}
              >
                <span className={isActive ? "text-white" : "text-slate-400"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-black transition-all ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-slate-200/70 text-slate-700"
                  }`}
                  style={{ borderRadius: "9999px" }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🌟 3. MASTER-DETAIL 2-COLUMN LAYOUT (40% - 60%) 🌟 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ════════════════ LEFT COLUMN: TICKET LIST (40%) ════════════════ */}
        <div
          className="lg:col-span-5 rounded-[2rem] p-4 sm:p-5 flex flex-col h-auto lg:h-[650px]"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 250, 245, 0.7) 100%)",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 12px 36px rgba(180, 100, 20, 0.05)",
          }}
        >
          {/* Header cố định */}
          <div className="flex items-center justify-between px-1 pb-3 shrink-0 border-b border-slate-200/50 mb-3">
            <span className="text-xs font-black text-slate-700 tracking-wide uppercase">
              Danh sách đơn ({filteredList.length})
            </span>
          </div>

          {/* Danh sách thẻ cuộn chuột bên trong */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 scrollbar-thin">
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

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`group relative rounded-2xl p-3.5 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-50/95 via-amber-50/50 to-white/95 border border-orange-300 shadow-md shadow-orange-500/10 border-l-[4px] border-l-orange-500"
                        : "bg-white/80 hover:bg-white border border-slate-200/70 shadow-2xs hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar with online dot */}
                      <div className="relative shrink-0">
                        <img
                          src={
                            item.sender?.avatar ||
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                          }
                          alt={item.sender?.name || "User"}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                            isPending
                              ? "bg-amber-400"
                              : isResolved
                              ? "bg-emerald-500"
                              : "bg-rose-500"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-xs font-black text-slate-900 truncate">
                              {item.sender?.name || "Người dùng"}
                            </span>
                            <span
                              className={`px-2 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ${
                                isTeacher
                                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                                  : "bg-orange-100 text-orange-700 border border-orange-200/60"
                              }`}
                            >
                              {item.sender?.role ||
                                (isTeacher ? "instructor" : "student")}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap shrink-0">
                            {item.createdAtFormatted || "Gần đây"}
                          </span>
                        </div>

                        <p className="text-xs font-bold text-slate-800 truncate mt-0.5">
                          {item.title}
                        </p>
                        <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                          {item.message}
                        </p>
                      </div>

                      {/* Pending amber dot indicator */}
                      {isPending && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0 ml-1" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ════════════════ RIGHT COLUMN: DETAIL & ACTION PANEL (60%) ════════════════ */}
        <div
          className="lg:col-span-7 rounded-[2rem] p-6 sm:p-7 flex flex-col h-auto lg:h-[650px]"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 250, 245, 0.75) 100%)",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 12px 36px rgba(180, 100, 20, 0.05)",
          }}
        >
          {selectedItem ? (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header cố định trên cùng: User Info & Status */}
              <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={
                        selectedItem.sender?.avatar ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                      }
                      alt={selectedItem.sender?.name}
                      className="w-13 h-13 rounded-full object-cover border-2 border-orange-200 shadow-sm"
                    />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        selectedItem.status === "pending"
                          ? "bg-amber-400"
                          : "bg-emerald-500"
                      }`}
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                        {selectedItem.sender?.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-700">
                        {selectedItem.sender?.role || "student"}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Mail size={12} className="text-slate-400" />
                      <span>
                        {selectedItem.sender?.email || "Chưa có email"}
                      </span>
                    </p>
                    {selectedItem.sender?.phone && (
                      <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" />
                        <span>{selectedItem.sender?.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {selectedItem.status === "pending" && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>Chờ xử lý</span>
                    </span>
                  )}
                  {selectedItem.status === "approved" && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                      <CheckCircle2 size={13} />
                      <span>Đã phê duyệt</span>
                    </span>
                  )}
                  {selectedItem.status === "resolved" && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                      <CheckCircle2 size={13} />
                      <span>Đã phản hồi</span>
                    </span>
                  )}
                  {selectedItem.status === "rejected" && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
                      <XCircle size={13} />
                      <span>Đã từ chối</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Phần nội dung ở giữa: Có thể cuộn chuột độc lập */}
              <div className="flex-1 overflow-y-auto pr-1.5 py-4 space-y-4 scrollbar-thin">
                {/* Title & Message Content Card */}
                <div className="rounded-2xl p-5 bg-white border border-slate-200/80 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800">
                        {selectedItem.categoryBadge}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {selectedItem.createdAtFormatted}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-black text-slate-900 leading-snug">
                    {selectedItem.title}
                  </h4>

                  <div className="h-px bg-slate-100 my-1" />

                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Nội dung chi tiết:
                  </span>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedItem.message}
                  </p>
                </div>

                {/* 🎓 IF TEACHER REQUEST: SHOW SPECIALTY & PROOF CERTIFICATE IMAGE 🎓 */}
                {selectedItem.type === "teacher" && (
                  <div className="space-y-3 pt-2 border-t border-slate-200/60">
                    {selectedItem.specialty && (
                      <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/60 flex items-center gap-2 text-xs">
                        <BookOpen
                          size={15}
                          className="text-purple-600 shrink-0"
                        />
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
                            onClick={() =>
                              setSelectedImage(selectedItem.proofImage)
                            }
                            className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-bold cursor-pointer"
                          >
                            <Eye size={16} />
                            <span>Xem ảnh gốc</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Teacher Action Buttons */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        disabled={
                          isActionLoading || selectedItem.status === "approved"
                        }
                        onClick={() =>
                          handleTeacherAction(
                            selectedItem.id,
                            selectedItem.sender?._id,
                            "approved"
                          )
                        }
                        className="px-6 h-11 rounded-full text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={
                          isActionLoading || selectedItem.status === "rejected"
                        }
                        onClick={() =>
                          handleTeacherAction(
                            selectedItem.id,
                            selectedItem.sender?._id,
                            "rejected"
                          )
                        }
                        className="px-6 h-11 rounded-full text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XCircle size={15} />
                        <span>Từ chối</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 💬 IF HELP TICKET: SHOW REPLY TEXTAREA & SEND BUTTON - GHIM ĐÁY 💬 */}
              {selectedItem.type === "help" && (
                <div className="shrink-0 pt-3 border-t border-slate-200/60 space-y-2.5">
                  <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Phản hồi giải đáp thắc mắc cho học viên:
                  </label>
                  <div className="rounded-2xl bg-white border border-slate-200/90 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all p-3 shadow-xs">
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Nhập câu trả lời chi tiết hoặc hướng dẫn khắc phục sự cố..."
                      className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none resize-none leading-relaxed bg-transparent"
                    />
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[11px] text-slate-400 font-semibold">
                      <span>Số ký tự: {replyText.length}</span>
                      <span className="text-orange-500 font-bold">
                        Nexora Support
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-0.5">
                    <button
                      type="button"
                      disabled={isActionLoading || !replyText.trim()}
                      onClick={() =>
                        handleSendReply(
                          selectedItem.sender?._id,
                          selectedItem.title
                        )
                      }
                      className="px-7 py-2.5 rounded-full text-xs font-black text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                      }}
                    >
                      <Send size={14} />
                      <span>
                        {!isActionLoading
                          ? "Gửi phản hồi cho học viên →"
                          : "Đang gửi..."}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-orange-100/70 text-orange-500 flex items-center justify-center mx-auto shadow-2xs">
                <Sparkles size={28} />
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
