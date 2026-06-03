import { Col, Container, Row } from "react-bootstrap";
import ManageClass from "../components/ManageLiveClass";
import useLiveCourse from "../hooks/useLiveCourses";
import { useNavigate } from "react-router-dom";

const ManageLiveclassRoom = () => {
  const { listCourseLive, error, loading } = useLiveCourse();
  const navigate = useNavigate();

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <ManageClass
              listCourseLive={listCourseLive}
              error={error}
              loading={loading}
              navigate={navigate}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageLiveclassRoom;
