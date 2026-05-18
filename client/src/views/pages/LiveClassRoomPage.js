import { CCol, CContainer, CRow } from "@coreui/react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ClassRoom from "../../features/components/ClassMeetingbox";
import useJoinClass from "../../features/hooks/useJoinLiveClass";

const LiveclassRoom = () => {
  const { classId } = useParams();
  const { classs, error, loading, JoinClass } = useJoinClass(classId);

  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <ClassRoom classs={classs} error={error} loading={loading} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LiveclassRoom;
