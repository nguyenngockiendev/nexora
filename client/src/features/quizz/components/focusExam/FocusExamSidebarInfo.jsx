import { useState } from "react";
import { BookOpen, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

/**
 * FocusExamSidebarInfo - Cột thông tin đề thi & Bàn phím chọn nhanh
 */
const FocusExamSidebarInfo = ({
  sources = ["SU26 FE (Chính thức)", "FA25 RE", "SP26"],
  repeatCount = 3,
  explanation = "",
  onSelectKey,
  currentSelectedKey,
  correctAnswer,
  isRevealed = false,
}) => {
  const [sourcesOpen, setSourcesOpen] = useState(true);
  const [tipOpen, setTipOpen] = useState(true);

  const keys = [
    { label: "A", keyNumber: 1, idx: 0 },
    { label: "B", keyNumber: 2, idx: 1 },
    { label: "C", keyNumber: 3, idx: 2 },
    { label: "D", keyNumber: 4, idx: 3 },
  ];

  return (
    <aside className="flex flex-col">
      {/* Box 1: Thông tin câu hỏi */}
      <div className="focus-sidebar-card">
        <div className="flex items-center justify-between mb-3">
          <span className="font-extrabold text-slate-800 text-sm">
            Thông tin câu hỏi
          </span>
          <span className="text-xs text-slate-400 font-semibold cursor-pointer hover:text-slate-600">
            Thu gọn ›
          </span>
        </div>

        {/* Accordion 1: Xuất hiện trong bao nhiêu đề */}
        <div className="mb-2.5">
          <button
            type="button"
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-orange-500" />
              <span>Đã xuất hiện trong ({repeatCount || sources.length} đề thi)</span>
            </div>
            {sourcesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {sourcesOpen && (
            <div className="mt-2 flex flex-wrap gap-1.5 p-2 rounded-xl bg-white border border-slate-100">
              {sources && sources.length > 0 ? (
                sources.map((src, i) => {
                  const label = typeof src === "object" ? src.title : src;
                  return (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-orange-50/70 border border-orange-200/60 text-orange-800 text-[11px] font-bold"
                    >
                      ✓ {label}
                    </span>
                  );
                })
              ) : (
                <span className="text-xs text-slate-400">
                  Tổng hợp từ kho đề thi của khóa học
                </span>
              )}
            </div>
          )}
        </div>

        {/* Accordion 2: Mẹo ghi nhớ */}
        <div>
          <button
            type="button"
            onClick={() => setTipOpen(!tipOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            <div className="flex items-center gap-1.5">
              <Lightbulb size={14} className="text-amber-500" />
              <span>Mẹo ghi nhớ</span>
            </div>
            {tipOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {tipOpen && (
            <div className="mt-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-slate-700 text-xs leading-relaxed">
              {explanation ||
                "Học sinh chú ý các từ khóa chính trong câu hỏi để loại suy nhanh các phương án nhiễu."}
            </div>
          )}
        </div>
      </div>

      {/* Box 2: Bàn phím chọn nhanh (Keypad) */}
      <div className="focus-sidebar-card">
        <span className="font-extrabold text-slate-800 text-sm block mb-1">
          Bàn phím chọn nhanh
        </span>
        <span className="text-[11px] text-slate-500 block mb-2">
          Click hoặc gõ phím số 1-4 trên bàn phím:
        </span>

        <div className="focus-keypad-grid">
          {keys.map((k) => {
            const isSelected = currentSelectedKey === k.idx;
            const isCorrect = isRevealed && k.idx === correctAnswer;

            let extraClass = "";
            if (isCorrect) {
              extraClass = "is-active-correct";
            } else if (isSelected) {
              extraClass = "border-orange-400 bg-orange-50 text-orange-700";
            }

            return (
              <button
                key={k.idx}
                type="button"
                onClick={() => onSelectKey?.(k.idx)}
                className={`focus-keypad-btn ${extraClass}`}
                title={`Chọn ${k.label} (Phím ${k.keyNumber})`}
              >
                <small>{k.keyNumber}</small>
                <span>{k.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FocusExamSidebarInfo;
