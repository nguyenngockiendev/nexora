import { Settings, Flame } from "lucide-react";

/**
 * FocusExamTopBar - Thanh điều hướng & dải tiến độ 60 câu
 */
const FocusExamTopBar = ({
  currentNumber = 14,
  totalQuestions = 60,
  questions = [],
  answers = {},
  currentIndex = 0,
  onSelectQuestion,
  filterMode = "all",
  setFilterMode,
  title = "Bộ Đề Trọng Tâm: MLN122 (60 câu hay ra nhất)",
}) => {
  // Thống kê đúng / sai / chưa làm
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  questions.forEach((q) => {
    const userAns = answers[q._id];
    if (userAns === undefined || userAns === null) {
      unansweredCount++;
    } else if (userAns === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  return (
    <header className="focus-exam-header">
      {/* Hàng 1: Badge câu hỏi hiện tại + Title + Thống kê + Bộ lọc */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Vòng tròn số câu hiện tại */}
          <div className="focus-current-badge">{currentNumber}</div>

          {/* Tiêu đề bộ đề trọng tâm */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 font-bold text-sm">
            <Flame size={16} className="text-orange-500 fill-orange-500" />
            <span>{title}</span>
          </div>
        </div>

        {/* Cụm thống kê & bộ lọc góc phải */}
        <div className="flex items-center gap-2">
          {/* Chips trạng thái */}
          <div className="flex items-center gap-2 mr-2">
            <span className="focus-stat-chip bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Đúng ({correctCount})
            </span>
            <span className="focus-stat-chip bg-rose-50 text-rose-700 border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Sai ({wrongCount})
            </span>
            <span className="focus-stat-chip bg-slate-100 text-slate-700 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              Chưa làm ({unansweredCount})
            </span>
          </div>

          {/* Dropdown lọc câu hỏi */}
          <select
            value={filterMode}
            onChange={(e) => setFilterMode?.(e.target.value)}
            className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm cursor-pointer hover:border-orange-300 focus:outline-none"
          >
            <option value="all">Tất cả {totalQuestions} câu</option>
            <option value="wrong">Chỉ câu sai ({wrongCount})</option>
            <option value="unanswered">Chỉ câu chưa làm ({unansweredCount})</option>
          </select>

          {/* Nút cài đặt nhỏ */}
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 shadow-sm transition"
            title="Tùy chọn"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>

      {/* Hàng 2: Dải hạt tiến độ 60 câu (Dot Ribbon) */}
      <div className="flex items-center gap-2">
        <div className="focus-dots-track flex-1">
          {questions.map((q, idx) => {
            const userAns = answers[q._id];
            const isAnswered = userAns !== undefined && userAns !== null;
            const isCorrect = isAnswered && userAns === q.correctAnswer;
            const isWrong = isAnswered && userAns !== q.correctAnswer;
            const isCurrent = idx === currentIndex;

            let stateClass = "is-unanswered";
            if (isCurrent) stateClass = "is-current";
            else if (isCorrect) stateClass = "is-correct";
            else if (isWrong) stateClass = "is-wrong";

            return (
              <div
                key={q._id || idx}
                onClick={() => onSelectQuestion?.(idx)}
                className={`focus-dot ${stateClass}`}
                title={`Câu ${idx + 1}: ${isCurrent ? "Đang chọn" : isCorrect ? "Đã đúng" : isWrong ? "Đang sai" : "Chưa làm"}`}
              />
            );
          })}
        </div>

        <span className="text-xs font-bold text-slate-500 shrink-0 ml-1">
          {totalQuestions} câu
        </span>
      </div>
    </header>
  );
};

export default FocusExamTopBar;
