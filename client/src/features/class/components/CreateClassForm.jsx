import "react-toastify/dist/ReactToastify.css";
import {
  Calendar,
  Clock,
  Video,
  Users,
  DollarSign,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Radio,
} from "lucide-react";
import { useWatch } from "react-hook-form";

const CreateClassForm = ({
  register,
  handleSubmit,
  onSubmit,
  loading,
  notification,
  classsdata,
  navigate,
  classloading,
  classnotification,
  control,
}) => {
  const isSubmitting = loading || classloading;

  const watchClassName = useWatch({ control, name: "Classname" });
  const watchStudents = useWatch({ control, name: "Studentsnumber" });
  const watchDay = useWatch({ control, name: "Day" });
  const watchStartTime = useWatch({ control, name: "Starttime" });
  const watchEndTime = useWatch({ control, name: "Endtime" });
  const watchPrice = useWatch({ control, name: "Price" });

  const getDayLabel = (day) => {
    const map = {
      Monday: "Thứ Hai",
      Tuesday: "Thứ Ba",
      Wednesday: "Thứ Tư",
      Thursday: "Thứ Năm",
      Friday: "Thứ Sáu",
      Saturday: "Thứ Bảy",
      Sunday: "Chủ Nhật",
    };
    return map[day] || day || "Thứ Hai";
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest mb-2 shadow-sm"
            style={{
              background: "rgba(249,115,22,0.12)",
              border: "1px solid rgba(249,115,22,0.25)",
              color: "#ea580c",
            }}
          >
            <Radio size={13} className="animate-pulse text-orange-500" />
            Thiết Lập Phòng Học Trực Tuyến
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {classsdata ? "Cập Nhật Lớp Học Trực Tuyến" : "Tạo Lớp Học Trực Tuyến Mới"}
          </h1>
          <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">
            Thiết lập phòng học trực tuyến và thông tin chi tiết các buổi học
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/my/class")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 bg-white/80 border border-slate-200 hover:bg-white shadow-sm hover:scale-105 transition-all self-start sm:self-auto cursor-pointer"
          style={{ borderRadius: "9999px" }}
        >
          <ArrowLeft size={15} />
          <span>Quay lại danh sách</span>
        </button>
      </div>

      {(notification || classnotification) && (
        <div
          className="p-4 rounded-2xl text-xs font-bold text-orange-700 border border-orange-200"
          style={{ background: "rgba(249,115,22,0.1)" }}
        >
          {notification || classnotification}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* SECTION 1: BASIC INFO */}
            <div
              className="p-6 md:p-8 rounded-[2rem] space-y-5 transition-all"
              style={{
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(194,110,30,0.06)",
              }}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                  <BookOpen size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  1. Thông Tin Cơ Bản
                </h3>
              </div>

              <div className="space-y-4">
                {/* Class Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tên Lớp Học <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Lớp ReactJS Chuyên Sâu K12"
                    className="w-full px-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                    required
                    {...register("Classname")}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Mô Tả Lớp Học
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mô tả mục tiêu, nội dung kiến thức và lộ trình học tập của lớp học này..."
                    className="w-full p-4 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm resize-none"
                    {...register("Description")}
                  />
                </div>

                {/* Maximum Students */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Số Lượng Học Viên Tối Đa <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Users size={15} />
                    </div>
                    <input
                      type="number"
                      placeholder="Nhập số lượng học viên tối đa (ví dụ: 20)"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                      required
                      {...register("Studentsnumber")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: TIMELINE & MEETING */}
            <div
              className="p-6 md:p-8 rounded-[2rem] space-y-5 transition-all"
              style={{
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(194,110,30,0.06)",
              }}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <Calendar size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  2. Thời Gian & Phòng Học
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Register Deadline */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hạn Chót Đăng Ký <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                    required
                    {...register("Dealine")}
                  />
                </div>

                {/* Meeting Link */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Đường Dẫn Phòng Học (Google Meet / Zoom) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Video size={15} />
                    </div>
                    <input
                      type="text"
                      placeholder="https://meet.google.com/..."
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                      required
                      {...register("Meetinglink")}
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Ngày Khai Giảng (Bắt đầu) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                    required
                    {...register("Startdate")}
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Ngày Kết Thúc Dự Kiến <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                    required
                    {...register("Enddate")}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: WEEKLY SCHEDULE */}
            <div
              className="p-6 md:p-8 rounded-[2rem] space-y-5 transition-all"
              style={{
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(194,110,30,0.06)",
              }}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                  <Clock size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  3. Lịch Học Hàng Tuần
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                {/* Day */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Thứ trong tuần <span className="text-rose-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                    required
                    {...register("Day")}
                  >
                    <option value="">Chọn thứ trong tuần</option>
                    <option value="Monday">Thứ Hai</option>
                    <option value="Tuesday">Thứ Ba</option>
                    <option value="Wednesday">Thứ Tư</option>
                    <option value="Thursday">Thứ Năm</option>
                    <option value="Friday">Thứ Sáu</option>
                    <option value="Saturday">Thứ Bảy</option>
                    <option value="Sunday">Chủ Nhật</option>
                  </select>
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Giờ Bắt Đầu <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                    required
                    {...register("Starttime")}
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Giờ Kết Thúc <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                    required
                    {...register("Endtime")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: PREVIEW CARD & SUBMIT PANEL ── */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className="p-6 rounded-[2rem] space-y-4 relative overflow-hidden sticky top-6"
              style={{
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.9)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 8px 32px rgba(194,110,30,0.08)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Xem Trước Thẻ Lớp Học
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-white shadow-sm"
                  style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
                </span>
              </div>

              {/* Card Banner Preview */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-200/60 relative overflow-hidden">
                <h4 className="text-base font-extrabold text-slate-800 line-clamp-2 mb-2">
                  {watchClassName || "Lớp Học Trực Tuyến Mẫu"}
                </h4>

                <div className="space-y-2 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-orange-500" />
                    <span>Tối đa: <strong className="text-slate-800">{watchStudents || "20"}</strong> học viên</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-orange-500" />
                    <span>
                      {getDayLabel(watchDay)} • {watchStartTime || "08:20"} - {watchEndTime || "10:20"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-orange-200/40">
                    <DollarSign size={13} className="text-emerald-600" />
                    <span className="font-extrabold text-slate-800 text-sm">
                      {watchPrice ? `${Number(watchPrice).toLocaleString("vi-VN")} đ` : "Miễn phí"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Submit Panel */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Học Phí Lớp Học (VNĐ) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <DollarSign size={15} />
                    </div>
                    <input
                      type="number"
                      placeholder="Nhập học phí (0 nếu miễn phí)"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                      required
                      {...register("Price")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:scale-105 shadow-xl shadow-orange-500/30 active:scale-95 disabled:opacity-50 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #fb923c)",
                    borderRadius: "9999px",
                  }}
                >
                  <Sparkles size={16} />
                  <span>
                    {isSubmitting
                      ? "Đang xử lý..."
                      : classsdata
                      ? "Lưu Thay Đổi ✨"
                      : "Tạo Lớp Học Ngay ✨"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/my/class")}
                  className="w-full py-3 rounded-full text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all text-center cursor-pointer"
                  style={{ borderRadius: "9999px" }}
                >
                  Hủy bỏ
                </button>
              </div>

              {/* Quick Tips */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 flex items-start gap-3">
                <Lightbulb size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <div className="text-[11px] font-semibold text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">Mẹo dành cho Giảng viên:</p>
                  <p>Vui lòng kiểm tra kỹ đường dẫn Google Meet / Zoom và ngày khai giảng để học viên vào học thuận tiện nhất.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateClassForm;
