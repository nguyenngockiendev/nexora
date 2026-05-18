import { useEffect, useState } from "react";
import { getTitle } from "../../api/lession-api";


const useSibarLession = (id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    gettitlebycouses();
  }, [id]);
  const gettitlebycouses = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await getTitle(id);
      setLoading(false);
      setTitle(res);
     
    } catch (error) {
      const message = error.response?.data?.message || "error";
      setError(message);
    }

    
  };
  return { loading, error, title,setTitle };
};
export default useSibarLession;
