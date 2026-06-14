import { useEffect, useState } from "react";
import { GetStudentsByIntructor, RefectStudent, RemoveStudentinClass } from "../api/class-api";

const useClassStudents = (classId) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liststudents, Setliststudents] = useState([]);
  const [sucess, setSucess] = useState("");

  const RemoveStuden = async (data) => {
    try {
      const result = await RemoveStudentinClass({
        classId: data?.classId,
        studentId: data?.userId?._id,
        status: data?.status === "active" ? "remove" : "active",
      });
      setSucess(result.message);
    } catch (error) {
      const message = error.message || "error";
      setError(message);
    }
  };
    const RefectStuden = async (data) => {
    try {
      const result = await RefectStudent({
        classId: data?.classId,
        studentId: data?.userId?._id,
        status: data?.status === "active" ? "remove" : "active",
      });
      setSucess(result.message);
    } catch (error) {
      const message = error.message || "error";
      setError(message);
    }
  };
  const GetAllStudents = async () => {
    try {
      setLoading(true);
      const list = await GetStudentsByIntructor({
        classId: classId,
      });
      Setliststudents(list);
    } catch (error) {
      const message = error.message || "error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetAllStudents();
  }, []);
  return { liststudents, sucess, error, loading, RemoveStuden, GetAllStudents,RefectStuden};
};
export default useClassStudents;
