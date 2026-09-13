import { Badge, Button, Card, Form, InputGroup, Table } from "react-bootstrap";

const CONFIG = {
  recorded: {
    backBtnText: "← Quay lại danh sách khóa",
    pageTitle: "Theo Dõi Kết Quả Bài Kiểm Tra",
    badgeUnit: "Bài học có Quizz",
    sidebarTitle: "Danh Sách Bài Quiz",
    sidebarUnit: "bài thi",
    emptySidebar: "Khóa học này chưa có bài Quizz nào.",
    headerLabel: "Đang xem bảng điểm bài:",
    actionBtnText: "Xem Đề Thi",
    stat1Label: "Tổng Lượt Thi",
    stat2Label: "Điểm Trung Bình",
    stat3Label: "Tỷ Lệ Đạt",
    searchPlaceholder: "Tìm sinh viên theo tên hoặc email...",
    filterOptions: [
      { value: "all", label: "Tất cả kết quả" },
      { value: "pass", label: "✓ Đạt (Pass)" },
      { value: "fail", label: "✗ Chưa đạt (Fail)" },
    ],
  },
  assessments: {
    backBtnText: "← Quay lại danh sách lớp",
    pageTitle: "Theo Dõi & Chấm Điểm Bài Tập Nộp File",
    badgeUnit: "Bài tập trong lớp",
    sidebarTitle: "Danh Sách Bài Tập",
    sidebarUnit: "bài tập",
    emptySidebar: "Lớp học này chưa có bài tập nào.",
    headerLabel: "Đang xem danh sách nộp bài:",
    actionBtnText: "Xem Đề Bài",
    stat1Label: "Tổng Đã Nộp",
    stat2Label: "Chờ Chấm Tay",
    stat3Label: "Điểm Trung Bình",
    searchPlaceholder: "Tìm học viên theo tên hoặc email...",
    filterOptions: [
      { value: "all", label: "Tất cả bài nộp" },
      { value: "pending", label: "⏳ Chờ chấm (Pending)" },
      { value: "graded", label: "✓ Đã chấm (Graded)" },
    ],
  },
};

const InstructorQuizTrackingView = ({
  mode = "recorded",
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
  onOpenGradingModal,
  onAllowRetake,
}) => {
  const currentConfig = CONFIG[mode] || CONFIG.recorded;

  const activeQuiz =
    quizzes.find((q) => q._id === selectedQuizId) || quizzes[0] || null;

  const submissionsList =
    mode === "assessments"
      ? activeQuiz?.submissions || []
      : activeQuiz?.attempts || [];

  const filteredAttempts = submissionsList.filter((att) => {
    const studentName = (att.student?.name || "").toLowerCase();
    const studentEmail = (att.student?.email || "").toLowerCase();
    const matchSearch =
      studentName.includes(searchTerm.toLowerCase()) ||
      studentEmail.includes(searchTerm.toLowerCase());

    if (mode === "assessments") {
      if (filterStatus === "pending")
        return matchSearch && (!att.status || att.status === "pending");
      if (filterStatus === "graded")
        return matchSearch && att.status === "graded";
      return matchSearch;
    }

    const isPassed = att.score >= (activeQuiz?.passScore ?? 5);
    if (filterStatus === "pass") return matchSearch && isPassed;
    if (filterStatus === "fail") return matchSearch && !isPassed;
    return matchSearch;
  });

  const totalSubmissions = submissionsList.length;

  // Stats calculation
  const pendingCount =
    mode === "assessments"
      ? submissionsList.filter(
          (att) => !att.status || att.status === "pending"
        ).length
      : 0;

  const passedCount =
    mode === "recorded"
      ? submissionsList.filter(
          (att) => att.score >= (activeQuiz?.passScore ?? 5)
        ).length
      : 0;

  const validScores = submissionsList
    .map((a) => (a.score !== null && a.score !== undefined ? Number(a.score) : null))
    .filter((s) => s !== null);

  const averageScore =
    validScores.length > 0
      ? (
          validScores.reduce((sum, s) => sum + s, 0) / validScores.length
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
            {currentConfig.backBtnText}
          </button>
          <div>
            <div
              className="text-muted small fw-semibold text-truncate"
              style={{ fontSize: "0.75rem", maxWidth: "450px" }}
            >
              {courseTitle}
            </div>
            <h1 className="quiz-page-title mb-0">{currentConfig.pageTitle}</h1>
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
            {quizzes.length} {currentConfig.badgeUnit}
          </Badge>
        </div>
      </div>

      {/* 2-COLUMN MASTER DETAIL */}
      <div
        className="d-flex flex-column flex-lg-row gap-3 align-items-stretch"
        style={{
          width: "100%",
          height: "calc(100vh - 130px)",
          minHeight: "750px",
        }}
      >
        {/* ================= CỘT 1 (BÊN TRÁI): DANH SÁCH BÀI ================= */}
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
                {currentConfig.sidebarTitle}
              </span>
              <Badge bg="light" text="dark" className="border rounded-pill">
                {quizzes.length} {currentConfig.sidebarUnit}
              </Badge>
            </div>

            <div
              className="d-flex flex-column gap-2 flex-grow-1"
              style={{ overflowY: "auto", paddingRight: "4px" }}
            >
              {quizzes.map((item, index) => {
                const isActive = item._id === activeQuiz?._id;
                const subs =
                  mode === "assessments"
                    ? item.submissions || []
                    : item.attempts || [];
                const submissionCount = subs.length;
                const itemPending = subs.filter(
                  (s) => !s.status || s.status === "pending"
                ).length;

                return (
                  <div
                    key={item._id || index}
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
                    onClick={() => onSelectQuiz(item._id)}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span
                        className="text-muted small fw-semibold"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {mode === "assessments"
                          ? `Bài tập ${index + 1}`
                          : item.lessonTitle || `Bài ${index + 1}`}
                      </span>

                      {mode === "assessments" ? (
                        <Badge
                          pill
                          bg={itemPending > 0 ? "warning" : "success"}
                          className={
                            itemPending > 0
                              ? "bg-warning-subtle text-warning-emphasis border border-warning-subtle"
                              : "bg-success-subtle text-success border border-success-subtle"
                          }
                          style={{ fontSize: "0.65rem" }}
                        >
                          {itemPending > 0 ? `${itemPending} chờ chấm` : "✓ Đã chấm"}
                        </Badge>
                      ) : (
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
                      )}
                    </div>

                    <div
                      className="fw-bold text-dark text-truncate"
                      style={{ fontSize: "0.875rem", color: "#1e293b" }}
                    >
                      {item.title}
                    </div>

                    <div
                      className="text-muted small mt-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {mode === "assessments" ? (
                        <span>
                          📅 Hạn:{" "}
                          {item.deadline
                            ? new Date(item.deadline).toLocaleDateString("vi-VN")
                            : "Không giới hạn"}{" "}
                          • {submissionCount} đã nộp
                        </span>
                      ) : (
                        <span>
                          ⏱️ {item.duration}p • {(item.questions || []).length} câu •
                          Đạt: {item.passScore}/10
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {quizzes.length === 0 && (
                <div className="text-center py-4 text-muted small bg-white rounded-3 border">
                  {currentConfig.emptySidebar}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* ================= CỘT 2 (BÊN PHẢI): BẢNG DỮ LIỆU ================= */}
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
              {/* HEADER IN RIGHT PANE */}
              <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3 pb-3 border-bottom mb-3 shrink-0">
                <div>
                  <div
                    className="text-muted small fw-semibold"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {currentConfig.headerLabel}
                  </div>
                  <h2
                    className="fw-bold text-dark fs-5 mb-1 text-truncate"
                    style={{ color: "#1e293b" }}
                  >
                    {activeQuiz.title}
                  </h2>
                  <div
                    className="d-flex align-items-center gap-3 text-muted small flex-wrap"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {mode === "assessments" ? (
                      <>
                        <span>
                          📅 Hạn chót:{" "}
                          <strong className="text-dark">
                            {activeQuiz.deadline
                              ? new Date(activeQuiz.deadline).toLocaleString(
                                  "vi-VN"
                                )
                              : "Không giới hạn"}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          📎 Đề bài:{" "}
                          {activeQuiz.fileUrl ? (
                            <a
                              href={activeQuiz.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-warning-emphasis fw-bold text-decoration-underline"
                            >
                              Tải đề bài
                            </a>
                          ) : (
                            "Không có file đính kèm"
                          )}
                        </span>
                      </>
                    ) : (
                      <>
                    <span>⏱️ {activeQuiz.duration} phút</span>
                    <span>•</span>
                    <span>📝 {(activeQuiz.questions || []).length} câu hỏi</span>
                    <span>•</span>
                    <span>
                          🎯 Điểm đạt:{" "}
                          <strong>{activeQuiz.passScore} / 10</strong>
                    </span>
                      </>
                    )}
                  </div>
                </div>

                {/* ACTION: XEM ĐỀ */}
                <Button
                  variant="outline-primary"
                  className="rounded-pill px-3 py-1.5 fw-bold text-xs d-flex align-items-center gap-1.5 shrink-0"
                  onClick={() => onOpenExamModal(activeQuiz)}
                >
                  <span>📄</span>
                  <span>{currentConfig.actionBtnText}</span>
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
                      {currentConfig.stat1Label}
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
                      {currentConfig.stat2Label}
                    </div>
                    <div
                      className={`fw-black fs-5 ${
                        mode === "assessments" ? "text-warning" : ""
                      }`}
                      style={{
                        color:
                          mode === "recorded"
                            ? "var(--quiz-purple-dark)"
                            : undefined,
                      }}
                    >
                      {mode === "assessments"
                        ? pendingCount
                        : `${averageScore} / 10`}
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="p-2.5 rounded-3 bg-light border text-center">
                    <div
                      className="text-muted text-[11px] fw-bold uppercase"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      {currentConfig.stat3Label}
                    </div>
                    <div
                      className={`fw-black fs-5 ${
                        mode === "assessments"
                          ? "text-dark"
                          : "text-success"
                      }`}
                    >
                      {mode === "assessments"
                        ? `${averageScore} / 10`
                        : `${passRate}%`}
                    </div>
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
                    placeholder={currentConfig.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="quiz-input"
                  />
                </div>

                <Form.Select
                  size="sm"
                  className="rounded-pill border-slate-200 fw-semibold text-slate-700"
                  style={{ width: "170px", fontSize: "0.8rem" }}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  {currentConfig.filterOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {/* TABLE */}
              <div
                className="table-responsive flex-grow-1"
                style={{ overflowY: "auto" }}
              >
                <Table hover align="middle" className="mb-0" style={{ fontSize: "0.85rem" }}>
                  <thead className="table-light">
                    <tr className="text-muted small">
                      <th style={{ borderTopLeftRadius: "8px" }}>Học Viên</th>
                      <th>Thời Gian Nộp</th>
                      {mode === "assessments" && <th>File Bài Làm</th>}
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

                      // For recorded
                      const isPassed = att.score >= (activeQuiz.passScore ?? 5);

                      // For assessments
                      const isGraded = att.status === "graded";
                      const isLate =
                        activeQuiz?.deadline && att.submittedAt
                          ? new Date(att.submittedAt) >
                            new Date(activeQuiz.deadline)
                          : false;

                      return (
                        <tr key={att._id || index}>
                          {/* 1. STUDENT */}
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

                          {/* 2. SUBMIT TIME */}
                          <td>
                            <div className="fw-semibold">
                              {mode === "assessments"
                                ? att.submittedAt
                                  ? new Date(att.submittedAt).toLocaleDateString("vi-VN")
                                  : "Chưa rõ"
                                : att.timeTaken
                                ? `${Math.floor(att.timeTaken / 60)}p ${att.timeTaken % 60}s`
                                : "12p 30s"}
                            </div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {mode === "assessments" ? (
                                <span
                                  className={`badge ${
                                    isLate
                                      ? "bg-danger-subtle text-danger"
                                      : "bg-success-subtle text-success"
                                  }`}
                                  style={{ fontSize: "0.65rem" }}
                                >
                                  {isLate ? "⚠️ Nộp trễ" : "✓ Đúng hạn"}
                                </span>
                              ) : att.createdAt ? (
                                new Date(att.createdAt).toLocaleDateString("vi-VN")
                              ) : (
                                "06/09/2026"
                              )}
                            </div>
                          </td>

                          {/* 3. ATTACHED FILE (FOR ASSESSMENTS) */}
                          {mode === "assessments" && (
                            <td>
                              {att.fileUrl ? (
                                <a
                                  href={att.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-xs fw-semibold text-truncate d-inline-flex align-items-center gap-1"
                                  style={{ maxWidth: "160px", fontSize: "0.75rem" }}
                                  title={att.fileUrl.split("/").pop()}
                                >
                                  <span>📦</span>
                                  <span className="text-truncate">
                                    {att.fileUrl.split("/").pop() || "Tải file"}
                                  </span>
                                </a>
                              ) : (
                                <span className="text-muted small">Không có file</span>
                              )}
                            </td>
                          )}

                          {/* 4. SCORE */}
                          <td>
                            {mode === "assessments" ? (
                              isGraded && att.score !== null ? (
                                <>
                                  <span className="fw-black fs-6 text-dark">
                                    {att.score}
                                  </span>
                                  <span className="text-muted small">/10</span>
                                </>
                              ) : (
                                <span className="text-muted fst-italic">--</span>
                              )
                            ) : (
                              <>
                            <span
                              className={`fw-black fs-6 ${
                                isPassed ? "text-dark" : "text-danger"
                              }`}
                            >
                              {att.score}
                            </span>
                            <span className="text-muted small">/10</span>
                              </>
                            )}
                          </td>

                          {/* 5. STATUS BADGE */}
                          <td>
                            {mode === "assessments" ? (
                              <Badge
                                pill
                                bg={isGraded ? "success" : "warning"}
                                className={
                                  isGraded
                                    ? "bg-success-subtle text-success border border-success-subtle px-2 py-1"
                                    : "bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1"
                                }
                              >
                                {isGraded ? "✓ Đã chấm" : "⏳ Chờ chấm"}
                              </Badge>
                            ) : (
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
                            )}
                          </td>

                          {/* 6. ACTIONS */}
                          <td className="text-end">
                            {mode === "assessments" ? (
                              <Button
                                variant={isGraded ? "light" : "warning"}
                                size="sm"
                                className={`rounded-pill px-3 py-1 text-xs fw-bold ${
                                  isGraded ? "border" : "text-dark"
                                }`}
                                onClick={() =>
                                  onOpenGradingModal(att, activeQuiz)
                                }
                              >
                                {isGraded ? "👁️ Xem lại & Sửa" : "✍️ Chấm bài"}
                              </Button>
                            ) : (
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
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {filteredAttempts.length === 0 && (
                      <tr>
                        <td
                          colSpan={mode === "assessments" ? 6 : 5}
                          className="text-center py-4 text-muted small"
                        >
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
              Vui lòng chọn một mục ở cột bên trái để xem chi tiết.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorQuizTrackingView;

