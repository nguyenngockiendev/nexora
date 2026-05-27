import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMycourse } from "../hooks/useMyCourse";
import CourseList from "../components/CourseList";

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
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <CourseList
              courses={filterdata}
              error={error}
              loading={loading}
              setFilter={setFilter}
              setSearch={setSearch}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyCourses;
