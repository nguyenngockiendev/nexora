import { Badge, Card, Form, InputGroup } from "react-bootstrap";

const CONFIG = {
  recorded: {
    breadcrumb: "Đánh giá › Chọn khóa học",
    title: "Khóa Học Có Bài Kiểm Tra",
    subtitle: "Chọn khóa học để vào quản lý các bài kiểm tra trắc nghiệm theo bài học",
    badge: "Khóa học Video (Tự học)",
    searchPlaceholder: "Tìm kiếm khóa học...",
    emptyText: "Không tìm thấy khóa học nào phù hợp với từ khóa tìm kiếm.",
    loadingText: "Đang tải danh sách khóa học...",
    actionBtn: "Xem bài thi",
    getInfo: (item) => `${item.lessonCount || 0} bài học • Khóa học Video`,
  },
  assessments: {
    breadcrumb: "Đánh giá › Chọn Lớp Học Trực Tuyến",
    title: "Lớp Học Trực Tuyến Có Bài Tập",
    subtitle: "Chọn lớp học để vào xem danh sách bài tập đã giao và chấm điểm bài nộp của học viên",
    badge: "Lớp Học Trực Tuyến (Live Class)",
    searchPlaceholder: "Tìm kiếm lớp học trực tuyến...",
    emptyText: "Không tìm thấy lớp học nào phù hợp với từ khóa tìm kiếm.",
    loadingText: "Đang tải danh sách lớp học...",
    actionBtn: "Vào chấm bài",
    getInfo: (item) =>
      `${item.assignmentCount || 0} bài tập • ${item.currentStudents || 0} học viên${
        item.pendingCount ? ` • ⚠️ ${item.pendingCount} bài chờ chấm` : ""
      }`,
  },
};

const InstructorQuizCourseListView = ({
  courses = [],
  loading = false,
  error = null,
  searchTerm = "",
  setSearchTerm,
  onSelectCourse,
  onBack,
  onRefresh,
  mode = "recorded",
}) => {
  const currentConfig = CONFIG[mode] || CONFIG.recorded;

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
              {currentConfig.breadcrumb}
            </div>
            <h1 className="quiz-page-title mb-0">{currentConfig.title}</h1>
            <p className="text-muted small mb-0" style={{ fontSize: "0.8rem" }}>
              {currentConfig.subtitle}
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
            {currentConfig.badge}
          </Badge>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-4" style={{ maxWidth: "420px" }}>
        <InputGroup className="quiz-input-group">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder={currentConfig.searchPlaceholder}
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
          {currentConfig.loadingText}
        </div>
      ) : (
        /* COURSE / CLASS LIST */
        <div className="d-flex flex-column gap-2">
          {courses.map((item, index) => (
            <Card
              key={item._id || index}
              className="quiz-card p-3 d-flex flex-row align-items-center justify-content-between cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => onSelectCourse(item._id)}
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
                    {item.title || item.courseTitle || "Lớp học / Khóa học"}
                  </div>
                  <div className="text-muted small">
                    {currentConfig.getInfo(item)}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-primary rounded-pill px-3 py-1 fw-bold text-xs d-flex align-items-center gap-1 shrink-0 ms-3"
                style={{ fontSize: "0.8rem" }}
              >
                <span>{currentConfig.actionBtn}</span>
                <span>›</span>
              </button>
            </Card>
          ))}

          {courses.length === 0 && !loading && (
            <div className="text-center py-5 text-muted small bg-white rounded-3 border">
              {currentConfig.emptyText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorQuizCourseListView;
