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
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #f97316, #fb923c)",
            borderRadius: "9999px",
          }}
        >
          <ArrowLeft size={14} /> Khóa học của tôi
        </button>
      </div>

      {/* ── 2. Course Title & Syllabus Header with Progress Bar ── */}
      <div className="shrink-0 mb-3 space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 leading-tight tracking-tight">
            Nội dung khóa học
          </h2>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
            {title?.length || 0} BÀI HỌC
          </span>
        </div>

        {title && title.length > 0 && (
          <div className="pt-1">
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
              <span>Tiến độ học tập</span>
              <span className="text-orange-600 font-extrabold">
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
          <Loader2 className="animate-spin" size={18} /> Đang tải bài học...
        </div>
      )}

      {/* ── Error State ── */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-600 font-bold text-[11px] mb-3">
          {error}
        </div>
      )}

      {/* ── Scrollable list with custom sleek scrollbar ── */}
      <div className="flex-1 overflow-y-auto pr-1 pb-2 space-y-2 custom-scrollbar">
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
              className={`group relative flex items-start gap-2.5 p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-white shadow-md shadow-orange-500/25 scale-[1.01]"
                  : "bg-white/80 border border-white/90 hover:bg-white hover:border-orange-200/80 hover:shadow-xs"
              }`}
              style={{
                borderRadius: "0.85rem",
                background: isActive
                  ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                  : undefined,
              }}
            >
              {/* Left Indicator */}
              <div className="shrink-0 mt-0.5">
                {isActive ? (
                  <div className="w-5 h-5 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-xs">
                    <Play size={10} className="fill-orange-600 ml-0.5" />
                  </div>
                ) : isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <Check size={12} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 font-bold text-[10px] flex items-center justify-center group-hover:border-orange-300 group-hover:text-orange-500 transition-colors">
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Title & Info: NO MORE TRUNCATE CUTTING OFF AFTER 2 WORDS */}
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-xs font-bold leading-snug line-clamp-2 ${
                    isActive
                      ? "text-white font-extrabold"
                      : "text-slate-800 group-hover:text-orange-600 transition-colors"
                  }`}
                >
                  {index + 1}. {titl?.title}
                </h4>

                <div className="flex items-center gap-2 mt-1 text-[10px] font-semibold">
                  <span
                    className={
                      isActive
                        ? "text-white/90"
                        : isCompleted
                          ? "text-emerald-600 font-bold"
                          : "text-slate-400"
                    }
                  >
                    {isCompleted
                      ? "Đã học"
                      : isActive
                        ? "Đang học"
                        : titl?.isPreview
                          ? "Học thử"
                          : "Tiếp theo"}
                  </span>

                  <span className={isActive ? "text-white/60" : "text-slate-300"}>•</span>

                  <span
                    className={`flex items-center gap-1 ${
                      isActive ? "text-white/85" : "text-slate-400"
                    }`}
                  >
                    <Clock size={10} />
                    {durationStr}
                  </span>

                  {titl?.isLocked && !isActive && !isCompleted && (
                    <Lock size={11} className="text-slate-400 ml-auto" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarLesson;
