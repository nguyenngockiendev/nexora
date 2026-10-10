import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useUserRegister from "../hooks/useregister";
import RegisterForm from "../components/RegisterForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerShecma } from "../../../shared/validation/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerShecma),
    mode: "onBlur",
  });
  const { registers, error, loading, senOtp, sendingOtp } = useUserRegister();
  const [avatar, Setavatar] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [trig, setTrig] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!trig) return;
    if (countdown <= 0) {
      setTrig(false);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [trig, countdown]);

  const onSendOtp = async () => {
    try {
      const emailvld = await trigger("email");
      if (!emailvld) {
        return;
      }
      const email = getValues("email");
      const data = {
        email: email,
        type: "register",
      };
      const result = await senOtp(data);
      if (result?.success) {
        setCountdown(60);
        setTrig(true);
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("repeatpassword", data.repeatpassword);
      formData.append("otp", data.otp);
      formData.append("avatar", avatar);
      formData.append("type", "register");
      const result = await registers(formData);

      if (result.success) {
        toast.success(result.message || "Đăng ký tài khoản thành công! ✨");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      <div className="fixed w-[500px] h-[500px] -top-[100px] -right-[100px] rounded-full bg-orb-1 pointer-events-none z-0" />
      <div className="fixed w-[400px] h-[400px] bottom-[10%] -left-[80px] rounded-full bg-orb-2 pointer-events-none z-0" />

      <div className="w-full max-w-[680px] z-10 px-4">
        <RegisterForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          error={error}
          navigate={navigate}
          Setavatar={Setavatar}
          loading={loading}
          errors={errors}
          onSendOtp={onSendOtp}
          countdown={countdown}
          trig={trig}
          sendingOtp={sendingOtp}
        />
      </div>
    </div>
  );
};

export default Register;
