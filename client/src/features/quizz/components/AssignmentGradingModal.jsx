import { useState, useEffect } from "react";
import { Modal, Button, Badge, Form } from "react-bootstrap";
import "../style/CreateExamPage.css";

const AssignmentGradingModal = ({
  show,
  onHide,
  submission,
  assignment,
  onSaveGrade,
}) => {
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (submission) {
      setScore(
        submission.score !== null && submission.score !== undefined
          ? submission.score
          : ""
      );
      setFeedback(submission.feedback || "");
    }
  }, [submission]);

  if (!submission) return null;

  const student = submission.student || {};
  const isLate =
    assignment?.deadline && submission.submittedAt
      ? new Date(submission.submittedAt) > new Date(assignment.deadline)
      : false;

  const handleQuickScore = (val) => {
    setScore(val);
  };

  const handleAddQuickComment = (text) => {
    setFeedback((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (score === "" || isNaN(score) || Number(score) < 0 || Number(score) > 10) {
      alert("Vui lòng nhập điểm hợp lệ từ 0 đến 10!");
      return;
    }

    try {
      setSaving(true);
      await onSaveGrade(submission, Number(score), feedback);
      onHide();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
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
            Đánh giá & Chấm điểm bài nộp
          </Badge>
          <Modal.Title
            className="fw-bold text-dark fs-5 mb-0"
            style={{ color: "#1e293b" }}
          >
            Chấm bài cho học viên: {student.name || "Học viên"}
          </Modal.Title>
          <div
            className="text-muted small mt-0.5"
            style={{ fontSize: "0.8rem" }}
          >
            {student.email} • Bài tập: <strong>{assignment?.title || "Bài tập"}</strong>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body
        className="p-4 d-flex flex-column gap-3"
        style={{ backgroundColor: "#ffffff", background: "#ffffff" }}
      >
        {/* SUBMISSION INFO & ATTACHED FILE */}
        <div
          className="p-3 rounded-3 border d-flex align-items-center justify-content-between"
          style={{ background: "#fff7ed", borderColor: "rgba(249, 115, 22, 0.25)" }}
        >
          <div className="d-flex align-items-center gap-3 min-w-0">
            <div
              className="rounded-circle bg-warning-subtle text-warning-emphasis fw-bold d-flex align-items-center justify-content-center shrink-0 fs-5"
              style={{ width: "42px", height: "42px" }}
            >
              📦
            </div>
            <div className="min-w-0">
              <div
                className="fw-bold text-dark text-truncate"
                style={{ fontSize: "0.875rem" }}
              >
                {submission.fileUrl
                  ? submission.fileUrl.split("/").pop()
                  : "File bài làm"}
              </div>
              <div
                className="text-muted small d-flex align-items-center gap-2 mt-0.5"
                style={{ fontSize: "0.75rem" }}
              >
                <span>
                  Nộp:{" "}
                  {submission.submittedAt
                    ? new Date(submission.submittedAt).toLocaleString("vi-VN")
                    : "Chưa rõ"}
                </span>
                <span>•</span>
                <span
                  className={`badge ${
                    isLate
                      ? "bg-danger-subtle text-danger border border-danger-subtle"
                      : "bg-success-subtle text-success border border-success-subtle"
                  }`}
                  style={{ fontSize: "0.6875rem" }}
                >
                  {isLate ? "⚠️ Nộp trễ" : "✓ Đúng hạn"}
                </span>
              </div>
            </div>
          </div>

          {submission.fileUrl ? (
            <a
              href={submission.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1.5 fw-bold text-xs shrink-0 ms-2 text-dark shadow-sm"
              style={{ fontSize: "0.8rem" }}
            >
              📥 Tải file bài làm
            </a>
          ) : (
            <span className="text-muted small">Không có file</span>
          )}
        </div>

        {/* GRADING FORM */}
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {/* SCORE INPUT */}
          <div>
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <Form.Label className="fw-bold text-dark small mb-0">
                Nhập Điểm Số (Thang điểm 10) <span className="text-danger">*</span>
              </Form.Label>
              <span className="text-muted small" style={{ fontSize: "0.75rem" }}>
                Chọn nhanh điểm:
              </span>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div style={{ width: "120px" }}>
                <Form.Control
                  type="number"
                  step="0.5"
                  min="0"
                  max="10"
                  placeholder="Ví dụ: 8.5"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="fw-bold text-center fs-6 rounded-3"
                  style={{ borderColor: "rgba(249, 115, 22, 0.4)" }}
                  required
                />
              </div>

              {/* QUICK SCORE PILLS */}
              {[5, 6.5, 7.5, 8, 8.5, 9, 10].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickScore(val)}
                  className={`btn btn-sm rounded-pill px-2.5 py-1 text-xs fw-bold ${
                    Number(score) === val
                      ? "btn-warning text-dark shadow-sm"
                      : "btn-light border"
                  }`}
                  style={{ fontSize: "0.75rem" }}
                >
                  {val.toFixed(val % 1 === 0 ? 0 : 1)}
                </button>
              ))}
            </div>
          </div>

          {/* FEEDBACK INPUT */}
          <div>
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <Form.Label className="fw-bold text-dark small mb-0">
                Lời Nhận Xét & Đánh Giá Của Giảng Viên
              </Form.Label>
              <span className="text-muted small" style={{ fontSize: "0.75rem" }}>
                Gợi ý nhanh:
              </span>
            </div>

            {/* QUICK COMMENTS */}
            <div className="d-flex align-items-center gap-1.5 mb-2 flex-wrap">
              {[
                "Code clean, cấu trúc thư mục chuẩn!",
                "Cần tối ưu thêm các câu query Mongoose.",
                "Bổ sung validate cho dữ liệu đầu vào.",
                "Làm rất tốt, hoàn thành trọn vẹn yêu cầu!",
              ].map((comment, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddQuickComment(comment)}
                  className="btn btn-sm btn-light border rounded-pill px-2 py-0.5 text-xs text-muted"
                  style={{ fontSize: "0.7rem" }}
                >
                  + {comment.slice(0, 24)}...
                </button>
              ))}
            </div>

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập nhận xét chi tiết để học viên biết điểm cần cải thiện..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="rounded-3 small"
              style={{ fontSize: "0.85rem" }}
            />
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer
        className="border-top"
        style={{ backgroundColor: "#f8fafc", background: "#f8fafc" }}
      >
        <Button
          variant="secondary"
          className="rounded-pill px-4 text-xs fw-bold"
          onClick={onHide}
          disabled={saving}
        >
          Hủy
        </Button>
        <Button
          variant="warning"
          className="rounded-pill px-4 text-xs fw-bold text-dark shadow-sm"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Đang lưu..." : "💾 Lưu Điểm & Feedback"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignmentGradingModal;
