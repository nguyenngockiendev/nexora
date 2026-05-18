import { CCol, CContainer, CRow } from "@coreui/react";

import { useParams } from "react-router-dom";
import SidebarLesson from "../../features/components/LessionSibar";
import LessionForm from "../../features/components/LessionForm";
import { useCourseEnrollments } from "../../features/hooks/useCourseEnrollments";
import { useState } from "react";

const CourseEnrollments = () => {
  const role = localStorage.getItem("role");
  const { courseId } = useParams();
  const { enrollment, error, loading } = useCourseEnrollments(courseId);
  const [currentLesson, setCurrentLesson] = useState(null);
 

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={3}>
            <SidebarLesson
              loading={loading}
              error={error}
              title={enrollment}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
              id={courseId}
              role={role}
            />
          </CCol>
          <CCol md={9}>
            <LessionForm currentLesson={currentLesson} role={role} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default CourseEnrollments;
