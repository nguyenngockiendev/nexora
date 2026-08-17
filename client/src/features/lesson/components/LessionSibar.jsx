import { useNavigate } from "react-router-dom";
import { Check, Play, Lock, ArrowLeft, Loader2 } from "lucide-react";

const SidebarLesson = ({
  loading,
  error,
  title = [],
  currentLesson,
  setCurrentLesson,
  id,
  role,
  exits,
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

  return (
    <div className="flex flex-col h-full w-full p-4 relative overflow-hidden">
      <div className="shrink-0 mb-3">
        <button
          onClick={() => navigate("/student")}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
          style={{
            background: "linear-gradient(135deg, #f97316, #fb923c)",
            borderRadius: "9999px",
          }}
        >
          <ArrowLeft size={14} /> Back to Courses
        </button>
      </div>

      {/* ── 2. Course Title & Syllabus Header (Thu nhỏ phông chữ) ── */}
      <div className="shrink-0 mb-3 space-y-0.5">
        <h2 className="text-base md:text-lg font-black text-slate-900 leading-tight tracking-tight">
          Course Lessons
        </h2>
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          SYLLABUS • {title?.length || 0} LESSONS
        </p>
      </div>

      {/* ── Loading State ── */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-6 text-orange-500 font-bold text-xs">
          <Loader2 className="animate-spin" size={18} /> Loading...
        </div>
      )}

      {/* ── Error State ── */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-600 font-bold text-[11px] mb-3">
          {error}
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto pr-1 pb-2 space-y-1.5 custom-scrollbar"
        style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}
      >
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
              className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-white shadow-md shadow-orange-500/20 scale-[1.01]"
                  : "bg-white/80 border border-white/90 hover:bg-white hover:shadow-xs"
              }`}
              style={{
                borderRadius: "0.85rem",
                background: isActive
                  ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                  : undefined,
              }}
            >
              {/* Left Side: Status Icon + Title */}
              <div className="flex items-center gap-2.5 min-w-0 pr-1.5">
                {/* Status Indicator Icon (Thu nhỏ h-6 w-6) */}
                <div className="shrink-0">
                  {isActive ? (
                    <div className="w-5 h-5 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-xs">
                      <Play size={10} className="fill-orange-600 ml-0.5" />
                    </div>
                  ) : isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 text-slate-300 flex items-center justify-center group-hover:border-orange-400 group-hover:text-orange-400 transition-colors">
                      <Check size={10} strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                {/* Lesson Title & Subtitle */}
                <div className="min-w-0">
                  <h4
                    className={`text-xs font-extrabold truncate leading-tight ${
                      isActive
                        ? "text-white"
                        : "text-slate-800 group-hover:text-orange-600 transition-colors"
                    }`}
                  >
                    {index + 1}. {titl?.title}
                  </h4>
                  <p
                    className={`text-[10px] font-semibold mt-0.5 ${
                      isActive
                        ? "text-white/85"
                        : isCompleted
                          ? "text-emerald-600"
                          : "text-slate-400"
                    }`}
                  >
                    {isCompleted
                      ? "Completed"
                      : isActive
                        ? "In Progress"
                        : titl?.isPreview
                          ? "Free Preview"
                          : "Upcoming"}
                  </p>
                </div>
              </div>

              {/* Right Side: Duration + Lock Icon */}
              <div
                className={`flex items-center gap-1.5 text-[10px] font-bold shrink-0 ${
                  isActive ? "text-white/90" : "text-slate-400"
                }`}
              >
                <span>{durationStr}</span>
                <Lock
                  size={12}
                  className={
                    isActive
                      ? "text-white/80"
                      : titl?.isPreview || isCompleted
                        ? "text-emerald-500 opacity-0 group-hover:opacity-100"
                        : "text-slate-300"
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarLesson;
