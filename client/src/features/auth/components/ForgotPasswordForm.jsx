import { Link } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Clock,
  Loader2,
} from "lucide-react";

const FogotPassWordForm = ({
  register,
  handleSubmit,
  error,
  status,
  onsubmit,
  errors = {},
  onSendOtp,
  countdown = 0,
  trig,
  sendingOtp = false,
  loading = false,
}) => {
  const otpDisabled = trig || sendingOtp;
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
            Bảo mật tài khoản
          </p>
          <span className="text-[10px] font-semibold text-orange-600">
            2 lớp
          </span>
        </div>
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/30">
          <Lock size={14} />
        </div>
      </div>

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
            Mã hóa an toàn
          </p>
          <span className="text-[10px] font-semibold text-emerald-600">
            AES-256
          </span>
        </div>
      </div>

      {/* Card chính Glassmorphism */}
      <div
        className="rounded-[36px] p-6 sm:p-8 md:p-9 w-full flex flex-col items-center relative z-10 border border-white/90 shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.82)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          boxShadow:
            "0 30px 80px rgba(180, 100, 20, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        }}
      >
        {/* Logo Nexora */}
        <div className="flex items-center gap-2 font-black text-xl text-slate-900 mb-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25">
            <Sparkles size={18} />
          </div>
          <span className="tracking-tight text-slate-900">Nexora</span>
        </div>

        {/* Tiêu đề & phụ đề */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight text-center">
          Đặt Lại Mật Khẩu
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 text-center mb-6 max-w-sm">
          Nhập email xác thực để nhận mã OTP và tạo mật khẩu mới cho tài khoản.
        </p>

        {/* Thanh tiến trình 2 bước (Stepper) */}
        <div className="w-full max-w-xs flex flex-col gap-1.5 mb-6">
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
            <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
          </div>
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-600 px-0.5">
            <span className="text-orange-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Step 1: Xác thực OTP
            </span>
            <span className="text-slate-400">Step 2: Mật khẩu mới</span>
          </div>
        </div>

        {/* Thông báo trạng thái */}
        {status && (
          <div className="w-full p-3 mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-2xl text-xs font-bold text-center">
            {status}
          </div>
        )}

        {error && (
          <div className="w-full p-3 mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-2xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={
            handleSubmit ? handleSubmit(onsubmit) : (e) => e.preventDefault()
          }
          className="w-full flex flex-col gap-4"
        >
          {/* Ô 1: Email + Nút Gửi mã Inline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Email
            </label>
            <div className="relative flex items-center rounded-2xl bg-white/90 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Mail size={17} />
              </span>
              <input
                className="w-full py-2.5 pl-10 pr-24 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
                placeholder="vidu@email.com"
                autoComplete="email"
                {...(register ? register("email") : {})}
              />
              <button
                type="button"
                onClick={onSendOtp}
                disabled={otpDisabled}
                style={{
                  borderRadius: "9999px",
                  background: otpDisabled
                    ? "rgba(226, 232, 240, 0.9)"
                    : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  boxShadow: otpDisabled
                    ? "none"
                    : "0 2px 8px rgba(249, 115, 22, 0.28)",
                }}
                className={`absolute right-1.5 px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 select-none ${
                  otpDisabled
                    ? "text-slate-400 cursor-not-allowed pointer-events-none"
                    : "text-white cursor-pointer hover:scale-[1.02] active:scale-95 hover:shadow-orange-500/30"
                }`}
              >
                {sendingOtp && <Loader2 size={12} className="animate-spin" />}
                <span>
                  {sendingOtp
                    ? "Đang gửi..."
                    : trig
                      ? `Gửi lại (${countdown}s)`
                      : "Gửi mã"}
                </span>
              </button>
            </div>
            {errors?.email && (
              <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Ô 2: Mã OTP (OTP Code) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Mã xác thực (OTP)
            </label>
            <div className="relative flex items-center rounded-2xl bg-white/90 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <KeyRound size={17} />
              </span>
              <input
                className="w-full py-2.5 pl-10 pr-20 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none tracking-wider"
                placeholder="Nhập 6 chữ số"
                maxLength={6}
                {...(register ? register("otp") : {})}
              />
              {countdown > 0 && trig && (
                <div
                  className="absolute right-2 px-2.5 py-1 bg-orange-50 border border-orange-200/60 flex items-center gap-1 text-[11px] font-bold text-orange-600 pointer-events-none"
                  style={{ borderRadius: "9999px" }}
                >
                  <Clock size={12} />
                  <span>{countdown}s</span>
                </div>
              )}
            </div>
            {errors?.otp && (
              <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.otp.message}</span>
              </p>
            )}
          </div>

          {/* Ô 3: Mật khẩu mới */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Mật khẩu mới
            </label>
            <div className="relative flex items-center rounded-2xl bg-white/90 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Lock size={17} />
              </span>
              <input
                type="password"
                className="w-full py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
                placeholder="Tối thiểu 6 ký tự"
                autoComplete="new-password"
                {...(register ? register("newPassword") : {})}
              />
            </div>

            {/* Thanh đo độ mạnh mật khẩu (Strength Meter) */}
            <div className="flex items-center gap-1.5 px-0.5 mt-1">
              <div className="h-1.5 flex-1 rounded-full bg-orange-500" />
              <div className="h-1.5 flex-1 rounded-full bg-amber-400" />
              <div className="h-1.5 flex-1 rounded-full bg-emerald-500" />
              <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
            </div>

            {errors?.newPassword && (
              <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.newPassword.message}</span>
              </p>
            )}
          </div>

          {/* Ô 4: Xác nhận mật khẩu mới */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Xác nhận mật khẩu
            </label>
            <div className="relative flex items-center rounded-2xl bg-white/90 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Lock size={17} />
              </span>
              <input
                type="password"
                className="w-full py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
                placeholder="Nhập lại mật khẩu mới"
                autoComplete="new-password"
                {...(register ? register("repeatpassword") : {})}
              />
            </div>
            {errors?.repeatpassword && (
              <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.repeatpassword.message}</span>
              </p>
            )}
          </div>

          {/* 2 Nút hành động */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
            <Link
              to="/login"
              style={{ borderRadius: "9999px" }}
              className="w-full sm:w-1/2 flex justify-center items-center gap-2 py-3 px-4 bg-white/80 hover:bg-white text-slate-700 text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-xs whitespace-nowrap hover:scale-[1.02] active:scale-95"
            >
              <ArrowLeft size={15} />
              <span>Quay lại đăng nhập</span>
            </Link>

            <button
              type="submit"
              disabled={loading}
              style={{
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                boxShadow: "0 8px 24px rgba(249, 115, 22, 0.28)",
              }}
              className="w-full sm:w-1/2 flex justify-center items-center gap-2 py-3 px-4 text-white text-xs font-extrabold transition-all cursor-pointer hover:scale-[1.02] active:scale-95 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span>{loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}</span>
              {!loading && <ArrowRight size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FogotPassWordForm;
