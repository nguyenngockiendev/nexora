import { Badge, Button, Card, Dropdown } from "react-bootstrap";

const LessionTableLession = ({
  navigate,
  curriculum,
  courseId,
  handDelete,
  searchTerm,
  setSearchTerm,
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
                          item.status === "TRANSCRIPT_READY"
                            ? "text-success"
                            : item.status === "PROCESSING"
                              ? "text-warning"
                              : "text-muted"
                        }`}
                      >
                        {item.status === "TRANSCRIPT_READY"
                          ? "✓ Transcript Ready"
                          : item.status === "PROCESSING"
                            ? "⌛ Đang bóc tách ngầm..."
                            : "● Chờ xử lý"}
                      </small>
                    )}
                  </div>
                </div>

                {/* Right: Badge Type + Dropdown Menu ⋯ */}
                <div className="d-flex align-items-center gap-3">
                  <Badge
                    pill
                    bg={item.type === "Quiz" ? "warning" : "primary"}
                    className="px-3 py-1 fw-semibold"
                  >
                    {item.type}
                  </Badge>

                  <Dropdown align="end">
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
                      <Dropdown.Item>👁️ Xem trước</Dropdown.Item>
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
    </div>
  );
};
export default LessionTableLession;
