import { useEffect, useState } from "react";
import { JoiClassByUser } from "../api/class-api";

const useJoinClass = (classId) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classs, setClasss] = useState(null);

  useEffect(() => {
    const JoinClass = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await JoiClassByUser(classId);
        setClasss(res);

        setLoading(false);
        return res;
      } catch (error) {
        const message = error?.data?.message || "no result courses";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    };
    JoinClass();
  }, [classId]);

  return { classs, error, loading };
};

export default useJoinClass;
