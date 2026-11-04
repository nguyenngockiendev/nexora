import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * FocusExamBottomNav - Thanh điều hướng chuyển câu & phím tắt cố định
 */
const FocusExamBottomNav = ({
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  isLast = false,
}) => {
  return (
    <footer className="focus-bottom-nav">
      {/* Nút Câu trước */}
      <button
        type="button"
        onClick={onPrev}
        disabled={!hasPrev}
        className={`px-5 py-2 rounded-full font-bold text-sm border flex items-center gap-1.5 transition ${
          hasPrev
            ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
        }`}
      >
        <ArrowLeft size={16} />
        <span>Câu trước</span>
      </button>

      {/* Dòng hướng dẫn phím tắt tiện ích */}
      <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500">
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">
          ←
        </kbd>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">
          →
        </kbd>
        <span>để chuyển câu</span>
        <span className="text-slate-300">|</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">
          1-4
        </kbd>
        <span>hoặc</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">
          A-D
        </kbd>
        <span>chọn đáp án</span>
        <span className="text-slate-300">|</span>
        <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">
          Space
        </kbd>
        <span>xem đáp án</span>
      </div>

      {/* Nút Câu tiếp theo */}
      <button
        type="button"
        onClick={onNext}
        className="focus-btn-next flex items-center gap-1.5"
      >
        <span>{isLast ? "Hoàn thành ôn tập" : "Câu tiếp theo"}</span>
        <ArrowRight size={16} />
      </button>
    </footer>
  );
};

export default FocusExamBottomNav;
