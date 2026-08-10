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
const QuizCreaatForm = ({
  addQuestion,
  exam,
  currentIndex,
  setCurrentIndex,
  setExam,
  handSubmit,
  error,
  navigate,
  courseId,
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
}) => {
  const optionLabels = ["A", "B", "C", "D"];
  return (
    <div className="create-exam-page  d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-4">
          <Button
            variant="light"
            className="quiz-btn-back rounded-pill"
            type="button"
            onClick={() => navigate(`/courses/details_course/${courseId}`)}
          >
            ← Back
          </Button>
          <div className="align-items-center">
            <h1 className="quiz-page-title mb-0">Tạo đề kiểm tra</h1>
          </div>
        </div>
        <div className="d-none d-sm-flex gap-2">
          <Button
            variant="light"
            className="quiz-btn-soft rounded-pill px-4"
            type="button"
          >
            Preview
          </Button>
          <Button
            variant="primary"
            className="rounded-pill px-4 fw-semibold"
            type="button"
          >
            Publish
          </Button>
        </div>
      </div>

      {/* 🔴 Thông báo lỗi từ Server */}
      {error && (
        <div className="alert alert-danger py-2 px-3 mb-3 small font-weight-bold">
          ⚠️ {error || "Đã xảy ra lỗi!"}
        </div>
      )}
      {!header && (
        <div className="alert alert-danger py-2 px-3 mb-3 small font-weight-bold">
          ⚠️{" "}
          {"bạn phải điền thông tin đề rồi mới được dùng tính năng Generate!"}
        </div>
      )}

      <Form onSubmit={handSubmit}>
        <Card className="quiz-card mb-3">
          <Card.Body className="p-3 px-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="quiz-icon-badge">✎</span>
              <Card.Title className="mb-0 fw-bold">Thông tin đề</Card.Title>
            </div>
            <Row className="g-3 align-items-end">
              <Col lg={5}>
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
              <Col sm={6} lg={2}>
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
              <Col sm={6} lg={2}>
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

              <Col sm={6} lg={3}>
                <Form.Group>
                  <Form.Label>Chọn bài học cần tạo Quizz:</Form.Label>
                  <Form.Select
                    className="quiz-input"
                    required
                    onChange={(e) => {
                      const selectid = e.target.value;
                      if (!selectid) {
                        hanhId(null, null);
                        return;
                      }

                      const item = Array.isArray(courses)
                        ? courses.find((c) => c._id === e.target.value)
                        : null;
                      if (item) hanhId(item.courseId?._id, item._id);
                    }}
                  >
                    <option value="">-- Chọn bài học cần tạo Quizz --</option>
                    {Array.isArray(courses) &&
                      courses.map((item) => (
                        <option key={item._id} value={item._id}>
                          [{item.courseId?.title}] - {item.title}
                        </option>
                      ))}
                  </Form.Select>
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

              <Card.Body className="p-3 d-flex flex-column gap-2">
                {exam.questions.map((q, index) => {
                  const isActive = index === currentIndex;

                  const isDone = q.question.trim() !== "";

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

                <Button
                  variant="outline-primary"
                  className="quiz-btn-add rounded-pill mt-2"
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
                {/* 3 Nút chọn nhanh số câu */}
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
                disabled={loading}
              >
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                className="rounded-pill px-4 fw-semibold"
                type="submit"
                disabled={loading}
              >
                {loading
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
