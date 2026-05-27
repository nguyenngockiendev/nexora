import { useState } from "react";
import { DeleteLessionbyid } from "../api/lession-api";


const useDeleteLessionbyid = () => {
  const [errorlession, setError] = useState(null);
  const [loadinglession, setLoading] = useState(false);
  const Delete = async (data) => {
    try {
      setError(null);
      setLoading(true);
      const lession = await DeleteLessionbyid(data);
      setLoading(false);
      return lession;
      
    } catch (error) {
      const message = error.response?.data?.message || "error";
      setError(message);
    }
    finally {
      setLoading(false);
    }
  };
  return { errorlession, loadinglession, Delete };
};
export default useDeleteLessionbyid;
