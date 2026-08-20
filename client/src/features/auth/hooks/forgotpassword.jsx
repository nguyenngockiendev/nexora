import { useState } from "react";
import { forgotpasswordUser } from "../api/auth-api";

const useForgotPassword = () => {
  const [error, setError] = useState(null);

  const forgotpassword = async (data) => {
    try {
      setError(null);
      const res = await forgotpasswordUser(data);
      return res;
    } catch (err) {
      const message = err.error || "thất bại";
      console.log(err);
      setError(message);
    }
  };
  return { forgotpassword, error };
};

export default useForgotPassword;
