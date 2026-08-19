import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import useLogin from "../hooks/uselogin";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, loading, error } = useLogin();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await login(data);

      if (result) {
        localStorage.setItem("token", result.token);

        navigate("/dashboard");
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
