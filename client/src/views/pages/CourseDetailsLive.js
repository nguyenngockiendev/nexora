import { CCol, CContainer, CRow } from "@coreui/react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailsCourse from "../../features/components/CourseDetails";
import { useDetailsCourse } from "../../features/hooks/useDetailsCourseClass";
import usePayment from "../../features/hooks/usePayment";
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
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DetailsCourse
              detalscourse={detalscourse}
              error={error}
              loading={loading}
              payment={payment}
              errorPayment={errorPayment}
              paymentloading={paymentloading}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default DetailsCourseLive;
