import { useState } from "react";
import { GetProcessbyLession, SaveProcess } from "../api/auth-api";

const useSaveProcess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exits, setExits] = useState(false);
  const [process, setProcess] = useState(null);

  const GetProcess = async (lessonId) => {
    try {
      const res = await GetProcessbyLession(lessonId);
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const SaveUpdate = async ({ lessonId, courseId, lastPosition }) => {
    try {
      const res = await SaveProcess({
        courseId,
        lessonId,
        lastPosition,
      });
      setProcess(res);
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, SaveUpdate, exits, GetProcess, process };
};
export default useSaveProcess;
