import { useForm } from "react-hook-form";
import useForgotPassword from "../hooks/forgotpassword";
import FogotPassWordForm from "../components/ForgotPasswordForm";

const FogotPassword = () => {
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      <div className="fixed w-[500px] h-[500px] -top-[100px] -right-[100px] rounded-full bg-orb-1 pointer-events-none z-0" />
      <div className="fixed w-[400px] h-[400px] bottom-[10%] -left-[80px] rounded-full bg-orb-2 pointer-events-none z-0" />
      
      <div className="w-full max-w-lg z-10 px-4">
        <FogotPassWordForm 
          register={register}
          handleSubmit={handleSubmit}
          onsubmit={onsubmit}
          error={error}
          status={status}
        />
      </div>
    </div>
  );
};

export default FogotPassword;
