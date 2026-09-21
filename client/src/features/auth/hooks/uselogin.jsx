import { useState } from "react";
import { loginByGooleAPI, loginUser } from "../api/auth-api";
import { toast } from "react-toastify";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await loginUser(data.email, data.password);

      setLoading(false);
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";

      setError(message);
      setLoading(false);
      return null;
    }
  };
  const loginByGoole = async (googleToken) => {
    try {
      setLoading(true);
      setError(null);
      const res = await loginByGooleAPI(googleToken);
      return res;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";
      setError(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };
  return { login, error, loading, loginByGoole };
};

export default useLogin;
