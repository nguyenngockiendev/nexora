import { useState } from "react";
import {
  Download,
  BookOpen,
  AlertCircle,
  FileText,
  FileArchive,
  PenTool,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Bot,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LessionForm = ({
  currentLesson,
  errorlession,
  videoRef,
  onplay,
  onpause,
  process,
  onNextLesson,
  onPrevLesson,
  hasNext,
  hasPrev,
  totalLessons,
  currentIndex,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh] p-4">
        <div
          style={{ borderRadius: "28px" }}
          className="text-center p-8 bg-white/70 backdrop-blur-3xl border border-white shadow-xl max-w-sm"
        >
          <div
            style={{ borderRadius: "9999px" }}
            className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25"
          >
            <BookOpen size={26} />
          </div>
          <h4 className="text-base font-black text-slate-800 mb-1.5">
            Chưa chọn bài học
          </h4>
          <p className="text-slate-500 text-xs font-semibold leading-relaxed">
            Vui lòng chọn một bài học từ danh sách bên phải để bắt đầu trải
            nghiệm bài giảng.
          </p>
        </div>
      </div>
    );
  }

  // Fallback resources if currentLesson doesn't have any attached yet
  const resourceList =
    currentLesson?.resources && currentLesson.resources.length > 0
      ? currentLesson.resources
      : [
          {
            id: 1,
            title: `${currentLesson?.title || "Tài liệu bài học"} - Cheat Sheet & Tóm tắt`,
            type: "PDF",
            url: "#",
          },
          {
            id: 2,
            title: "Mã nguồn bài tập thực hành (Source Code)",
            type: "ZIP",
            url: "#",
          },
        ];

  const durationMin = currentLesson?.duration
    ? Math.floor(currentLesson.duration / 60)
    : 15;

  return (
    <div className="flex flex-col gap-2 w-full h-full justify-start overflow-y-auto custom-scrollbar pr-1">
      {/* ── 1. Top Header: Proportional Title, Badges & Pill Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0 pb-2 border-b border-slate-200/70">
        {/* Left: Badges + Clean Title */}
        <div className="min-w-0 pr-2 flex-1 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              style={{ borderRadius: "9999px" }}
              className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/90 border border-orange-200/80 px-2.5 py-0.5"
            >
              Bài {Number(currentIndex ?? 0) + 1} / {totalLessons || 1}
            </span>
            <span
              style={{ borderRadius: "9999px" }}
              className="text-[11px] font-bold text-slate-500 bg-slate-100/80 border border-slate-200/70 px-2.5 py-0.5 flex items-center gap-1"
            >
              <Clock size={11} className="text-orange-500" />
              <span>{durationMin} phút</span>
            </span>

            {currentLesson?.QuizExits && (
              <span
                style={{ borderRadius: "9999px" }}
                className="text-[10px] font-black text-amber-700 bg-amber-100/80 border border-amber-200/80 px-2.5 py-0.5 flex items-center gap-1"
              >
                <Sparkles size={10} className="text-amber-600" />
                <span>Có Quiz ôn tập</span>
              </span>
            )}
          </div>

          <h1 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug truncate">
            {currentLesson?.title || currentLesson?.content || "Bài học"}
          </h1>
        </div>

        {/* Right: Modern Pill Navigation Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {currentLesson?.QuizExits && (
            <button
              onClick={() => navigate(`/quizz/lession/${currentLesson._id}`)}
              style={{
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                boxShadow: "0 4px 12px rgba(249, 115, 22, 0.25)",
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black text-white hover:brightness-105 active:scale-95 transition-all cursor-pointer select-none"
            >
              <PenTool size={12} />
              <span>Làm Quiz</span>
            </button>
          )}

          {/* Prev / Next Pill Button Group */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onPrevLesson}
              disabled={!hasPrev}
              style={{ borderRadius: "9999px" }}
              className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 select-none ${
                hasPrev
                  ? "bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-600 border border-slate-200/80 shadow-2xs cursor-pointer active:scale-95"
                  : "bg-slate-100/60 text-slate-300 border border-slate-200/40 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline">Bài trước</span>
            </button>

            <span className="text-[11px] font-black text-slate-500 px-1 select-none">
              {Number(currentIndex ?? 0) + 1}/{totalLessons || 1}
            </span>

            <button
              onClick={onNextLesson}
              disabled={!hasNext}
              style={{ borderRadius: "9999px" }}
              className={`px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1 select-none ${
                hasNext
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs hover:brightness-105 active:scale-95 cursor-pointer"
                  : "bg-slate-100/60 text-slate-300 border border-slate-200/40 cursor-not-allowed"
              }`}
            >
              <span className="hidden sm:inline">Bài tiếp</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Cinematic Video Canvas (Mặc định full-width 16:9) ── */}
      <div
        style={{
          borderRadius: "14px",
          boxShadow:
            "0 12px 30px -8px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.95)",
        }}
        className="relative overflow-hidden bg-slate-950 aspect-video w-full flex items-center justify-center shrink-0 group border border-slate-800/80"
      >
        <video
          ref={videoRef}
          key={currentLesson?._id}
          controls
          className="w-full h-full object-contain bg-black"
          onLoadedMetadata={() => {
            if (process && videoRef?.current) {
              videoRef.current.currentTime = process.lastPosition || 0;
            }
          }}
          onPlay={onplay}
          onPause={onpause}
        >
          <source src={currentLesson?.videoUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ phát thẻ video.
        </video>
      </div>

      {/* ── 3. Interactive Tabs: Capsule Pills Navigation ── */}
      <div className="flex-1 flex flex-col min-h-0 space-y-2 pt-0.5 overflow-hidden">
        {/* Modern Pill Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200/70 pb-1.5 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            style={{ borderRadius: "9999px" }}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs"
                : "bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/70"
            }`}
          >
            <BookOpen size={13} />
            <span>Tổng quan bài học</span>
          </button>

          <button
            onClick={() => setActiveTab("resources")}
            style={{ borderRadius: "9999px" }}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              activeTab === "resources"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs"
                : "bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/70"
            }`}
          >
            <FileText size={13} />
            <span>Tài liệu đính kèm</span>
            <span
              style={{ borderRadius: "9999px" }}
              className={`px-1.5 py-0.2 text-[10px] font-black ${
                activeTab === "resources"
                  ? "bg-white/30 text-white"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {resourceList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("ai_tutor")}
            style={{ borderRadius: "9999px" }}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              activeTab === "ai_tutor"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs"
                : "bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/70"
            }`}
          >
            <Bot
              size={13}
              className={
                activeTab === "ai_tutor" ? "text-white" : "text-orange-500"
              }
            />
            <span>Hỏi đáp AI Trợ giảng</span>
            <span
              style={{ borderRadius: "9999px" }}
              className="text-[9px] font-black bg-orange-100 text-orange-700 px-1.5 py-0.2 uppercase"
            >
              Mới
            </span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 overflow-y-auto pr-1 pb-1 custom-scrollbar">
          {/* ── TAB 1: OVERVIEW ── */}
          {activeTab === "overview" && (
            <div
              style={{ borderRadius: "16px" }}
              className="p-3 bg-white/75 border border-slate-200/70 space-y-1.5 shadow-2xs"
            >
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Lightbulb size={13} className="text-orange-500" />
                <span>Mục tiêu & Hướng dẫn bài giảng</span>
              </h4>
              {currentLesson?.content ? (
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {currentLesson.content}
                </p>
              ) : (
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  Bài giảng này tập trung vào kiến thức thực hành trên video.
                  Đừng quên ghi chú lại các ý chính và tải tài liệu đính kèm để
                  ôn luyện hiệu quả nhất nhé!
                </p>
              )}

              <div className="pt-1.5 flex flex-wrap gap-2 text-[10px] text-slate-500 font-semibold border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-500" /> Tự
                  động lưu tiến độ học
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-500" /> Hỗ trợ
                  xem trên mọi thiết bị
                </span>
              </div>
            </div>
          )}

          {/* ── TAB 2: RESOURCES ── */}
          {activeTab === "resources" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-0.5">
              {resourceList.map((src, index) => {
                const isZip =
                  src?.type?.toUpperCase() === "ZIP" ||
                  src?.title?.toLowerCase().includes("code") ||
                  index === 1;

                return (
                  <div
                    key={src.id || index}
                    style={{ borderRadius: "14px" }}
                    className="flex items-center justify-between p-2.5 bg-white/80 border border-slate-200/70 shadow-2xs hover:border-orange-300 hover:shadow-xs transition-all group"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <div
                        style={{ borderRadius: "10px" }}
                        className={`w-8 h-8 flex items-center justify-center shrink-0 shadow-2xs ${
                          isZip
                            ? "bg-amber-100 text-amber-600"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {isZip ? (
                          <FileArchive size={14} />
                        ) : (
                          <FileText size={14} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h5 className="font-bold text-xs text-slate-900 truncate leading-snug group-hover:text-orange-600 transition-colors">
                          {src?.title || "Tài liệu học tập"}
                        </h5>
                        <p className="text-[9px] font-semibold text-slate-400 mt-0.5">
                          {isZip
                            ? "Mã nguồn bài tập & Thực hành"
                            : "Tài liệu PDF tóm tắt"}
                        </p>
                      </div>
                    </div>

                    <a
                      href={src?.url || "#"}
                      download
                      className="shrink-0"
                      title="Tải tệp"
                    >
                      <button
                        type="button"
                        style={{
                          borderRadius: "9999px",
                          background:
                            "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                        }}
                        className="w-7 h-7 flex items-center justify-center text-white shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Download size={12} strokeWidth={2.5} />
                      </button>
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── TAB 3: AI TUTOR SUGGESTIONS (GỢI Ý HỎI ĐÁP BÀI HỌC) ── */}
          {activeTab === "ai_tutor" && (
            <div
              style={{ borderRadius: "16px" }}
              className="p-3 bg-gradient-to-br from-orange-50/70 to-amber-50/40 border border-orange-200/80 space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    style={{ borderRadius: "9999px" }}
                    className="w-6 h-6 bg-orange-500 text-white flex items-center justify-center shadow-xs"
                  >
                    <Bot size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">
                      Nexora AI Tutor — Trợ giảng thông minh 24/7
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Hỏi bất kỳ điều gì về bài giảng này, AI sẽ giải thích dựa
                      trên nội dung video.
                    </p>
                  </div>
                </div>

                <span
                  style={{ borderRadius: "9999px" }}
                  className="px-2 py-0.5 text-[9px] font-extrabold bg-orange-100 text-orange-700 border border-orange-200"
                >
                  Còn 15/15 lượt
                </span>
              </div>

              {/* Sample Prompt Chips */}
              <div className="space-y-1 pt-0.5">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "💡 Tóm tắt 3 ý chính video",
                    "⏱️ Giải thích đoạn video đang xem",
                    "❓ Đố tôi 1 câu hỏi ôn tập",
                    "💻 Cho ví dụ thực tế về bài này",
                  ].map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      style={{ borderRadius: "9999px" }}
                      className="px-2.5 py-1 bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 text-[11px] font-semibold border border-orange-200/70 hover:border-orange-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Error Display ── */}
      {errorlession && (
        <div
          style={{ borderRadius: "14px" }}
          className="flex items-center gap-2 p-3 bg-rose-50 text-rose-600 font-bold text-xs shrink-0 border border-rose-200"
        >
          <AlertCircle size={16} /> {errorlession}
        </div>
      )}
    </div>
  );
};

export default LessionForm;
