import { CCol, CContainer, CRow } from "@coreui/react";
import UpdateLessonForm from "../../features/components/UpdateLessonForm";
import { useNavigate, useParams } from "react-router-dom";
import useUpdatelession from "../../features/hooks/useUpdatelession";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UpdateLessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, update } = useUpdatelession();
  const [video, Setvideo] = useState(null);
  const { register, handleSubmit } = useForm();

  

  const [quiz, setQuiz] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    },
  ]);

  const addquiz = () => {
    setQuiz([
      ...quiz,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      },
    ]);
  };
  const [resource, setResource] = useState({
    type: "pdf",
    title: "",
    url: "",
  });
  const removeQuiz = (index) => {
    const remove = quiz.filter((_, i) => i !== index);
    setQuiz(remove)};
  const handleupdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);

      formData.append("isPreview", data.isPreview);
      formData.append("content", data.content);

      formData.append("resourcestype", resource.type);
      formData.append("resourcesurl", resource.url);
      formData.append("resourcesurl", resource.title);

      formData.append("videoUrl", video);

      await update(id, formData);
      navigate(-1);
    } catch (error) {}
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <UpdateLessonForm
              Setvideo={Setvideo}
              loading={loading}
              error={error}
              addquiz={addquiz}
              handleupdate={handleupdate}
              register={register}
              handleSubmit={handleSubmit}
              setResource={setResource}
              removeQuiz={removeQuiz}
              quiz={quiz}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default UpdateLessonPage;
