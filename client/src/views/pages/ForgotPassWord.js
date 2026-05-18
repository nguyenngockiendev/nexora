import { CCol, CContainer, CRow } from "@coreui/react";
import FogotPassWordForm from "../../features/components/ForgotPasswordForm";
import { useForm } from "react-hook-form";
import useForgotPassword from "../../features/hooks/forgotpassword";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { forgotpassword, error, status } = useForgotPassword();

  const onsubmit = async (data) => {
    try {
      const res = await forgotpassword(data);

      return res;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <FogotPassWordForm 
            register={register}
            handleSubmit={handleSubmit}
            onsubmit={onsubmit}
            error={error}
            status={status}
             
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
