import {
  Download,
  BookOpen,
  AlertCircle,
  FileText,
  FileArchive,
} from "lucide-react";

const LessionForm = ({
  currentLesson,
  errorlession,
  videoRef,
  onplay,
  onpause,
  process,
}) => {
  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh] p-4">
        <div className="text-center p-6 md:p-8 bg-white/60 backdrop-blur-3xl rounded-[2rem] border border-white shadow-xl max-w-sm">
          <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <BookOpen size={28} />
          </div>
          <h4 className="text-lg font-black text-slate-800 mb-1.5">
            No Lesson Selected
          </h4>
          <p className="text-slate-500 text-xs font-semibold">
            Vui lòng chọn một bài học từ danh sách bên trái để bắt đầu học tập.
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
            title: `${currentLesson?.title || "Lesson"} Cheat Sheet`,
            type: "PDF",
            url: "#",
          },
        ];

  return (
    <div className="flex flex-col gap-3.5 w-full h-full max-h-full overflow-hidden justify-between">
      {/* ── 1. Top Header: Title & Take Quiz Button (Thu gọn vừa vặn) ── */}
      <div className="flex flex-row justify-between items-center gap-3 shrink-0">
        <div className="min-w-0 pr-2">
          <h1 className="text-base md:text-lg font-black text-slate-900 tracking-tight truncate">
            Current Lesson:{" "}
            <span className="text-slate-800 font-extrabold">
              {currentLesson?.title || currentLesson?.content || "Lesson Title"}
            </span>
          </h1>
        </div>

        {/* Action Buttons */}
      </div>

      {/* ── 2. Cinematic Video Player Container (Tăng 10% - Width 90% mx-auto) ── */}
      <div className="relative rounded-[1.8rem] overflow-hidden bg-slate-900 shadow-xl border border-slate-800/80 aspect-video w-[90%] mx-auto flex items-center justify-center group">
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

      <div className="shrink-0 space-y-2 pt-1">
        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
          Lesson Resources
        </h3>

        {/* Resources 2-Column Compact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {resourceList.map((src, index) => {
            const isZip =
              src?.type?.toUpperCase() === "ZIP" ||
              src?.title?.toLowerCase().includes("code") ||
              index === 1;

            return (
              <div
                key={src.id || index}
                className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/80 backdrop-blur-xl border border-white shadow-xs hover:shadow-sm transition-all group"
                style={{ borderRadius: "0.85rem" }}
              >
                {/* File Icon & Label */}
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="relative shrink-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs ${
                        isZip
                          ? "bg-amber-100/80 text-amber-600"
                          : "bg-rose-100/80 text-rose-600"
                      }`}
                    >
                      {isZip ? (
                        <FileArchive size={16} />
                      ) : (
                        <FileText size={16} />
                      )}
                    </div>

                    {/* Small File Type Badge */}
                    <span
                      className={`absolute -bottom-1 -left-1 px-1 py-0 rounded text-[8px] font-black uppercase text-white shadow-xs ${
                        isZip ? "bg-amber-600" : "bg-rose-600"
                      }`}
                      style={{ borderRadius: "3px" }}
                    >
                      {isZip ? "ZIP" : "PDF"}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 truncate leading-tight group-hover:text-orange-600 transition-colors">
                      {src?.title || "Resource File"}
                    </h5>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                      {isZip ? "Exercises & Solutions" : "Cheat Sheet & Docs"}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <a
                  href={src?.url || "#"}
                  download
                  className="shrink-0"
                  title="Download File"
                >
                  <button
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs hover:scale-105 active:scale-95 transition-all"
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
