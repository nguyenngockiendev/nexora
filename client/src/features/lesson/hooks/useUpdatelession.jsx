import { useState } from "react";
import { UpdateLessionbyid } from "../api/lession-api";


const useUpdatelession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (data) => {
    try {
      setLoading(true);
      setError(false);
      const res = await UpdateLessionbyid(data);
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, update };
};
export default useUpdatelession;
