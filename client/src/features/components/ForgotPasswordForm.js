import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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

const FogotPassWordForm = ({register,handleSubmit,forgotpassword,error,status,onsubmit}) => {


  return (
    <CCardGroup>
      <CCard className="p-4">
        <CCardBody>
          <CForm onSubmit={handleSubmit(onsubmit)}>
            <h1>Fogot Password</h1>
            <p className="text-body-secondary">
              Please enter your email to verify.
            </p>
            {status && <p style={{ color: "green" }}>{status}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
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
                placeholder="newpassword"
                autoComplete="current-password"
                {...register("newpassword")}
              />
            </CInputGroup>
            <CRow>
              <CCol xs={6}>
                <Link to="/login">
                  {" "}
                  <CButton
                    color="primary"
                    className="px-4 text-center"
                    type="button"
                  >
                    {" "}
                    Back
                  </CButton>
                </Link>
              </CCol>
              <CCol xs={6}>
                <CButton
                  color="primary"
                  className="px-4 text-center"
                  type="submit"
                >
                  {" "}
                  Change
                </CButton>
              </CCol>

              <CCol xs={6} className="text-right"></CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default FogotPassWordForm;
