import { useEffect, useState } from "react";
import { GetCourses } from "../../course/api/course-api";

const useLiveCourse = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listCourseLive, SetlistCourseLive] = useState([]);
  console.log(listCourseLive);
  useEffect(() => {
    const listClassLive = async () => {
      try {
        setLoading(true);
        const list = await GetCourses();
        const newlist = list?.filter((item) => item?.type === "live");
        SetlistCourseLive(newlist);
        setLoading(false);
      } catch (error) {
        const message = error?.data?.message || "no result courses";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    listClassLive();
  }, []);
  return { listCourseLive, error, loading };
};
export default useLiveCourse;
