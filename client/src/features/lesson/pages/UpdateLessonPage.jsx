import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUpdatelession from "../hooks/useUpdatelession";
import { Col, Container, Row } from "react-bootstrap";
import UpdateLessonForm from "../components/UpdateLessonForm";
import { toast } from "react-toastify";

const UpdateLessonPage = () => {
  const { lessionId } = useParams();
  const navigate = useNavigate();
  const { loading, error, update, lession, getLession } = useUpdatelession();
  const [video, Setvideo] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const [resource, setResource] = useState({
    type: "pdf",
    title: "",
    url: "",
  });

  useEffect(() => {
    getLession(lessionId);
  }, [lessionId]);

  useEffect(() => {
    if (lession)
      reset({
        title: lession.title,
        order: lession.order,
        isPreview: lession.isPreview,
        videoUrl: lession.videoUrl,
        content: lession.content,
        resources: lession.resources,
      });
  }, [lession]);

  const handleupdate = async (data) => {
    console.log("data2", data);
    try {
      const formData = new FormData();

      formData.append("resourcestype", resource.type);
      formData.append("resourcestitle", resource.title);
      formData.append("resourcesurl", resource.url);
      formData.append("title", data.title);
      formData.append("order", data.order);
      formData.append("content", data.content);
      formData.append("video", video);
      formData.append("isPreview", data.isPreview);
       console.log(Object.fromEntries(formData.entries()));
      const result = await update(lessionId, formData);
      if (result) {
        toast.success("update lesson successfully");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <UpdateLessonForm
              Setvideo={Setvideo}
              loading={loading}
              error={error}
              handleupdate={handleupdate}
              register={register}
              handleSubmit={handleSubmit}
              setResource={setResource}
              navigate={navigate}
              resource={resource}
              lession={lession}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateLessonPage;
