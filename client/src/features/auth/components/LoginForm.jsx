import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Star,
  Play,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

const LoginForm = ({
  register,
  handleSubmit,
  loading,
  error,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(135deg, #fdf8f3 0%, #f7eee2 35%, #fae8d4 70%, #fdf4eb 100%)",
      }}
    >
      <div
        className="absolute -left-16 top-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-full pointer-events-none opacity-85 z-0"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #fff7eb 0%, #f8c078 40%, #c8761a 75%, #6a3a05 100%)",
          boxShadow:
            "0 25px 50px rgba(180, 95, 15, 0.25), inset -10px -10px 30px rgba(0,0,0,0.25)",
          filter: "blur(0.5px)",
        }}
      />

      <div
        className="absolute -right-20 -top-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full pointer-events-none opacity-80 z-0"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, #fffbf2 0%, #f6c886 45%, #c8761a 80%, #5d3102 100%)",
          boxShadow:
            "0 35px 70px rgba(180, 95, 15, 0.22), inset -15px -15px 40px rgba(0,0,0,0.3)",
        }}
      />

      <div
        className="absolute left-[62%] bottom-6 sm:bottom-12 w-20 h-20 sm:w-28 sm:h-28 rounded-full pointer-events-none opacity-90 z-0"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #fff4e0 0%, #f7b968 45%, #bf6e16 80%, #522902 100%)",
          boxShadow: "0 15px 30px rgba(180, 95, 15, 0.25)",
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-200/40 pointer-events-none filter blur-[120px] z-0" />

      <Link
        to="/"
        className="absolute top-5 left-5 sm:top-8 sm:left-8 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white/85 hover:bg-white border border-white/95 shadow-md shadow-amber-900/5 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 group cursor-pointer"
      >
        <ArrowLeft
          size={14}
          className="text-slate-500 group-hover:-translate-x-0.5 group-hover:text-orange-600 transition-all"
        />
        <span>Quay lại Trang chủ</span>
      </Link>

      <div className="relative z-10 w-full max-w-5xl">
        <div
          className="rounded-[2.5rem] sm:rounded-[38px] p-6 sm:p-10 md:p-12 relative overflow-visible grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          style={{
            background: "rgba(255, 255, 255, 0.76)",
            backdropFilter: "blur(40px) saturate(190%)",
            WebkitBackdropFilter: "blur(40px) saturate(190%)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow:
              "0 30px 80px rgba(180, 100, 20, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
          }}
        >
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-500/25 flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                }}
              >
                <span className="font-black text-lg tracking-tighter text-amber-400">
                  N
                </span>
              </div>
              <span className="font-black text-xl text-slate-900 tracking-tight">
                Nexora LMS
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Chào Mừng Trở Lại
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Đăng nhập vào bảng điều khiển học tập cá nhân của bạn.
              </p>
            </div>

            {error && (
              <div className="p-3.5 px-4 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-bold flex items-center gap-2.5 shadow-2xs">
                <AlertCircle size={16} className="text-rose-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide">
                  Email
                </label>
                <div className="relative rounded-2xl bg-white/90 border border-slate-200 shadow-2xs transition-all focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-500/15">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail size={17} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="vidu@email.com"
                    {...register("email")}
                    className="w-full pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 bg-transparent outline-none rounded-2xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide">
                  Mật khẩu
                </label>
                <div className="relative rounded-2xl bg-white/90 border border-slate-200 shadow-2xs transition-all focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-500/15">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={17} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full pl-11 pr-11 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 bg-transparent outline-none rounded-2xl"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                <div className="flex justify-end pt-1">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              <div className="flex items-center my-2">
                <div className="flex-1 border-t border-slate-200/80" />
                <span className="px-3 text-xs font-semibold text-slate-400">hoặc</span>
                <div className="flex-1 border-t border-slate-200/80" />
              </div>

              <button
                type="button"
                className="w-full py-3 px-4 rounded-2xl bg-white/95 border border-slate-200 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Đăng nhập nhanh với Google</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
                style={{
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng Nhập</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="text-center text-xs font-semibold text-slate-500 pt-2">
                Bạn chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2"
                >
                  Tạo tài khoản miễn phí
                </Link>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800 m-0">Tài khoản test:</p>
                <p className="m-0">Admin: admin@example.com - 1</p>
                <p className="m-0">Giảng viên: instructor@example.com - 1</p>
                <p className="m-0">Học viên: student@example.com - 1</p>
              </div>
            </form>
          </div>

          <div className="relative flex items-center justify-center pl-0 lg:pl-4">
            <div
              className="w-full max-w-md rounded-3xl p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.88)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 20px 45px rgba(194, 110, 30, 0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Hiệu Suất Học Tập
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                    alt="Alex R."
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-200 shadow-2xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                      Alex R.
                    </h3>
                    <div className="flex items-center gap-0.5 text-amber-500 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">
                    Hoàn thành khóa học
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                    98%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">
                    Điểm tổng kết
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                    A+
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-500">
                  Xem trước lớp trực tuyến
                </p>
                <div className="rounded-2xl p-3.5 bg-slate-900 text-white relative overflow-hidden shadow-md flex items-center justify-between group cursor-pointer">
                  <div className="relative z-10 max-w-[80%]">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/90 text-white text-[9px] font-black tracking-wider uppercase mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ĐANG TRỰC TIẾP
                    </span>
                    <p className="text-xs font-bold text-slate-100 truncate">
                      Advanced UX Design - Buổi 3: Prototyping
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-all flex-shrink-0">
                    <Play size={15} className="fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400">
                    Đánh giá 5 sao từ học viên
                  </p>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800 mt-0.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span>Xuất sắc!</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-[11px] font-bold shadow-2xs">
                  <Sparkles size={12} className="text-purple-600" />
                  <span>AI Quiz Master</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden md:flex absolute -top-5 -right-6 lg:-right-8 items-center gap-3 p-3.5 px-4 rounded-2xl z-20 shadow-xl"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(25px)",
            boxShadow: "0 15px 35px rgba(180, 100, 20, 0.12)",
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-2xs">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 leading-tight">
              +98%
            </p>
            <p className="text-[10px] font-semibold text-slate-500">
              Tỷ lệ hoàn thành
            </p>
          </div>
        </div>

        <div
          className="hidden md:block absolute top-1/2 -right-8 lg:-right-12 -translate-y-1/2 p-3.5 px-5 rounded-2xl z-20 shadow-xl space-y-1"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(25px)",
            boxShadow: "0 15px 35px rgba(180, 100, 20, 0.12)",
          }}
        >
          <p className="text-[9px] uppercase font-bold tracking-wider text-slate-400">
            Lớp học sắp bắt đầu
          </p>
          <p className="text-xs font-black text-slate-900">
            Digital Marketing
          </p>
          <p className="text-xs font-black text-orange-600 font-mono">
            03m 45s
          </p>
        </div>

        <div
          className="hidden md:flex absolute -bottom-5 -right-4 lg:-right-6 flex-col gap-1.5 p-3.5 px-4 rounded-2xl z-20 shadow-xl"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(25px)",
            boxShadow: "0 15px 35px rgba(180, 100, 20, 0.12)",
          }}
        >
          <p className="text-[9px] uppercase font-bold tracking-wider text-slate-400">
            Cộng đồng học tập
          </p>
          <p className="text-xs font-bold text-slate-800">
            Hơn 25.000+ Học viên tham gia
          </p>
          <div className="flex items-center -space-x-2 pt-0.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
              alt="Avatar 1"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
              alt="Avatar 2"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
              alt="Avatar 3"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
              alt="Avatar 4"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
              +25K
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
