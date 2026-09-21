import { useForm } from "react-hook-form";
import useForgotPassword from "../hooks/forgotpassword";
import FogotPassWordForm from "../components/ForgotPasswordForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { fogotShecma } from "../../../shared/validation/auth";
import { toast } from "react-toastify";
const FogotPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fogotShecma),
    mode: "onBlur",
  });
  const { senOtp, error, forgotPass } = useForgotPassword();

  const onsubmit = async (data) => {
    try {
      const datas = {
        ...data,
        type: "forgot_password",
      };
      const result = await forgotPass(datas);
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSendOtp = async () => {
    try {
      const email = getValues("email");
      const data = {
        email: email,
        type: "forgot_password",
      };
      const result = await senOtp(data);
      if (result.success) {
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
        />
      </div>
    </div>
  );
};

export default FogotPassword;
