import { useState } from "react";
import { forgotPassAPI, senOtpAPI } from "../api/auth-api";
import { toast } from "react-toastify";

const useForgotPassword = () => {
  const [error, setError] = useState(null);

  const senOtp = async (data) => {
    try {
      setError(null);
      const res = await senOtpAPI(data);
      return res;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      setError(msg);
      toast.error(msg);
    }
  };
  const forgotPass = async (data) => {
    try {
      setError(null);
      const res = await forgotPassAPI(data);
      return res;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      setError(msg);
      toast.error(msg);
    }
  };

  return { senOtp, error, forgotPass };
};

export default useForgotPassword;
