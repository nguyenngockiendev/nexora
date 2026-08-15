import { useNavigate, useParams } from "react-router-dom";
import "../../quizz/style/CreateExamPage.css";
import LessionTableLession from "../components/LessionTableDetails";
import useInsCurr from "../hooks/useInsCurr";
import useDeleteLessionbyid from "../hooks/useDeletelession";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useShareSocket from "../../../shared/hooks/useSocket";
import useUpdatelession from "../hooks/useUpdatelession";

const InstructorCurriculumPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, detaisLession } = useInsCurr(courseId);
  const [arrLession, setArrlession] = useState([]);
  const [process, setProcess] = useState(0);
  const socket = useShareSocket();
  const { Delete } = useDeleteLessionbyid();
  const { update } = useUpdatelession();
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("messageChangettext", (result) => {
      setProcess(result);
    });
    return () => {
      socket.off("messageChangettext");
    };
  });
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
  const handupdatetracrip = async (lessionId) => {
    await update(lessionId, "PROCESSING");
    setArrlession((preve) =>
      preve.map((e) =>
        e._id === lessionId ? { ...e, status: "PROCESSING" } : e,
      ),
    );
    toast.success("update status success!");
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
        process={process}
        handupdatetracrip={handupdatetracrip}
      />
    </div>
  );
};

export default InstructorCurriculumPage;
