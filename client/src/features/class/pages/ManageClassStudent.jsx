// import { toast } from "react-toastify";

import { Col, Container, Row } from "react-bootstrap";
import ClassStudents from "../components/ClassStudents";
import { useNavigate, useParams } from "react-router-dom";
import useClassStudents from "../hooks/useClassStudents";

import { toast } from "react-toastify";

const ManageClassStudents = () => {
  const { classId } = useParams();

  const { liststudents, error, loading, RemoveStuden, GetAllStudents, sucess } =
    useClassStudents(classId);
  const handremoveStudent = async (data) => {
    try {
      await RemoveStuden(data);
      await GetAllStudents();
      toast(sucess);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <ClassStudents
              liststudents={liststudents}
              error={error}
              loading={loading}
              handremoveStudent={handremoveStudent}
              navigate={navigate}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageClassStudents;
