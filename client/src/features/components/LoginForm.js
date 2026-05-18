import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const LoginForm = ({
  register,
  handleSubmit,
  login,
  loading,
  error,
  navigate,
  onSubmit,
}) => {
  return (
    <CCardGroup>
      <CCard className="p-4">
        <CCardBody>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <p className="text-body-secondary">Sign In to your account</p>
            {error && <p style={{ color: "red" }}> {error}</p>}

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="email"
                autoComplete="email"
                {...register("email")}
              />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                {...register("password")}
              />
            </CInputGroup>
            <CRow>
              <CCol xs={6}>
                <CButton
                  color="primary"
                  className="px-4"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading" : "Login"}
                </CButton>
              </CCol>

              <CCol xs={6} className="text-right">
                <Link to="/forgot-password">
                  {" "}
                  <CButton color="link" className="px-0">
                    Forgot password?
                  </CButton>
                </Link>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard className="text-white bg-primary py-5" style={{ width: "44%" }}>
        <CCardBody className="text-center">
          <div>
            <h2>Sign up</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link to="/register">
              <CButton color="primary" className="mt-3" active tabIndex={-1}>
                Register Now!
              </CButton>
            </Link>
          </div>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default LoginForm;
