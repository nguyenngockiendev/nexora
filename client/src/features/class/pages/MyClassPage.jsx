// import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetclassByIntructor } from "../hooks/useGetClassByIntructor";
import useChangeStatus from "../hooks/useChangeStatusClass";
import MyClassCart from "../components/MyClassCart";
import { useNavigate, useParams } from "react-router-dom";

const MyClass = () => {
  const { classId } = useParams();
  const { classs, error, loading, getclass } = useGetclassByIntructor(classId);
  const { notification, Change } = useChangeStatus();
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [filer, setFiler] = useState("All Status");
  const [filterday, setFilterday] = useState("All Day");
  const navigate = useNavigate();

  const handchangesStatus = async (data) => {
    try {
      await Change(data);
      await getclass();
      toast.success(notification);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handEditClass = () => {
      let finalResult = Array.isArray(classs) ? [...classs] : [];
      if (filer !== "All Status") {
        finalResult = finalResult.filter((item) => item.status === filer);
      }
      if (search) {
        finalResult = finalResult.filter((item) =>
          item?.className?.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (filterday !== "All Day") {
        finalResult = finalResult.filter(
          (item) => item?.schedule?.day === filterday,
        );
      }
      setResult(finalResult);
    };

    handEditClass();
  }, [classs, search, filer, filterday]);
  return (
    <div className="w-full">
      <MyClassCart
        classs={result}
        loading={loading}
        error={error}
        handchangesStatus={handchangesStatus}
        notification={notification}
        setSearch={setSearch}
        setFiler={setFiler}
        setFilterday={setFilterday}
        navigate={navigate}
      />
    </div>
  );
};

export default MyClass;
