import { useState } from "react";
import { GetProcessbyLession, SaveProcess, GetAllProcess } from "../api/auth-api";

const useSaveProcess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exits, setExits] = useState(false);
  const [process, setProcess] = useState(null);
  const [allProcess, setAllProcess] = useState([]); // Chứa process của toàn bộ khóa học

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

  const FetchAllProcess = async (courseId) => {
    try {
      const res = await GetAllProcess(courseId);
      setAllProcess(res);
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
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
      
      // Cập nhật lại mảng allProcess để UI Sidebar render lại ngay lập tức
      setAllProcess((prev) => {
        const index = prev.findIndex(p => p.lessonId === lessonId);
        if (index !== -1) {
          const newArray = [...prev];
          newArray[index] = res;
          return newArray;
        }
        return [...prev, res];
      });
      
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, SaveUpdate, exits, GetProcess, process, FetchAllProcess, allProcess };
};
export default useSaveProcess;
