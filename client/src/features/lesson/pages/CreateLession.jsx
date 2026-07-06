import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import useCreateLession from "../hooks/useCreateLession";
import CreateLession from "../components/CreateLessionForm";
const Createlession = () => {
  const { id } = useParams();
  const { error, Lession } = useCreateLession();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [resource, setResource] = useState({
    type: "pdf",
    title: "",
    url: "",
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("isPreview", data.isPreview);
      formData.append("content", data.content);
      formData.append("order", data.order);
      formData.append("videoUrl", videoFile);
      formData.append("resourcestype", resource.type);
      formData.append("resourcestitle", resource.title);
      formData.append("resourcesurl", resource.url);

      formData.append("courseId", id);

      const result = await Lession(formData);
      if (result) {
        toast.success(error || "Create Lession successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <CreateLession
              navigate={navigate}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
           
              resource={resource}
              setResource={setResource}
           
              setVideoFile={setVideoFile}
              loading={loading}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Createlession;
