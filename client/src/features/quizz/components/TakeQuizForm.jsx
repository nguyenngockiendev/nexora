import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/CreateExamPage.css";

const OPTION_LABELS = ["A", "B", "C", "D"];

function formatTime(seconds) {
  if (isNaN(seconds) || seconds == null || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const TakeQuizForm = ({
  quiz,
  currentIndex,
  setCurrentIndex,
  answers,
  onSelectAnswer,
  onSubmit,
  onRetry,
  submitted,
  result,
  timeLeft,
}) => {
  const navigate = useNavigate();
  const currentQuestion = quiz?.questions?.[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === quiz?.questions?.length - 1;
  const isTimeUp = timeLeft <= 0;

  const handleSubmitClick = () => {
    const unanswered = (quiz?.questions?.length || 0) - answeredCount;

    if (!submitted && unanswered > 0) {
      const confirmSubmit = window.confirm(
        `Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc muốn nộp bài?`,
      );
      if (!confirmSubmit) return;
    }

    onSubmit();
  };

  // ==========================================
  // RESULT VIEW (Màn hình Xem lại kết quả)
  // ==========================================
  if (submitted && result) {
    return (
      <div className="create-exam-page d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="light"
              className="quiz-btn-back rounded-pill"
              type="button"
              onClick={() => navigate(-1)}
            >
              ← Trang trước
            </Button>
            <h1 className="quiz-page-title mb-0">Kết quả bài kiểm tra</h1>
          </div>
          <Button
            variant="primary"
            className="rounded-pill px-4 fw-semibold"
            type="button"
            onClick={onRetry}
          >
            🔄 Làm lại bài thi
          </Button>
        </div>

        {/* Card tổng kết điểm */}
        <Card className="quiz-card mb-3 text-center">
          <Card.Body className="p-4">
            <div className="mb-2">
              <span
                className={`badge fs-6 px-3 py-2 rounded-pill ${
                  result.pass ? "bg-success" : "bg-danger"
                }`}
              >
                {result.pass ? "✓ ĐÃ ĐẠT" : "✕ CHƯA ĐẠT"}
              </span>
            </div>
            <h2 className="display-5 fw-extrabold text-slate-800 my-2">
              {result.attepms?.score?.toFixed(1)}{" "}
              <span className="fs-5 text-muted">/ 10 điểm</span>
            </h2>
            <p className="fw-bold text-muted mb-2">
              Đúng {result.attepms?.correctAnswers} /{" "}
              {result.attepms?.totalQuestions} câu hỏi
            </p>
            <p className="small text-muted mb-0">
              Yêu cầu đạt:{" "}
              {result.attepms?.quizId?.passScore?.toFixed(1) ||
                quiz?.passScore?.toFixed(1)}{" "}
              điểm
            </p>
            {isTimeUp && (
              <div className="alert alert-warning py-1.5 px-3 mt-3 d-inline-block small font-weight-bold">
                ⚠️ Bài làm đã được nộp tự động vì hết thời gian.
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Danh sách câu hỏi xem lại */}
        <div className="d-flex flex-column gap-3">
          <h4 className="fw-bold text-slate-800 fs-5 mb-0">
            Xem lại chi tiết câu trả lời
          </h4>
          {quiz?.questions?.map((q, qIndex) => {
            const selected = answers[q._id];
            const isCorrect = selected === q.correctAnswer;

            return (
              <Card key={q._id || qIndex} className="quiz-card">
                <Card.Body className="p-3 px-4">
                  <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                    <h6 className="fw-bold mb-0 leading-relaxed">
                      <span className="text-orange-600 me-2">
                        Câu {qIndex + 1}:
                      </span>
                      {q.question}
                    </h6>
                    <Badge
                      bg={isCorrect ? "success" : "danger"}
                      className="px-2.5 py-1 rounded-pill"
                    >
                      {isCorrect ? "Đúng ✓" : "Sai ✕"}
                    </Badge>
                  </div>

                  <Row className="g-2">
                    {q.options.map((optionText, oIndex) => {
                      const isSelected = selected === oIndex;
                      const isCorrectOption = q.correctAnswer === oIndex;

                      let answerClass = "quiz-input bg-white";
                      if (isCorrectOption) {
                        answerClass =
                          "quiz-input bg-success text-white fw-bold border-success";
                      } else if (isSelected && !isCorrectOption) {
                        answerClass =
                          "quiz-input bg-danger text-white fw-bold border-danger";
                      }

                      return (
                        <Col sm={6} key={oIndex}>
                          <InputGroup className="quiz-input-group">
                            <InputGroup.Text
                              className={`quiz-answer-key ${
                                isCorrectOption
                                  ? "bg-success text-white"
                                  : isSelected
                                    ? "bg-danger text-white"
                                    : ""
                              }`}
                            >
                              {OPTION_LABELS[oIndex]}
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              readOnly
                              value={optionText}
                              className={answerClass}
                            />
                          </InputGroup>
                        </Col>
                      );
                    })}
                  </Row>

                  {q.explanation && (
                    <div className="mt-3 p-2.5 rounded bg-light border-start border-3 border-info">
                      <span className="fw-bold text-info small d-block">
                        Giải thích:
                      </span>
                      <span className="small text-muted">{q.explanation}</span>
                    </div>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // TAKE QUIZ VIEW (Màn hình Làm bài kiểm tra)
  // Kế thừa 100% Cấu trúc Trang Create Quiz
  // ==========================================
  return (
    <div className="create-exam-page d-flex flex-column">
      {/* Header Bar trên cùng */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="light"
            className="quiz-btn-back rounded-pill"
            type="button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>
          <div>
            <h1 className="quiz-page-title mb-0">Làm bài kiểm tra</h1>
          </div>
        </div>

        <div className="d-none d-sm-flex gap-2">
          <Button
            variant="light"
            className="quiz-btn-soft rounded-pill px-4"
            type="button"
            onClick={() => navigate("/student/quizzes")}
          >
            Danh sách Quizz
          </Button>
          <Button
            variant="primary"
            className="rounded-pill px-4 fw-semibold"
            type="button"
            onClick={handleSubmitClick}
          >
            Nộp bài
          </Button>
        </div>
      </div>

      <Form onSubmit={(e) => e.preventDefault()}>
        {/* Card 1: Khối Thông Tin Bài Thi */}
        <Card className="quiz-card mb-3">
          <Card.Body className="p-3 px-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="quiz-icon-badge">📝</span>
              <Card.Title className="mb-0 fw-bold">
                Thông tin bài thi
              </Card.Title>
            </div>

            <Row className="g-3 align-items-end">
              <Col lg={5}>
                <Form.Group>
                  <Form.Label>Tên bài thi</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={quiz?.title || "Đang tải bài thi..."}
                    className="quiz-input fw-semibold"
                  />
                </Form.Group>
              </Col>

              <Col sm={4} lg={2}>
                <Form.Group>
                  <Form.Label>Thời gian còn lại</Form.Label>
                  <InputGroup className="quiz-input-group">
                    <Form.Control
                      type="text"
                      readOnly
                      value={formatTime(timeLeft)}
                      className={`quiz-input font-monospace fw-bold ${
                        timeLeft <= 60 ? "text-danger" : "text-dark"
                      }`}
                    />
                    <InputGroup.Text>Phút</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col sm={4} lg={3}>
                <Form.Group>
                  <Form.Label>Tiến độ làm bài</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={`Đã làm ${answeredCount}/${quiz?.questions?.length || 0} câu`}
                    className="quiz-input fw-semibold text-success"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Bố Cục 2 Cột Kế Thừa 100% Trang Create Quiz */}
        <Row className="g-4">
          {/* Cột Bên Trái: Danh Sách Câu Hỏi (Col lg={3}) */}
          <Col lg={3}>
            <Card className="quiz-card h-100">
              <Card.Header className="quiz-card-header d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0 fw-bold fs-6">Câu hỏi</Card.Title>
                <Badge pill className="quiz-count-badge">
                  {quiz?.questions?.length || 0}
                </Badge>
              </Card.Header>

              <Card.Body className="p-3 d-flex flex-column gap-2">
                {quiz?.questions?.map((q, index) => {
                  const isActive = index === currentIndex;
                  const isDone = answers[q._id] !== undefined;

                  return (
                    <button
                      key={q._id || index}
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
              </Card.Body>
            </Card>
          </Col>

          {/* Cột Bên Phải: Khối Làm Bài (Col lg={9} - Dải Cam Dọc Nổi Bật) */}
          <Col lg={9}>
            <Card className="quiz-card quiz-card--editor h-100">
              <Card.Header className="quiz-card-header d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0 fw-bold fs-6">
                  Bài làm câu hỏi
                </Card.Title>
                <Card.Subtitle className="text-muted small mb-0">
                  {currentIndex + 1 + "/" + (quiz?.questions?.length || 0)}
                </Card.Subtitle>
              </Card.Header>

              <Card.Body className="p-3 px-4 d-flex flex-column gap-3">
                {/* Nội Dung Câu Hỏi */}
                <Form.Group>
                  <Form.Label>Nội dung câu hỏi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    readOnly
                    value={currentQuestion?.question || ""}
                    className="quiz-input fw-bold bg-white"
                  />
                </Form.Group>

                {/* 4 Ô Đáp Án Quizizz-Style */}
                <div>
                  <Form.Label className="d-block mb-3">
                    Lựa chọn đáp án đúng
                  </Form.Label>
                  <Row className="g-3">
                    {currentQuestion?.options?.map((optionText, optionIdx) => {
                      const isSelected =
                        answers[currentQuestion._id] === optionIdx;
                      const answerKeyClasses = [
                        "quiz-answer-a",
                        "quiz-answer-b",
                        "quiz-answer-c",
                        "quiz-answer-d",
                      ];

                      return (
                        <Col sm={6} key={optionIdx}>
                          <div
                            onClick={() =>
                              onSelectAnswer(currentQuestion._id, optionIdx)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <InputGroup className="quiz-input-group">
                              <InputGroup.Text
                                className={`quiz-answer-key ${
                                  answerKeyClasses[optionIdx % 4]
                                } ${isSelected ? "is-correct" : ""}`}
                              >
                                {OPTION_LABELS[optionIdx]}
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                readOnly
                                value={optionText}
                                className={`quiz-input ${
                                  isSelected
                                    ? "border-primary bg-orange-50 font-weight-bold"
                                    : ""
                                }`}
                                style={{ cursor: "pointer" }}
                              />
                            </InputGroup>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                {/* Hàng Nút Thao Tác Chân Trang Trong Card */}
                <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top">
                  <Button
                    variant="light"
                    className="quiz-btn-soft rounded-pill px-4"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                  >
                    ← Câu trước
                  </Button>

                  {!isLastQuestion ? (
                    <Button
                      variant="primary"
                      className="rounded-pill px-4 fw-semibold"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                    >
                      Câu tiếp →
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      className="rounded-pill px-4 fw-semibold"
                      onClick={handleSubmitClick}
                    >
                      Nộp bài thi
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TakeQuizForm;
