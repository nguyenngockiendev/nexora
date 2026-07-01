import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  Send,
  Sparkles,
  XCircle,
} from "lucide-react";

const OPTION_LABELS = ["A", "B", "C", "D"];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const PageShell = ({ children }) => (
  <div className="take-quiz-page">
    <div className="take-quiz-page__mesh" />
    <div className="take-quiz-page__orb1" />
    <div className="take-quiz-page__orb2" />
    <div className="take-quiz-page__inner">{children}</div>
  </div>
);

const TakeQuizForm = ({
  quiz,
  currentIndex,
  setCurrentIndex,
  answers,
  onSelectAnswer,
  onSubmit,
  onRetry,
  submitted,
  result,
  timeLeft,
}) => {
  const currentQuestion = quiz?.questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === quiz?.questions.length - 1;
  const isTimeUp = timeLeft <= 0;
   
  const handleSubmitClick = () => {
    const unanswered = quiz?.questions.length - answeredCount;

    if (!submitted && unanswered > 0) {
      const confirmSubmit = window.confirm(
        `Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc muốn nộp bài?`,
      );
      if (!confirmSubmit) return;
    }

    onSubmit();
  };

  if (submitted && result) {
    return (
      <PageShell>
        <header className="tq-header">
          <div>
            <span className="tq-badge">
              <Sparkles size={12} />
              {quiz?.courseId?.title}
            </span>
            <h1 className="tq-title">Kết quả bài kiểm tra</h1>
            <p className="tq-desc">{quiz?.title}</p>
          </div>
          <button type="button" className="tq-btn-ghost" onClick={onRetry}>
            <RotateCcw size={16} />
            Làm lại
          </button>
        </header>

        <div className="tq-card tq-result-card">
          <div className="tq-card__body" style={{ padding: "40px 28px" }}>
            <div
              className={`tq-result-icon ${result.passed ? "is-pass" : "is-fail"}`}
            >
              {result.passed ? (
                <CheckCircle2 size={36} />
              ) : (
                <XCircle size={36} />
              )}
            </div>

            <h2 className="tq-result-score">{result.score}%</h2>
            <p className="tq-result-label">
              {result.correct}/{result.total} câu đúng
            </p>

            <span
              className={`tq-status-pill ${result.passed ? "is-pass" : "is-fail"}`}
            >
              {result.passed
                ? `Đạt — yêu cầu ${quiz.passScore}%`
                : `Chưa đạt — yêu cầu ${quiz.passScore}%`}
            </span>

            {isTimeUp && (
              <p className="tq-result-note">
                Bài làm đã được nộp tự động vì hết thời gian.
              </p>
            )}
          </div>
        </div>

        <h3 className="tq-section-title">Xem lại đáp án</h3>

        <div className="tq-review-list">
          {quiz?.questions?.map((q, qIndex) => {
            const selected = answers[qIndex];
            const isCorrect = selected === q.correctAnswer;

            return (
              <div key={qIndex} className="tq-card">
                <div className="tq-card__body">
                  <div className="tq-review-head">
                    <p className="tq-review-q">
                      <span className="tq-review-num">Câu {qIndex + 1}.</span>{" "}
                      {q.question}
                    </p>
                    <span
                      className={`tq-review-badge ${isCorrect ? "is-correct" : "is-wrong"}`}
                    >
                      {isCorrect ? "Đúng" : "Sai"}
                    </span>
                  </div>

                  <div className="tq-options">
                    {q.options.map((option, oIndex) => {
                      const isSelected = selected === oIndex;
                      const isCorrectOption = q.correctAnswer === oIndex;

                      return (
                        <div
                          key={oIndex}
                          className={`tq-option review ${
                            isSelected ? "is-selected" : ""
                          } ${isCorrectOption ? "is-correct" : ""}`}
                        >
                          <span className="tq-option__key">
                            {OPTION_LABELS[oIndex]}
                          </span>
                          <span>{option}</span>
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <p className="tq-explanation">
                      <strong>Giải thích:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <header className="tq-header">
        <div>
          <span className="tq-badge">
            <Sparkles size={12} />
            {/* {quiz.courseTitle} */}
          </span>
          <h1 className="tq-title">{quiz?.title}</h1>
          <p className="tq-desc">
            {quiz?.lessonTitle} · {quiz?.description}
          </p>
        </div>

        <div className="tq-meta">
          <div className={`tq-timer ${timeLeft <= 60 ? "is-urgent" : ""}`}>
            <Clock size={17} />
            {formatTime(timeLeft)}
          </div>
          <span className="tq-pill">
            {answeredCount}/{quiz?.questions.length} đã trả lời
          </span>
        </div>
      </header>

      <div className="tq-layout">
        <aside className="tq-card">
          <div className="tq-card__head">
            <h2 className="tq-card__title">Danh sách câu</h2>
            <span className="tq-pill">{quiz?.questions.length}</span>
          </div>
          <div className="tq-card__body">
            <div className="tq-nav-list">
              {quiz?.questions.map((q,index) => {
                const isActive = index === currentIndex;
                const isDone = answers[q._id] !== undefined;

                return (
                  <button
                    key={q._id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`tq-nav-item ${isActive ? "is-active" : ""} ${
                      isDone ? "is-done" : ""
                    }`}
                  >
                    <span className="tq-nav-item__dot">
                      {isDone ? "✓" : index + 1}
                    </span>
                    <span className="tq-nav-item__label">Câu {index + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="tq-card tq-card--main">
          <div className="tq-card__head">
            <div>
              <h2 className="tq-card__title">Câu {currentIndex + 1}</h2>
              <p className="tq-card__sub">
                {currentIndex + 1} / {quiz?.questions.length}
              </p>
            </div>
          </div>

          <div className="tq-card__body">
            <p className="tq-question">{currentQuestion?.question}</p>

            <div className="tq-options">
              {currentQuestion?.options?.map((option, index) => {
                const isSelected = answers[currentQuestion._id] === index;

                return (
                  <button
                    key={index}
                    type="button"
                    className={`tq-option ${isSelected ? "is-selected" : ""}`}
                    onClick={() => onSelectAnswer(currentQuestion._id, index)}
                  >
                    <span className="tq-option__key">
                      {OPTION_LABELS[index]}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="tq-actions">
              <button
                type="button"
                className="tq-btn-ghost"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
              >
                <ArrowLeft size={16} />
                Câu trước
              </button>

              {!isLastQuestion ? (
                <button
                  type="button"
                  className="tq-btn-primary"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                  Câu tiếp
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="tq-btn-primary"
                  onClick={handleSubmitClick}
                >
                  <Send size={16} />
                  Nộp bài
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default TakeQuizForm;
