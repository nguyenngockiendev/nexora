

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CoursesForm from "../components/CourseForm";
import useGetCourses from "../hooks/useCourse";
import usePayment from "../../payment/hooks/usePayment";


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

  useEffect(() => {
    const handfilter = () => {
      let result = [...courses];
      if (search) {
        result = result.filter((item) =>
          item?.title?.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (filter !== "All Courses") {
        result = result.filter((item) => item.level === filter);
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
              navigate={navigate}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Courses;
