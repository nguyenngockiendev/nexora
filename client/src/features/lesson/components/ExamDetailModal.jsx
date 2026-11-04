import { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { Search } from "lucide-react";

const ExamDetailModal = ({ show, onHide, title, questions = [], isFocus = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const letterLabels = ["A", "B", "C", "D"];

  const filteredQuestions = (questions || []).filter((q) =>
    (q.question || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      className="exam-detail-modal"
    >
      <Modal.Header closeButton>
        <div>
          <Modal.Title className="fw-bold text-slate-800 fs-5 mb-1">
            {title || "Chi Tiết Đề Thi"}
          </Modal.Title>
          <div className="d-flex align-items-center gap-2">
            <Badge bg="warning" text="dark" className="rounded-pill px-3 py-1">
              Tổng cộng {questions.length} câu hỏi
            </Badge>
            {isFocus && (
              <Badge bg="danger" className="rounded-pill px-3 py-1">
                Bộ đề trọng tâm ôn thi
              </Badge>
            )}
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ maxHeight: "75vh", overflowY: "auto" }}>
        <div className="mb-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3">
              <Search size={18} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0 rounded-end-pill py-2 shadow-none"
              placeholder="🔍 Tìm nhanh nội dung câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center p-5 text-muted bg-light rounded-3">
            Không tìm thấy câu hỏi nào phù hợp với từ khóa!
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filteredQuestions.map((q, idx) => {
              const selectedOpt = Array.isArray(q.correctAnswer)
                ? q.correctAnswer[0]
                : q.correctAnswer;

              return (
                <div
                  key={idx}
                  className="p-3 rounded-3 border bg-white shadow-sm"
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-dark rounded-pill px-3 py-1">
                      Câu {idx + 1}
                    </span>
                    {isFocus && q.repeatCount !== undefined && q.repeatCount > 1 && (
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1 fw-bold">
                        🔥 Xuất hiện trong {q.repeatCount} đề thi
                      </span>
                    )}
                  </div>

                  <p className="fw-semibold text-slate-800 mb-3 fs-6">
                    {q.question}
                  </p>

                  <div className="row g-2 mb-3">
                    {(q.options || []).map((opt, optIdx) => {
                      const isCorrect = selectedOpt === optIdx;
                      return (
                        <div key={optIdx} className="col-12 col-md-6">
                          <div
                            className={`p-2 rounded-3 border d-flex align-items-center gap-2 ${
                              isCorrect
                                ? "bg-success-subtle border-success text-success fw-bold"
                                : "bg-light border-light-subtle text-slate-700"
                            }`}
                          >
                            <span
                              className={`badge rounded-circle ${
                                isCorrect
                                  ? "bg-success text-white"
                                  : "bg-secondary text-white"
                              }`}
                              style={{ width: "24px", height: "24px", lineHeight: "16px" }}
                            >
                              {letterLabels[optIdx]}
                            </span>
                            <span className="small">{opt}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="p-2 bg-light rounded-2 border-start border-warning border-3">
                      <div className="text-muted small fw-semibold">
                        💡 Giải thích:
                      </div>
                      <div className="small text-slate-700 mt-1">
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-top-0">
        <Button
          variant="secondary"
          className="rounded-pill px-4"
          onClick={onHide}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExamDetailModal;
