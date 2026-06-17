import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarLesson from "../components/LessionSibar";
import { Col, Container, Row } from "react-bootstrap";
import LessionForm from "../components/LessionForm";
import useSibarLession from "../hooks/useSibarLession";
import useDeleteLessionbyid from "../hooks/useDeletelession";
import useUpdatelession from "../hooks/useUpdatelession";

const Lession = () => {
  const role = localStorage.getItem("role");

  const { id } = useParams();

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
    <div className=" min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={3}>
            <SidebarLesson
              loading={loading}
              error={error}
              title={title}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
              id={id}
              role={role}
            />
          </Col>
          <Col md={9}>
            <LessionForm
              currentLesson={currentLesson}
              handDelete={handDelete}
              errorlession={errorlession}
              loadinglession={loadinglession}
              loadingupdate={loadingupdate}
              errorupdate={errorupdate}
              handUpdate={handUpdate}
              role={role}
              navigate={navigate}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Lession;
