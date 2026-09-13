import { Modal, Button, Badge } from "react-bootstrap";
import "../style/CreateExamPage.css";

const AssignmentDetailModal = ({ show, onHide, assignment }) => {
  if (!assignment) return null;

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
            Nội dung đề bài tập
          </Badge>
          <Modal.Title
            className="fw-bold text-dark fs-5 mb-0"
            style={{ color: "#1e293b" }}
          >
            {assignment.title}
          </Modal.Title>
          <div
            className="text-muted small mt-0.5"
            style={{ fontSize: "0.8rem" }}
          >
            ⏳ Hạn nộp:{" "}
            <strong>
              {assignment.deadline
                ? new Date(assignment.deadline).toLocaleString("vi-VN")
                : "Không giới hạn"}
            </strong>{" "}
            • Lớp: {assignment.className || "Lớp Trực Tuyến"}
          </div>
        </div>
      </Modal.Header>

      <Modal.Body
        className="p-4 d-flex flex-column gap-3"
        style={{ backgroundColor: "#ffffff", background: "#ffffff" }}
      >
        {/* DESCRIPTION / REQUIREMENTS */}
        <div className="p-3 rounded-3 bg-light border">
          <div
            className="fw-bold text-dark small text-uppercase mb-2"
            style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
          >
            Yêu cầu & Hướng dẫn làm bài:
          </div>
          <div
            className="text-dark small"
            style={{ fontSize: "0.875rem", whiteSpace: "pre-line", lineHeight: 1.6 }}
          >
            {assignment.description || "Chưa có mô tả chi tiết cho bài tập này."}
          </div>
        </div>

        {/* ATTACHED FILE FROM INSTRUCTOR */}
        {assignment.fileUrl ? (
          <div
            className="p-3 rounded-3 border d-flex align-items-center justify-content-between"
            style={{ background: "#fff7ed", borderColor: "rgba(249, 115, 22, 0.25)" }}
          >
            <div className="d-flex align-items-center gap-2.5 min-w-0">
              <span className="fs-4">📄</span>
              <div className="min-w-0">
                <div
                  className="fw-bold text-dark text-truncate"
                  style={{ fontSize: "0.85rem" }}
                >
                  {assignment.fileUrl.split("/").pop() || "File đề bài"}
                </div>
                <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
                  Tài liệu đính kèm từ Giảng viên
                </div>
              </div>
            </div>

            <a
              href={assignment.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1 fw-bold text-xs shrink-0 ms-2 text-dark"
              style={{ fontSize: "0.75rem" }}
            >
              📥 Tải đề bài
            </a>
          </div>
        ) : (
          <div className="text-center py-3 text-muted small bg-light rounded-3">
            Bài tập này không có file tài liệu đính kèm.
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

export default AssignmentDetailModal;
