import { useState } from "react";
import { CreateClass } from "../../api/class-api";

const useCreateClass = () => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const Create = async (data,courseId) => {
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
     
      setLoading(true);
      const res = await CreateClass(finalData,courseId);
      setLoading(false);
      setNotification(res?.data?.message);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "erron";
      setNotification(message);
    }
  };
  return { notification, Create, loading };
};
export default useCreateClass;
