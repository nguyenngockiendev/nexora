import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle2,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  GraduationCap,
  BookOpen,
  Shield,
  Bell,
} from "lucide-react";
import useHelp from "../../../features/help/hooks/useHelp";
import { NotificationModal } from "./Notification";

export default function CornerOrangeButton({ dashboard, icon }) {
  const [open, setOpen] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { notifications, teacherRequests } = useHelp();

  const unreadCount = [
    ...(teacherRequests || []).filter((t) => t.status === "pending"),
    ...(notifications || []).filter((n) => !n.isRead),
  ].length;

  const user = dashboard || {};
  const userName = user.name;
  const userEmail = user.email;
  const userRole = user.role;
  const userAvatar = user.avatar;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setShowNotifModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return {
          label: "Admin",
          bg: "bg-purple-50 text-purple-700 border-purple-200",
          icon: <Shield size={10} />,
        };
      case "instructor":
        return {
          label: "Giảng viên",
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <BookOpen size={10} />,
        };
      default:
        return {
          label: "Học viên",
          bg: "bg-orange-50 text-orange-700 border-orange-200",
          icon: <GraduationCap size={10} />,
        };
    }
  };

  const roleInfo = getRoleBadge(userRole);

  return (
    <div className="absolute top-0 right-0 z-40" ref={containerRef}>
      <button
        type="button"
        onClick={() => {
          if (showNotifModal) {
            setShowNotifModal(false);
          } else {
            setOpen((prev) => !prev);
          }
        }}
        className="group relative w-24 h-24 sm:w-28 sm:h-28 p-0 border-0 bg-transparent cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none select-none"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md transition-all duration-200 group-hover:drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="cornerOrangeGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient
              id="cornerAmberGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Lớp sóng vàng lót */}
          <path
            d="M 0 0 
               H 100 
               V 100 
               C 100 68, 86 52, 74 44 
               C 64 36, 52 26, 42 14 
               C 34 2, 16 1, 0 0 
               Z"
            fill="url(#cornerAmberGrad)"
            opacity="0.85"
          />

          {/* Lớp sóng cam chính */}
          <path
            d="M 12 0 
               H 100 
               V 88 
               C 98 62, 85 48, 73 40 
               C 63 32, 50 22, 38 10 
               C 30 1, 18 0, 12 0 
               Z"
            fill="url(#cornerOrangeGrad)"
          />
        </svg>

        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-white pointer-events-none flex items-center justify-center">
          <div className="relative">
            {icon ? (
              icon
            ) : (
              <UserCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2] transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />
            )}
            {/* Chấm đỏ báo thông báo mới ở góc cam */}
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center shadow-md animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Menu người dùng */}
      {open && (
        <div
          className="absolute top-[70px] right-2 sm:top-[84px] sm:right-3 z-50 w-72 rounded-[28px] p-3.5 animate-in fade-in slide-in-from-top-2 duration-200 -translate-y-6"
          style={{
            background:
              "linear-gradient(145deg, rgba(248, 209, 17, 0.2) 0%, rgba(252, 252, 252, 0.10) 100%)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 24px 60px rgba(180, 100, 20, 0.16), 0 4px 16px rgba(0,0,0,0.04), inset 0 1.5px 1px rgba(255, 255, 255, 0.95), inset 0 -1px 1px rgba(249, 115, 22, 0.08)",
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

          {/* User Header Card kính mờ */}
          <div
            className="relative p-3 rounded-2xl mb-2 flex items-center gap-3 shadow-2xs"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(16px)",
            }}
          >
            {userAvatar && (
              <img
                src={userAvatar}
                alt={userName}
                className="w-11 h-11 rounded-full object-cover border border-amber-200/80 flex-shrink-0 shadow-2xs"
              />
            )}

            <div className="min-w-0 flex-1">
              <p className="font-black text-sm text-slate-900 truncate">
                {userName}
              </p>
              <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${roleInfo.bg}`}
                >
                  {roleInfo.icon}
                  <span>{roleInfo.label}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-xs font-semibold text-slate-700">
            {/* 1. Dòng Thông Báo */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setShowNotifModal(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-orange-500/10 hover:text-slate-900 transition-all cursor-pointer text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Bell size={15} />
                </div>
                <span className="font-semibold text-slate-800">
                  Thông báo
                </span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
                  {unreadCount > 9 ? "9+" : unreadCount} mới
                </span>
              )}
            </button>

            {/* 2. Thông tin cá nhân */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/user/profile");
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-orange-500/10 hover:text-slate-900 transition-all cursor-pointer text-left group"
            >
              <div className="w-7 h-7 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                <User size={15} />
              </div>
              <span className="font-semibold text-slate-800">
                Thông tin cá nhân
              </span>
            </button>

            {/* 3. Lịch sử đơn hàng */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/payment_History");
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-orange-500/10 hover:text-slate-900 transition-all cursor-pointer text-left group"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                <CreditCard size={15} />
              </div>
              <span className="font-semibold text-slate-800">
                Lịch sử đơn hàng
              </span>
            </button>

            {/* 4. Trợ giúp & FAQ */}
            {userRole !== "admin" && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/help");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-blue-500/10 hover:text-slate-900 transition-all cursor-pointer text-left group"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <HelpCircle size={15} />
                </div>
                <span className="font-semibold text-slate-800">
                  Trợ giúp &amp; FAQ
                </span>
              </button>
            )}

            <div className="my-1.5 border-t border-slate-200/50" />

            {/* 5. Đăng xuất */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-rose-500/10 text-rose-600 hover:text-rose-700 transition-all cursor-pointer text-left group"
            >
              <div className="w-7 h-7 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                <LogOut size={15} />
              </div>
              <span className="font-bold">Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Thông Báo bung ra khi người dùng ấn vào dòng Thông báo */}
      {showNotifModal && (
        <NotificationModal
          open={showNotifModal}
          onClose={() => setShowNotifModal(false)}
          onBack={() => {
            setShowNotifModal(false);
            setOpen(true);
          }}
          user={user}
        />
      )}
    </div>
  );
}
