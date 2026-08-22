import {
  User,
  Shield,
  Award,
  Camera,
  Save,
  Mail,
  Phone,
  Key,
  CheckCircle2,
  Lock,
  Sparkles,
  GraduationCap,
} from "lucide-react";

const UserProfileView = ({
  userInfor,
  setActiveTab,
  handleSavePassword,
  handleSaveProfile,
  passData,
  handlePassChange,
  handleInputChange,
  activeTab,
  formData,
  loading,
}) => {
  const badges = [
    {
      id: 1,
      title: "React Master 2026",
      desc: "Hoàn thành xuất sắc khóa học ReactJS Thực Chiến",
      date: "Tháng 8, 2026",
      icon: <Award className="w-8 h-8 text-orange-500" />,
      bg: "from-orange-500/10 to-amber-500/5",
      border: "border-orange-500/20",
    },
    {
      id: 2,
      title: "Học Giả Chăm Chỉ",
      desc: "Đạt chuỗi học tập liên tục 30 ngày",
      date: "Tháng 7, 2026",
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      bg: "from-amber-500/10 to-yellow-500/5",
      border: "border-amber-500/20",
    },
    {
      id: 3,
      title: "Điểm Tuyệt Đối Quiz",
      desc: "Đạt điểm tuyệt đối 100/100 trong 5 bài kiểm tra Quiz",
      date: "Tháng 6, 2026",
      icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
      bg: "from-purple-500/10 to-indigo-500/5",
      border: "border-purple-500/20",
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
        <div className="space-y-6">
          <div
            className="rounded-3xl p-6 text-center relative overflow-hidden transition-all"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 250, 245, 0.6) 100%)",
              backdropFilter: "blur(32px) saturate(190%)",
              WebkitBackdropFilter: "blur(32px) saturate(190%)",
              border: "1px solid rgba(255, 255, 255, 0.85)",
              boxShadow:
                "0 20px 50px rgba(180, 100, 20, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
            }}
          >
            <div className="relative inline-block mx-auto mb-4">
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 transition-transform hover:scale-105 flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #ea580c 100%)",
                  boxShadow: "0 0 30px rgba(249, 115, 22, 0.35)",
                }}
              >
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt={formData.fullName || "Avatar"}
                    className="w-full h-full rounded-full object-cover border-2 border-white/90 shadow-inner"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center text-orange-600 text-3xl font-black shadow-inner">
                    {(formData.fullName ||
                      userInfor?.name ||
                      "U")[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              <input
                type="file"
                id="avatarInput"
                name="avatar"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />

              <label
                htmlFor="avatarInput"
                className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white text-orange-600 border border-amber-200 shadow-md flex items-center justify-center hover:bg-orange-50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Thay đổi ảnh đại diện"
              >
                <Camera size={16} />
              </label>
            </div>

            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {formData.fullName || userInfor?.name || "Chưa cập nhật tên"}
            </h2>

            <div className="mt-1.5 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 shadow-2xs">
                <GraduationCap size={13} />
                <span>
                  {userInfor?.role === "admin"
                    ? "Admin"
                    : userInfor?.role === "instructor"
                      ? "Giảng viên"
                      : "Học viên"}
                </span>
              </span>
            </div>

            <p className="mt-3 text-xs font-medium text-slate-400">
              Thành viên từ:{" "}
              <span className="text-slate-600 font-bold">2026</span>
            </p>

            <div className="mt-5 pt-5 border-t border-slate-200/60 flex items-center justify-between text-center px-2">
              <div>
                <p className="text-lg font-black text-slate-800">12</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Khóa học
                </p>
              </div>
              <div className="w-[1px] h-8 bg-slate-200" />
              <div>
                <p className="text-lg font-black text-slate-800">24</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Huy hiệu
                </p>
              </div>
              <div className="w-[1px] h-8 bg-slate-200" />
              <div>
                <p className="text-lg font-black text-orange-600">88%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tiến độ
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-3xl p-2.5 space-y-1.5"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 250, 245, 0.55) 100%)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.85)",
              boxShadow: "0 10px 30px rgba(180, 100, 20, 0.06)",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("personal")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "personal"
                  ? "bg-white text-orange-600 shadow-sm border border-orange-200/70 translate-x-1"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
              }`}
            >
              <User
                size={16}
                className={
                  activeTab === "personal"
                    ? "text-orange-600"
                    : "text-slate-400"
                }
              />
              <span>Thông Tin Cá Nhân</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "security"
                  ? "bg-white text-orange-600 shadow-sm border border-orange-200/70 translate-x-1"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
              }`}
            >
              <Shield
                size={16}
                className={
                  activeTab === "security"
                    ? "text-orange-600"
                    : "text-slate-400"
                }
              />
              <span>Bảo Mật &amp; Mật Khẩu</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("badges")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "badges"
                  ? "bg-white text-orange-600 shadow-sm border border-orange-200/70 translate-x-1"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
              }`}
            >
              <Award
                size={16}
                className={
                  activeTab === "badges" ? "text-orange-600" : "text-slate-400"
                }
              />
              <span>Huy Hiệu Học Tập</span>
            </button>
          </div>
        </div>

        <div
          className="rounded-[32px] p-6 sm:p-8 relative overflow-hidden transition-all"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 250, 245, 0.6) 100%)",
            backdropFilter: "blur(32px) saturate(190%)",
            WebkitBackdropFilter: "blur(32px) saturate(190%)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 20px 50px rgba(180, 100, 20, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
          }}
        >
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />

          {activeTab === "personal" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-serif">
                  Thông Tin Cá Nhân
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Cập nhật thông tin cá nhân và tài khoản của bạn tại Nexora.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Họ và tên
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-10 pr-4 rounded-2xl text-sm font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                    placeholder="Nhập họ và tên..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Địa chỉ Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-12 pl-10 pr-4 rounded-2xl text-sm font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-12 pl-10 pr-4 rounded-2xl text-sm font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                      placeholder="+84 ..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Giới thiệu bản thân
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl text-sm font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none leading-relaxed"
                  placeholder="Viết vài dòng giới thiệu về bản thân..."
                />
              </div>

              <div className="pt-6 flex justify-center">
                <button
                  type="submit"
                  className="h-12 px-8 sm:px-10 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    boxShadow: "0 10px 25px rgba(234, 88, 12, 0.35)",
                    borderRadius: "16px",
                  }}
                  disabled={loading}
                >
                  <Save size={18} />
                  <span>{!loading ? "Lưu thông tin mới" : "Đang lưu..."}</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={handleSavePassword} className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-serif">
                  Bảo Mật &amp; Mật Khẩu
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Đổi mật khẩu và quản lý các thiết lập bảo vệ tài khoản của
                  bạn.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Mật khẩu hiện tại
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="password"
                      name="currentPassword"
                      value={passData.currentPassword}
                      onChange={handlePassChange}
                      className="w-full h-12 pl-10 pr-4 rounded-2xl text-sm font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <Key
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="password"
                      name="newPassword"
                      value={passData.newPassword}
                      onChange={handlePassChange}
                      className="w-full h-12 pl-10 pr-4 rounded-2xl text-sm font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                      placeholder="Ít nhất 6 ký tự..."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Xác nhận mật khẩu mới
                  </label>
                  <div className="relative">
                    <CheckCircle2
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passData.confirmPassword}
                      onChange={handlePassChange}
                      className="w-full h-12 pl-10 pr-4 rounded-2xl text-sm font-semibold text-slate-800 bg-white/70 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <button
                  type="submit"
                  className="h-12 px-8 sm:px-10 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    boxShadow: "0 10px 25px rgba(234, 88, 12, 0.35)",
                    borderRadius: "16px",
                  }}
                >
                  <Key size={18} />
                  <span>Cập nhật mật khẩu</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === "badges" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-serif">
                  Huy Hiệu Học Tập
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Bộ sưu tập thành tích và chứng nhận học tập của bạn tại
                  Nexora.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map((b) => (
                  <div
                    key={b.id}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${b.bg} border ${b.border} flex items-start gap-4 transition-all hover:-translate-y-1`}
                  >
                    <div className="p-3 rounded-2xl bg-white shadow-sm flex-shrink-0">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {b.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {b.desc}
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-slate-400">
                        Đạt được: {b.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
