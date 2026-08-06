import { useEffect } from "react";
import { CreateAndUpRating, DeleteRating, GetRatings } from "../api/course-api";
import { useState } from "react";

const useRating = (courseId) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRatingAll = async () => {
    if (!courseId || courseId === "undefined") return;
    try {
      setLoading(true);
      const list = await GetRatings(courseId);
      setRatings(list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRatingAll();
  }, [courseId]);

  const CreateAndUpdate = async (data) => {
    try {
      await CreateAndUpRating(courseId, data);
      await getRatingAll();
    } catch (error) {
      console.log(error);
    }
  };

  const daleteRating = async (ratingId) => {
    try {
      await DeleteRating(ratingId);
      await getRatingAll();
    } catch (error) {
      console.log(error);
    }
  };

  return { ratings, loading, CreateAndUpdate, daleteRating };
};
export default useRating;
