import { CCol, CContainer, CRow } from "@coreui/react";
import CourseList from "../../features/components/CourseList";
import { useMycourse } from "../../features/hooks/useMyCourse";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MyCourses = () => {
  const { courses, error, loading } = useMycourse();
  const [filterdata, setFilterdata] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Courses");
  const handfilter = () => {
    let result = [...courses];
    if (search) {
      
        result = result.filter((item) =>
        item?.courseId?.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (filter !== "All Courses") {
      result = result.filter((item) => item.type === filter);
    }
    setFilterdata(result);
  };
 
  useEffect(() => {
    handfilter();
  }, [search, filter, courses]);
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CourseList
              courses={filterdata}
              error={error}
              loading={loading}
              setFilter={setFilter}
              setSearch={setSearch}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MyCourses;
