import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import useLogin from "../hooks/uselogin";
import LoginForm from "../components/LoginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginShecma } from "../../../shared/validation/auth";

const Login = () => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginShecma),
    mode: "onBlur",
  });
  const { login, loading, error, loginByGoole } = useLogin();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await login(data);

      if (result) {
        const userid = jwtDecode(result);
        localStorage.setItem("token", result);
        localStorage.setItem("userId", userid?.userId);
        navigate("/courses-all");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onsumbmitByGG = async (googleToken) => {
    try {
      const result = await loginByGoole(googleToken);
      if (result) {
        const tokenString = result;
        localStorage.setItem("token", tokenString);
        const userid = jwtDecode(tokenString);
        localStorage.setItem("userId", userid?.userId);
        navigate("/courses-all");
      }
    } catch (error) {
      console.log(error);
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
      errors={errors}
      onsumbmitByGG={onsumbmitByGG}
    />
  );
};

export default Login;
