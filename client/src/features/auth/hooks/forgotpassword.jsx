import { useState } from "react";
import { forgotpasswordUser } from "../api/auth-api";




const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const forgotpassword = async (data) => {
    try {
      setError(null);
      setStatus(null);
      const res = await forgotpasswordUser(data);
      setStatus(res.message);
  
      return res;
    } catch (err) {
      
      const message = err.response?.data?.error || "failed";
      console.log(message);
      setError(message);
    }
  };
  return { forgotpassword, error ,status};
};

export default useForgotPassword;
