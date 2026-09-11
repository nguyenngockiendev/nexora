import { Modal, Button, Badge } from "react-bootstrap";
import "../style/CreateExamPage.css";

const QuizStudentSubmissionModal = ({
  show,
  onHide,
  submission,
  quiz,
  onAllowRetake,
}) => {
  if (!submission || !quiz) return null;

  const student = submission.student || {};
  const isPassed = submission.score >= (quiz.passScore ?? 5);
  const questions = quiz.questions || [];

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      scrollable
      centered
      className="quiz-modal"
      contentClassName="bg-white rounded-4 shadow-lg border-0"
      style={{ zIndex: 1060 }}
    >
      <Modal.Header
        closeButton
        className="border-bottom pb-3"
        style={{ backgroundColor: "#ffffff", background: "#ffffff" }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-orange-100 text-orange-700 font-bold d-flex align-items-center justify-content-center shrink-0"
            style={{ width: "42px", height: "42px", fontSize: "0.85rem" }}
          >
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className="w-100 h-100 rounded-circle object-fit-cover"
              />
            ) : (
              (student.name || "SV")
                .split(" ")
                .map((n) => n[0])
                .slice(-2)
                .join("")
                .toUpperCase()
            )}
          </div>
          <div>
            <Modal.Title className="fw-bold text-dark fs-5 mb-0">
              Bài Làm Của: {student.name || "Sinh viên"}
            </Modal.Title>
            <div
              className="text-muted small d-flex align-items-center gap-2 mt-0.5"
              style={{ fontSize: "0.8rem" }}
            >
              <span>{student.email}</span>
              <span>•</span>
              <span>
                Điểm:{" "}
                <strong className={isPassed ? "text-success" : "text-danger"}>
                  {submission.score} / 10
                </strong>
              </span>
              <span>•</span>
              <Badge
                pill
                bg={isPassed ? "success" : "danger"}
                className={isPassed ? "bg-success-subtle text-success border" : "bg-danger-subtle text-danger border"}
              >
                {isPassed ? "✓ Đạt (Passed)" : "✗ Chưa đạt (Failed)"}
              </Badge>
            </div>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body
        className="p-4 d-flex flex-column gap-3"
        style={{ backgroundColor: "#ffffff", background: "#ffffff" }}
      >
        {questions.map((q, qIndex) => {
          const studentAns = (submission.answers || []).find(
            (a) => String(a.questionId) === String(q._id),
          );
          const selectedOption = studentAns?.selectedAnswer;
          const isCorrect = studentAns?.isCorrect;

          return (
            <div
              key={q._id || qIndex}
              className={`p-3 rounded-3 border ${
                isCorrect
                  ? "bg-success-subtle/30 border-success-subtle"
                  : "bg-danger-subtle/30 border-danger-subtle"
              }`}
              style={{
                background: isCorrect ? "rgba(240, 253, 244, 0.6)" : "rgba(254, 242, 242, 0.6)",
              }}
            >
              <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>
                  Câu {qIndex + 1}: {q.questionText || q.question}
                </span>
                <Badge
                  pill
                  bg={isCorrect ? "success" : "danger"}
                  className="px-2.5 py-1 text-xs"
                >
                  {isCorrect ? "✓ Đúng (+1.0 đ)" : "✗ Sai (0 đ)"}
                </Badge>
              </div>

              <div className="d-flex flex-column gap-1.5 mt-2">
                {(q.options || []).map((opt, optIndex) => {
                  const isStudentChosen = selectedOption === optIndex;
                  const isCorrectOption = q.correctAnswer === optIndex;
                  const optionLabel = String.fromCharCode(65 + optIndex);

                  let bgClass = "bg-white text-slate-700";
                  let badgeText = null;

                  if (isStudentChosen && isCorrect) {
                    bgClass = "border-success bg-success-subtle text-success fw-bold";
                    badgeText = "✓ Sinh viên chọn (Đúng)";
                  } else if (isStudentChosen && !isCorrect) {
                    bgClass = "border-danger bg-danger-subtle text-danger fw-bold";
                    badgeText = "✗ Sinh viên chọn (Sai)";
                  } else if (isCorrectOption && !isCorrect) {
                    bgClass = "border-success bg-success-subtle text-success fw-bold";
                    badgeText = "✓ Đáp án đúng chuẩn";
                  }

                  return (
                    <div
                      key={optIndex}
                      className={`p-2 rounded-2 border small d-flex justify-content-between align-items-center ${bgClass}`}
                    >
                      <span>
                        {optionLabel}. {opt}
                      </span>
                      {badgeText && (
                        <span
                          className={`badge rounded-pill text-[11px] ${
                            isCorrectOption
                              ? "bg-success text-white"
                              : "bg-danger text-white"
                          }`}
                        >
                          {badgeText}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Modal.Body>

      <Modal.Footer
        className="border-top d-flex justify-content-between"
        style={{ backgroundColor: "#f8fafc", background: "#f8fafc" }}
      >
        <Button
          variant="warning"
          className="rounded-pill px-3 fw-bold text-dark text-xs d-flex align-items-center gap-1.5"
          onClick={() => {
            if (onAllowRetake) {
              onAllowRetake(submission);
            }
          }}
        >
          <span>🔄</span>
          <span>Cấp quyền thi lại cho sinh viên này</span>
        </Button>
        <Button
          variant="secondary"
          className="rounded-pill px-4 text-xs fw-bold"
          onClick={onHide}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizStudentSubmissionModal;
