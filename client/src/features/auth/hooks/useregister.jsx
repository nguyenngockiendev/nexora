import { useState } from "react";
import { registerUser, senOtpAPI } from "../api/auth-api";
import { toast } from "react-toastify";

const useUserRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const registers = async (data) => {
    try {
      setError(null);
      setLoading(true);
      const res = await registerUser(data);

      setLoading(false);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "Registers failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return { registers, error, loading, senOtp };
};
export default useUserRegister;
