import { Badge, Card, Form, InputGroup } from "react-bootstrap";

const InstructorQuizCourseListView = ({
  courses = [],
  loading = false,
  error = null,
  searchTerm = "",
  setSearchTerm,
  onSelectCourse,
  onBack,
  onRefresh,
}) => {
  return (
    <div className="p-3 p-md-4 w-100">
      {/* HEADER */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn quiz-btn-back rounded-pill px-3 py-1 text-xs"
            onClick={onBack}
          >
            ← Quay lại
          </button>
          <div>
            <div
              className="text-muted small fw-semibold"
              style={{ fontSize: "0.75rem" }}
            >
              Đánh giá › Chọn khóa học
            </div>
            <h1 className="quiz-page-title mb-0">Khóa Học Có Bài Kiểm Tra</h1>
            <p className="text-muted small mb-0" style={{ fontSize: "0.8rem" }}>
              Chọn khóa học để vào quản lý các bài kiểm tra trắc nghiệm theo bài học
            </p>
          </div>
        </div>

        <div>
          <Badge
            pill
            bg="warning"
            text="dark"
            className="px-3 py-2 fw-bold"
            style={{ fontSize: "0.75rem" }}
          >
            Khóa học Video (Tự học)
          </Badge>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-4" style={{ maxWidth: "420px" }}>
        <InputGroup className="quiz-input-group">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="quiz-input"
          />
        </InputGroup>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="alert alert-danger rounded-3 py-2 px-3 small mb-3 d-flex align-items-center justify-content-between">
          <span>⚠️ {error}</span>
          {onRefresh && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill"
              onClick={onRefresh}
            >
              Thử lại
            </button>
          )}
        </div>
      )}

      {/* LOADING STATE */}
      {loading ? (
        <div className="text-center py-5 text-muted small bg-white rounded-3 border">
          <div className="spinner-border spinner-border-sm text-warning me-2" role="status" />
          Đang tải danh sách khóa học...
        </div>
      ) : (
        /* COURSE LIST (MỖI COURSE LÀ 1 HÀNG) */
        <div className="d-flex flex-column gap-2">
          {courses.map((course, index) => (
            <Card
              key={course._id || index}
              className="quiz-card p-3 d-flex flex-row align-items-center justify-content-between cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => onSelectCourse(course._id)}
            >
              <div className="d-flex align-items-center gap-3 min-w-0">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center fw-bold shrink-0"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "var(--quiz-purple-soft)",
                    color: "var(--quiz-purple-dark)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                    fontSize: "0.85rem",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <div
                    className="fw-bold text-dark fs-6 text-truncate"
                    style={{ color: "#1e293b" }}
                  >
                    {course.title}
                  </div>
                  <div className="text-muted small">
                    {course.lessonCount || 0} bài học • Khóa học Video
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-primary rounded-pill px-3 py-1 fw-bold text-xs d-flex align-items-center gap-1 shrink-0 ms-3"
                style={{ fontSize: "0.8rem" }}
              >
                <span>Xem bài thi</span>
                <span>›</span>
              </button>
            </Card>
          ))}

          {courses.length === 0 && !loading && (
            <div className="text-center py-5 text-muted small bg-white rounded-3 border">
              Không tìm thấy khóa học nào phù hợp với từ khóa tìm kiếm.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorQuizCourseListView;
