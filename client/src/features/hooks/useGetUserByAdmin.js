import { useEffect, useState } from "react";
import { GetAllUserByAdmin } from "../../api/user-api";

const useGetUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getuser = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await GetAllUserByAdmin();
        setUser(res);
        setLoading(false);
        return res;
      } catch (err) {
        const message = error?.data?.message || "no result User";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
      
    };
    getuser();
  }, []);

  return { user, error, loading };
};

export default useGetUser;
