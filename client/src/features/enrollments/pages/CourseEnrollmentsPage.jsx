

import { useParams } from "react-router-dom";

import { useState } from "react";
import { useCourseEnrollments } from "../hooks/useCourseEnrollments";
import SidebarLesson from "../../lesson/components/LessionSibar";
import LessionForm from "../../lesson/components/LessionForm";
import { Col, Container, Row } from "react-bootstrap";

const CourseEnrollments = () => {
  const role = localStorage.getItem("role");
  const { courseId } = useParams();
  const { enrollment, error, loading } = useCourseEnrollments(courseId);
  const [currentLesson, setCurrentLesson] = useState(null);
 

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={3}>
            <SidebarLesson
              loading={loading}
              error={error}
              title={enrollment}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
              id={courseId}
              role={role}
            />
          </Col>
          <Col md={9}>
            <LessionForm currentLesson={currentLesson} role={role} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseEnrollments;
