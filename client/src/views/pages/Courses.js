import { CCol, CContainer, CRow } from "@coreui/react";

import CoursesForm from "../../features/components/CourseForm";
import { useGetCourses } from "../../features/hooks/useCourse";
import usePayment from "../../features/hooks/usePayment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Courses = () => {
  const [statusmessage] = useSearchParams();
  const { courses, error, loading } = useGetCourses();
  const [filterdata, setFilterdata] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Courses");
  const {
    payment,
    error: errorPayment,
    loading: paymentloading,
  } = usePayment();
  const messagepayment = statusmessage.get("payment");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  
  const handfilter = () => {
    let result = [...courses];
    if (search) {
        result = result.filter((item) =>
        item?.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if(filter !== "All Courses"){
      result = result.filter(item=> item.level === filter);
    }
    setFilterdata(result);
  };
 useEffect(()=>{
  handfilter();
 },[search,filter,courses])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CoursesForm
              messagepayment={messagepayment}
              payment={payment}
              errorPayment={errorPayment}
              paymentloading={paymentloading}
              courses={filterdata}
              error={error}
              loading={loading}
              role={role}
              setSearch={setSearch}
              setFilter={setFilter}
              navigate ={navigate}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Courses;
