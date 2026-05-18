import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

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
    <CCard className="mx-4">
      <CCardBody className="p-4">
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>
          <p className="text-body-secondary">Create your account</p>
          {error && <p style={{ color: "red" }}> {error} </p>}

          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              placeholder="Username"
              autoComplete="name"
              {...register("name")}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              placeholder="Choice avatar"
              autoComplete="name"
              type="file"
              onChange={(e) => {
                Setavatar(e.target.files[0]);
              }}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>@</CInputGroupText>
            <CFormInput
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password")}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Repeat password"
              autoComplete="new-password"
              {...register("repeatpassword")}
            />
          </CInputGroup>
          <div className="d-grid" >
            <CButton type="submit" color="success"disabled={loading}>
              {loading? "Registering...":"Create Account"}
            </CButton>
          </div>
          <CButton
            type="button"
            color="success"
            className="mt-3"
            onClick={() => navigate("/login")}
          >
            Back
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
export default RegisterForm;
