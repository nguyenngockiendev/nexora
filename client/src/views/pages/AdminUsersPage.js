import { CCol, CContainer, CRow } from "@coreui/react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserTable from "../../features/components/UserTable";
import useGetUser from "../../features/hooks/useGetUserByAdmin";
const AdminUser = () => {
  const { user, error, loading } = useGetUser();
  const [newarruser,setNewarruser] =useState([])
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <UserTable user={user} error={error} loading={loading} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AdminUser;
