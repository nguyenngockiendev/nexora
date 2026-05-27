import { useState } from "react";
import { loginUser } from "../api/auth-api";


const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await loginUser(data.email, data.password);
      localStorage.setItem("token", res.role);
      setLoading(false);
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
     
      setError(message);
      setLoading(false);
      return null;
    }
  };
  return { login, error, loading };
};

export default useLogin;
