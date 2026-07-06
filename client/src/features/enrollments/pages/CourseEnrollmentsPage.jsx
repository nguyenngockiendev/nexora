import { useParams } from "react-router-dom";

import { useState } from "react";
import { useCourseEnrollments } from "../hooks/useCourseEnrollments";
import SidebarLesson from "../../lesson/components/LessionSibar";
import LessionForm from "../../lesson/components/LessionForm";
import { Col, Container, Row } from "react-bootstrap";
import { useRef } from "react";
import useSaveProcess from "../../process/hooks/useSaveProcess";

const CourseEnrollments = () => {
  const role = localStorage.getItem("role");
  const { courseId } = useParams();
  const { enrollment, error, loading } = useCourseEnrollments(courseId);
  const [currentLesson, setCurrentLesson] = useState(null);

  const { SaveUpdate, exits } = useSaveProcess();
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const handduration = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      console.log("Video duration:", duration, "seconds");
    }
  };

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (intervalRef.current) return;
    console.log("Video is playing");
    intervalRef.current = setInterval(() => {
      SaveUpdate({
        lastPosition: videoRef.current.currentTime,
        lessonId: currentLesson._id,
        courseId: currentLesson.courseId,
      });
      console.log("đang lưu", videoRef.current.currentTime);
    }, 5000);
  };
  const handlePause = () => {
    if (!videoRef.current) return;
    console.log("Video is paused");
    SaveUpdate({
      lastPosition: videoRef.current.currentTime,
      lessonId: currentLesson._id,
      courseId: currentLesson.courseId,
    });
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
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
            <LessionForm
              videoRef={videoRef}
              currentLesson={currentLesson}
              role={role}
              handduration={handduration}
              onplay={handlePlay}
              onpause={handlePause}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseEnrollments;
