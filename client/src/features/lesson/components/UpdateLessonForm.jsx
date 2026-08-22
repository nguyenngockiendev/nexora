import { Card, Form, InputGroup, Button } from "react-bootstrap";

const UpdateLessonForm = ({
  register,
  Setvideo,
  loading,
  resource,
  setResource,
  navigate,
  handleupdate,
  handleSubmit,
  isuploading,
  uploadPercent,
}) => {
  return (
    <Card className="mx-4 shadow-sm border-0">
      <Card.Body className="p-4">
        <div className="mb-4">
          <h3 className="fw-bold mb-1">Cập Nhật Bài Học</h3>
          <p className="text-muted mb-0">
            Chỉnh sửa thông tin, video và tài liệu của bài học
          </p>
        </div>
        <Form onSubmit={handleSubmit(handleupdate)}>
          <div className="mb-3">
            <label className="form-label">Tiêu đề bài học</label>
            <InputGroup>
              <InputGroup.Text>📘</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề bài học"
                required
                {...register("title")}
              />
            </InputGroup>
          </div>

          <div className="mb-3">
            <label className="form-label">Video bài giảng</label>
            <InputGroup>
              <InputGroup.Text>🎥</InputGroup.Text>
              <Form.Control
                type="file"
                placeholder="https://..."
                required
                onChange={(e) => {
                  Setvideo(e.target.files[0]);
                }}
              />
            </InputGroup>
          </div>

          <div className="mb-3 d-flex align-items-center gap-2">
            <Form.Check {...register("isPreview")} />
            <span>Cho phép học thử miễn phí</span>
          </div>

          <div className="mb-3 d-flex align-items-center gap-2">
            <Form.Check
              {...register("status")}
              type="checkbox"
              value="PROCESSING"
            />
            <span>Tự động tạo phụ đề AI (Speech-to-Text)</span>
          </div>

          <div className="mb-3">
            <label className="form-label">Nội dung mô tả bài học</label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Mô tả nội dung bài học..."
              required
              {...register("content")}
            />
          </div>

          <InputGroup>
            <InputGroup.Text>Tài liệu đính kèm</InputGroup.Text>
            <Form.Control
              type="file"
              placeholder="PDF"
              onChange={(e) => {
                setResource({
                  ...resource,
                  title: e.target.files[0].name,
                  url: e.target.files[0],
                });
              }}
            />
          </InputGroup>

          <div className="d-flex gap-2 mt-4">
            <Button type="submit" variant="primary" disabled={isuploading}>
              {isuploading ? `Đang lưu... ${uploadPercent}%` : "Lưu bài học"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateLessonForm;
