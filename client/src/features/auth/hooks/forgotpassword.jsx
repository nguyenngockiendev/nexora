import { useState } from "react";
import { forgotPassAPI, senOtpAPI } from "../api/auth-api";
import { toast } from "react-toastify";

const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const senOtp = async (data) => {
    try {
      setError(null);
      setSendingOtp(true);
      const res = await senOtpAPI(data);
      return res;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      setError(msg);
    } finally {
      setSendingOtp(false);
    }
  };
  const forgotPass = async (data) => {
    try {
      setError(null);
      setLoading(true);
      const res = await forgotPassAPI(data);
      return res;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { senOtp, error, forgotPass, sendingOtp, loading };
};

export default useForgotPassword;
