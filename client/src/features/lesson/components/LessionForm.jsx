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
    <div className="flex flex-col gap-4 w-full h-full justify-start">
      {/* ── 1. Top Header: Title & Info ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 pb-3 border-b border-slate-200/60">
        <div className="min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-md">
              Bài {Number(currentIndex ?? 0) + 1} / {totalLessons || 1}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
              <Clock size={11} />
              {currentLesson?.duration ? `${Math.floor(currentLesson.duration / 60)} phút` : "15 phút"}
            </span>
          </div>
          <h1 className="text-base md:text-xl font-black text-slate-900 tracking-tight leading-snug">
            {currentLesson?.title || currentLesson?.content || "Bài học"}
          </h1>
        </div>

        {/* Action Button: Làm Quiz nếu có bài kiểm tra */}
        {currentLesson?.QuizExits && (
          <button
            onClick={() => navigate(`/quizz/lession/${currentLesson._id}`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200/80 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <PenTool size={13} />
            Làm bài Quiz
          </button>
        )}
      </div>

      {/* ── 2. Cinematic Video Player (16:9 Rạp Chiếu Phim) ── */}
      <div className="relative rounded-[1.6rem] overflow-hidden bg-slate-950 shadow-xl border border-slate-800/80 aspect-video w-full flex items-center justify-center group shrink-0">
        <video
          ref={videoRef}
          key={currentLesson?._id}
          controls
          className="w-full h-full object-contain"
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

      {/* ── 3. Navigation Action Bar (Dưới Video: Next/Prev) ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/80 border border-white/90 shadow-xs shrink-0">
        {/* Next / Prev Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevLesson}
            disabled={!hasPrev}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              hasPrev
                ? "bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 cursor-pointer shadow-xs"
                : "bg-slate-100/60 text-slate-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={14} /> Bài trước
          </button>

          <button
            onClick={onNextLesson}
            disabled={!hasNext}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              hasNext
                ? "text-white shadow-md shadow-orange-500/25 hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            style={
              hasNext
                ? { background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }
                : undefined
            }
          >
            Bài tiếp theo <ChevronRight size={14} />
          </button>
        </div>

        {/* Status / Quiz on the right */}
        {currentLesson?.QuizExits && (
          <button
            onClick={() => navigate(`/quizz/lession/${currentLesson._id}`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-orange-600 bg-orange-100/70 hover:bg-orange-200/70 border border-orange-300/40 shadow-xs transition-all cursor-pointer"
          >
            <PenTool size={13} />
            Làm bài Quiz
          </button>
        )}
      </div>

      {/* ── 4. Interactive Tabs Section (Tổng quan & Tài liệu) ── */}
      <div className="flex-1 flex flex-col space-y-3 pt-1">
        {/* Tab Headers */}
        <div className="flex items-center gap-6 border-b border-slate-200/70 text-xs font-bold pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 pb-2 transition-all cursor-pointer ${
              activeTab === "overview"
                ? "text-orange-600 border-b-2 border-orange-500 font-extrabold"
                : "text-slate-400 hover:text-slate-700 border-b-2 border-transparent"
            }`}
          >
            <BookOpen size={14} /> Tổng quan bài học
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`flex items-center gap-1.5 pb-2 transition-all cursor-pointer ${
              activeTab === "resources"
                ? "text-orange-600 border-b-2 border-orange-500 font-extrabold"
                : "text-slate-400 hover:text-slate-700 border-b-2 border-transparent"
            }`}
          >
            <FileText size={14} /> Tài liệu đính kèm
            <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.2 rounded-full font-black ml-0.5">
              {resourceList.length}
            </span>
          </button>
        </div>

        {/* Tab Content 1: Overview */}
        {activeTab === "overview" && (
          <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-xs space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Mục tiêu & Hướng dẫn bài giảng
            </h4>
            {currentLesson?.content ? (
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {currentLesson.content}
              </p>
            ) : (
              <p className="text-xs text-slate-500 italic leading-relaxed">
                Bài giảng này tập trung vào kiến thức thực hành trên video. Đừng quên ghi chú lại các ý chính và tải tài liệu ở tab bên cạnh để ôn luyện nhé!
              </p>
            )}
          </div>
        )}

        {/* Tab Content 2: Resources Grid */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resourceList.map((src, index) => {
              const isZip =
                src?.type?.toUpperCase() === "ZIP" ||
                src?.title?.toLowerCase().includes("code") ||
                index === 1;

              return (
                <div
                  key={src.id || index}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-xs hover:border-orange-200/80 hover:shadow-sm transition-all group"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0 ${
                        isZip
                          ? "bg-amber-100 text-amber-600"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {isZip ? <FileArchive size={18} /> : <FileText size={18} />}
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
                        borderRadius: "0.65rem",
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
