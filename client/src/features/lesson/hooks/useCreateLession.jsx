import { useState } from "react";
import { CreateLession } from "../api/lession-api";

const useCreateLession = () => {
  const [error, setError] = useState(null);

  const Lession = async (data) => {
    try {
      setError(null);
      const res = await CreateLession(data);
      setError(res?.data?.message);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setError(message);
    }
  };
  return { error, Lession };
};
export default useCreateLession;
