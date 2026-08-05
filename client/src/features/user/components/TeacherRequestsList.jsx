import React, { useState } from "react";
import { Shield, Eye, X, Check, XCircle, Award, Calendar } from "lucide-react";

const TeacherRequestsList = ({ requestList, handleRespond, loading }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container py-4">
      {/* ── BẢNG TIÊU ĐỀ CHÍNH ── */}
      <section
        className="relative overflow-visible rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6"
        style={{
          background: "rgba(255, 255, 255, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(32px)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 16px 48px rgba(249, 115, 22, 0.04)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
        </div>

        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest mb-3"
            style={{
              background: "rgba(249, 115, 22, 0.1)",
              border: "1px solid rgba(249, 115, 22, 0.25)",
              color: "#ea580c",
            }}
          >
            <Shield size={14} />
            Hệ Thống Quản Trị
          </div>
          <h1 className="text-3xl font-black leading-tight text-slate-800">
            Duyệt Đơn Giảng Viên
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-xl leading-relaxed">
            Xem xét các yêu cầu nâng cấp từ học viên. Vui lòng kiểm tra kỹ ảnh chứng chỉ và lý do đăng ký dạy trước khi phê duyệt.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-white/70 border border-slate-200 shadow-sm flex items-center gap-2 text-sm font-bold text-slate-600">
          <Award size={18} className="text-orange-500" />
          <span>Tổng số đơn chờ: {requestList.length} đơn</span>
        </div>
      </section>

      {/* ── DANH SÁCH ĐƠN ĐĂNG KÝ (CARD GRID) ── */}
      {requestList.length > 0 ? (
        <div className="row g-4">
          {requestList.map((req) => (
            <div key={req._id} className="col-12 col-md-6">
              <div
                className="card border-0 p-4 h-full rounded-4 flex flex-col justify-between"
                style={{
                  background: "rgba(255, 255, 255, 0.65)",
                  border: "1px solid rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div>
                  {/* Header: Thông tin học viên */}
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <img
                      src={req.userId?.avatar || "https://res.cloudinary.com/db7t78kpw/image/upload/v1711287957/default-avatar_g9kcxo.png"}
                      className="w-12 h-12 rounded-3 object-cover border border-slate-200 shadow-sm"
                      alt="Avatar"
                    />
                    <div className="min-w-0 flex-grow-1">
                      <h4 className="fw-black text-slate-800 fs-6 mb-1 truncate">{req.userId?.name}</h4>
                      <p className="text-slate-400 fs-7 mb-0 truncate">{req.userId?.email}</p>
                    </div>
                  </div>

                  {/* Chuyên môn đăng ký dạy */}
                  <div className="mb-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Lĩnh vực đăng ký</span>
                    <span className="badge bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-1.5 rounded-lg fw-bold fs-7">
                      {req.specialty}
                    </span>
                  </div>

                  {/* Ý kiến/Lý do ứng tuyển */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Mục tiêu & Động lực</span>
                    <p className="fs-7 text-slate-600 bg-white-40 p-3 rounded-3 border border-slate-100 italic leading-relaxed mb-0">
                      "{req.opinion}"
                    </p>
                  </div>

                  {/* Ảnh minh chứng chứng chỉ */}
                  {req.proofImage && (
                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Minh chứng năng lực</span>
                      <div
                        onClick={() => setSelectedImage(req.proofImage)}
                        className="relative rounded-3 overflow-hidden border border-slate-200 group cursor-pointer aspect-video bg-slate-50"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={req.proofImage}
                          alt="Certificate Proof"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/35 transition-colors d-flex align-items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-circle bg-white/90 shadow d-flex align-items-center justify-center">
                            <Eye size={18} className="text-slate-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer: Nút hành động phê duyệt */}
                <div className="d-flex gap-3 pt-3 border-top border-slate-100/60 mt-auto">
                  <button
                    onClick={() => handleRespond(req._id, req.userId?._id, "rejected")}
                    disabled={loading}
                    className="btn btn-light border-slate-200 text-slate-500 fw-bold fs-7 py-2.5 rounded-3 flex-fill d-flex align-items-center justify-content-center gap-1.5 transition-all hover-bg-danger"
                  >
                    <XCircle size={15} /> Từ chối
                  </button>
                  <button
                    onClick={() => handleRespond(req._id, req.userId?._id, "approved")}
                    disabled={loading}
                    className="btn text-white fw-bold fs-7 py-2.5 rounded-3 flex-fill d-flex align-items-center justify-content-center gap-1.5 transition-all hover-scale shadow-sm border-0"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                      boxShadow: "0 6px 20px rgba(249, 115, 22, 0.15)",
                    }}
                  >
                    <Check size={15} /> Phê duyệt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-5 rounded-4"
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="w-16 h-16 rounded-circle bg-slate-100 d-inline-flex align-items-center justify-content-center text-slate-400 mb-3">
            <Check size={28} />
          </div>
          <h4 className="fw-bold text-slate-700">Tất cả đã hoàn thành!</h4>
          <p className="text-slate-400 text-sm mb-0">Hiện tại không có đơn đăng ký giảng viên nào đang chờ phê duyệt.</p>
        </div>
      )}

      {/* ── MODAL LIGHTBOX PHÓNG TO ── */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm d-flex align-items-center justify-center p-4 cursor-pointer"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border-0"
            style={{ position: "absolute", top: "20px", right: "20px" }}
          >
            <X size={20} />
          </button>
          <img
            src={selectedImage}
            alt="Certificate Lightbox"
            className="max-w-full max-h-[90vh] object-contain rounded-4 shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default TeacherRequestsList;
