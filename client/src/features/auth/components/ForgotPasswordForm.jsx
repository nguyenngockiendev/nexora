import { Link } from "react-router-dom";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const FogotPassWordForm = ({
  register,
  handleSubmit,

  error,
  status,
  onsubmit,
}) => {
  return (
    <div className="d-flex justify-content-center">
      <Card className="p-4" style={{ width: "500px" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit(onsubmit)}>
            <h1>Forgot Password</h1>
            <p className="text-muted">Please enter your email to verify.</p>

            {status && <p style={{ color: "green" }}>{status}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Email */}
            <InputGroup className="mb-3">
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                placeholder="email"
                autoComplete="email"
                {...register("email")}
              />
            </InputGroup>

            {/* New Password */}
            <InputGroup className="mb-4">
              <InputGroup.Text>🔒</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="newpassword"
                autoComplete="current-password"
                {...register("newpassword")}
              />
            </InputGroup>

            {/* Buttons */}
            <Row>
              <Col xs={6}>
                <Link to="/login">
                  <Button variant="primary" type="button" className="w-100">
                    Back
                  </Button>
                </Link>
              </Col>

              <Col xs={6}>
                <Button variant="primary" type="submit" className="w-100">
                  Change
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FogotPassWordForm;
