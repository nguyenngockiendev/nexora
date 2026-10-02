import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMycourse } from "../hooks/useMyCourse";
import CourseList from "../components/CourseList";
import usePagination from "../../../shared/hooks/usePagination";
import PaginationForm from "../../../shared/components/PaginationForm";

const MyCourses = () => {
  const { courses, error, loading } = useMycourse();
  const [filterdata, setFilterdata] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Courses");

  useEffect(() => {
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

    handfilter();
  }, [search, filter, courses]);
  const pagination = usePagination(filterdata, 3);
  return (
    <div className="w-full min-h-screen py-4 md:py-6">
      <CourseList
        courses={pagination.currentData}
        error={error}
        loading={loading}
        setFilter={setFilter}
        setSearch={setSearch}
      />
      {!loading && filterdata?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <PaginationForm pagination={pagination} itemName="khóa học" />
        </div>
      )}
    </div>
  );
};

export default MyCourses;
