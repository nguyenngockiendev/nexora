import { CCol, CContainer, CRow } from "@coreui/react";
import RegisterForm from "../../features/components/RegisterForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useUserRegister from "../../features/hooks/useregister";
import { useState } from "react";
import { toast } from "react-toastify";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const { registers, error, status,loading } = useUserRegister();
  const [avatar, Setavatar] = useState(null);
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("repeatpassword", data.repeatpassword);
      formData.append("role", data.role);
      formData.append("avatar", avatar);
      const result = await registers(formData);
      
      if (result) {
        toast.success(result.message ||"Register successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <RegisterForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              error={error}
              navigate={navigate}
              Setavatar={Setavatar}
              loading={loading}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
