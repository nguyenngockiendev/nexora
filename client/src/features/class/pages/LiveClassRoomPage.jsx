

// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import useJoinClass from "../hooks/useJoinLiveClass";
import { Col, Container, Row } from "react-bootstrap";
import ClassRoom from "../components/ClassMeetingbox";


const LiveclassRoom = () => {
  const { classId } = useParams();
  const { classs, error, loading} = useJoinClass(classId);
  const navigate = useNavigate();
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <ClassRoom classs={classs} error={error} loading={loading} navigate={navigate}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LiveclassRoom;
