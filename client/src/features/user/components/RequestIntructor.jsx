import React, { useState } from "react";
import {
  GraduationCap,
  Upload,
  X,
  Send,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Lightbulb,
  ShieldCheck,
  Clock,
  FileCheck,
  HelpCircle,
  Eye,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const SUGGESTED_SPECIALTIES = [
  "Frontend ReactJS / Next.js",
  "Backend Node.js / Express",
  "Thiết Kế UI/UX Design",
  "AI & Machine Learning",
  "Data Science & Python",
  "Tiếng Anh Giao Tiếp & IELTS",
  "Mobile App Flutter / React Native",
];

const RequestInstructor = ({
  opinion,
  setOpinion,
  specialty,
  setSpecialty,
  previewUrl,
  handleImageChange,
  handleRemoveImage,
  handleSubmit,
  loading,
}) => {
  const [selectedPreviewModal, setSelectedPreviewModal] = useState(false);

  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      {/* 🌟 1. HERO BENTO BANNER (TOP FULL WIDTH) 🌟 */}
      <div
        className="rounded-3xl p-4 sm:py-4 sm:px-6 relative overflow-hidden transition-all space-y-3.5 shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.90) 60%, rgba(15, 23, 42, 0.96) 100%)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow:
            "0 18px 48px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold shadow-2xs"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fb923c",
              }}
            >
              <Sparkles size={12} className="text-orange-400 animate-pulse" />
              <span>Nexora Instructor Network</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Đồng Hành Cùng Nexora — Trở Thành Giảng Viên
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
              Chia sẻ tri thức, xây dựng thương hiệu cá nhân và tạo nguồn thu
              nhập đột phá cùng hơn 100,000+ học viên đam mê học tập trên toàn hệ
              thống.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/25">
              <GraduationCap size={24} />
            </div>
          </div>
        </div>

        {/* 3 Thẻ Quyền Lợi Nằm Ngang (Mini Benefit Pills) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Card 1 */}
          <div
            className="rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-xs transition-all hover:border-white/25"
            style={{
              background:
                "linear-gradient(145deg, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.70) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center font-extrabold shrink-0">
              <DollarSign size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Chia sẻ doanh thu 80%
              </p>
              <p className="text-[11px] text-slate-400">
                Tỷ lệ chia sẻ học phí hấp dẫn
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-xs transition-all hover:border-white/25"
            style={{
              background:
                "linear-gradient(145deg, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.70) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-extrabold shrink-0">
              <Lightbulb size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Công cụ giảng dạy thông minh
              </p>
              <p className="text-[11px] text-slate-400">
                Video studio, Live room, Quiz
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-xs transition-all hover:border-white/25"
            style={{
              background:
                "linear-gradient(145deg, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.70) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-extrabold shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Huy hiệu đã xác minh
              </p>
              <p className="text-[11px] text-slate-400">
                Nâng tầm uy tín giảng viên
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 2. 2-COLUMN MASTER LAYOUT 🌟 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">
        {/* ════════════════ CỘT TRÁI: FORM NỘP HỒ SƠ ════════════════ */}
        <div
          className="rounded-[32px] p-6 sm:p-8 space-y-6"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 250, 245, 0.65) 100%)",
            backdropFilter: "blur(32px) saturate(190%)",
            WebkitBackdropFilter: "blur(32px) saturate(190%)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow:
              "0 20px 50px rgba(180, 100, 20, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
          }}
        >
          {/* Form Header */}
          <div className="pb-4 border-b border-slate-200/70 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <GraduationCap size={20} className="text-orange-500" />
                <span>Form Đăng Ký Giảng Viên</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Vui lòng cung cấp thông tin chính xác để Hội Đồng Thẩm Định xét
                duyệt nhanh nhất.
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold bg-orange-50 text-orange-700 border border-orange-200/80 shadow-2xs"
              style={{ borderRadius: "9999px" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Hồ sơ mới</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Lĩnh vực chuyên môn */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Lĩnh vực chuyên môn <span className="text-orange-500">*</span>
              </label>

              {/* Tag gợi ý bấm nhanh */}
              <div className="flex items-center gap-2 flex-wrap pt-0.5">
                <span className="text-[11px] font-bold text-slate-400">
                  Gợi ý:
                </span>
                {SUGGESTED_SPECIALTIES.map((item) => {
                  const isSelected = specialty === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSpecialty(item)}
                      style={{ borderRadius: "9999px" }}
                      className={`px-3 py-1.5 text-[11px] font-bold transition-all duration-200 cursor-pointer border flex items-center gap-1.5 select-none ${
                        isSelected
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-sm shadow-orange-500/25 scale-[1.02]"
                          : "bg-white/90 text-slate-600 border-slate-200/90 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/70 hover:shadow-xs active:scale-95"
                      }`}
                    >
                      {isSelected && <Sparkles size={11} className="text-white shrink-0" />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                disabled={loading}
                placeholder="Ví dụ: Lập trình ReactJS, Thiết kế UI/UX, IELTS..."
                style={{ borderRadius: "9999px" }}
                className="w-full h-11 px-4 text-xs font-semibold text-slate-800 bg-white/90 border border-slate-200/90 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-xs"
              />
            </div>

            {/* Tại sao muốn giảng dạy */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Tại sao bạn muốn giảng dạy tại Nexora? (Kinh nghiệm &amp; Động
                lực) <span className="text-orange-500">*</span>
              </label>
              <textarea
                rows={4}
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
                disabled={loading}
                placeholder="Chia sẻ kinh nghiệm làm việc thực tế, các dự án tiêu biểu bạn từng làm hoặc mong muốn truyền cảm hứng cho học viên..."
                style={{ borderRadius: "18px" }}
                className="w-full p-3.5 text-xs font-semibold text-slate-800 bg-white/90 border border-slate-200/90 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none leading-relaxed shadow-xs"
              />
            </div>

            {/* Ảnh minh chứng năng lực */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Ảnh minh chứng năng lực (Bằng cấp, Chứng chỉ, Portfolio...){" "}
                <span className="text-orange-500">*</span>
              </label>

              {!previewUrl ? (
                // Khung kéo thả khi chưa có ảnh
                <label
                  style={{ borderRadius: "20px" }}
                  className="w-full flex flex-col items-center justify-center p-7 border-2 border-dashed border-slate-300 hover:border-orange-400 bg-white/50 hover:bg-orange-50/40 transition-all cursor-pointer group shadow-2xs"
                >
                  <div
                    style={{ borderRadius: "9999px" }}
                    className="w-12 h-12 bg-orange-100 text-orange-600 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-orange-500/15"
                  >
                    <Upload size={20} />
                  </div>
                  <span className="text-xs font-black text-slate-700 group-hover:text-orange-600 transition-colors">
                    Bấm để tải ảnh chứng chỉ / bằng cấp lên
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Hỗ trợ định dạng JPG, PNG, WEBP (Tối đa 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              ) : (
                // Khung preview ảnh khi đã chọn
                <div
                  style={{ borderRadius: "20px" }}
                  className="p-4 bg-white/80 border border-slate-200/80 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-emerald-500" />
                      <span>Đã chọn ảnh minh chứng</span>
                    </span>

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      style={{ borderRadius: "9999px" }}
                      className="px-3.5 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200/80 hover:bg-rose-100 flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                    >
                      <X size={14} />
                      <span>Xóa / Chọn lại</span>
                    </button>
                  </div>

                  <div
                    style={{ borderRadius: "16px" }}
                    className="relative group max-w-md mx-auto overflow-hidden border border-slate-200 shadow-sm"
                  >
                    <img
                      src={previewUrl}
                      alt="Ảnh chứng chỉ"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setSelectedPreviewModal(true)}
                        style={{ borderRadius: "9999px" }}
                        className="px-4 py-2 bg-white/95 hover:bg-white text-slate-800 gap-1.5 text-xs font-bold cursor-pointer transition-all shadow-lg flex items-center hover:scale-105"
                      >
                        <Eye size={15} className="text-orange-600" />
                        <span>Xem ảnh phóng to</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nút gửi hồ sơ */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-sm font-black text-white hover:brightness-105 hover:shadow-orange-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none"
                style={{
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  boxShadow:
                    "0 10px 25px -4px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
                }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Đang xử lý hồ sơ...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} className="text-white" />
                    <span>Gửi Hồ Sơ Đăng Ký Ngay 🚀</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ════════════════ CỘT PHẢI: ROADMAP & CHECKLIST ════════════════ */}
        <div className="space-y-5">
          {/* 1. Lộ trình 3 bước xét duyệt */}
          <div
            className="rounded-[32px] p-6 sm:p-7 space-y-4"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 250, 245, 0.65) 100%)",
              backdropFilter: "blur(32px) saturate(190%)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              boxShadow: "0 20px 50px rgba(180, 100, 20, 0.08)",
            }}
          >
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} className="text-orange-500" />
              <span>Quy Trình 3 Bước Xét Duyệt</span>
            </h3>

            <div className="space-y-3 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-orange-200">
              {/* Bước 1 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/30">
                  1
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black text-slate-900">
                    Gửi đơn đăng ký &amp; chứng chỉ
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Điền chuyên môn, lý do và đính kèm ảnh bằng cấp năng lực.
                  </p>
                </div>
              </div>

              {/* Bước 2 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/30">
                  2
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black text-slate-900">
                    Ban Quản Trị thẩm định (24h)
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Hội đồng chuyên môn đối soát hồ sơ và kiểm tra chứng chỉ.
                  </p>
                </div>
              </div>

              {/* Bước 3 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/30">
                  3
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black text-slate-900">
                    Mở khóa quyền Giảng viên 🎉
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Truy cập Studio tạo khóa học, livestream và nhận doanh thu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Checklist tiêu chuẩn hồ sơ hợp lệ */}
          <div
            className="rounded-[32px] p-6 sm:p-7 space-y-3.5"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 250, 245, 0.65) 100%)",
              backdropFilter: "blur(32px) saturate(190%)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              boxShadow: "0 20px 50px rgba(180, 100, 20, 0.08)",
            }}
          >
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileCheck size={16} className="text-emerald-500" />
              <span>Tiêu Chuẩn Hồ Sơ Hợp Lệ</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-600 font-medium">
              <div
                style={{ borderRadius: "9999px" }}
                className="px-3.5 py-2.5 bg-white/80 border border-slate-200/70 flex items-center gap-2.5 shadow-2xs hover:bg-white transition-all"
              >
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-700">Có kinh nghiệm thực tế &gt; 1 năm trong chuyên môn</span>
              </div>
              <div
                style={{ borderRadius: "9999px" }}
                className="px-3.5 py-2.5 bg-white/80 border border-slate-200/70 flex items-center gap-2.5 shadow-2xs hover:bg-white transition-all"
              >
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-700">Ảnh chứng chỉ, bằng cấp hoặc portfolio rõ nét</span>
              </div>
              <div
                style={{ borderRadius: "9999px" }}
                className="px-3.5 py-2.5 bg-white/80 border border-slate-200/70 flex items-center gap-2.5 shadow-2xs hover:bg-white transition-all"
              >
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-700">Cam kết chuẩn mực chất lượng và hỗ trợ học viên</span>
              </div>
            </div>
          </div>

          {/* 3. Khung Hỗ Trợ Ứng Viên */}
          <div
            className="rounded-[32px] p-6 space-y-3"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 247, 237, 0.9) 0%, rgba(255, 237, 213, 0.6) 100%)",
              border: "1px solid rgba(251, 146, 60, 0.3)",
              boxShadow: "0 20px 50px rgba(180, 100, 20, 0.05)",
            }}
          >
            <h4 className="text-xs font-black text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle size={15} className="text-orange-600" />
              <span>Cần Hỗ Trợ Quy Trình Ứng Tuyển?</span>
            </h4>
            <p className="text-[11px] text-orange-900/80 leading-relaxed font-medium">
              Đội ngũ tuyển dụng giảng viên sẵn sàng tư vấn và giải đáp thắc mắc
              cho bạn 24/7.
            </p>
            <div className="flex flex-col gap-2 pt-0.5">
              <a
                href="mailto:instructor@nexora.edu.vn"
                style={{ borderRadius: "9999px" }}
                className="px-3.5 py-2 bg-white/90 border border-orange-200/80 flex items-center gap-2.5 text-xs font-bold text-orange-950 hover:bg-white hover:border-orange-300 transition-all shadow-2xs group"
              >
                <div
                  style={{ borderRadius: "9999px" }}
                  className="w-6 h-6 bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors"
                >
                  <Mail size={12} className="text-orange-600 group-hover:text-white" />
                </div>
                <span className="truncate">instructor@nexora.edu.vn</span>
              </a>
              <a
                href="tel:19008888"
                style={{ borderRadius: "9999px" }}
                className="px-3.5 py-2 bg-white/90 border border-orange-200/80 flex items-center gap-2.5 text-xs font-bold text-orange-950 hover:bg-white hover:border-orange-300 transition-all shadow-2xs group"
              >
                <div
                  style={{ borderRadius: "9999px" }}
                  className="w-6 h-6 bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors"
                >
                  <Phone size={12} className="text-orange-600 group-hover:text-white" />
                </div>
                <span>1900 8888 (Miễn phí)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 MODAL PHÓNG TO ẢNH CHỨNG CHỈ PREVIEW 🌟 */}
      {selectedPreviewModal && previewUrl && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                Ảnh minh chứng năng lực (Xem trước)
              </span>
              <button
                type="button"
                onClick={() => setSelectedPreviewModal(false)}
                style={{ borderRadius: "9999px" }}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <img
              src={previewUrl}
              alt="Ảnh phóng to"
              className="w-full max-h-[70vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestInstructor;
