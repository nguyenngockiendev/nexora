import { Eye, Lightbulb, CheckCircle2, XCircle } from "lucide-react";

const OPTION_PREFIXES = ["A", "B", "C", "D"];

const FocusExamQuestionCard = ({
  question,
  totalQuestions = 60,
  userAnswer,
  isRevealed = false,
  onSelectOption,
  onToggleReveal,
}) => {
  if (!question) {
    return (
      <div className="focus-question-card text-center py-12 text-slate-400">
        Không có câu hỏi nào trong mục này.
      </div>
    );
  }

  const isAnswered = userAnswer !== undefined && userAnswer !== null;
  const showFeedback = isAnswered || isRevealed;
  const correctList = Array.isArray(question.correctAnswers)
    ? question.correctAnswers
    : [question.correctAnswer ?? 0];

  return (
    <div className="focus-question-card">
      {/* Top Meta Tags */}
      <div className="flex items-center gap-2 mb-2">
        <span className="focus-meta-tag">
          CÂU HỎI SỐ {question.number || 1} / {totalQuestions}
        </span>
        <span className="focus-meta-tag">
          SỐ ĐÁP ÁN CẦN CHỌN: {correctList.length || 1}
        </span>
      </div>

      {/* Nội dung câu hỏi */}
      <h2 className="focus-question-text">
        {question.questionText || question.question}
      </h2>

      {/* Danh sách các phương án lựa chọn */}
      <div className="flex flex-col">
        {question.options?.map((optText, optIdx) => {
          const isSelected = userAnswer === optIdx;
          const isCorrectOption =
            optIdx === question.correctAnswer || correctList.includes(optIdx);

          let rowClass = "";
          let badgeContent = null;

          if (showFeedback) {
            if (isCorrectOption) {
              rowClass = "is-correct";
              badgeContent = (
                <span className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                  <CheckCircle2 size={16} />
                  Đáp án đúng
                </span>
              );
            } else if (isSelected) {
              rowClass = "is-wrong";
              badgeContent = (
                <span className="flex items-center gap-1 text-rose-600 font-bold text-sm">
                  <XCircle size={16} />
                  Bạn chọn sai
                </span>
              );
            }
          }

          return (
            <div
              key={optIdx}
              onClick={() => onSelectOption?.(optIdx)}
              className={`focus-option-row ${rowClass}`}
            >
              <span>
                <strong className="mr-2 text-slate-800">
                  {OPTION_PREFIXES[optIdx]}.
                </strong>
                {optText}
              </span>
              {badgeContent}
            </div>
          );
        })}
      </div>

      {/* Nút Xem đáp án & Mẹo nhớ dành cho người học thuộc */}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={onToggleReveal}
          className={`focus-btn-reveal ${isRevealed ? "is-active" : ""}`}
          title="Bấm hoặc gõ phím Space để xem đáp án"
        >
          <Eye size={16} />
          <span>{isRevealed ? "Đang hiện đáp án & Mẹo nhớ" : "Xem Đáp Án & Mẹo Nhớ"}</span>
        </button>
      </div>

      {/* Khối giải thích / Mẹo nhớ hiển thị khi học sinh đã chọn hoặc bấm nút mắt */}
      {showFeedback && (
        <div className="focus-explanation-box">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-1">
            <Lightbulb size={17} className="text-amber-500 fill-amber-500" />
            <span>Mẹo ghi nhớ nhanh:</span>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-0">
            {question.explanation ||
              "Nắm vững các định nghĩa và phạm trù cốt lõi trong giáo trình để chọn nhanh đáp án chính xác."}
          </p>
        </div>
      )}
    </div>
  );
};

export default FocusExamQuestionCard;
