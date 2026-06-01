

import {useParams} from "react-router-dom";


import { Col, Container, Row } from "react-bootstrap";
import { useDetailsCourse } from "../hooks/useDetailsCourseClass";
import usePayment from "../../payment/hooks/usePayment";
import DetailsCourse from "../components/CourseDetails";
const DetailsCourseLive = () => {
  const { courseId } = useParams();
  const { detalscourse, error, loading } = useDetailsCourse(courseId);
  const {
    payment,
    error: errorPayment,
    loading: paymentloading,
  } = usePayment();

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <DetailsCourse
              detalscourse={detalscourse}
              error={error}
              loading={loading}
              payment={payment}
              errorPayment={errorPayment}
              paymentloading={paymentloading}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailsCourseLive;
