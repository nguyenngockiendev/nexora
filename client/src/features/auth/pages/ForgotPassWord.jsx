import { useForm } from "react-hook-form";
import useForgotPassword from "../hooks/forgotpassword";
import FogotPassWordForm from "../components/ForgotPasswordForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { fogotShecma } from "../../../shared/validation/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const FogotPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(fogotShecma),
    mode: "onBlur",
  });
  const { senOtp, error, forgotPass, sendingOtp, loading } =
    useForgotPassword();
  const [countdown, setCountdown] = useState(60);
  const [trig, setTrig] = useState(false);
  const navigate = useNavigate();
  const onsubmit = async (data) => {
    try {
      const datas = {
        ...data,
        type: "forgot_password",
      };
      const result = await forgotPass(datas);
      if (result?.success) {
        toast.success(result.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!trig) {
      return;
    }
    if (countdown <= 0) {
      setTrig(false);
      return;
    }
    const time = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(time);
  }, [countdown, trig]);

  const onSendOtp = async () => {
    try {
      const isValid = await trigger("email");
      if (!isValid) {
        return;
      }
      const email = getValues("email");
      const data = {
        email: email,
        type: "forgot_password",
      };
      const result = await senOtp(data);

      if (result?.success) {
        setTrig(true);
        setCountdown(60);
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      <div className="fixed w-[500px] h-[500px] -top-[100px] -right-[100px] rounded-full bg-orb-1 pointer-events-none z-0" />
      <div className="fixed w-[400px] h-[400px] bottom-[10%] -left-[80px] rounded-full bg-orb-2 pointer-events-none z-0" />

      <div className="w-full max-w-[560px] z-10 px-4 py-10">
        <FogotPassWordForm
          register={register}
          handleSubmit={handleSubmit}
          onsubmit={onsubmit}
          error={error}
          errors={errors}
          onSendOtp={onSendOtp}
          countdown={countdown}
          trig={trig}
          sendingOtp={sendingOtp}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default FogotPassword;
