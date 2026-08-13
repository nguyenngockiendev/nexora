import {
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Button,
  Badge,
} from "react-bootstrap";

const LessionCart = ({
  navigate,
  setSearchTerm,
  filteredCourses,
  searchTerm,
}) => {
    console.log(filteredCourses)
  return (
    <div className="p-3 p-md-4 w-100">
      {/* Header Banner */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="quiz-page-title mb-1">Lessons</h1>
          <p className="text-muted small mb-0">
            Quản lý giáo trình bài học cho các khóa học Recorded (Đã quay sẵn)
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4" style={{ maxWidth: "450px" }}>
        <InputGroup className="quiz-input-group">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="quiz-input"
          />
        </InputGroup>
      </div>

      <Row className="g-3">
        {filteredCourses.map((course) => (
          <Col md={6} lg={4} key={course._id}>
            <Card
              className="quiz-card h-100 p-3 cursor-pointer transition-all hover-shadow"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/instructor/lessons/${course._id}`)}
            >
              <Card.Body className="p-2 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Badge pill bg="warning" text="dark" className="px-3 py-1">
                      {course.type}
                    </Badge>
                    <span className="text-muted fs-5">›</span>
                  </div>
                  <Card.Title className="fw-bold fs-5 mb-2 text-slate-800">
                    {course.title}
                  </Card.Title>
                  <p className="text-muted small mb-3">
                    Giảng viên: {course.instructor}
                  </p>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-3 border-top border-warning-subtle">
                  <span className="fw-bold small text-slate-600">
                    {course.lessonCount} lessons
                  </span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill px-3 fw-semibold"
                  >
                    Quản lý bài ›
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default LessionCart;
