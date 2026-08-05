import { useState, useEffect } from "react";
import { Search, Bell, Settings, HelpCircle, Menu, ChevronDown, Command, Check, X, Eye } from "lucide-react";
import useRequestIntructor from "../../../features/user/hooks/useRequestIntructor";
import { toast } from "react-toastify";

const Header = ({ onMobileMenuClick }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const role = localStorage.getItem("role") || "student";
  const userInfo = JSON.parse(localStorage.getItem("userInfor") || "{}");

  const { requestList, getRequests, respondRequest, loading } = useRequestIntructor();

  // Tự động load đơn đăng ký nếu là admin
  useEffect(() => {
    if (role === "admin") {
      getRequests();
    }
  }, [role]);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && role === "admin") {
      getRequests();
    }
  };

  const handleRespond = async (requestId, userId, approvedStatus) => {
    try {
      await respondRequest(requestId, userId, approvedStatus);
      toast.success(approvedStatus === "approved" ? "Phê duyệt giảng viên thành công!" : "Đã từ chối đơn đăng ký.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Thao tác thất bại!");
    }
  };

  return (
    <header
      className="sticky top-0 z-30 h-[72px] px-4 md:px-6 flex items-center justify-between border-b border-white/[0.06]"
      style={{
        background: 'rgba(7, 13, 31, 0.6)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent pointer-events-none" />

      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/10 hover:border-white/20"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          onClick={onMobileMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className={`relative hidden sm:flex items-center transition-all duration-300 ${searchFocused ? 'w-80' : 'w-60'}`}>
          <Search
            size={16}
            className={`absolute left-3.5 transition-colors duration-300 ${searchFocused ? 'text-blue-400' : 'text-slate-500'}`}
          />
          <input
            type="text"
            placeholder="Search courses, classes..."
            className="glass-input w-full h-10 pl-10 pr-14 text-sm"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="absolute right-3 flex items-center gap-1 px-1.5 py-0.5 rounded-lg border border-white/10 text-[10px] font-bold text-slate-500"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Command size={11} />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 relative">
          <button
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            aria-label="Help"
          >
            <HelpCircle size={18} />
          </button>

          {/* Nút Chuông Thông Báo */}
          <button
            onClick={handleToggleNotifications}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {role === "admin" && requestList.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 border border-[#070d1f]"
                style={{ boxShadow: '0 0 6px rgba(249,115,22,0.8)' }} />
            )}
          </button>

          {/* DDL Dropdown Thông Báo */}
          {showNotifications && (
            <div
              className="absolute right-0 top-11 w-80 rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden z-[99]"
              style={{
                background: "rgba(10, 18, 42, 0.95)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="p-3.5 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.02]">
                <span className="text-xs font-black text-white uppercase tracking-wider">Thông báo duyệt đơn</span>
                {role === "admin" && (
                  <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold text-orange-400">
                    {requestList.length} đơn chờ
                  </span>
                )}
              </div>

              <div className="max-h-[360px] overflow-y-auto divide-y divide-white/[0.04]">
                {role === "admin" ? (
                  requestList.length > 0 ? (
                    requestList.map((req) => (
                      <div key={req._id} className="p-3 flex flex-col gap-2 hover:bg-white/[0.01] transition-colors">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={req.userId?.avatar || "https://res.cloudinary.com/db7t78kpw/image/upload/v1711287957/default-avatar_g9kcxo.png"}
                            className="w-8 h-8 rounded-xl object-cover border border-white/10"
                            alt="Avatar"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white truncate">{req.userId?.name}</div>
                            <div className="text-[10px] text-slate-500 truncate">Dạy: {req.specialty}</div>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400 bg-white/[0.02] p-2 rounded-lg border border-white/[0.04] m-0">
                          {req.opinion}
                        </p>

                        {req.proofImage && (
                          <div
                            onClick={() => setSelectedImage(req.proofImage)}
                            className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group cursor-pointer"
                          >
                            <img src={req.proofImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Proof" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye size={16} className="text-white" />
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 justify-end mt-1">
                          <button
                            onClick={() => handleRespond(req._id, req.userId?._id, "rejected")}
                            disabled={loading}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-black text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors border-0"
                          >
                            Từ chối
                          </button>
                          <button
                            onClick={() => handleRespond(req._id, req.userId?._id, "approved")}
                            disabled={loading}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-black text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors border-0"
                          >
                            Phê duyệt
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 text-center text-xs text-slate-500 font-medium">Không có yêu cầu nào chờ duyệt.</div>
                  )
                ) : (
                  <div className="p-5 text-center text-xs text-slate-500 font-medium">Bạn không có thông báo mới.</div>
                )}
              </div>
            </div>
          )}

          <button
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        </div>

        <div className="w-[1px] h-7 bg-white/[0.08] hidden sm:block" />

        {/* User Menu */}
        <button
          className="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          {userInfo.avatar ? (
            <img src={userInfo.avatar} className="w-8 h-8 rounded-xl object-cover border border-white/10" alt="Avatar" />
          ) : (
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', boxShadow: '0 0 12px rgba(249,115,22,0.4)' }}>
              {(userInfo.name || "U")[0].toUpperCase()}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold text-white leading-tight">{userInfo.name || "User Name"}</div>
            <div className="text-xs text-slate-500 font-medium">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-600 hidden sm:block ml-1" />
        </button>
      </div>

      {/* Lightbox Preview cho ảnh minh chứng chứng chỉ */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border-0"
          >
            <X size={20} />
          </button>
          <img
            src={selectedImage}
            alt="Certificate Lightbox"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
