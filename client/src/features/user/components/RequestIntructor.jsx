import { GraduationCap, Upload, X, Send } from "lucide-react";

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
  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      {/* ── CARD KÍNH MỜ CHÍNH ── */}
      <div
        className="card border-0 p-4 p-md-5 rounded-4"
        style={{
          background: "rgba(255, 255, 255, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 48px rgba(194, 110, 30, 0.06)",
        }}
      >
        {/* ── HEADER BANNER ── */}
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle p-3 mb-3"
            style={{
              background: "rgba(249, 115, 22, 0.1)",
              border: "1px solid rgba(249, 115, 22, 0.25)",
            }}
          >
            <GraduationCap
              size={40}
              className="text-orange-500"
              style={{ color: "#f97316" }}
            />
          </div>
          <h2 className="fw-black text-slate-800 fs-2 mb-2">
            Đăng Ký Giảng Viên
          </h2>
          <p className="text-slate-500 fs-6">
            Gửi đề xuất để nâng cấp tài khoản của bạn và bắt đầu tạo các khóa
            học trên Nexora.
          </p>
        </div>

        {/* ── FORM ĐĂNG KÝ ── */}
        <form onSubmit={handleSubmit} className="row g-4">
          {/* Ô nhập chuyên môn */}
          <div className="col-12">
            <label className="form-label fw-bold text-slate-700">
              Lĩnh vực chuyên môn
            </label>
            <input
              type="text"
              className="form-control rounded-3 py-2.5 bg-white-50 border-slate-200"
              placeholder="Ví dụ: Lập trình ReactJS, Thiết kế UI/UX..."
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-bold text-slate-700">
              Tại sao bạn muốn giảng dạy tại Nexora?
            </label>
            <textarea
              className="form-control rounded-3 py-2.5 bg-white-50 border-slate-200"
              rows="4"
              placeholder="Chia sẻ kinh nghiệm làm việc, động lực hoặc những dự án bạn từng làm..."
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              disabled={loading}
            ></textarea>
          </div>

        
          <div className="col-12">
            <label className="form-label fw-bold text-slate-700">
              Ảnh minh chứng năng lực (Chứng chỉ, Portfolio...)
            </label>

            {!previewUrl ? (
              // Vùng kéo thả file chưa chọn ảnh
              <label
                className="w-full d-flex flex-column align-items-center justify-content-center border border-2 border-dashed border-slate-300 rounded-3 py-5 bg-white-20 hover-bg-orange cursor-pointer transition-all"
                style={{ cursor: "pointer" }}
              >
                <Upload size={32} className="text-slate-400 mb-2" />
                <span className="fs-7 fw-bold text-slate-600">
                  Bấm để tải ảnh lên
                </span>
                <span className="fs-8 text-slate-400">
                  Chấp nhận định dạng JPG, PNG, WEBP
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </label>
            ) : (
              <div className="position-relative rounded-3 overflow-hidden border border-slate-200 aspect-video bg-slate-50">
                <img
                  src={previewUrl}
                  alt="Chứng chỉ xem trước"
                  className="w-full h-full object-cover"
                  style={{
                    maxHeight: "250px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="position-absolute p-1.5 rounded-circle bg-slate-900/60 hover-bg-danger text-white border-0 transition-colors"
                  style={{ top: "10px", right: "10px" }}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Nút gửi đơn */}
          <div className="col-12 pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 border-0 transition-transform active-scale hover-scale"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                boxShadow: "0 8px 24px rgba(249, 115, 22, 0.2)",
              }}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <>
                  <Send size={16} />
                  Gửi đơn đăng ký ngay
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RequestInstructor;
