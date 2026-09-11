import { Modal, Button, Badge } from "react-bootstrap";
import "../style/CreateExamPage.css";

const QuizExamPreviewModal = ({ show, onHide, quiz }) => {
  if (!quiz) return null;

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
        <div>
          <Badge
            pill
            bg="warning"
            text="dark"
            className="px-2.5 py-1 mb-1 fw-bold"
            style={{ fontSize: "0.75rem" }}
          >
            Nội dung đề thi
          </Badge>
          <Modal.Title
            className="fw-bold text-dark fs-5 mb-0"
            style={{ color: "#1e293b" }}
          >
            {quiz.title}
          </Modal.Title>
          <div
            className="text-muted small mt-0.5"
            style={{ fontSize: "0.8rem" }}
          >
            ⏱️ {quiz.duration} phút • 📝 {questions.length} câu hỏi • Điểm đạt:{" "}
            <strong>{quiz.passScore} / 10</strong>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body
        className="p-4 d-flex flex-column gap-3"
        style={{ backgroundColor: "#ffffff", background: "#ffffff" }}
      >
        {questions.map((q, qIndex) => (
          <div
            key={q._id || qIndex}
            className="p-3 rounded-3 border"
            style={{ background: "#f8fafc", backgroundColor: "#f8fafc" }}
          >
            <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
              <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>
                Câu {qIndex + 1}: {q.questionText || q.question}
              </span>
              <Badge
                bg="secondary"
                className="bg-secondary-subtle text-dark border px-2 py-1"
                style={{ fontSize: "0.75rem" }}
              >
                1 Điểm
              </Badge>
            </div>

            <div className="d-flex flex-column gap-1.5 mt-2">
              {(q.options || []).map((opt, optIndex) => {
                const isCorrect = q.correctAnswer === optIndex;
                const optionLabel = String.fromCharCode(65 + optIndex); // A, B, C, D

                return (
                  <div
                    key={optIndex}
                    className={`p-2 rounded-2 border small d-flex justify-content-between align-items-center ${
                      isCorrect
                        ? "border-success bg-success-subtle text-success fw-bold"
                        : "bg-white text-slate-700"
                    }`}
                    style={{
                      backgroundColor: isCorrect ? "#dcfce7" : "#ffffff",
                    }}
                  >
                    <span>
                      {optionLabel}. {opt}
                    </span>
                    {isCorrect && (
                      <span className="badge bg-success text-white py-1 px-2 rounded-pill">
                        ✓ Đáp án đúng
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-4 text-muted small">
            Đề thi này chưa có câu hỏi nào.
          </div>
        )}
      </Modal.Body>

      <Modal.Footer
        className="border-top"
        style={{ backgroundColor: "#f8fafc", background: "#f8fafc" }}
      >
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

export default QuizExamPreviewModal;
