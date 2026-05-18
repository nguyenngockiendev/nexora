import { CCol, CContainer, CRow } from "@coreui/react";

import LoginForm from "../../features/components/LoginForm";
import { useForm } from "react-hook-form";
import useLogin from "../../features/hooks/uselogin";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, loading, error } = useLogin();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await login(data);

      if (result) {
        console.log("result:", result.userInfor);

        localStorage.setItem("token", result.token);
        localStorage.setItem("userInfor", JSON.stringify(result.userInfor));
        const decoded = jwtDecode(result.token);
        localStorage.setItem("role", decoded.role);

        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <LoginForm
              register={register}
              handleSubmit={handleSubmit}
              login={login}
              loading={loading}
              error={error}
              onSubmit={onSubmit}
              navigate={navigate}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
