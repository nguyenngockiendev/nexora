import { useState } from "react";
import { ChangeStatus } from "../api/class-api";

const useChangeStatus = () => {
  const [notification, SetNotification] = useState("");

  const [erron, setErron] = useState(null);

  const Change = async (data) => {
    try {
      const res = await ChangeStatus({
        classId: data._id,
        status: ["closed", "closes"].includes(data.status) ? "open" : "closed",
      });
      SetNotification(res?.message);

      return res;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "error";
      setErron(message);
      throw error;
    }
  };
  return { notification, Change, erron };
};
export default useChangeStatus;
