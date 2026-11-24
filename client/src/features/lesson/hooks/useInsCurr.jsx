import { useEffect, useState } from "react";
import { GetLessionDetails } from "../api/lession-api";

const useInsCurr = (courseId, classId) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detaisLession, setDetailslession] = useState([]);

  useEffect(() => {
    const gettitlebycouses = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await GetLessionDetails(courseId, classId);

        setDetailslession(res);
      } catch (error) {
        const message = error.response?.data?.message || "error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    gettitlebycouses();
  }, [courseId, classId]);

  return { loading, error, detaisLession };
};
export default useInsCurr;
