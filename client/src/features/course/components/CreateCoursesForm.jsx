import {
  Image as ImageIcon,
  Video,
  Radio,
  ArrowLeft,
  Plus,
  Type,
  Loader2,
  CheckCircle,
  Sparkles,
  Layers,
  GraduationCap,
  X,
  UploadCloud,
  AlertCircle,
} from "lucide-react";
import { useEffect } from "react";

const CreateCoursesForm = ({
  register,
  handleSubmit,
  watch = () => ({}),
  setValue,
  error,
  navigate,
  onSubmit,
  setThumbnail,
  thumbnailPreview,
  loading,
  onConfirm,
  onCancel,
  exits,
  isEdit = false,
  errors,
}) => {
  const watchedTitle = watch("title") || "";
  const watchedDescription = watch("description") || "";
  const watchedPrice = watch("price") || "";
  const watchedLevel = watch("level") || "beginner";
  const watchedType = watch("type") || "recorded";
  const isLive = watchedType === "live";

  useEffect(() => {
    if (isLive && setValue) {
      setValue("price", 0);
    }
  }, [isLive, setValue]);

  const formatPrice = (val) => {
    if (!val || isNaN(val)) return "0 ₫";
    return Number(val).toLocaleString("vi-VN") + " ₫";
  };

  const getLevelLabel = (lvl) => {
    switch (lvl) {
      case "beginner":
        return "Cơ bản";
      case "intermediate":
        return "Trung cấp";
      case "advanced":
        return "Nâng cao";
      default:
        return "Cơ bản";
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] p-4 sm:p-6 lg:p-8 space-y-6">
      {/* ── HEADER BANNER ── */}
      <div
        className="rounded-[32px] p-6 sm:p-8 relative overflow-hidden transition-all shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 248, 240, 0.8) 100%)",
          backdropFilter: "blur(24px)",
          border: "1.5px solid rgba(255, 255, 255, 0.95)",
          boxShadow: "0 10px 30px rgba(180, 100, 20, 0.05)",
        }}
      >
        {/* Glow Background */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-900 border border-orange-200 uppercase tracking-wider">
              <Sparkles size={13} className="text-orange-600 animate-pulse" />
              <span>Giảng Viên Nexora • Khởi Tạo Nội Dung</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isEdit ? "Chỉnh Sửa Khóa Học" : "Tạo Khóa Học Mới"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {isEdit
                ? "Cập nhật và tối ưu hóa nội dung khóa học của bạn"
                : "Thiết kế, xây dựng và xuất bản khóa học chất lượng cao tới hàng ngàn học viên"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="self-start sm:self-center px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-black text-xs border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs sm:text-sm flex items-center gap-2">
          <X size={16} className="text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div
              className="rounded-[28px] p-6 sm:p-7 space-y-5 transition-all shadow-sm"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
              }}
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/70">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  <Type size={16} />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  1. Thông Tin Cơ Bản
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  Tiêu đề khóa học <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Lập Trình ReactJS Thực Chiến 2026..."
                  autoComplete="title"
                  {...register("title", { required: true })}
                  className="w-full h-12 px-4 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200/90 focus:border-orange-500/60 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-2xs"
                />
              </div>

              {/* Mô tả khóa học */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  Mô tả chi tiết khóa học{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Mô tả nội dung bài giảng, đối tượng phù hợp, lợi ích học viên nhận được..."
                  {...register("description", { required: true })}
                  className="w-full p-4 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200/90 focus:border-orange-500/60 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-2xs resize-none"
                />
              </div>
            </div>

            <div
              className="rounded-[28px] p-6 sm:p-7 space-y-5 transition-all shadow-sm"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
              }}
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/70">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  <Layers size={16} />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  2. Định Giá, Cấp Độ &amp; Hình Thức
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      Giá bán (VND){" "}
                      {!isLive && <span className="text-rose-500">*</span>}
                    </label>
                    {isLive && (
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60">
                        Khóa Live: Học phí theo lớp
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder={
                        isLive
                          ? "Khóa Live không có giá bán ngoài"
                          : "Ví dụ: 250000"
                      }
                      min="0"
                      autoComplete="price"
                      disabled={isLive}
                      value={isLive ? 0 : undefined}
                      {...register("price", { required: !isLive })}
                      className={`w-full h-12 pl-4 pr-10 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-2xs ${
                        isLive
                          ? "bg-slate-100/90 text-slate-400 cursor-not-allowed border-slate-200 select-none"
                          : "text-slate-800 bg-white border border-slate-200/90 focus:border-orange-500/60 focus:ring-4 focus:ring-orange-500/10 outline-none"
                      }`}
                    />

                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 pointer-events-none">
                      ₫
                    </div>
                  </div>
                </div>

                {/* Cấp độ */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Cấp độ bài học <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register("level", { required: true })}
                    className="w-full h-12 px-4 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200/90 focus:border-orange-500/60 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-2xs appearance-none cursor-pointer"
                  >
                    <option value="beginner">
                      Cơ bản (Beginner - Người mới)
                    </option>
                    <option value="intermediate">
                      Trung cấp (Intermediate - Đã có nền tảng)
                    </option>
                    <option value="advanced">
                      Nâng cao (Advanced - Chuyên sâu)
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Hình thức khóa học <span className="text-rose-500">*</span>
                  </label>
                  {isEdit && (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      🔒 Cố định hình thức khóa học
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Live Class */}
                  <label
                    className={`relative ${isEdit ? "pointer-events-none opacity-75" : "cursor-pointer"}`}
                  >
                    <input
                      type="radio"
                      value="live"
                      {...register("type")}
                      className="peer sr-only"
                    />

                    <div className="p-4 rounded-2xl border-2 border-slate-200/90 bg-white/70 hover:bg-white text-slate-600 transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50/90 peer-checked:text-orange-900 peer-checked:shadow-sm shadow-2xs flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                        <Radio size={20} className="animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-black">
                          Học Trực Tuyến (Live)
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Phòng học thời gian thực, có lịch dạy
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Recorded Videos */}
                  <label
                    className={`relative ${isEdit ? "pointer-events-none opacity-75" : "cursor-pointer"}`}
                  >
                    <input
                      type="radio"
                      value="recorded"
                      {...register("type")}
                      className="peer sr-only"
                    />

                    <div className="p-4 rounded-2xl border-2 border-slate-200/90 bg-white/70 hover:bg-white text-slate-600 transition-all peer-checked:border-purple-500 peer-checked:bg-purple-50/90 peer-checked:text-purple-900 peer-checked:shadow-sm shadow-2xs flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                        <Video size={20} />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-black">
                          Video Bài Giảng (Recorded)
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Học viên tự học theo video quay sẵn
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Card 3: Ảnh bìa (Thumbnail) */}
            <div
              className="rounded-[28px] p-6 sm:p-7 space-y-4 transition-all shadow-sm"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
              }}
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/70">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  <ImageIcon size={16} />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  3. Ảnh Bìa Khóa Học (Thumbnail)
                </h3>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  Tải lên ảnh bìa (Tỷ lệ 16:9)
                </label>

                {thumbnailPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-orange-300 shadow-md group">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <label className="px-4 py-2 rounded-xl bg-white text-slate-800 font-black text-xs cursor-pointer shadow-md hover:bg-slate-100 transition-all">
                        <span>Đổi ảnh khác</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => setThumbnail(e.target.files[0])}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setThumbnail(null)}
                        className="px-4 py-2 rounded-xl bg-rose-500 text-white font-black text-xs cursor-pointer shadow-md hover:bg-rose-600 transition-all"
                      >
                        Xóa ảnh
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="relative flex flex-col items-center justify-center w-full h-44 rounded-3xl border-2 border-dashed border-orange-300/80 bg-orange-50/30 hover:bg-orange-50/60 transition-all cursor-pointer shadow-2xs group">
                    <div className="flex flex-col items-center justify-center p-5 text-center">
                      <div className="w-12 h-12 mb-2 bg-white text-orange-500 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-xs font-black text-slate-800">
                        Bấm để chọn ảnh bìa hoặc kéo thả vào đây
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        Hỗ trợ PNG, JPG, WEBP (Khuyên dùng tỷ lệ 16:9, dưới 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* 👉 CỘT PHẢI (35% WIDTH - LIVE CARD PREVIEW & NÚT HÀNH ĐỘNG) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            {/* Live Card Preview Box */}
            <div
              className="rounded-[32px] p-6 space-y-4 transition-all shadow-md overflow-hidden relative"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 245, 0.9) 100%)",
                backdropFilter: "blur(24px)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow:
                  "0 20px 50px rgba(180, 100, 20, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                  <Sparkles size={12} className="text-amber-600" />
                  <span>Xem Trước Trực Tiếp</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 font-mono">
                  Live Preview
                </span>
              </div>

              {/* Mô phỏng Card Khóa Học thực tế */}
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm transition-all group">
                {/* Thumbnail Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-tr from-slate-800 to-slate-900">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Preview Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/40 p-4 text-center">
                      <ImageIcon size={32} className="mb-1 text-white/30" />
                      <span className="text-xs font-semibold">
                        Chưa có ảnh bìa khóa học
                      </span>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    {watchedType === "live" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black bg-rose-500/90 text-white backdrop-blur-md shadow-xs">
                        <Radio size={10} className="animate-pulse" />
                        <span>Live Class</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black bg-orange-500/90 text-white backdrop-blur-md shadow-xs">
                        <Video size={10} />
                        <span>Video</span>
                      </span>
                    )}
                  </div>

                  {/* Level Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-white/90 text-slate-800 backdrop-blur-md shadow-xs">
                      {getLevelLabel(watchedLevel)}
                    </span>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-4 space-y-2.5">
                  <h4 className="text-sm sm:text-base font-black text-slate-900 line-clamp-2 leading-snug">
                    {watchedTitle ||
                      "Tiêu đề khóa học của bạn sẽ hiển thị tại đây..."}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {watchedDescription ||
                      "Mô tả ngắn gọn về những giá trị và kiến thức học viên sẽ đạt được sau khóa học..."}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px]">
                        <GraduationCap size={12} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        Giảng viên
                      </span>
                    </div>

                    {isLive ? (
                      <span className="text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60">
                        Lớp học trực tuyến
                      </span>
                    ) : (
                      <span className="text-sm sm:text-base font-black text-orange-600">
                        {formatPrice(watchedPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-2xl font-black text-xs sm:text-sm text-white shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>
                        {isEdit
                          ? "Đang Cập Nhật..."
                          : "Đang Khởi Tạo Khóa Học..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      <span>
                        {isEdit ? "Lưu Thay Đổi ✨" : "Tạo Khóa Học Ngay ✨"}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/courses")}
                  className="w-full h-11 rounded-2xl font-black text-xs text-slate-600 bg-white/80 hover:bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* ── MODAL PROMPT TẠO LỚP LIVE CLASS (KHI CHỌN TYPE LIVE) ── */}
      {exits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/50">
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-center animate-[fadeIn_0.3s_ease-out]"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 248, 240, 0.95) 100%)",
              border: "1.5px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center shadow-xs">
              <CheckCircle size={32} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Tạo Khóa Học Thành Công! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Khung khóa học trực tuyến của bạn đã sẵn sàng. Bạn có muốn tiến
                hành lên lịch cho buổi học Live Class đầu tiên ngay bây giờ
                không?
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => onCancel()}
                className="flex-1 h-11 rounded-2xl font-black text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
              >
                Để sau
              </button>
              <button
                type="button"
                onClick={() => onConfirm()}
                className="flex-1 h-11 rounded-2xl font-black text-xs text-white shadow-md shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                }}
              >
                Lên Lịch Ngay ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCoursesForm;
