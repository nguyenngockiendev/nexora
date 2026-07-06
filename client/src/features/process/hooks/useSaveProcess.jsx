import { useState } from "react";
import { SaveProcess } from "../api/auth-api";

const useSaveProcess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exits, setExits] = useState(false);

  const SaveUpdate = async ({ lessonId, courseId, lastPosition }) => {
    try {
      const res = await SaveProcess({
        courseId,
        lessonId,
        lastPosition,
      });
      setExits(true);
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, SaveUpdate, exits };
};
export default useSaveProcess;
