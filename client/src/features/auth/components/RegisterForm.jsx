import {
  Button,
  Card,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";


const RegisterForm = ({
  register,
  handleSubmit,
  error,
  navigate,
  onSubmit,
  Setavatar,
  loading
}) => {
  return (
    <Card className="mx-4">
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>
          <p className="text-muted">Create your account</p>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Username */}
          <InputGroup className="mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <FormControl
              placeholder="Username"
              autoComplete="name"
              {...register("name")}
            />
          </InputGroup>

          {/* Avatar */}
          <InputGroup className="mb-3">
            <FormControl
              type="file"
              onChange={(e) => Setavatar(e.target.files[0])}
            />
          </InputGroup>

          {/* Email */}
          <InputGroup className="mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <FormControl
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
            />
          </InputGroup>

          {/* Password */}
          <InputGroup className="mb-3">
            <FormControl
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password")}
            />
          </InputGroup>

          {/* Repeat password */}
          <InputGroup className="mb-4">
            <FormControl
              type="password"
              placeholder="Repeat password"
              autoComplete="new-password"
              {...register("repeatpassword")}
            />
          </InputGroup>

          {/* Submit */}
          <div className="d-grid">
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? "Registering..." : "Create Account"}
            </Button>
          </div>

          {/* Back */}
          <Button
            type="button"
            variant="success"
            className="mt-3 w-100"
            onClick={() => navigate("/login")}
          >
            Back
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RegisterForm;