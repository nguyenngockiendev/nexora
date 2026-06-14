// import { toast } from "react-toastify";

import { Col, Container, Row } from "react-bootstrap";

import ClassDetails from "../components/ClassDetails";
import { useNavigate, useParams } from "react-router-dom";
import useClassStudents from "../hooks/useClassStudents";
import { toast } from "react-toastify";

const ClassDetailsPage = () => {
  const { classId } = useParams();

  const { liststudents, error, loading, RefectStuden } =
    useClassStudents(classId);
  const navigate = useNavigate();
  const handremoveStudent = async (data) => {
    try {
      await RefectStuden(data);
      navigate(-1);
      toast("add successfuly!");
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <ClassDetails liststudents={liststudents} handremoveStudent={handremoveStudent}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClassDetailsPage;
