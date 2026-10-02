import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Play,
  Lock,
  ArrowLeft,
  Loader2,
  Clock,
  Search,
  BookOpen,
  Trophy,
  Filter,
  Eye,
  CheckCircle2,
  Circle,
  X,
} from "lucide-react";

const SidebarLesson = ({
  loading,
  error,
  title = [],
  currentLesson,
  setCurrentLesson,
  allProcess = [],
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'uncompleted' | 'completed'

  // Format duration into clean "MM:SS"
  const formatDuration = (val) => {
    if (!val) return "10:00";
    if (typeof val === "string" && val.includes(":")) {
      return val.replace(" min", "");
    }
    const num = parseFloat(val);
    if (isNaN(num)) return "10:00";
    const mins = Math.floor(num / 60);
    const secs = Math.floor(num % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const completedCount =
    title?.filter((t) =>
      allProcess?.some((p) => p.lessonId === t._id && p.completed),
    ).length || 0;
  const percent = title?.length
    ? Math.round((completedCount / title.length) * 100)
    : 0;

  // Filter lessons by search query AND status
  const filteredLessons = title?.filter((item) => {
    const matchesSearch = (item?.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    const isDone = allProcess?.some(
      (p) => p.lessonId === item._id && p.completed,
    );
    if (filterMode === "completed") return isDone;
    if (filterMode === "uncompleted") return !isDone;
    return true;
  });

  return (
    <div
      style={{ height: "100%", maxHeight: "100%" }}
      className="flex flex-col h-full max-h-full min-h-0 w-full p-3 sm:p-3.5 relative overflow-hidden bg-white/70 backdrop-blur-3xl"
    >
      {/* ── 1. Top Bar: Back Button & Total Badge ── */}
      <div className="shrink-0 mb-2.5 flex items-center justify-between gap-2">
        <button
          onClick={() => navigate("/student")}
          style={{ borderRadius: "9999px" }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-orange-50 hover:text-orange-600 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer select-none"
        >
          <ArrowLeft size={13} className="text-orange-500" />
          <span>Khóa học của tôi</span>
        </button>

        <span
          style={{ borderRadius: "9999px" }}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-black text-orange-700 bg-orange-100/80 border border-orange-200/80 select-none"
        >
          <BookOpen size={12} className="text-orange-600" />
          <span>{title?.length || 0} bài</span>
        </span>
      </div>

      {/* ── 2. Progress Overview Mini-Card ── */}
      <div
        style={{ borderRadius: "12px" }}
        className="shrink-0 mb-2.5 p-3 bg-gradient-to-br from-white/90 to-orange-50/40 border border-slate-200/80 shadow-2xs space-y-2"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-black text-slate-800 tracking-tight">
            <Trophy size={14} className="text-orange-500" />
            <span>Tiến độ khóa học</span>
          </div>
          <span className="font-black text-orange-600">
            {completedCount}/{title?.length || 0} ({percent}%)
          </span>
        </div>

        {/* Gradient Progress Bar */}
        <div className="w-full bg-slate-100/90 rounded-full h-2 overflow-hidden p-[1px]">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${percent}%`, borderRadius: "9999px" }}
          />
        </div>

        {/* Quick Search with Clear button */}
        <div className="relative pt-0.5">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm nhanh bài học..."
            style={{ borderRadius: "9999px" }}
            className="w-full h-8 pl-8 pr-7 text-xs font-semibold text-slate-800 bg-white border border-slate-200/80 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Quick Filter Capsule Chips */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {[
            { id: "all", label: `Tất cả (${title.length})` },
            { id: "uncompleted", label: `Chưa học (${title.length - completedCount})` },
            { id: "completed", label: `Đã học (${completedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterMode(tab.id)}
              style={{ borderRadius: "9999px" }}
              className={`px-2 py-0.5 text-[10px] font-bold transition-all cursor-pointer border select-none ${
                filterMode === tab.id
                  ? "bg-orange-500 text-white border-orange-600 shadow-2xs scale-[1.02]"
                  : "bg-white/80 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Loading State ── */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-8 text-orange-500 font-bold text-xs">
          <Loader2 className="animate-spin" size={16} /> Đang tải bài học...
        </div>
      )}

      {/* ── Error State ── */}
      {error && (
        <div
          style={{ borderRadius: "14px" }}
          className="p-2.5 bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs mb-2"
        >
          {error}
        </div>
      )}

      {/* ── 3. High-End Playlist with Visible Sleek Scrollbar ── */}
      <div className="flex-1 min-h-0 w-full pr-1.5 pb-2 space-y-1.5 overflow-y-auto custom-scrollbar">
        {filteredLessons?.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-400 italic">
            Không tìm thấy bài học nào phù hợp.
          </div>
        )}

        {filteredLessons?.map((titl, index) => {
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
              style={{
                borderRadius: "12px",
                boxShadow: isActive
                  ? "0 8px 20px -4px rgba(249, 115, 22, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
                  : "0 1px 3px rgba(0, 0, 0, 0.02)",
              }}
              className={`group relative flex items-center justify-between gap-2.5 px-3 py-2 transition-all duration-200 cursor-pointer border select-none ${
                isActive
                  ? "bg-gradient-to-r from-orange-500/[0.12] via-amber-500/[0.06] to-white/90 border-orange-500/90 scale-[1.01]"
                  : isCompleted
                  ? "bg-white/80 hover:bg-white border-slate-200/60 hover:border-emerald-300 text-slate-700 hover:shadow-xs"
                  : "bg-white/70 hover:bg-white border-slate-200/60 hover:border-orange-300 text-slate-700 hover:shadow-xs"
              }`}
            >
              {/* Left Indicator + Title */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="shrink-0">
                  {isActive ? (
                    <div
                      style={{ borderRadius: "9999px" }}
                      className="w-7 h-7 bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-xs"
                    >
                      {/* Animated audio equalizer effect */}
                      <div className="flex items-center gap-[2px] h-3">
                        <span className="w-[2px] bg-white rounded-full animate-bounce h-2" style={{ animationDuration: "0.6s" }} />
                        <span className="w-[2px] bg-white rounded-full animate-bounce h-3" style={{ animationDuration: "0.8s" }} />
                        <span className="w-[2px] bg-white rounded-full animate-bounce h-1.5" style={{ animationDuration: "0.5s" }} />
                      </div>
                    </div>
                  ) : isCompleted ? (
                    <div
                      style={{ borderRadius: "9999px" }}
                      className="w-7 h-7 bg-emerald-500 text-white flex items-center justify-center shadow-xs"
                    >
                      <Check size={13} strokeWidth={3} />
                    </div>
                  ) : (
                    <div
                      style={{ borderRadius: "9999px" }}
                      className="w-7 h-7 bg-slate-100 text-slate-600 font-black text-[10px] flex items-center justify-center group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors border border-slate-200/50"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  )}
                </div>

                {/* Title & Metadata */}
                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-xs leading-snug line-clamp-2 transition-colors ${
                      isActive
                        ? "text-orange-950 font-black"
                        : "text-slate-800 font-semibold group-hover:text-orange-600"
                    }`}
                  >
                    {titl?.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[10px] font-medium text-slate-400">
                    <span
                      style={{ borderRadius: "9999px" }}
                      className="px-2 py-0.2 bg-slate-100/90 text-slate-600 font-bold flex items-center gap-1 border border-slate-200/50"
                    >
                      <Clock size={10} className="text-slate-400" />
                      <span>{durationStr}</span>
                    </span>

                    {titl?.isPreview && !isCompleted && (
                      <span
                        style={{ borderRadius: "9999px" }}
                        className="px-2 py-0.2 bg-orange-100 text-orange-700 font-black text-[9px] flex items-center gap-1 border border-orange-200/70"
                      >
                        <Eye size={10} />
                        <span>Học thử</span>
                      </span>
                    )}

                    {isCompleted && (
                      <span
                        style={{ borderRadius: "9999px" }}
                        className="px-2 py-0.2 bg-emerald-50 text-emerald-700 font-black text-[9px] flex items-center gap-1 border border-emerald-200/70"
                      >
                        <CheckCircle2 size={10} />
                        <span>Đã học</span>
                      </span>
                    )}

                    {isActive && (
                      <span
                        style={{ borderRadius: "9999px" }}
                        className="px-2 py-0.2 bg-orange-500 text-white font-black text-[9px] uppercase tracking-wider shadow-2xs"
                      >
                        Đang phát
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Lock Icon */}
              {titl?.isLocked && !isActive && !isCompleted && (
                <div
                  style={{ borderRadius: "9999px" }}
                  className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 ml-1 text-slate-400"
                >
                  <Lock size={11} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 4. Footer Mini Info ── */}
      <div className="shrink-0 pt-2 border-t border-slate-200/60 text-center text-[10px] font-bold text-slate-400 flex items-center justify-between">
        <span>Hiển thị: {filteredLessons?.length || 0} bài</span>
        <span className="text-orange-500">Cuộn để xem tiếp ↓</span>
      </div>
    </div>
  );
};

export default SidebarLesson;
