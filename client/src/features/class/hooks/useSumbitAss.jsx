import { useState } from "react";
import {
  AssesmentClass,
  GradeAssignments,
  SumbitAssments,
} from "../api/class-api";

const useSumbitAss = () => {
  const [message, setMessage] = useState(null);
  const [assesment, setAssesment] = useState(null);
  const SumbitAss = async (data, classId) => {
    try {
      const res = await SumbitAssments(classId, data);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setMessage(message);
    }
  };
  const getAssesment = async (classId) => {
    try {
      const res = await AssesmentClass(classId);
      setAssesment(res);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setMessage(message);
    }
  };
  const SumbitGrade = async (data, classId) => {
    try {
      const res = await GradeAssignments(classId, data);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setMessage(message);
    }
  };
  return { SumbitAss, message, assesment, getAssesment, SumbitGrade };
};
export default useSumbitAss;
