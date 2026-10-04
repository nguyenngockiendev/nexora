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
import { ArrowRight, RotateCcw, Trophy, Sparkles } from "lucide-react";
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
        {/* ── Mascot + Speech Bubble Section ── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 my-4 max-w-4xl mx-auto w-full px-3">
          {/* Mascot Image */}
          <div className="relative shrink-0 flex items-center justify-center">
            <img
              src={result.pass ? "/pass.png" : "/false.png"}
              alt="Mascot"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Speech Bubble (Bong bóng hội thoại) */}
          <div
            className="relative p-6 sm:p-7 rounded-[2rem] shadow-lg max-w-md w-full border backdrop-blur-xl transition-all flex flex-col justify-between"
            style={{
              background: result.pass
                ? "linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 243, 232, 0.96) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 241, 242, 0.96) 100%)",
              borderColor: result.pass
                ? "rgba(249, 115, 22, 0.3)"
                : "rgba(244, 63, 94, 0.3)",
              boxShadow: result.pass
                ? "0 14px 35px rgba(249, 115, 22, 0.12)"
                : "0 14px 35px rgba(244, 63, 94, 0.1)",
            }}
          >
            {/* Đuôi nhọn hội thoại (Desktop: trỏ sang Mascot bên trái) */}
            <div
              className="hidden md:block absolute -left-[18px] top-12 w-5 h-6 pointer-events-none"
              style={{ filter: "drop-shadow(-2px 2px 2px rgba(0,0,0,0.03))" }}
            >
              <svg viewBox="0 0 20 24" className="w-full h-full" style={{ overflow: "visible" }}>
                <path
                  d="M 20,2 Q 10,8 1,22 Q 11,18 20,17 Z"
                  fill={result.pass ? "#fffcf8" : "#fff7f8"}
                  stroke={result.pass ? "rgba(249, 115, 22, 0.3)" : "rgba(244, 63, 94, 0.3)"}
                  strokeWidth="1.5"
                />
                {/* Che đường viền để đuôi và hộp thoại nối liền mạch */}
                <line
                  x1="19.5"
                  y1="2.5"
                  x2="19.5"
                  y2="16.5"
                  stroke={result.pass ? "#fffcf8" : "#fff7f8"}
                  strokeWidth="3.5"
                />
              </svg>
            </div>

            {/* Đuôi nhọn hội thoại (Mobile: trỏ lên Mascot ở phía trên) */}
            <div
              className="md:hidden absolute -top-[15px] left-12 w-6 h-4 pointer-events-none"
              style={{ filter: "drop-shadow(0px -2px 2px rgba(0,0,0,0.03))" }}
            >
              <svg viewBox="0 0 24 16" className="w-full h-full" style={{ overflow: "visible" }}>
                <path
                  d="M 2,16 Q 8,10 22,1 Q 18,11 17,16 Z"
                  fill={result.pass ? "#fffcf8" : "#fff7f8"}
                  stroke={result.pass ? "rgba(249, 115, 22, 0.3)" : "rgba(244, 63, 94, 0.3)"}
                  strokeWidth="1.5"
                />
                {/* Che viền phía trên */}
                <line
                  x1="2.5"
                  y1="15.5"
                  x2="16.5"
                  y2="15.5"
                  stroke={result.pass ? "#fffcf8" : "#fff7f8"}
                  strokeWidth="3.5"
                />
              </svg>
            </div>

            {result.pass ? (
              <>
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-100/90 border border-orange-200"
                    style={{ borderRadius: "9999px" }}
                  >
                    <Trophy size={13} className="text-orange-500" /> Xuất sắc
                  </span>
                  <h4 className="text-xl font-black text-slate-800 mt-2.5 mb-2">
                    Tưởng bài này thế nào... 😏
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed mb-5">
                    Hóa ra cũng chỉ có vậy thôi! Bài này quá dễ đối với bạn rồi. Kiến thức đã nằm chắc trong tay, giữ vững phong độ này và sang bài tiếp theo ngay nào!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs sm:text-sm font-black text-white transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                    borderRadius: "9999px",
                  }}
                >
                  <span>Chinh Phục Bài Học Tiếp Theo</span>
                  <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <>
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-100/90 border border-rose-200"
                    style={{ borderRadius: "9999px" }}
                  >
                    <Sparkles size={13} className="text-rose-500" /> Cố lên nhé
                  </span>
                  <h4 className="text-xl font-black text-slate-800 mt-2.5 mb-2">
                    Hơi tiếc một xíu nè... 🥺
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed mb-5">
                    Chỉ thiếu một tẹo điểm nữa thôi là chạm đích rồi! Đừng nản lòng nhé, bạn hãy mở lại video bài giảng để ôn tập kỹ hơn rồi quay lại phục thù nha.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full sm:flex-1 py-2.5 px-4 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all cursor-pointer shadow-xs text-center"
                    style={{ borderRadius: "9999px" }}
                  >
                    📺 Xem Lại Bài Giảng
                  </button>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="w-full sm:flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white transition-all shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer text-center"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                      borderRadius: "9999px",
                    }}
                  >
                    <RotateCcw size={13} />
                    <span>Làm Lại Bài Thi</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
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
