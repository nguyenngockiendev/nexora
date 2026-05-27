
import {
  Button,
  Card,
  CardBody,
  Form,
  FormSelect,
  InputGroup,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

import "react-toastify/dist/ReactToastify.css";

const CreateCourese = ({
  register,
  handleSubmit,
  error,
  navigate,
  onSubmit,
  setThumbnail,
  loading,
  onConfirm,
  onCancel,
  exits,
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <Card
        className="border-0"
        style={{
          width: "100%",
          maxWidth: "750px",
          borderRadius: "24px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardBody className="p-5">
          {/* Header */}
          <div className="mb-4">
            <h1 className="fw-bold mb-2">Create New Course</h1>

            <p className="text-medium-emphasis mb-0">
              Build and publish your learning content
            </p>
          </div>

          {/* Error */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Course Title</label>

              <InputGroup>
                <InputGroupText>{/* <Icon icon={cilUser} /> */}</InputGroupText>

                <Form.Control
                  placeholder="Enter course title"
                  autoComplete="title"
                  {...register("title")}
                  style={{
                    padding: "12px",
                  }}
                />
              </InputGroup>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Description</label>

              <textarea
                className="form-control"
                rows={5}
                placeholder="Write course description..."
                {...register("description")}
                style={{
                  borderRadius: "12px",
                  padding: "14px",
                  resize: "none",
                }}
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Course Price</label>

              <InputGroup>
                <InputGroupText>
                  {/* <Icon icon={cilLockLocked} /> */}
                </InputGroupText>

                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  min="0"
                  autoComplete="price"
                  {...register("price")}
                  style={{
                    padding: "12px",
                  }}
                />
              </InputGroup>
            </div>

            {/* Thumbnail */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Thumbnail</label>

              <div
                style={{
                  border: "2px dashed #ced4da",
                  borderRadius: "16px",
                  padding: "30px",
                  textAlign: "center",
                  background: "#fafafa",
                }}
              >
                <div
                  className="mb-3"
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  🖼️
                </div>

                <p className="text-medium-emphasis mb-3">
                  Upload your course thumbnail
                </p>

                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setThumbnail(e.target.files[0]);
                  }}
                />
              </div>
            </div>

            {/* Level */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Course Level</label>

              <FormSelect
                {...register("level")}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                }}
              >
                <option value="">Select level</option>

                <option value="beginner">Beginner</option>

                <option value="intermediate">Intermediate</option>

                <option value="advanced">Advanced</option>
              </FormSelect>
              <FormSelect
                {...register("type")}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  marginTop: "16px",
                }}
              >
                {" "}
                <option value="">Select course type</option>
                <option value="live">live</option>
                <option value="recorded">Recorded</option>
              </FormSelect>
              <option value="">Select course type</option>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 mt-4">
              <Button
                type="submit"
                color="success"
                disabled={loading}
                className="flex-grow-1"
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
              >
                {loading ? "Creating..." : "Create Course"}
              </Button>

              <Button
                type="button"
                color="light"
                onClick={() => navigate("/courses")}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "1px solid #dee2e6",
                }}
              >
                Back
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      {exits && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "16px",
              width: "400px",
            }}
          >
            <h4 className="fw-bold mb-3">Course Created</h4>

            <p className="text-medium-emphasis mb-4">Create live class now?</p>

            <div className="d-flex gap-2">
              <Button
                color="light"
                className="flex-grow-1"
                onClick={() => onCancel()}
              >
                Later
              </Button>

              <Button
                color="success"
                className="flex-grow-1"
                onClick={() => onConfirm()}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateCourese;
