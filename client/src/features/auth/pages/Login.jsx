import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import useLogin from "../hooks/uselogin";
import LoginForm from "../components/LoginForm";
import { Col, Container, Row } from "react-bootstrap";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, loading, error } = useLogin();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await login(data);

      if (result) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userInfor", JSON.stringify(result.userInfor));
        const decoded = jwtDecode(result.token);
        localStorage.setItem("role", decoded.role);
        navigate("/courses");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <LoginForm
      register={register}
      handleSubmit={handleSubmit}
      login={login}
      loading={loading}
      error={error}
      onSubmit={onSubmit}
      navigate={navigate}
    />
  );
};

export default Login;
