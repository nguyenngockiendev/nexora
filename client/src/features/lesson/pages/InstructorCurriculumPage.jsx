import { useNavigate, useParams } from "react-router-dom";
import "../../quizz/style/CreateExamPage.css";
import LessionTableLession from "../components/LessionTableDetails";
import useInsCurr from "../hooks/useInsCurr";
import useDeleteLessionbyid from "../hooks/useDeletelession";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const InstructorCurriculumPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, detaisLession } = useInsCurr(courseId);
  const [arrLession, setArrlession] = useState([]);

  const { Delete } = useDeleteLessionbyid();
  useEffect(() => {
    if (detaisLession) {
      setArrlession(detaisLession);
    }
  }, [detaisLession]);
  const filterLession = arrLession.filter((lession) => {
    return (
      (lession.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lession.status || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handDelete = async (id) => {
    try {
      await Delete(id);

      setArrlession((preve) =>
        preve.filter((titlesibar) => titlesibar._id !== id),
      );

      toast.success("Xóa bài học thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <LessionTableLession
        handDelete={handDelete}
        navigate={navigate}
        curriculum={filterLession}
        courseId={courseId}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default InstructorCurriculumPage;
