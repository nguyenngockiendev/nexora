import { useEffect, useState } from "react";
import { GetAlluserByAdmin } from "../api/user-api";

const useUsers = () => {
  const [loading, Setloading] = useState(false);
  const [error, Seterror] = useState("");
  const [userlist, Setuserlist] = useState([]);

  const getAll = async () => {
    try {
      Setloading(true);
      const res = await GetAlluserByAdmin();

      if (res.length === 0) {
        Seterror(res?.message);
      }
      Setuserlist(res);
    } catch (error) {
      console.log(error);
    } finally {
      Setloading(false);
    }
  };
  useEffect(() => {
    getAll();
  }, []);
  return { loading, error, userlist, getAll };
};
export default useUsers;
