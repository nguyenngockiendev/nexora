import { CCol, CContainer, CRow } from "@coreui/react";

import { useNavigate, useParams } from "react-router-dom";
import useCreateLession from "../../features/hooks/useCreateLession";
import { useForm } from "react-hook-form";
import CreateLession from "../../features/components/CreateLessionForm";
import { useState } from "react";
import { toast } from "react-toastify";
const Createlession = () => {
  const { id } = useParams();
  const { error, Lession } = useCreateLession();
  const navigate = useNavigate();
  const { register, handleSubmit  } = useForm();
  const [videoFile, setVideoFile] = useState(null);
  const[loading,setLoading]=useState(false);
  
  const [quiz, setQuiz] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    },
  ]);
  const removeQuiz = (index) => {
    const remove = quiz.filter((_, i) => i !== index);
    setQuiz(remove);
  };
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
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("duration", data.duration);
      formData.append("isPreview", data.isPreview);
      formData.append("content", data.content);
      formData.append("order", data.order);
      formData.append("videoUrl", videoFile);
      formData.append("resourcestype", resource.type);
      formData.append("resourcestitle", resource.title);
      formData.append("resourcesurl", resource.url);
      formData.append("quiz", JSON.stringify(quiz));
      formData.append("courseId", id);

      const result = await Lession(formData);
      if (result) {
        toast.success(error || "Create Lession successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CreateLession
              navigate={navigate}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              quiz={quiz}
              setQuiz={setQuiz}
              resource={resource}
              setResource={setResource}
              addquiz={addquiz}
              removeQuiz={removeQuiz}
             
              setVideoFile={setVideoFile}
              loading={loading}
           
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Createlession;
