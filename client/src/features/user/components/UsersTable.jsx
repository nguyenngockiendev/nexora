import React from "react";
import {
  Search,
  Shield,
  Eye,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Sparkles,
  Lock,
  Unlock,
  X,
  Mail,
  Phone,
  BookOpen,
  UserCheck,
  Award,
} from "lucide-react";

const UsersTable = ({
  loading,

  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  totalCount,
  studentCount,
  instructorCount,
  adminCount,
  blockedCount,
  filteredUsers = [],
  viewingUser,
  userDetailsData,
  loadingDetails,
  handleOpenDetailModal,
  handleCloseDetailModal,
  roleModalUser,
  selectedRole,
  setSelectedRole,
  roleLoading,
  handleOpenRoleModal,
  handleCloseRoleModal,
  handleConfirmChangeRole,
  handleChangeStatus,
}) => {
  return (
    <div className="w-full p-4 sm:p-6 space-y-5">
      {/* 🌟 1. BỘ 4 THẺ THỐNG KÊ VIÊN THUỐC NGANG (SLIM PILLS) 🌟 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Tổng */}
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
            Tổng thành viên:{" "}
            <strong className="font-black text-slate-900">{totalCount}</strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-xl text-xs font-black bg-amber-100/80 text-amber-900 border border-amber-200/60">
            {totalCount}
          </span>
        </div>

        {/* Học viên */}
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
            Học viên:{" "}
            <strong className="font-black text-slate-900">
              {studentCount}
            </strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-xl text-xs font-black bg-orange-100 text-orange-900 border border-orange-200/60">
            {studentCount}
          </span>
        </div>

        {/* Giảng viên */}
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
            Giảng viên:{" "}
            <strong className="font-black text-slate-900">
              {instructorCount}
            </strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-xl text-xs font-black bg-purple-100 text-purple-900 border border-purple-200/60">
            {instructorCount}
          </span>
        </div>

        {/* Quản trị viên */}
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
            Quản trị:{" "}
            <strong className="font-black text-slate-900">{adminCount}</strong>
          </span>
          <span className="px-2.5 py-0.5 rounded-xl text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-200/60">
            {adminCount}
          </span>
        </div>
      </div>

      {/* 🌟 2. SEARCH BAR & QUICK FILTER TABS 🌟 */}
      <div
        className="rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 250, 245, 0.65) 100%)",
          backdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.85)",
        }}
      >
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tên, email người dùng..."
            className="w-full h-10 pl-9 pr-4 rounded-2xl text-xs font-semibold text-slate-800 bg-white/80 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
          />
        </div>

        {/* Filter Tabs */}
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
            onClick={() => setActiveTab("student")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "student"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🎓 Học viên ({studentCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("instructor")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "instructor"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👨‍🏫 Giảng viên ({instructorCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("admin")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "admin"
                ? "bg-emerald-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🛡️ Quản trị ({adminCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("blocked")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "blocked"
                ? "bg-rose-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🔴 Bị khóa ({blockedCount})
          </button>
        </div>
      </div>

      {/* 🌟 3. DANH SÁCH NGƯỜI DÙNG KÍNH MỜ (FROSTED GLASS USER LIST) 🌟 */}
      <div className="space-y-3">
        {/* Table Header Bar */}
        <div
          className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 rounded-2xl text-xs font-black text-slate-500 uppercase tracking-wider"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="col-span-4">Người dùng</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Vai trò</div>
          <div className="col-span-1">Trạng thái</div>
          <div className="col-span-2 text-right">Thao tác</div>
        </div>

        {/* List of Rows */}
        {loading ? (
          <div className="py-16 text-center text-sm font-bold text-orange-500 animate-pulse bg-white/70 rounded-3xl border border-slate-200">
            Đang tải dữ liệu người dùng...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div
            className="py-16 text-center text-slate-400 rounded-3xl"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.85)",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-2">
              <GraduationCap size={22} />
            </div>
            <p className="text-sm font-bold text-slate-700">
              Không tìm thấy người dùng nào
            </p>
            <p className="text-xs text-slate-400">
              Thử thay đổi từ khóa tìm kiếm hoặc chuyển tab lọc.
            </p>
          </div>
        ) : (
          filteredUsers.map((user, idx) => {
            const isActive = user?.status === "active" || !user?.status;
            const isStudent = user?.role === "student";
            const isInstructor = user?.role === "instructor";
            const isAdmin = user?.role === "admin";

            return (
              <div
                key={user._id || idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center p-4 sm:p-5 rounded-2xl md:rounded-3xl transition-all group"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 250, 245, 0.7) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.95)",
                  boxShadow:
                    "0 10px 25px rgba(180, 100, 20, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)",
                  backdropFilter: "blur(24px)",
                }}
              >
                {/* 1. Người dùng (STT + Avatar + Tên + ID) */}
                <div className="md:col-span-4 flex items-center gap-3.5">
                  <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 text-xs font-black flex items-center justify-center shrink-0 border border-slate-200/60 font-mono">
                    #{idx + 1}
                  </span>

                  <div className="relative shrink-0">
                    <img
                      src={
                        user.avatar ||
                        user.avata ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                      }
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        isActive ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                      {user.name || "Người dùng"}
                    </p>
                    <span className="text-[11px] text-slate-400 font-mono font-semibold">
                      ID: {String(user._id || "").slice(-6)}
                    </span>
                  </div>
                </div>

                {/* 2. Email */}
                <div className="md:col-span-3 text-xs sm:text-sm font-semibold text-slate-700 truncate">
                  {user.email}
                </div>

                {/* 3. Vai trò */}
                <div className="md:col-span-2">
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-purple-100/80 text-purple-800 border border-purple-200/80 shadow-2xs">
                      <Shield size={13} />
                      <span>Quản trị</span>
                    </span>
                  )}
                  {isInstructor && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-100/80 text-amber-900 border border-amber-200/80 shadow-2xs">
                      <Award size={13} />
                      <span>Giảng viên</span>
                    </span>
                  )}
                  {isStudent && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-orange-100/80 text-orange-800 border border-orange-200/80 shadow-2xs">
                      <GraduationCap size={13} />
                      <span>Học viên</span>
                    </span>
                  )}
                </div>

                {/* 4. Trạng thái */}
                <div className="md:col-span-1">
                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                      <CheckCircle2 size={12} />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                      <XCircle size={12} />
                      <span>Inactive</span>
                    </span>
                  )}
                </div>

                {/* 5. Nút Thao tác */}
                <div className="md:col-span-2 flex items-center justify-end gap-2">
                  {/* 1. Xem chi tiết (Quick View Modal) */}
                  <button
                    type="button"
                    onClick={() => handleOpenDetailModal(user)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 hover:text-orange-600 border border-slate-200 shadow-2xs hover:shadow-sm flex items-center justify-center cursor-pointer transition-all"
                    title="Xem chi tiết hồ sơ"
                  >
                    <Eye size={16} />
                  </button>

                  {/* 2. Đổi vai trò (Change Role Modal) */}
                  <button
                    type="button"
                    onClick={() => handleOpenRoleModal(user)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white border border-orange-200 hover:border-orange-500 shadow-2xs hover:shadow-orange-500/20 flex items-center justify-center cursor-pointer transition-all"
                    title="Phân quyền / Đổi vai trò"
                  >
                    <Shield size={16} />
                  </button>

                  {/* 3. Khóa / Mở khóa */}
                  <button
                    type="button"
                    onClick={() => handleChangeStatus(user)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center cursor-pointer shadow-2xs transition-all border ${
                      isActive
                        ? "bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white border-rose-200 hover:border-rose-500"
                        : "bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border-emerald-200 hover:border-emerald-500"
                    }`}
                    title={isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                  >
                    {isActive ? <Lock size={15} /> : <Unlock size={15} />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 🌟 4. MODAL XEM CHI TIẾT HỌC VIÊN (QUICK VIEW MODAL - CHUẨN XÁC & ĐẸP MẮT) 🌟 */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="relative max-w-xl w-full rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 transition-all overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 248, 240, 0.95) 100%)",
              border: "2px solid rgba(255, 255, 255, 0.95)",
              boxShadow:
                "0 25px 50px -12px rgba(180, 100, 20, 0.25), 0 0 0 1px rgba(249, 115, 22, 0.1)",
            }}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-24 -right-24 w-60 h-60 rounded-full pointer-events-none opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #f97316 0%, transparent 70%)",
              }}
            />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 relative z-10">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-orange-100/80 text-orange-800 border border-orange-200/80 uppercase tracking-wider">
                  <Sparkles
                    size={13}
                    className="text-orange-600 animate-pulse"
                  />
                  <span>Hồ Sơ Chi Tiết Người Dùng</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDetailModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Profile Hero Box */}
            <div
              className="rounded-2xl p-4 sm:p-5 bg-white/90 border border-slate-200/90 shadow-2xs relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <div className="relative shrink-0">
                <img
                  src={
                    viewingUser.avatar ||
                    viewingUser.avata ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  }
                  alt={viewingUser.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-orange-200 shadow-xs"
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    viewingUser.status === "active" || !viewingUser.status
                      ? "bg-emerald-500"
                      : "bg-rose-500"
                  }`}
                  title={
                    viewingUser.status === "active" || !viewingUser.status
                      ? "Đang hoạt động"
                      : "Tạm khóa"
                  }
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2 min-w-0 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate">
                    {viewingUser.name || "Người dùng"}
                  </h3>

                  <div>
                    {viewingUser.role === "admin" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                        <Shield size={12} />
                        <span>Quản trị viên</span>
                      </span>
                    )}
                    {viewingUser.role === "instructor" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                        <Award size={12} />
                        <span>Giảng viên</span>
                      </span>
                    )}
                    {(!viewingUser.role || viewingUser.role === "student") && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-orange-100 text-orange-800 border border-orange-200">
                        <GraduationCap size={12} />
                        <span>Học viên</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid Contact Info */}
                <div className="space-y-1.5 pt-1 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <p className="flex-1 flex items-center justify-center sm:justify-start gap-2 bg-slate-50/90 px-3 py-1.5 rounded-xl border border-slate-200/60 truncate">
                      <Mail size={13} className="text-orange-500 shrink-0" />
                      <span className="truncate">{viewingUser.email}</span>
                    </p>

                    <p className="flex-1 flex items-center justify-center sm:justify-start gap-2 bg-slate-50/90 px-3 py-1.5 rounded-xl border border-slate-200/60 truncate">
                      <Phone size={13} className="text-orange-500 shrink-0" />
                      <span>{viewingUser.phone || "0123456789"}</span>
                    </p>
                  </div>

                  <p className="flex items-center justify-center sm:justify-start gap-2 bg-slate-50/90 px-3 py-1.5 rounded-xl border border-slate-200/60 text-xs">
                    <span className="text-slate-400 font-medium shrink-0">
                      User ID:
                    </span>
                    <span className="font-mono text-slate-700 font-bold break-all">
                      {viewingUser._id}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Danh sách Khóa Học Đang Học */}
            <div className="space-y-2.5 relative z-10">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={15} className="text-orange-500" />
                  <span>Khóa Học Đã Đăng Ký</span>
                </h4>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-orange-100 text-orange-900 border border-orange-200">
                  {userDetailsData?.finalresult?.length || 0} khóa
                </span>
              </div>

              {loadingDetails ? (
                <div className="py-8 text-center text-xs font-bold text-orange-500 animate-pulse bg-white/60 rounded-2xl border border-slate-200/80">
                  Đang tải danh sách khóa học...
                </div>
              ) : userDetailsData?.finalresult?.length > 0 ? (
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {userDetailsData.finalresult.map((item, i) => (
                    <div
                      key={item._id || i}
                      className="p-3 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs hover:border-orange-300 transition-all flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                          <BookOpen size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 truncate">
                            {item.courseId?.title || "Khóa học trực tuyến"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {item.classId ? "Lớp Live Class" : "Khóa Học Video"}
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                        Đang học
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center space-y-1.5 bg-white/60 rounded-2xl border border-slate-200/80">
                  <p className="text-xs font-bold text-slate-600">
                    Học viên chưa đăng ký khóa học nào
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Khi học viên mua khóa học, danh sách sẽ hiển thị tại đây.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-1 relative z-10">
              <button
                type="button"
                onClick={handleCloseDetailModal}
                className="px-6 h-10 rounded-xl text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer shadow-2xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 5. MODAL PHÂN QUYỀN & ĐỔI VAI TRÒ (CHANGE ROLE MODAL - GỌN GÀNG & NỔI BẬT) 🌟 */}
      {roleModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="relative max-w-lg w-full rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 transition-all overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 248, 240, 0.95) 100%)",
              border: "2px solid rgba(255, 255, 255, 0.95)",
              boxShadow:
                "0 25px 50px -12px rgba(180, 100, 20, 0.25), 0 0 0 1px rgba(249, 115, 22, 0.1)",
            }}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none opacity-30 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, #f97316 0%, transparent 70%)",
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-xs">
                  <Shield size={16} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
                    Phân Quyền &amp; Đổi Vai Trò
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseRoleModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* User Info Header */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3 relative z-10">
              <img
                src={
                  roleModalUser.avatar ||
                  roleModalUser.avata ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                }
                alt={roleModalUser.name}
                className="w-11 h-11 rounded-xl object-cover border border-orange-200 shadow-xs shrink-0"
              />
              <div className="space-y-0.5 min-w-0 flex-1">
                <p className="text-sm font-black text-slate-900 truncate">
                  {roleModalUser.name}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-500">Vai trò:</span>
                  <span className="px-2 py-0.2 rounded-md text-[10px] font-black bg-orange-100 text-orange-800 uppercase">
                    {roleModalUser.role || "student"}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">
                    • {roleModalUser.email}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Bento Role Selection Cards */}
            <div className="space-y-2 relative z-10">
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">
                Chọn vai trò mới:
              </label>

              {[
                {
                  id: "student",
                  title: "🎓 Học viên (Student)",
                  desc: "Quyền tham gia học tập, xem video, làm quiz và mua khóa học.",
                  activeClass:
                    "bg-orange-50/90 border-orange-400 shadow-sm shadow-orange-500/10 ring-2 ring-orange-500/20",
                  dotColor: "bg-orange-500",
                },
                {
                  id: "instructor",
                  title: "👨‍🏫 Giảng viên (Instructor)",
                  desc: "Quyền tạo khóa học, phát livestream, quản lý doanh thu.",
                  activeClass:
                    "bg-purple-50/90 border-purple-400 shadow-sm shadow-purple-500/10 ring-2 ring-purple-500/20",
                  dotColor: "bg-purple-500",
                },
                {
                  id: "admin",
                  title: "🛡️ Quản trị viên (Admin)",
                  desc: "Toàn quyền quản trị hệ thống, kiểm duyệt và phân quyền.",
                  activeClass:
                    "bg-emerald-50/90 border-emerald-400 shadow-sm shadow-emerald-500/10 ring-2 ring-emerald-500/20",
                  dotColor: "bg-emerald-500",
                },
              ].map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedRole === role.id
                      ? role.activeClass
                      : "bg-white/80 hover:bg-white border-slate-200/80 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-sm font-black text-slate-900">
                      {role.title}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {role.desc}
                    </p>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      selectedRole === role.id
                        ? "border-orange-500 bg-white"
                        : "border-slate-300 bg-slate-50"
                    }`}
                  >
                    {selectedRole === role.id && (
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${role.dotColor}`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2.5 pt-2 relative z-10">
              <button
                type="button"
                onClick={handleCloseRoleModal}
                className="flex-1 h-10 rounded-xl text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                disabled={roleLoading}
                onClick={handleConfirmChangeRole}
                className="flex-2 h-10 rounded-xl text-xs font-black text-white shadow-md shadow-orange-500/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                }}
              >
                <UserCheck size={14} />
                <span>
                  {!roleLoading ? "Cập Nhật Vai Trò Ngay ✨" : "Đang lưu..."}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
