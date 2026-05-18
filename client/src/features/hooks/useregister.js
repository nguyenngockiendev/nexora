import { useState } from "react";
import { registerUser } from "../../api/auth-api";

const useUserRegister = () => {
  const [error, setError] = useState(null);
  const[loading, setLoading] = useState(false);

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
    }
    finally {
      setLoading(false);
    }
  };
  return { registers, error,loading };
};
export default useUserRegister;
