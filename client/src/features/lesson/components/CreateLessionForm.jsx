import { Card, Form, InputGroup, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const CreateLession = ({
  navigate,
  register,
  handleSubmit,
  onSubmit,

  resource,
  setResource,

  loading,
  setVideoFile,
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
        <Form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Video */}
          <div className="mb-3">
            <label className="form-label">Video URL</label>
            <InputGroup>
              <InputGroup.Text>🎥</InputGroup.Text>
              <Form.Control
                type="file"
                required
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setVideoFile(e.target.files[0]);
                }}
              />
            </InputGroup>
          </div>

          {/* Duration + Order */}
          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Order</label>
              <InputGroup>
                <InputGroup.Text>#</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="1"
                  required
                  {...register("order")}
                />
              </InputGroup>
            </div>
          </div>

          {/* Preview */}
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
          <InputGroup className="mb-3">
            <InputGroup.Text>Resource</InputGroup.Text>
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

export default CreateLession;
