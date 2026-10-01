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
        <div className="text-center p-6 md:p-8 bg-white/60 backdrop-blur-3xl rounded-[2rem] border border-white shadow-xl max-w-sm">
          <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <BookOpen size={28} />
          </div>
          <h4 className="text-lg font-black text-slate-800 mb-1.5">
            Chưa chọn bài học
          </h4>
          <p className="text-slate-500 text-xs font-semibold">
            Vui lòng chọn một bài học từ danh sách bên phải để bắt đầu học tập.
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
        ];

  return (
    <div className="flex flex-col gap-3 w-full h-full justify-start overflow-hidden">
      {/* ── 1. Top Header: Title, Breadcrumb & Navigation Buttons ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 pb-3 border-b border-slate-200/70">
        <div className="min-w-0 pr-2 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100/90 px-2.5 py-0.5 rounded-full">
              BÀI {Number(currentIndex ?? 0) + 1} / {totalLessons || 1}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Clock size={12} />
              {currentLesson?.duration ? `${Math.floor(currentLesson.duration / 60)} phút` : "15 phút"}
            </span>
          </div>
          <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight leading-snug truncate">
            {currentLesson?.title || currentLesson?.content || "Bài học"}
          </h1>
        </div>

        {/* Top Right Action Controls: Quiz + Prev/Next Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {currentLesson?.QuizExits && (
            <button
              onClick={() => navigate(`/quizz/lession/${currentLesson._id}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200/80 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PenTool size={12} />
              Làm Quiz
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
            <button
              onClick={onPrevLesson}
              disabled={!hasPrev}
              title="Bài trước"
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                hasPrev
                  ? "hover:bg-white text-slate-700 hover:text-orange-600 shadow-2xs cursor-pointer"
                  : "text-slate-300 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[11px] font-bold text-slate-500 px-1 select-none">
              {Number(currentIndex ?? 0) + 1}/{totalLessons || 1}
            </span>
            <button
              onClick={onNextLesson}
              disabled={!hasNext}
              title="Bài tiếp theo"
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                hasNext
                  ? "hover:bg-white text-slate-700 hover:text-orange-600 shadow-2xs cursor-pointer"
                  : "text-slate-300 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Cinematic Video Player (Full-Width, Tỉ lệ 16:9 lấp đầy cột giữa) ── */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-800/80 aspect-video w-full flex items-center justify-center group shrink-0">
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

      {/* ── 3. Interactive Tabs Section (Thiết kế phẳng, không lồng hộp thừa) ── */}
      <div className="flex-1 flex flex-col min-h-0 space-y-2.5 pt-1 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-bold pb-2 shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 pb-2 transition-all cursor-pointer relative ${
              activeTab === "overview"
                ? "text-orange-600 font-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-orange-500 after:rounded-full"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <BookOpen size={14} /> Tổng quan bài học
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`flex items-center gap-1.5 pb-2 transition-all cursor-pointer relative ${
              activeTab === "resources"
                ? "text-orange-600 font-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-orange-500 after:rounded-full"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <FileText size={14} /> Tài liệu đính kèm
            <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.2 rounded-full font-black ml-0.5">
              {resourceList.length}
            </span>
          </button>
        </div>

        {/* Tab Content: Typography thanh lịch, không đóng khung viền lủng củng */}
        <div className="flex-1 overflow-y-auto pr-1 pb-1 custom-scrollbar">
          {activeTab === "overview" && (
            <div className="space-y-1.5 py-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Mục tiêu & Hướng dẫn bài giảng
              </h4>
              {currentLesson?.content ? (
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                  {currentLesson.content}
                </p>
              ) : (
                <p className="text-xs sm:text-[13px] text-slate-400 italic leading-relaxed">
                  Bài giảng này tập trung vào kiến thức thực hành trên video. Đừng quên ghi chú lại các ý chính và tải tài liệu ở tab bên cạnh để ôn luyện nhé!
                </p>
              )}
            </div>
          )}

          {activeTab === "resources" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
              {resourceList.map((src, index) => {
                const isZip =
                  src?.type?.toUpperCase() === "ZIP" ||
                  src?.title?.toLowerCase().includes("code") ||
                  index === 1;

                return (
                  <div
                    key={src.id || index}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-2xs hover:border-orange-300 hover:shadow-xs transition-all group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-2xs shrink-0 ${
                          isZip
                            ? "bg-amber-100/80 text-amber-600"
                            : "bg-rose-100/80 text-rose-600"
                        }`}
                      >
                        {isZip ? <FileArchive size={16} /> : <FileText size={16} />}
                      </div>

                      <div className="min-w-0">
                        <h5 className="font-bold text-xs text-slate-900 truncate leading-snug group-hover:text-orange-600 transition-colors">
                          {src?.title || "Tài liệu học tập"}
                        </h5>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                          {isZip ? "Mã nguồn bài tập & Thực hành" : "Tài liệu ôn tập (PDF)"}
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
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, #f97316, #fb923c)",
                        }}
                      >
                        <Download size={14} strokeWidth={2.5} />
                      </button>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Error Display ── */}
      {errorlession && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 font-bold text-xs shrink-0">
          <AlertCircle size={16} /> {errorlession}
        </div>
      )}
    </div>
  );
};

export default LessionForm;
