import { Badge, Button, Card, Form, InputGroup, Table } from "react-bootstrap";

const InstructorQuizTrackingView = ({
  courseTitle = "Khóa học",
  quizzes = [],
  selectedQuizId,
  onSelectQuiz,
  searchTerm = "",
  setSearchTerm,
  filterStatus = "all",
  setFilterStatus,
  onBack,
  onOpenExamModal,
  onOpenSubmissionModal,
  onAllowRetake,
}) => {
  const activeQuiz =
    quizzes.find((q) => q._id === selectedQuizId) || quizzes[0] || null;
   console.log(activeQuiz)
  const attempts = activeQuiz?.attempts || [];


  const filteredAttempts = attempts.filter((att) => {
    const studentName = (att.student?.name || "").toLowerCase();
    const studentEmail = (att.student?.email || "").toLowerCase();
    const matchSearch =
      studentName.includes(searchTerm.toLowerCase()) ||
      studentEmail.includes(searchTerm.toLowerCase());

    const isPassed = att.score >= (activeQuiz?.passScore ?? 5);

    if (filterStatus === "pass") return matchSearch && isPassed;
    if (filterStatus === "fail") return matchSearch && !isPassed;
    return matchSearch;
  });


  const totalSubmissions = attempts.length;
  const passedCount = attempts.filter(
    (att) => att.score >= (activeQuiz?.passScore ?? 5),
  ).length;
  const averageScore =
    totalSubmissions > 0
      ? (
          attempts.reduce((sum, a) => sum + (a.score || 0), 0) / totalSubmissions
        ).toFixed(1)
      : "0.0";
  const passRate =
    totalSubmissions > 0
      ? Math.round((passedCount / totalSubmissions) * 100)
      : 100;

  return (
    <div className="p-3 p-md-4 pt-2 pb-2 w-100">
      {/* TOP HEADER */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn quiz-btn-back rounded-pill px-3 py-1 text-xs"
            onClick={onBack}
          >
            ← Quay lại danh sách khóa
          </button>
          <div>
            <div
              className="text-muted small fw-semibold text-truncate"
              style={{ fontSize: "0.75rem", maxWidth: "450px" }}
            >
              {courseTitle}
            </div>
            <h1 className="quiz-page-title mb-0">Theo Dõi Kết Quả Bài Kiểm Tra</h1>
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
            {quizzes.length} Bài học có Quizz
          </Badge>
        </div>
      </div>

      {/* 2-COLUMN MASTER DETAIL (FLEX CONTAINER - FULL SCREEN HEIGHT) */}
      <div
        className="d-flex flex-column flex-lg-row gap-3 align-items-stretch"
        style={{
          width: "100%",
          height: "calc(100vh - 130px)",
          minHeight: "750px",
        }}
      >
        {/* ================= CỘT 1 (BÊN TRÁI): DANH SÁCH BÀI QUIZ ================= */}
        <div
          className="quiz-sidebar"
          style={{ width: "100%", maxWidth: "340px", flexShrink: 0 }}
        >
          <Card
            className="quiz-card p-3 h-100 d-flex flex-column"
            style={{
              height: "100%",
              minHeight: "750px",
              maxHeight: "calc(100vh - 130px)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-3 shrink-0">
              <span className="fw-bold text-dark small text-uppercase tracking-wider">
                Danh Sách Bài Quiz
              </span>
              <Badge bg="light" text="dark" className="border rounded-pill">
                {quizzes.length} bài thi
              </Badge>
            </div>

            <div
              className="d-flex flex-column gap-2 flex-grow-1"
              style={{ overflowY: "auto", paddingRight: "4px" }}
            >
              {quizzes.map((quiz, index) => {
                const isActive = quiz._id === activeQuiz?._id;
                const submissionCount = (quiz.attempts || []).length;

                return (
                  <div
                    key={quiz._id || index}
                    className={`p-3 rounded-3 border transition-all cursor-pointer ${
                      isActive
                        ? "border-warning shadow-sm"
                        : "bg-white hover:border-warning-subtle"
                    }`}
                    style={{
                      background: isActive ? "var(--quiz-purple-soft)" : "#ffffff",
                      borderColor: isActive ? "var(--quiz-purple)" : "#e2e8f0",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                    onClick={() => onSelectQuiz(quiz._id)}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span
                        className="text-muted small fw-semibold"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {quiz.lessonTitle || `Bài ${index + 1}`}
                      </span>
                      <Badge
                        pill
                        bg={submissionCount > 0 ? "success" : "secondary"}
                        className={
                          submissionCount > 0
                            ? "bg-success-subtle text-success border border-success-subtle"
                            : "bg-secondary-subtle text-secondary border"
                        }
                        style={{ fontSize: "0.65rem" }}
                      >
                        {submissionCount} lượt nộp
                      </Badge>
                    </div>
                    <div
                      className="fw-bold text-dark text-truncate"
                      style={{ fontSize: "0.875rem", color: "#1e293b" }}
                    >
                      {quiz.title}
                    </div>
                    <div
                      className="text-muted small mt-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      ⏱️ {quiz.duration}p • {(quiz.questions || []).length} câu •
                      Đạt: {quiz.passScore}/10
                    </div>
                  </div>
                );
              })}

              {quizzes.length === 0 && (
                <div className="text-center py-4 text-muted small bg-white rounded-3 border">
                  Khóa học này chưa có bài Quizz nào.
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* ================= CỘT 2 (BÊN PHẢI): BẢNG ĐIỂM SINH VIÊN ================= */}
        <div className="flex-grow-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
          {activeQuiz ? (
            <Card
              className="quiz-card p-4 h-100 d-flex flex-column"
              style={{
                height: "100%",
                minHeight: "750px",
                maxHeight: "calc(100vh - 130px)",
              }}
            >
              {/* QUIZ HEADER IN RIGHT PANE */}
              <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3 pb-3 border-bottom mb-3 shrink-0">
                <div>
                  <div
                    className="text-muted small fw-semibold"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Đang xem bảng điểm bài:
                  </div>
                  <h2
                    className="fw-bold text-dark fs-5 mb-1 text-truncate"
                    style={{ color: "#1e293b" }}
                  >
                    {activeQuiz.title} ({activeQuiz.lessonTitle || "Bài học"})
                  </h2>
                  <div
                    className="d-flex align-items-center gap-3 text-muted small flex-wrap"
                    style={{ fontSize: "0.8rem" }}
                  >
                    <span>⏱️ {activeQuiz.duration} phút</span>
                    <span>•</span>
                    <span>📝 {(activeQuiz.questions || []).length} câu hỏi</span>
                    <span>•</span>
                    <span>
                      🎯 Điểm đạt: <strong>{activeQuiz.passScore} / 10</strong>
                    </span>
                  </div>
                </div>

                {/* ACTION: XEM ĐỀ THI */}
                <Button
                  variant="outline-primary"
                  className="rounded-pill px-3 py-1.5 fw-bold text-xs d-flex align-items-center gap-1.5 shrink-0"
                  onClick={() => onOpenExamModal(activeQuiz)}
                >
                  <span>📄</span>
                  <span>Xem Đề Thi</span>
                </Button>
              </div>

              {/* MINI STATS BAR */}
              <div className="row g-2 mb-3 shrink-0">
                <div className="col-4">
                  <div className="p-2.5 rounded-3 bg-light border text-center">
                    <div
                      className="text-muted text-[11px] fw-bold uppercase"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      Tổng Lượt Thi
                    </div>
                    <div className="fw-black text-dark fs-5">{totalSubmissions}</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2.5 rounded-3 bg-light border text-center">
                    <div
                      className="text-muted text-[11px] fw-bold uppercase"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      Điểm Trung Bình
                    </div>
                    <div
                      className="fw-black fs-5"
                      style={{ color: "var(--quiz-purple-dark)" }}
                    >
                      {averageScore} / 10
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2.5 rounded-3 bg-light border text-center">
                    <div
                      className="text-muted text-[11px] fw-bold uppercase"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      Tỷ Lệ Đạt
                    </div>
                    <div className="fw-black text-success fs-5">{passRate}%</div>
                  </div>
                </div>
              </div>

              {/* SEARCH & FILTER ROW */}
              <div className="d-flex align-items-center justify-content-between gap-2 mb-3 flex-wrap shrink-0">
                <div
                  className="input-group quiz-input-group flex-grow-1"
                  style={{ maxWidth: "340px" }}
                >
                  <span className="input-group-text">🔍</span>
                  <Form.Control
                    type="text"
                    placeholder="Tìm sinh viên theo tên hoặc email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="quiz-input"
                  />
                </div>

                <Form.Select
                  size="sm"
                  className="rounded-pill border-slate-200 fw-semibold text-slate-700"
                  style={{ width: "150px", fontSize: "0.8rem" }}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tất cả kết quả</option>
                  <option value="pass">✓ Đạt (Pass)</option>
                  <option value="fail">✗ Chưa đạt (Fail)</option>
                </Form.Select>
              </div>

              {/* STUDENT GRADEBOOK TABLE */}
              <div
                className="table-responsive flex-grow-1"
                style={{ overflowY: "auto" }}
              >
                <Table hover align="middle" className="mb-0" style={{ fontSize: "0.85rem" }}>
                  <thead className="table-light">
                    <tr className="text-muted small">
                      <th style={{ borderTopLeftRadius: "8px" }}>Học Viên</th>
                      <th>Thời Gian Nộp</th>
                      <th>Điểm Số</th>
                      <th>Trạng Thái</th>
                      <th className="text-end" style={{ borderTopRightRadius: "8px" }}>
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttempts.map((att, index) => {
                      const student = att.student || {};
                      const isPassed = att.score >= (activeQuiz.passScore);

                      return (
                        <tr key={att._id || index}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle bg-orange-100 text-orange-700 font-bold d-flex align-items-center justify-content-center shrink-0"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  fontSize: "0.75rem",
                                }}
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
                                <div className="fw-bold text-dark">{student.name}</div>
                                <div
                                  className="text-muted"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="fw-semibold">
                              {att.timeTaken
                                ? `${Math.floor(att.timeTaken / 60)}p ${att.timeTaken % 60}s`
                                : "12p 30s"}
                            </div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {att.createdAt
                                ? new Date(att.createdAt).toLocaleDateString("vi-VN")
                                : "06/09/2026"}
                            </div>
                          </td>
                          <td>
                            <span
                              className={`fw-black fs-6 ${
                                isPassed ? "text-dark" : "text-danger"
                              }`}
                            >
                              {att.score}
                            </span>
                            <span className="text-muted small">/10</span>
                          </td>
                          <td>
                            <Badge
                              pill
                              bg={isPassed ? "success" : "danger"}
                              className={
                                isPassed
                                  ? "bg-success-subtle text-success border border-success-subtle px-2 py-1"
                                  : "bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"
                              }
                            >
                              {isPassed ? "✓ Đạt" : "✗ Chưa đạt"}
                            </Badge>
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1.5">
                              <Button
                                variant="light"
                                size="sm"
                                className="border rounded-pill px-2.5 py-1 text-xs fw-bold"
                                title="Xem bài làm chi tiết"
                                onClick={() =>
                                  onOpenSubmissionModal(att, activeQuiz)
                                }
                              >
                                👁️ Xem bài
                              </Button>
                              <Button
                                variant={isPassed ? "outline-warning" : "warning"}
                                size="sm"
                                className={`rounded-pill px-2 py-1 text-xs ${
                                  !isPassed ? "text-dark fw-bold" : ""
                                }`}
                                title="Cho phép thi lại"
                                onClick={() => onAllowRetake(att, activeQuiz)}
                              >
                                🔄 Thi lại
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredAttempts.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted small">
                          Không tìm thấy kết quả nộp bài nào phù hợp.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>
          ) : (
            <Card className="quiz-card p-5 text-center text-muted">
              Vui lòng chọn một bài Quiz ở cột bên trái để xem bảng điểm.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorQuizTrackingView;
