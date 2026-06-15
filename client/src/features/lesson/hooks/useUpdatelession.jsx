import { useState } from "react";
import { GetLessionbyid, UpdateLessionbyid } from "../api/lession-api";

const useUpdatelession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lession, setLession] = useState(null);

  const getLession = async (lessionId) => {
    try {
     
      const list = await GetLessionbyid(lessionId);
      setLession(list);
    } catch (error) {
      console.log(error);
    }
  };
  const update = async (lessionId,formData) => {
    // console.log("data",formData , "lessionId", lessionId);
    try {
      setLoading(true);
      setError(false);
      const res = await UpdateLessionbyid(lessionId,formData);
      return res;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, lession, update, getLession };
};
export default useUpdatelession;
