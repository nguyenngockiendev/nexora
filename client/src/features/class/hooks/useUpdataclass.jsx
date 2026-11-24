import { useState } from "react";
import { UpdatClassById } from "../api/class-api";

const useUpdateClass = () => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const Update = async (data, classId) => {
    setNotification(null);
    setLoading(true);
    try {
      const finalData = {
        className: data.Classname,
        description: data.Description,
        maxStudents: data.Studentsnumber,
        registerDeadline: data.Dealine,
        meetingLink: data.Meetinglink,
        schedule: {
          day: data.Day,
          startTime: data.Starttime,
          endTime: data.Endtime,
        },
        startDate: data.Startdate,
        endDate: data.Enddate,
        price: data.Price,
      };

      const res = await UpdatClassById(finalData, classId);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setNotification(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { notification, Update, loading };
};
export default useUpdateClass;
