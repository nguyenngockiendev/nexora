import { useState } from "react";
import { ChangeStatus } from "../api/class-api";

const useChangeStatus = () => {
  const [notification, SetNotification] = useState("");

  const [erron, setErron] = useState(null);

  const Change = async (classId, status) => {
    try {
      const res = await ChangeStatus(classId, status);
      SetNotification(res?.message);

      return res;
    } catch (error) {
      const message = error.message || "error";
      setErron(message);
    }
  };
  return { notification, Change, erron };
};
export default useChangeStatus;
