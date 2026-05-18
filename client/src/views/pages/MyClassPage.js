import { CCol, CContainer, CRow } from "@coreui/react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyClassCart from "../../features/components/MyClassCart";
import { useGetclassByIntructor } from "../../features/hooks/useGetClassByIntructor";
import useChangeStatus from "../../features/hooks/useChangeStatusClass";

const MyClass = () => {
  const { classs, error, loading } = useGetclassByIntructor();
  const { notification, Change, erron } = useChangeStatus();
  const navigate = useNavigate();

  
  const handchangesStatus = async (classId, status) => {
    try {
      const res = await Change(classId, status);
      toast.success(notification);
       classs;
      console.log("notification", notification);
      console.log("erron", erron);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <MyClassCart
              classs={classs}
              loading={loading}
              error={error}
              handchangesStatus={handchangesStatus}
              notification={notification}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MyClass;
