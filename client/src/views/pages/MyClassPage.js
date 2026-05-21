import { CCol, CContainer, CRow } from "@coreui/react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyClassCart from "../../features/components/MyClassCart";
import { useGetclassByIntructor } from "../../features/hooks/useGetClassByIntructor";
import useChangeStatus from "../../features/hooks/useChangeStatusClass";

const MyClass = () => {
  const { classs, error, loading } = useGetclassByIntructor();
  const { notification, Change, erron } = useChangeStatus();
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [filer, setFiler] = useState("All Status");
  const [filterday, setFilterday] = useState("All Day");
  const navigate = useNavigate();

  const handchangesStatus = async (classId, status) => {
    try {
      const res = await Change(classId, status);
      toast.success(notification);
      classs;
      console.log("notification", notification);
      console.log("erron", erron);
    } catch (error) {
      console.log(error);
    }
  };

  const handEditClass = () => {
    let finalResult = [...classs];
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
  useEffect(() => {
    handEditClass();
  }, [classs, search, filer,filterday]);
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <MyClassCart
              classs={result}
              loading={loading}
              error={error}
              handchangesStatus={handchangesStatus}
              notification={notification}
              setSearch={setSearch}
              setFiler={setFiler}
              setFilterday={setFilterday}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MyClass;
