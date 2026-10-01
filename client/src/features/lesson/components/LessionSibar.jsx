import { useNavigate } from "react-router-dom";
import { Check, Play, Lock, ArrowLeft, Loader2, Clock } from "lucide-react";

const SidebarLesson = ({
  loading,
  error,
  title = [],
  currentLesson,
  setCurrentLesson,
  allProcess = [],
}) => {
  const navigate = useNavigate();

  // Format duration into clean "MM:SS min"
  const formatDuration = (val) => {
    if (!val) return "10:00 min";
    if (typeof val === "string" && val.includes(":")) {
      return val.includes("min") ? val : `${val} min`;
    }
    const num = parseFloat(val);
    if (isNaN(num)) return "10:00 min";
    const mins = Math.floor(num / 60);
    const secs = Math.floor(num % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")} min`;
  };

  const completedCount =
    title?.filter((t) =>
      allProcess?.some((p) => p.lessonId === t._id && p.completed),
    ).length || 0;
  const percent = title?.length
    ? Math.round((completedCount / title.length) * 100)
    : 0;

  return (
    <div className="flex flex-col h-full w-full p-4 relative overflow-hidden">
      {/* ── 1. Back button ── */}
      <div className="shrink-0 mb-3">
        <button
          onClick={() => navigate("/student")}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #f97316, #fb923c)",
            borderRadius: "9999px",
          }}
        >
          <ArrowLeft size={13} /> Khóa học của tôi
        </button>
      </div>

      {/* ── 2. Course Title & Syllabus Header with Progress Bar ── */}
      <div className="shrink-0 mb-3 space-y-1.5 pb-3 border-b border-slate-200/70">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 leading-tight tracking-tight">
            Nội dung khóa học
          </h2>
          <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100/80 px-2.5 py-0.5 rounded-full">
            {title?.length || 0} BÀI HỌC
          </span>
        </div>

        {title && title.length > 0 && (
          <div className="space-y-1 pt-0.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>Tiến độ hoàn thành</span>
              <span className="text-orange-600 font-extrabold text-[11px]">
                {completedCount}/{title.length} bài ({percent}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Loading State ── */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-6 text-orange-500 font-bold text-xs">
          <Loader2 className="animate-spin" size={16} /> Đang tải bài học...
        </div>
      )}

      {/* ── Error State ── */}
      {error && (
        <div className="p-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-[11px] mb-2">
          {error}
        </div>
      )}

      {/* ── Unified Modern Playlist (Sleek List View — Liền mạch, tự cuộn riêng) ── */}
      <div className="flex-1 overflow-y-auto pr-1 pb-2 space-y-1 custom-scrollbar">
        {title?.map((titl, index) => {
          const isActive = currentLesson?._id === titl?._id;
          const lessonProcess = allProcess?.find(
            (p) => p.lessonId === titl?._id,
          );
          const isCompleted = lessonProcess?.completed === true;
          const durationStr = formatDuration(titl?.duration);

          return (
            <div
              key={titl._id || index}
              onClick={() => setCurrentLesson(titl)}
              className={`group relative flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-orange-500/10 text-orange-950 font-bold border-l-4 border-orange-500 shadow-2xs"
                  : "hover:bg-slate-100/80 text-slate-700 border-l-4 border-transparent"
              }`}
            >
              {/* Left Indicator + Title */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="shrink-0">
                  {isActive ? (
                    <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
                      <Play size={10} className="fill-white ml-0.5" />
                    </div>
                  ) : isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check size={11} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 font-bold text-[10px] flex items-center justify-center group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                      {index + 1}
                    </div>
                  )}
                </div>

                {/* Title & Info */}
                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-xs leading-snug line-clamp-2 ${
                      isActive
                        ? "text-orange-950 font-black"
                        : "text-slate-800 font-semibold group-hover:text-orange-600 transition-colors"
                    }`}
                  >
                    {titl?.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 font-medium">
                    <span>{durationStr}</span>
                    {titl?.isPreview && !isCompleted && (
                      <span className="text-orange-600 font-bold">• Xem thử</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Lock Icon */}
              {titl?.isLocked && !isActive && !isCompleted && (
                <Lock size={12} className="text-slate-400 shrink-0 ml-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarLesson;
