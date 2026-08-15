import { Badge, Button, Card, Dropdown, Modal } from "react-bootstrap";

const LessionTableLession = ({
  navigate,
  curriculum,
  courseId,
  handDelete,
  searchTerm,
  setSearchTerm,
  process,
  handupdatetracrip,
  selectedLesson,
  handselectedLesson,
  onClose,
}) => {
  return (
    <div className="p-3 p-md-4 w-100">
      {/* Top Header Navigation */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="light"
            className="quiz-btn-back rounded-pill"
            type="button"
            onClick={() => navigate("/instructor/lessons")}
          >
            ← Back
          </Button>
          <div>
            <div className="text-muted small fw-semibold">
              Lessons › ReactJS cho người đi làm
            </div>
            <h1 className="quiz-page-title mb-0">ReactJS cho người đi làm</h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="light"
            className="quiz-btn-soft rounded-pill px-4 fw-semibold"
            type="button"
            onClick={() => navigate(`/create_lession/${courseId}`)}
          >
            + Thêm bài học
          </Button>
          <Button
            variant="primary"
            className="rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
            type="button"
            onClick={() => navigate("/create_quizz/lession")}
          >
            ✨ Tạo Quiz AI
          </Button>
        </div>
      </div>

      <Card className="quiz-card p-3">
        <Card.Header className="quiz-card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 pb-2">
          <Card.Title className="mb-0 fw-bold fs-5 text-slate-800">
            Curriculum List
          </Card.Title>
          <Badge pill bg="warning" text="dark" className="px-3 py-1">
            {curriculum.length} mục bài giảng
          </Badge>
        </Card.Header>

        <Card.Body className="p-2 d-flex flex-column gap-2">
          <div className="d-flex gap-2 mb-3 px-1">
            {/* Ô 1: Tìm kiếm theo tên bài học */}
            <input
              type="text"
              className="form-control rounded-pill px-3 py-2 border-0 bg-white shadow-sm flex-grow-1"
              placeholder="🔍 Tìm theo tên bài học..."
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Ô 2: Select chọn lọc theo Trạng thái */}
            <select
              className="form-select rounded-pill px-3 py-2 border-0 bg-white shadow-sm fw-semibold text-slate-700"
              style={{ width: "220px" }}
              value={searchTerm || "ALL"}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="">⚙️ Tất cả trạng thái</option>
              <option value="TRANSCRIPT_READY">✓ Transcript Ready</option>
              <option value="PROCESSING">⌛ Đang bóc tách ngầm...</option>
              <option value="PENDING">● Chờ xử lý</option>
            </select>
          </div>

          {curriculum.length === 0 ? (
            <div className="text-center p-4 text-muted bg-white rounded-3 border">
              🔍 Không tìm thấy bài học nào phù hợp với từ khóa!
            </div>
          ) : (
            curriculum.map((item, index) => (
              <div
                key={item._id}
                className="quiz-q-item p-3 d-flex align-items-center justify-content-between rounded-3 border bg-white shadow-sm transition-all"
                style={{ cursor: "pointer" }}
                onClick={() => handselectedLesson(item)}
              >
                {/* Left: Drag Handle + Title */}
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <span
                    className="text-muted fs-5 cursor-grab"
                    style={{ cursor: "grab" }}
                    title="Kéo thả đổi thứ tự"
                  >
                    {index + 1} ☰
                  </span>
                  <div>
                    <h6 className="mb-0 fw-bold text-slate-800 fs-6">
                      {item.title}
                    </h6>
                    {item.status && (
                      <small
                        className={`fw-semibold ${
                          item.status === "TRANSCRIPT_READY" ||
                          (process?.lessionId === item._id &&
                            process?.percent === 100)
                            ? "text-success"
                            : item.status === "PROCESSING"
                              ? "text-warning"
                              : "text-muted"
                        }`}
                      >
                        {item.status === "TRANSCRIPT_READY" ||
                        (process?.lessionId === item._id &&
                          process?.percent === 100)
                          ? "✓ Transcript Ready"
                          : item.status === "PROCESSING"
                            ? process?.lessionId === item._id &&
                              process?.percent !== undefined
                              ? `⌛ Đang bóc tách ${process.percent}%...`
                              : "⌛ Đang bóc tách ngầm..."
                            : "● Chờ xử lý"}
                      </small>
                    )}
                  </div>
                </div>
                {item.status === "PENDING" && (
                  <div>
                    <Button
                      variant="light"
                      onClick={() => handupdatetracrip(item._id)}
                      disabled={process}
                    >
                      ⚡ Auto Video Processing
                    </Button>
                  </div>
                )}

                {/* Right: Badge Type + Dropdown Menu ⋯ */}
                <div className="d-flex align-items-center gap-3">
                  <Badge
                    pill
                    bg={item.type === "Quiz" ? "warning" : "primary"}
                    className="px-3 py-1 fw-semibold"
                  >
                    {item.type}
                  </Badge>

                  <Dropdown align="end" onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Toggle
                      variant="light"
                      className="quiz-btn-soft rounded-circle p-1 px-2 border-0 no-caret"
                      id={`dropdown-${item._id}`}
                    >
                      ⋯
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="shadow-sm border-0 rounded-3">
                      <Dropdown.Item
                        onClick={() => navigate(`/update_lession/${item._id}`)}
                      >
                        ✏️ Chỉnh sửa bài
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handselectedLesson(item)}>
                        👁️ Xem trước
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => handDelete(item._id)}
                      >
                        🗑️ Xóa khỏi giáo trình
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ))
          )}
        </Card.Body>
      </Card>
      {selectedLesson && (
        <Modal
          show={!!selectedLesson}
          onHide={onClose}
          size="lg"
          centered
          contentClassName="border-0 rounded-4 shadow-lg overflow-hidden"
          style={{ backdropFilter: "blur(6px)" }}
        >
          <Modal.Header
            closeButton
            className="border-bottom-0 pb-2 pt-4 px-4 bg-white"
          >
            <Modal.Title className="fw-bold fs-5 text-slate-800 d-flex align-items-center gap-2">
              <span className="p-2 rounded-circle bg-warning bg-opacity-10 text-warning fs-6">
                👁️
              </span>
              <span>
                Xem trước bài học:{" "}
                <span className="text-primary">{selectedLesson.title}</span>
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-white">
            <div className="row g-4">
              {/* Cột Trái: Trình phát Video */}
              <div className="col-12 col-md-7">
                {selectedLesson.videoUrl ? (
                  <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm border border-light bg-black">
                    <video
                      controls
                      src={selectedLesson.videoUrl}
                      poster=""
                      className="w-100 h-100"
                    />
                  </div>
                ) : (
                  <div className="ratio ratio-16x9 rounded-3 d-flex flex-column align-items-center justify-content-center bg-light border text-muted">
                    <span className="fs-1 mb-2">🎥</span>
                    <span className="fw-semibold small">
                      Chưa có video cho bài học này!
                    </span>
                  </div>
                )}
              </div>
              {/* Cột Phải: Thông tin chi tiết */}
              <div className="col-12 col-md-5 d-flex flex-column gap-3">
                <div className="p-3 rounded-3 bg-light bg-opacity-50 border border-light">
                  <small className="text-muted fw-semibold d-block mb-1">
                    Trạng thái bài học:
                  </small>
                  <Badge
                    pill
                    bg={
                      selectedLesson.status === "TRANSCRIPT_READY"
                        ? "success"
                        : selectedLesson.status === "PROCESSING"
                          ? "warning"
                          : "secondary"
                    }
                    className="px-3 py-2 fw-semibold"
                  >
                    {selectedLesson.status === "TRANSCRIPT_READY"
                      ? "✓ Transcript Ready"
                      : selectedLesson.status === "PROCESSING"
                        ? "⌛ Đang bóc tách ngầm..."
                        : "● Chờ xử lý"}
                  </Badge>
                </div>

                <div className="p-3 rounded-3 bg-light bg-opacity-50 border border-light flex-grow-1">
                  <small className="text-muted fw-semibold d-block mb-1">
                    📝 Nội dung bài học:
                  </small>
                  <p className="small text-slate-700 mb-0 lh-base">
                    {selectedLesson.content ||
                      "Chưa có mô tả nội dung cho bài học này."}
                  </p>
                </div>

                {/* Tài liệu đính kèm (nếu có) */}
                {selectedLesson.resources &&
                  selectedLesson.resources.length > 0 && (
                    <div className="p-3 rounded-3 bg-light bg-opacity-50 border border-light">
                      <small className="text-muted fw-semibold d-block mb-2">
                        📎 Tài liệu đính kèm:
                      </small>
                      {selectedLesson.resources.map((res, i) => (
                        <div
                          key={i}
                          className="small d-flex align-items-center gap-2"
                        >
                          <span>📄</span>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none fw-semibold text-primary text-truncate"
                          >
                            {res.title || "Tải tài liệu đính kèm"}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-top-0 pt-0 pb-4 px-4 bg-white justify-content-end">
            <Button
              variant="light"
              className="quiz-btn-soft rounded-pill px-4 fw-semibold border-0"
              onClick={onClose}
            >
              Đóng xem trước
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
export default LessionTableLession;
