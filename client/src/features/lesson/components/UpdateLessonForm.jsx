import { Card, Form, InputGroup, Button } from "react-bootstrap";

const UpdateLessonForm = ({
  register,
  Setvideo,
  loading,
  resource,
  navigate,
  handleupdate,
  handleSubmit,
  setResource,
}) => {
  return (
    <Card className="mx-4 shadow-sm border-0">
      <Card.Body className="p-4">
        {/* Header */}{" "}
        <div className="mb-4">
          {" "}
          <h3 className="fw-bold mb-1">Create Lesson</h3>{" "}
          <p className="text-muted mb-0">
            Add new lesson content for this course{" "}
          </p>{" "}
        </div>
        <Form onSubmit={handleSubmit(handleupdate)}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Lesson Title</label>
            <InputGroup>
              <InputGroup.Text>📘</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter lesson title"
                required
                {...register("title")}
              />
            </InputGroup>
          </div>

          {/* Video URL */}
          <div className="mb-3">
            <label className="form-label">Video URL</label>
            {/* {lession.videoUrl && (
              <div className="mb-2">
                <video src={lession.videoUrl} width="50px" />
              </div>
            )} */}
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

          {/* Preview toggle */}
          <div className="mb-3 d-flex align-items-center gap-2">
            <Form.Check {...register("isPreview")} />
            <span>Allow Preview</span>
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label">Content</label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Lesson description..."
              required
              {...register("content")}
            />
          </div>

          {/* Resource */}
          <InputGroup>
            <InputGroup.Text>Recouse</InputGroup.Text>
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

          {/* Buttons */}
          <div className="d-flex gap-2 mt-4">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving..." : "Save Lesson"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateLessonForm;
