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
        className="rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all space-y-5"
        style={{
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 250, 245, 0.7) 100%)",
          backdropFilter: "blur(32px) saturate(190%)",
          WebkitBackdropFilter: "blur(32px) saturate(190%)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 20px 50px rgba(180, 100, 20, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-100/70 text-orange-700 border border-orange-200/80 shadow-2xs">
              <Sparkles size={13} className="text-orange-600 animate-pulse" />
              <span>Nexora Instructor Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
              Đồng Hành Cùng Nexora — Trở Thành Giảng Viên
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
              Chia sẻ tri thức, xây dựng thương hiệu cá nhân và tạo nguồn thu
              nhập đột phá cùng hơn 100,000+ học viên đam mê học tập trên toàn hệ
              thống.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/25">
              <GraduationCap size={32} />
            </div>
          </div>
        </div>

        {/* 3 Thẻ Quyền Lợi Nằm Ngang (Mini Benefit Pills) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Card 1 */}
          <div
            className="rounded-2xl p-3.5 flex items-center gap-3 bg-white/70 border border-slate-200/70 shadow-2xs"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-extrabold shrink-0">
              <DollarSign size={18} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">
                Chia sẻ doanh thu 80%
              </p>
              <p className="text-[11px] text-slate-500">
                Tỷ lệ chia sẻ học phí hấp dẫn
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="rounded-2xl p-3.5 flex items-center gap-3 bg-white/70 border border-slate-200/70 shadow-2xs"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold shrink-0">
              <Lightbulb size={18} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">
                Công cụ giảng dạy thông minh
              </p>
              <p className="text-[11px] text-slate-500">
                Video studio, Live room, Quiz
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="rounded-2xl p-3.5 flex items-center gap-3 bg-white/70 border border-slate-200/70 shadow-2xs"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">
                Huy hiệu đã xác minh
              </p>
              <p className="text-[11px] text-slate-500">
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
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-orange-50 text-orange-700 border border-orange-200">
              Hồ sơ mới
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Lĩnh vực chuyên môn */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Lĩnh vực chuyên môn <span className="text-orange-500">*</span>
              </label>

              {/* Tag gợi ý bấm nhanh */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-400">
                  Gợi ý:
                </span>
                {SUGGESTED_SPECIALTIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSpecialty(item)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                      specialty === item
                        ? "bg-orange-500 text-white border-orange-600 shadow-2xs"
                        : "bg-white/80 text-slate-600 border-slate-200/80 hover:bg-orange-50 hover:text-orange-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                disabled={loading}
                placeholder="Ví dụ: Lập trình ReactJS, Thiết kế UI/UX, IELTS..."
                className="w-full h-11 px-4 rounded-2xl text-xs font-semibold text-slate-800 bg-white/80 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
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
                className="w-full p-3.5 rounded-2xl text-xs font-semibold text-slate-800 bg-white/80 border border-slate-200/80 focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none leading-relaxed"
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
                  className="w-full flex flex-col items-center justify-center p-7 rounded-2xl border-2 border-dashed border-slate-300 hover:border-orange-400 bg-white/50 hover:bg-orange-50/40 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Upload size={22} />
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
                <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-emerald-500" />
                      <span>Đã chọn ảnh minh chứng</span>
                    </span>

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <X size={14} />
                      <span>Xóa / Chọn lại</span>
                    </button>
                  </div>

                  <div className="relative group max-w-md mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src={previewUrl}
                      alt="Ảnh chứng chỉ"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedPreviewModal(true)}
                      className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-bold cursor-pointer"
                    >
                      <Eye size={16} />
                      <span>Xem ảnh phóng to</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Nút gửi hồ sơ */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-2xl text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                }}
              >
                <Send size={16} />
                <span>
                  {!loading ? "Gửi Hồ Sơ Đăng Ký Ngay 🚀" : "Đang xử lý hồ sơ..."}
                </span>
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
              <div className="p-2.5 rounded-2xl bg-white/70 border border-slate-200/60 flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Có kinh nghiệm thực tế &gt; 1 năm trong chuyên môn</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/70 border border-slate-200/60 flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Ảnh chứng chỉ, bằng cấp hoặc portfolio rõ nét</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/70 border border-slate-200/60 flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Cam kết chuẩn mực chất lượng và hỗ trợ học viên</span>
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
            <div className="space-y-1 text-xs font-bold text-orange-950">
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-orange-600" />
                <span>instructor@nexora.edu.vn</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={13} className="text-orange-600" />
                <span>1900 8888 (Miễn phí)</span>
              </p>
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
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
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
