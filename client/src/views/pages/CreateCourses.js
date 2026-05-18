import { CCol, CContainer, CRow } from "@coreui/react";

import CreateCourese from "../../features/components/CreateCoursesForm";
import { set, useForm } from "react-hook-form";
import useCoursesService from "../../features/hooks/useCreateCourses";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
const CreateCourses = () => {
  const { register, handleSubmit } = useForm();
  const { error, Create } = useCoursesService();
  const [loading, setLoading] = useState(false);
  const [thumbail, setThumbnail] = useState(null);
  const [notification, setnNotification] = useState("");
  const [exits , setExits] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("price", data.price);
      formdata.append("level", data.level);
      formdata.append("type", data.type);
      formdata.append("thumbnail", thumbail);
      const result = await Create(formdata);
      
      if (!result) {
        toast.error(error || "Failed to create course!");
        return;
      }
      if (data?.type === "live") {
        setExits(true);
        setnNotification({
          onConfirm: () => navigate(`/create-class/${result.result._id}`),
          onCancel: () => navigate("/courses"),
        });
        return;
      }
      toast.success(error || "Create Courses successfully!");
      navigate("/courses");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CreateCourese
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              error={error}
              navigate={navigate}
              setThumbnail={setThumbnail}
              loading={loading}
              onConfirm={notification.onConfirm}
              onCancel={notification.onCancel}
              exits={exits}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default CreateCourses;
