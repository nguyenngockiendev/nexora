import { useEffect, useState } from "react";
import { GetClassbyInstructor } from "../../api/class-api";


const useGetclassByIntructor = () => {
  const [classs, setClasss ] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
useEffect(() => {
  getclass();
}, []);

  const getclass = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await GetClassbyInstructor();
       
      setClasss(result);
      
      setLoading(false);
    } catch (error) {
      const message = error.response?.data?.message || "no result courses";
      setError(message);
    }
  };
  return { classs, error, loading };
};


export { useGetclassByIntructor };
