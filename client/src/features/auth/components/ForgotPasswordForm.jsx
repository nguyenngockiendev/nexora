import { Link } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const FogotPassWordForm = ({
  register,
  handleSubmit,
  error,
  status,
  onsubmit,
  errors,
}) => {
  return (
    <div className="glass-panel p-8 sm:p-10 w-full flex flex-col items-center">
      <div className="flex items-center gap-2 font-bold text-xl text-slate-900 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20">
          <Sparkles size={20} />
        </div>
        <span>Nexora LMS</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
        Quên Mật Khẩu
      </h1>
      <p className="text-slate-500 text-center mb-8">
        Vui lòng nhập email và mật khẩu mới để đặt lại.
      </p>

      {status && (
        <div className="w-full p-3 mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl text-sm text-center">
          {status}
        </div>
      )}

      {error && (
        <div className="w-full p-3 mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-full flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail size={18} />
            </span>
            <input
              className="glass-input w-full pl-10"
              placeholder="vidu@email.com"
              autoComplete="email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle size={13} className="shrink-0" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Mật khẩu mới
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={18} />
            </span>
            <input
              type="password"
              className="glass-input w-full pl-10"
              placeholder="Nhập mật khẩu mới"
              autoComplete="new-password"
              {...register("newpassword")}
            />
          </div>
          {errors.newpassword && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle size={13} className="shrink-0" />
              <span>{errors.newpassword.message}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link
            to="/login"
            className="w-full sm:flex-1 flex justify-center items-center gap-2 py-3 px-4 glass-card text-slate-700 font-semibold hover:bg-white/80 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Quay lại
          </Link>

          <button
            type="submit"
            className="w-full sm:flex-1 flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-br from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-orange-500/40 transition-all cursor-pointer"
          >
            Đổi mật khẩu
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FogotPassWordForm;
