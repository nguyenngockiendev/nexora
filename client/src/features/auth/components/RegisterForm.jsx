import {
  Sparkles,
  User,
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  AlertCircle,
  KeyRound,
  Send,
  ShieldCheck,
  GraduationCap,
  Clock,
} from "lucide-react";
import { useState, useRef } from "react";

const RegisterForm = ({
  register,
  handleSubmit,
  error,
  navigate,
  onSubmit,
  Setavatar,
  loading,
  errors = {},
  onSendOtp,
  countdown = 0,
}) => {
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const getStrength = (val) => {
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthColor = [
    "bg-slate-200",
    "bg-rose-400",
    "bg-amber-400",
    "bg-amber-500",
    "bg-emerald-400",
    "bg-emerald-500",
  ];
  const strengthLabel = [
    "",
    "Rất yếu",
    "Yếu",
    "Trung bình",
    "Mạnh",
    "Rất mạnh",
  ];

  return (
    <div className="relative w-full">
      {/* Widget nổi 1: Góc trên bên phải */}
      <div
        className="hidden sm:flex items-center gap-2.5 absolute -top-5 -right-4 lg:-right-6 z-20 px-3.5 py-2 rounded-2xl border border-white/80 shadow-lg shadow-orange-500/10"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="text-right">
          <p className="text-[11px] font-bold text-slate-700 m-0 leading-tight">
            Thành viên mới
          </p>
          <span className="text-[10px] font-semibold text-orange-600">
            Ưu đãi 100%
          </span>
        </div>
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/30">
          <GraduationCap size={15} />
        </div>
      </div>

      {/* Widget nổi 2: Góc dưới bên trái */}
      <div
        className="hidden sm:flex items-center gap-2.5 absolute -bottom-4 -left-4 lg:-left-6 z-20 px-3.5 py-2 rounded-2xl border border-white/80 shadow-lg shadow-orange-500/10"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/30">
          <ShieldCheck size={15} />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-700 m-0 leading-tight">
            Xác thực an toàn
          </p>
          <span className="text-[10px] font-semibold text-emerald-600">
            Bảo mật OTP
          </span>
        </div>
      </div>

      {/* Card chính Glassmorphism */}
      <div
        className="rounded-[36px] p-6 sm:p-9 md:p-10 w-full flex flex-col items-center relative z-10 border border-white/90 shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          boxShadow:
            "0 30px 80px rgba(180, 100, 20, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        }}
      >
        {/* Header Logo */}
        <div className="flex items-center gap-2.5 font-black text-xl text-slate-900 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25">
            <Sparkles size={20} />
          </div>
          <span className="tracking-tight text-slate-900 font-extrabold text-xl">
            Nexora LMS
          </span>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight text-center">
          Tạo Tài Khoản Mới
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 text-center mb-6 max-w-sm">
          Tham gia cùng hàng ngàn học viên trên Nexora ngay hôm nay.
        </p>

        {error && (
          <div className="w-full p-3 mb-5 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-2xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          {/* Họ và tên */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Họ và tên
            </label>
            <div className="relative flex items-center rounded-2xl bg-white/95 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <User size={17} />
              </span>
              <input
                className="w-full py-3 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
                placeholder="Nhập họ và tên của bạn"
                autoComplete="name"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.name.message}</span>
              </p>
            )}
          </div>

          {/* Ảnh đại diện */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Ảnh đại diện
            </label>
            <div className="flex flex-row items-center gap-3 w-full h-[50px] px-3.5 rounded-2xl bg-white/95 border border-slate-200 hover:border-orange-300 transition-all shadow-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold hover:bg-orange-100 transition-all shrink-0 cursor-pointer"
              >
                <ImageIcon size={16} />
                <span>Chọn ảnh</span>
              </button>
              <span
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium text-slate-400 truncate flex-1 cursor-pointer"
              >
                {fileName ? fileName : "Chưa có tệp nào được chọn"}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFileName(file.name);
                    Setavatar(file);
                  }
                }}
              />
            </div>
          </div>

          {/* Email + nút Gửi mã */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Email
            </label>
            <div className="relative flex items-center rounded-2xl bg-white/95 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Mail size={17} />
              </span>
              <input
                className="w-full py-3 pl-10 pr-26 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
                placeholder="vidu@email.com"
                autoComplete="email"
                {...register("email")}
              />
              <button
                type="button"
                onClick={onSendOtp}
                className="absolute right-1.5 px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <Send size={12} />
                <span>Gửi mã</span>
              </button>
            </div>
            {errors.email && (
              <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Mã xác thực */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Mã xác thực (OTP)
            </label>
            <div className="relative flex items-center rounded-2xl bg-white/95 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <KeyRound size={17} />
              </span>
              <input
                className="w-full py-3 pl-10 pr-20 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none tracking-widest"
                placeholder="Nhập 6 chữ số"
                maxLength={6}
                {...register("otp")}
              />
              {countdown > 0 ? (
                <div className="absolute right-2 px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center gap-1 text-[11px] font-bold text-orange-600 pointer-events-none">
                  <Clock size={12} />
                  <span>
                    {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                    {String(countdown % 60).padStart(2, "0")}
                  </span>
                </div>
              ) : (
                <div className="absolute right-2 px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center gap-1 text-[11px] font-bold text-orange-600 pointer-events-none">
                  <Clock size={12} />
                  <span>04:59</span>
                </div>
              )}
            </div>
          </div>

          {/* Mật khẩu & Nhập lại mật khẩu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">
                Mật khẩu
              </label>
              <div className="relative flex items-center rounded-2xl bg-white/95 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Lock size={17} />
                </span>
                <input
                  type="password"
                  className="w-full py-3 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
                  placeholder="Nhập mật khẩu"
                  autoComplete="new-password"
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Thanh đo độ mạnh mật khẩu */}
              {password.length > 0 && (
                <div className="mt-1 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength ? strengthColor[strength] : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">
                    {strengthLabel[strength]}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">
                Nhập lại mật khẩu
              </label>
              <div className="relative flex items-center rounded-2xl bg-white/95 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Lock size={17} />
                </span>
                <input
                  type="password"
                  className="w-full py-3 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
                  placeholder="Xác nhận mật khẩu"
                  autoComplete="new-password"
                  {...register("repeatpassword")}
                />
              </div>
              {errors.repeatpassword && (
                <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{errors.repeatpassword.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Nút hành động bo tròn mềm mại (rounded-2xl) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
            <button
              type="button"
              className="w-full sm:w-1/2 flex justify-center items-center gap-2 py-3 px-4 rounded-2xl bg-white/80 hover:bg-white text-slate-700 text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-xs hover:shadow-md"
              onClick={() => navigate("/login")}
            >
              <ArrowLeft size={15} />
              <span>Đăng nhập</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2 flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all cursor-pointer hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span>
                {loading ? "Đang tạo tài khoản..." : "Đăng Ký Tài Khoản"}
              </span>
              {!loading && <ArrowRight size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
