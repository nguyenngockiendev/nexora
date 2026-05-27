import { useEffect, useState } from "react";
import { GetTitle } from "../api/lession-api";

const useSibarLession = (id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    const gettitlebycouses = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await GetTitle(id);
        setLoading(false);
        setTitle(res);
      } catch (error) {
        const message = error.response?.data?.message || "error";
        setError(message);
      }
    };

    gettitlebycouses();
  }, [id]);

  return { loading, error, title, setTitle };
};
export default useSibarLession;
