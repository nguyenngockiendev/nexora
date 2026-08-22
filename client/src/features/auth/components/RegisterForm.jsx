import { Sparkles, User, Mail, Lock, ArrowLeft, ArrowRight, Image as ImageIcon } from "lucide-react";

const RegisterForm = ({
  register,
  handleSubmit,
  error,
  navigate,
  onSubmit,
  Setavatar,
  loading,
}) => {
  return (
    <div className="glass-panel p-8 sm:p-10 w-full flex flex-col items-center">
      <div className="flex items-center gap-2 font-bold text-xl text-slate-900 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20">
          <Sparkles size={20} />
        </div>
        <span>Nexora LMS</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Tạo Tài Khoản Mới</h1>
      <p className="text-slate-500 text-center mb-8">Tham gia cùng hàng ngàn học viên trên Nexora ngay hôm nay.</p>

      {error && (
        <div className="w-full p-3 mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Họ và tên</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <User size={18} />
            </span>
            <input
              className="glass-input w-full pl-10"
              placeholder="Nhập họ và tên của bạn"
              autoComplete="name"
              {...register("name")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Ảnh đại diện</label>
          <div className="relative flex items-center glass-input p-0 overflow-hidden">
            <div className="pl-3 text-slate-400">
              <ImageIcon size={18} />
            </div>
            <input
              type="file"
              className="w-full p-2.5 text-sm text-slate-700 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer outline-none bg-transparent"
              onChange={(e) => Setavatar(e.target.files[0])}
            />
          </div>
        </div>

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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Mật khẩu</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className="glass-input w-full pl-10"
                placeholder="Nhập mật khẩu"
                autoComplete="new-password"
                {...register("password")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Nhập lại mật khẩu</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className="glass-input w-full pl-10"
                placeholder="Xác nhận mật khẩu"
                autoComplete="new-password"
                {...register("repeatpassword")}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <button 
            type="button" 
            className="w-full sm:flex-1 flex justify-center items-center gap-2 py-3 px-4 glass-card text-slate-700 font-semibold hover:bg-white/80 transition-colors cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft size={16} />
            Đăng nhập
          </button>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:flex-[1.5] flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-br from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-orange-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
          >
            {loading ? "Đang tạo tài khoản..." : "Đăng Ký Tài Khoản"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;