import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  CheckCheck,
  Megaphone,
  Award,
  ArrowLeft,
  X,
} from "lucide-react";
import useHelp from "../../../features/help/hooks/useHelp";

export function NotificationModal({ open, onClose, onBack, user }) {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const { notifications, teacherRequests, getNotifications } = useHelp();

  const combinedNotifications = [
    ...(teacherRequests || []).map((t) => ({
      _id: `teacher_${t._id}`,
      title: `Đơn đăng ký Giảng viên: ${t.specialty || ""}`,
      message:
        t.status === "approved"
          ? "🎉 Chúc mừng! Đơn đăng ký Giảng viên của bạn đã được Ban Quản Trị phê duyệt."
          : t.status === "rejected"
            ? "❌ Đơn đăng ký Giảng viên của bạn chưa được duyệt."
            : "⏳ Đơn đăng ký Giảng viên của bạn đang được Ban Quản Trị xem xét.",
      type: t.status === "approved" ? "teacher_approved" : "teacher_request",
      isRead: t.status !== "pending",
      createdAt: t.createdAt,
    })),
    ...(notifications || []).map((n) => ({
      _id: n._id,
      title: n.title,
      message: n.message,
      type: n.type,
      isRead: n.isRead,
      createdAt: n.createdAt,
    })),
  ];

  const unreadList = combinedNotifications.filter((n) => !n.isRead);
  const unreadCount = unreadList.length;

  const filteredNotifications = combinedNotifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "system")
      return n.type === "broadcast" || n.targetRole === "all";
    return true;
  });

  if (!open) return null;

  return (
    <div
      className="absolute top-[70px] right-2 sm:top-[84px] sm:right-3 z-50 w-80 sm:w-96 rounded-[28px] p-4 animate-in fade-in slide-in-from-top-2 duration-200 space-y-3 -translate-y-6"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 245, 0.92) 100%)",
        backdropFilter: "blur(32px) saturate(200%)",
        WebkitBackdropFilter: "blur(32px) saturate(200%)",
        border: "1px solid rgba(255, 255, 255, 0.9)",
        boxShadow:
          "0 24px 60px rgba(180, 100, 20, 0.16), 0 4px 16px rgba(0,0,0,0.04), inset 0 1.5px 1px rgba(255, 255, 255, 0.95)",
      }}
    >
      <div
        className="absolute -top-2 right-4.5 w-4.5 h-4.5 rotate-45 rounded-xs pointer-events-none"
        style={{
          background: "rgba(177, 69, 6, 0.72)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.85)",
          borderTop: "1px solid rgba(255, 255, 255, 0.85)",
        }}
      />

      {/* Header Modal Thông Báo */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-1 -ml-1 text-slate-500 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              title="Quay lại"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <h3 className="text-sm font-black text-slate-800 tracking-tight">
            Thông Báo
          </h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-200/60">
              {unreadCount} mới
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => getNotifications()}
            className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg hover:bg-orange-50"
          >
            <CheckCheck size={13} />
            <span>Làm mới</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Đóng"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Bộ lọc tabs */}
      <div className="flex items-center gap-1 bg-white/70 p-1 rounded-xl border border-slate-200/60 text-xs font-bold shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
            activeTab === "all"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Tất cả ({(notifications || []).length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("unread")}
          className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
            activeTab === "unread"
              ? "bg-amber-500 text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Chưa đọc ({unreadCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("system")}
          className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
            activeTab === "system"
              ? "bg-purple-500 text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Hệ thống
        </button>
      </div>

      {/* Danh sách thông báo */}
      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-0.5">
        {filteredNotifications.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-xs font-bold text-slate-700">
              Không có thông báo nào
            </p>
            <p className="text-[11px] text-slate-400">
              Hòm thư của bạn hoàn toàn sạch sẽ!
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const isResolved = notif.type === "help_reply";
            const isBroadcast = notif.type === "broadcast";
            const isTeacherApproved = notif.type === "teacher_approved";

            return (
              <div
                key={notif._id}
                onClick={() => {
                  if (onClose) onClose();
                  navigate("/help");
                }}
                className={`rounded-2xl p-3 transition-all cursor-pointer border flex items-start gap-3 relative ${
                  !notif.isRead
                    ? "bg-white/90 hover:bg-white border-orange-200/80 shadow-xs"
                    : "bg-white/50 hover:bg-white/80 border-slate-200/60"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isResolved ? (
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <MessageSquare size={15} />
                    </div>
                  ) : isBroadcast ? (
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Megaphone size={15} />
                    </div>
                  ) : isTeacherApproved ? (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Award size={15} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Sparkles size={15} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {notif.createdAt
                        ? new Date(notif.createdAt).toLocaleDateString("vi-VN")
                        : "Vừa xong"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                {!notif.isRead && (
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 self-center" />
                )}
              </div>
            );
          })
        )}
      </div>

      {user?.role === "admin" && (
        <div className="pt-2 border-t border-slate-200/60">
          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
              navigate("/admin/teacher-requests");
            }}
            className="w-full py-2 px-3 rounded-xl bg-white/70 hover:bg-white text-slate-700 hover:text-orange-600 border border-slate-200/70 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Xem tất cả tại Trung Tâm Hỗ Trợ</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function NotificationBell({ user }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { notifications, teacherRequests } = useHelp();

  const unreadCount = [
    ...(teacherRequests || []).filter((t) => t.status === "pending"),
    ...(notifications || []).filter((n) => !n.isRead),
  ].length;

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center text-slate-700 hover:text-orange-600 transition-all duration-200 cursor-pointer -translate-x-6"
        title="Thông báo"
      >
        <Bell
          size={20}
          strokeWidth={2}
          className={`transition-transform duration-300 ${
            open ? "rotate-12 text-orange-500" : ""
          }`}
        />

        {unreadCount > 0 && (
          <span
            className="absolute -top-2 -right-2 min-w-[17px] h-[17px] px-1 rounded-full text-[9px] font-black text-white flex items-center justify-center shadow-sm"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              boxShadow: "0 2px 8px rgba(234, 88, 12, 0.4)",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <NotificationModal
        open={open}
        onClose={() => setOpen(false)}
        user={user}
      />
    </div>
  );
}
