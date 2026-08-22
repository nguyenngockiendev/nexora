import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import {
  Search,
  ChevronDown,
  PlayCircle,
  Folder,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  X,
} from "lucide-react";

const QuizCreaatForm = ({
  addQuestion,
  exam,
  currentIndex,
  setCurrentIndex,
  setExam,
  handSubmit,
  error,
  loadingAI,
  istrue,
  loading,
  courses,
  hanhId,
  setShowModal,
  showModal,
  setNumQuestions,
  numQuestions,
  handleQuickSelect,
  handleSubmit,
  header,
  errorAI,
  lessionId,
  courseId,
}) => {
  const optionLabels = ["A", "B", "C", "D"];

  // ── COMBOBOX SEARCH & GROUP STATE ──
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLesson = useMemo(() => {
    if (!lessionId || !Array.isArray(courses)) return null;
    return courses.find((c) => c._id === lessionId);
  }, [lessionId, courses]);

  const groupedCourses = useMemo(() => {
    if (!Array.isArray(courses)) return [];

    const query = searchQuery.trim().toLowerCase();
    const map = new Map();

    courses.forEach((lesson) => {
      const cTitle = lesson.courseId?.title || "Khóa học chưa phân loại";
      const cId = lesson.courseId?._id || "other";
      const lTitle = lesson.title || "";

      const matchesSearch =
        !query ||
        lTitle.toLowerCase().includes(query) ||
        cTitle.toLowerCase().includes(query);

      if (matchesSearch) {
        if (!map.has(cId)) {
          map.set(cId, {
            courseId: cId,
            courseTitle: cTitle,
            lessons: [],
          });
        }
        map.get(cId).lessons.push(lesson);
      }
    });

    return Array.from(map.values());
  }, [courses, searchQuery]);
  return (
    <div className="create-exam-page  d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-4">
          <div className="align-items-center">
            <h1 className="quiz-page-title mb-0">Tạo đề kiểm tra</h1>
          </div>
        </div>
        <div className="d-none d-sm-flex gap-2">
          <Button
            variant="primary"
            className="rounded-pill px-4 fw-semibold"
            type="button"
          >
            Publish
          </Button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 mb-3 small font-weight-bold">
          ⚠️ {error || "Đã xảy ra lỗi!"}
        </div>
      )}
      {errorAI && (
        <div className="alert alert-danger py-2 px-3 mb-3 small font-weight-bold">
          ⚠️ {errorAI}
        </div>
      )}
      {!header && (
        <div className="alert alert-danger py-2 px-3 mb-3 small font-weight-bold">
          ⚠️{" "}
          {"bạn phải điền thông tin đề rồi mới được dùng tính năng Generate!"}
        </div>
      )}

      <Form onSubmit={handSubmit}>
        <Card
          className="quiz-card mb-3"
          style={{ overflow: "visible", position: "relative", zIndex: 100 }}
        >
          <Card.Body className="p-3 px-4" style={{ overflow: "visible" }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="quiz-icon-badge">✎</span>
              <Card.Title className="mb-0 fw-bold">Thông tin đề</Card.Title>
            </div>
            <Row className="g-3 align-items-end">
              <Col sm={12} md={6} lg={3} xl={3}>
                <Form.Group>
                  <Form.Label>Tên đề</Form.Label>
                  <Form.Control
                    type="text"
                    value={exam.title}
                    className="quiz-input"
                    required
                    placeholder="tạo đề kiểm tra"
                    onChange={(e) =>
                      setExam({
                        ...exam,
                        title: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm={6} md={3} lg={2} xl={2}>
                <Form.Group>
                  <Form.Label>Thời gian</Form.Label>
                  <InputGroup className="quiz-input-group">
                    <Form.Control
                      type="Number"
                      step="any"
                      required
                      value={exam.duration}
                      className="quiz-input"
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        setExam({
                          ...exam,
                          duration: Number(e.target.value),
                        })
                      }
                    />
                    <InputGroup.Text>Phút</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col sm={6} md={3} lg={2} xl={2}>
                <Form.Group>
                  <Form.Label>Điểm đạt</Form.Label>
                  <InputGroup className="quiz-input-group">
                    <Form.Control
                      type="Number"
                      required
                      step="any"
                      value={exam.passScore}
                      className="quiz-input"
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        setExam({
                          ...exam,
                          passScore: Number(e.target.value),
                        })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col sm={12} md={12} lg={5} xl={5}>
                <Form.Group className="position-relative" ref={dropdownRef}>
                  <Form.Label className="fw-bold small text-slate-700">
                    Chọn bài học cần tạo Quizz:{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>

                  {/* ── TRIGGER BOX (Ô HIỂN THỊ BÀI ĐANG CHỌN) ── */}
                  <div
                    className="quiz-input d-flex align-items-center justify-content-between px-3 py-2 bg-white rounded-3 border"
                    style={{
                      minHeight: "42px",
                      cursor: "pointer",
                      borderColor: isDropdownOpen ? "#f97316" : "#e2e8f0",
                      boxShadow: isDropdownOpen
                        ? "0 0 0 3px rgba(249, 115, 22, 0.15)"
                        : "none",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="d-flex align-items-center gap-2 overflow-hidden text-truncate me-2">
                      <Search size={15} className="text-orange-500 shrink-0" />
                      {selectedLesson ? (
                        <span className="small fw-semibold text-slate-800 text-truncate">
                          <span className="text-orange-600 font-bold">
                            [{selectedLesson.courseId?.title || "Khóa học"}]
                          </span>{" "}
                          {selectedLesson.title}
                        </span>
                      ) : (
                        <span className="small text-muted text-truncate">
                          -- Bấm để tìm &amp; chọn bài học --
                        </span>
                      )}
                    </div>

                    <div className="d-flex align-items-center gap-1 shrink-0">
                      {selectedLesson && (
                        <span
                          className="badge rounded-pill bg-light text-slate-500 border p-1 px-1.5 small cursor-pointer hover:bg-slate-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            hanhId(null, null);
                          }}
                          title="Bỏ chọn bài học"
                        >
                          ✕
                        </span>
                      )}
                      <ChevronDown
                        size={15}
                        className={`text-slate-400 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* ── FLOATING DROPDOWN MENU (POPUP KÍNH MỜ GOM NHÓM THEO KHÓA HỌC) ── */}
                  {isDropdownOpen && (
                    <div
                      className="position-absolute start-0 end-0 mt-2 rounded-4 shadow-2xl border p-2 animate-[fadeIn_0.2s_ease-out]"
                      style={{
                        zIndex: 9999,
                        maxHeight: "360px",
                        overflowY: "auto",
                        boxShadow:
                          "0 20px 50px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(249, 115, 22, 0.1)",
                        border: "1.5px solid rgba(249, 115, 22, 0.3)",
                        background: "rgba(255, 255, 255, 0.98)",
                        backdropFilter: "blur(24px)",
                      }}
                    >
                      {/* SEARCH BAR TRONG MENU */}
                      <div className="p-1 mb-2 sticky-top bg-white border-bottom pb-2">
                        <div className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-slate-50 border">
                          <Search
                            size={14}
                            className="text-slate-400 shrink-0"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm border-0 bg-transparent p-0 shadow-none small fw-medium"
                            placeholder="Tìm nhanh bài học theo tên hoặc khóa học..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                          {searchQuery && (
                            <X
                              size={14}
                              className="text-slate-400 cursor-pointer hover:text-slate-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery("");
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {groupedCourses.length === 0 ? (
                        <div className="p-3 text-center text-muted small">
                          🔍 Không tìm thấy bài học nào phù hợp với "
                          <strong>{searchQuery}</strong>"
                        </div>
                      ) : (
                        <div className="d-flex flex-column gap-2">
                          {groupedCourses.map((group) => (
                            <div key={group.courseId} className="mb-1">
                              <div className="d-flex align-items-center gap-2 px-2 py-1 mb-1 text-orange-600 font-bold small text-uppercase tracking-wider">
                                <Folder
                                  size={14}
                                  className="text-orange-500 shrink-0"
                                />
                                <span className="text-truncate">
                                  {group.courseTitle}
                                </span>
                                <span
                                  className="badge bg-orange-100 text-orange-800 rounded-pill ms-auto px-2 py-0.5"
                                  style={{ fontSize: "10px" }}
                                >
                                  {group.lessons.length} bài
                                </span>
                              </div>

                              <div className="d-flex flex-column gap-1 ps-2">
                                {group.lessons.map((lesson, idx) => {
                                  console.log("group", group);
                                  const isSelected = lesson._id === lessionId;
                                  const isReady =
                                    lesson.status === "TRANSCRIPT_READY";
                                  const isProcessing =
                                    lesson.status === "PROCESSING";

                                  return (
                                    <div
                                      key={lesson._id}
                                      onClick={() => {
                                        hanhId(
                                          lesson.courseId?._id,
                                          lesson._id,
                                        );
                                        setIsDropdownOpen(false);
                                      }}
                                      className={`p-2 px-2.5 rounded-3 d-flex align-items-center justify-content-between transition-all cursor-pointer ${
                                        isSelected
                                          ? "bg-orange-50 border border-orange-300 text-orange-950 font-bold"
                                          : "hover:bg-slate-50 text-slate-700"
                                      }`}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <div className="d-flex align-items-center gap-2 overflow-hidden me-2">
                                        <PlayCircle
                                          size={16}
                                          className={
                                            isSelected
                                              ? "text-orange-500 shrink-0"
                                              : "text-slate-400 shrink-0"
                                          }
                                        />
                                        <span className="small text-truncate">
                                          Bài {idx + 1}: {lesson.title}
                                        </span>
                                      </div>

                                      <div className="shrink-0 ms-2">
                                        {isReady ? (
                                          <span
                                            className="badge rounded-pill px-2.5 py-1 d-inline-flex align-items-center gap-1 font-bold"
                                            style={{
                                              fontSize: "11px",
                                              background:
                                                "rgba(16, 185, 129, 0.12)",
                                              color: "#059669",
                                              border:
                                                "1px solid rgba(16, 185, 129, 0.3)",
                                            }}
                                          >
                                            <CheckCircle2
                                              size={12}
                                              className="text-emerald-600"
                                            />
                                            <span>Sẵn sàng tạo Quiz</span>
                                          </span>
                                        ) : isProcessing ? (
                                          <span
                                            className="badge rounded-pill px-2.5 py-1 d-inline-flex align-items-center gap-1 font-bold"
                                            style={{
                                              fontSize: "11px",
                                              background:
                                                "rgba(249, 115, 22, 0.12)",
                                              color: "#ea580c",
                                              border:
                                                "1px solid rgba(249, 115, 22, 0.3)",
                                            }}
                                          >
                                            <Clock
                                              size={12}
                                              className="text-orange-600 animate-spin"
                                            />
                                            <span>Đang xử lý</span>
                                          </span>
                                        ) : (
                                          <span
                                            className="badge rounded-pill px-2.5 py-1 d-inline-flex align-items-center gap-1 font-bold"
                                            style={{
                                              fontSize: "11px",
                                              background:
                                                "rgba(245, 158, 11, 0.12)",
                                              color: "#b45309",
                                              border:
                                                "1px solid rgba(245, 158, 11, 0.3)",
                                            }}
                                          >
                                            <AlertCircle
                                              size={12}
                                              className="text-amber-600"
                                            />
                                            <span>Chưa có Transcript</span>
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-4">
          <Col lg={3}>
            <Card className="quiz-card h-100">
              <Card.Header className="quiz-card-header d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0 fw-bold fs-6">Câu hỏi</Card.Title>
                <Badge pill className="quiz-count-badge">
                  {exam.questions.length}
                </Badge>
              </Card.Header>

              <Card.Body className="p-3 d-flex flex-column">
                <div className="quiz-question-scroll-list d-flex flex-column gap-2 mb-2">
                  {exam.questions.map((q, index) => {
                    const isActive = index === currentIndex;

                    const isDone = (q?.question || "").trim() !== "";

                    return (
                      <button
                        key={q.id || index}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className={`quiz-q-item ${isActive ? "is-active" : ""} ${
                          isDone ? "is-done" : ""
                        }`}
                      >
                        <span className="quiz-q-item__status">
                          {isDone ? "✓" : "●"}
                        </span>

                        <span className="quiz-q-item__num">{index + 1}</span>

                        <span className="quiz-q-item__label">Câu hỏi</span>
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="outline-primary"
                  className="quiz-btn-add rounded-pill mt-auto"
                  type="button"
                  onClick={addQuestion}
                >
                  + Thêm câu hỏi
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Card className="quiz-card quiz-card--editor h-100">
              <Card.Header className="quiz-card-header">
                <Card.Title className="mb-0 fw-bold fs-6">
                  Soạn câu hỏi
                </Card.Title>
                <Card.Subtitle className="text-muted small mt-1 mb-0">
                  {currentIndex + 1 + "/" + exam.questions.length}
                </Card.Subtitle>
              </Card.Header>
              <Card.Body className="p-3 px-4 d-flex flex-column gap-3">
                <Form.Group>
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    required
                    value={exam?.questions?.[currentIndex]?.question}
                    className="quiz-input"
                    placeholder="nhập câu hỏi"
                    onChange={(e) => {
                      const newquetions = [...exam.questions];
                      newquetions[currentIndex] = {
                        ...newquetions[currentIndex],
                        question: e.target.value,
                      };
                      setExam({
                        ...exam,
                        questions: newquetions,
                      });
                    }}
                  />
                </Form.Group>

                <div>
                  <Form.Label className="d-block mb-3">Đáp án</Form.Label>
                  <Row className="g-3">
                    {exam.questions[currentIndex].options.map((o, index) => (
                      <Col sm={6} key={index}>
                        <InputGroup className="quiz-input-group">
                          <InputGroup.Text>
                            {optionLabels[index]}
                          </InputGroup.Text>

                          <Form.Control
                            type="text"
                            required
                            value={
                              exam?.questions?.[currentIndex]?.options[index]
                            }
                            placeholder="nhập đáp án"
                            className="quiz-input"
                            onChange={(e) => {
                              const newOptions = [
                                ...exam.questions[currentIndex].options,
                              ];

                              newOptions[index] = e.target.value;

                              const newQuestions = [...exam.questions];

                              newQuestions[currentIndex] = {
                                ...newQuestions[currentIndex],
                                options: newOptions,
                              };

                              setExam({
                                ...exam,
                                questions: newQuestions,
                              });
                            }}
                          />
                        </InputGroup>
                      </Col>
                    ))}
                  </Row>
                </div>

                <Row className="g-3 quiz-settings-row pt-2 mt-auto">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Đáp án đúng</Form.Label>
                      <Form.Select
                        value={exam.questions[currentIndex].correctAnswer}
                        className="quiz-input"
                        required
                        onChange={(e) => {
                          {
                            const newcorect = [...exam.questions];
                            newcorect[currentIndex] = {
                              ...newcorect[currentIndex],
                              correctAnswer: Number(e.target.value),
                            };
                            setExam({
                              ...exam,
                              questions: newcorect,
                            });
                          }
                        }}
                      >
                        <option value={0}>A</option>
                        <option value={1}>B</option>
                        <option value={2}>C</option>
                        <option value={3}>D</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Giải thích</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={exam.questions[currentIndex].explanation}
                        className="quiz-input"
                        placeholder="Nhập giải thích"
                        onChange={(e) => {
                          const newQuestions = [...exam.questions];

                          newQuestions[currentIndex] = {
                            ...newQuestions[currentIndex],
                            explanation: e.target.value,
                          };

                          setExam({
                            ...exam,
                            questions: newQuestions,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="d-flex align-items-center justify-content-between mt-4">
          <Button
            variant="light"
            className="quiz-btn-soft rounded-pill px-4"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Generate AI
          </Button>

          {istrue ? (
            <Button
              variant="primary"
              className="rounded-pill px-4 fw-semibold"
              type="submit"
              disabled={loading}
            >
              {loading ? "...Loading" : "Update Quizz"}
            </Button>
          ) : (
            <Button
              variant="primary"
              className="rounded-pill px-4 fw-semibold"
              type="submit"
            >
              Create Quizz
            </Button>
          )}
        </div>
      </Form>
      {showModal && header && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          className="quiz-ai-modal"
          backdrop="static"
        >
          <Modal.Header closeButton className="border-bottom-0 pb-0">
            <Modal.Title className="fw-bold fs-5 d-flex align-items-center gap-2">
              <span className="quiz-icon-badge">✨</span>
              Tạo Đề Thi Tự Động Bằng AI
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="py-4">
              {errorAI && (
                <div className="alert alert-danger py-2 px-3 mb-3 small font-weight-bold d-flex align-items-center gap-2">
                  <span>⚠️ {errorAI}</span>
                </div>
              )}
              <p className="text-muted small mb-4">
                Hệ thống AI sẽ tự động phân tích video bài học đã chọn và sinh
                ra các câu hỏi trắc nghiệm kèm đáp án và lời giải thích tương
                ứng.
              </p>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small text-slate-700 mb-2">
                  Số lượng câu hỏi cần sinh:
                </Form.Label>
                <InputGroup className="quiz-input-group mb-3">
                  <Form.Control
                    type="number"
                    min={1}
                    max={25}
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="quiz-input fw-bold fs-5 text-center"
                    required
                  />
                  <InputGroup.Text className="fw-bold">Câu hỏi</InputGroup.Text>
                </InputGroup>

                <div className="d-flex align-items-center gap-2">
                  <span className="small text-muted me-1">Gợi ý nhanh:</span>
                  {[5, 10, 15, 25].map((count) => (
                    <Button
                      key={count}
                      type="button"
                      variant={
                        numQuestions === count ? "primary" : "outline-secondary"
                      }
                      size="sm"
                      className="rounded-pill px-3 py-1 small fw-semibold"
                      onClick={() => handleQuickSelect(count)}
                    >
                      {count} câu
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-top-0 pt-0">
              <Button
                variant="light"
                className="quiz-btn-soft rounded-pill px-4"
                onClick={() => setShowModal(false)}
                type="button"
                disabled={loadingAI}
              >
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                className="rounded-pill px-4 fw-semibold"
                type="submit"
                disabled={loadingAI}
              >
                {loadingAI
                  ? "⌛ Đang sinh bài thi..."
                  : "✨ Bắt Đầu Sinh Quiz AI"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
};
export default QuizCreaatForm;
