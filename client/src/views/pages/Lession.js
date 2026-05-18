import { CCol, CContainer, CRow } from "@coreui/react";
import LessionForm from "../../features/components/LessionForm";
import SidebarLesson from "../../features/components/LessionSibar";
import useSibarLession from "../../features/hooks/useSibarLession";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDeleteLessionbyid from "../../features/hooks/useDeletelession";
import useUpdatelession from "../../features/hooks/useUpdatelession";

const Lession = () => {
  const role = localStorage.getItem("role");
  
  const { id} = useParams();

  const { loading, error, title, setTitle } = useSibarLession(id);

  const { errorlession, loadinglession, Delete } = useDeleteLessionbyid();
  const {
    loading: loadingupdate,
    error: errorupdate,
    update,
  } = useUpdatelession();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);

  const handUpdate = async (data) => {
    try {
      const result = await update(data);
      if (result) {
        toast.success(data.message || "update succsefully!");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handDelete = async (id) => {
    try {
      await Delete(id);
      if (currentLesson._id === id) {
        setTitle((preve) =>
          preve.filter((titlesibar) => titlesibar._id !== id),
        );
        setCurrentLesson(null);
      }
      toast.success("Xóa bài học thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={3}>
            <SidebarLesson
              loading={loading}
              error={error}
              title={title}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
              id={id}
              role={role}
            />
          </CCol>
          <CCol md={9}>
            <LessionForm
              currentLesson={currentLesson}
              handDelete={handDelete}
              errorlession={errorlession}
              loadinglession={loadinglession}
              loadingupdate={loadingupdate}
              errorupdate={errorupdate}
              handUpdate={handUpdate}
              role={role}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Lession;
