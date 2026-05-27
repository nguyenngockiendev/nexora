import { Link } from "react-router-dom";
import { Card, Form, Button, InputGroup } from "react-bootstrap";

const LoginForm = ({
  register,
  handleSubmit,

  loading,
  error,

  onSubmit,
}) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        padding: "20px",
      }}
    >
      <div
        className="d-flex gap-4 w-100"
        style={{
          maxWidth: "1000px",
        }}
      >
        {/* LEFT - LOGIN */}
        <Card
          className="flex-fill border-0 shadow-sm"
          style={{
            borderRadius: "18px",
          }}
        >
          <Card.Body className="p-5">
            <h2 className="fw-bold mb-1">Welcome back</h2>

            <p className="text-muted mb-4">
              Sign in to continue your learning journey
            </p>

            {error && (
              <div
                className="mb-3 text-danger small"
                style={{
                  background: "#fff5f5",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {error}
              </div>
            )}

            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* EMAIL */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <InputGroup>
                  <InputGroup.Text>📧</InputGroup.Text>
                  <Form.Control
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                </InputGroup>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>

                <InputGroup>
                  <InputGroup.Text>🔒</InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                </InputGroup>
              </Form.Group>

              {/* BUTTONS */}
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "10px",
                  }}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Link
                  to="/forgot-password"
                  className="text-decoration-none small"
                >
                  Forgot password?
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* RIGHT - INFO */}
        <Card
          className="flex-fill border-0 shadow-sm text-white"
          style={{
            borderRadius: "18px",
            background: "linear-gradient(135deg, #0d6efd, #6610f2)",
          }}
        >
          <Card.Body className="p-5 d-flex flex-column justify-content-center text-center">
            <h2 className="fw-bold mb-3">Start Learning Today</h2>

            <p className="mb-4 opacity-75">
              Join thousands of students learning modern web development, live
              classes, and real projects.
            </p>

            <ul
              className="list-unstyled mb-4 small"
              style={{ lineHeight: "2" }}
            >
              <li>✔ Live classes with instructors</li>
              <li>✔ Real-world projects</li>
              <li>✔ Lifetime access courses</li>
            </ul>

            <Link to="/register">
              <Button
                variant="light"
                style={{
                  borderRadius: "10px",
                  padding: "10px 18px",
                }}
              >
                Create Account
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
