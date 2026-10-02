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
import usePagination from "../../../shared/hooks/usePagination";
import PaginationForm from "../../../shared/components/PaginationForm";

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
  const [selectedLesson, setSelectedLesson] = useState(null);
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

  console.log("process", process);
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
  const handselectedLesson = (selectedLesson) => {
    if (!selectedLesson) return;
    setSelectedLesson(selectedLesson);
  };
  const onClose = () => setSelectedLesson(null);
  const pagination = usePagination(filterLession, 7);
  return (
    <div>
      <LessionTableLession
        onClose={onClose}
        selectedLesson={selectedLesson}
        handselectedLesson={handselectedLesson}
        handDelete={handDelete}
        navigate={navigate}
        curriculum={pagination.currentData}
        courseId={courseId}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        process={process}
        handupdatetracrip={handupdatetracrip}
      />
      {!loading && filterLession?.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 mt-6">
                <PaginationForm pagination={pagination} itemName="khóa học" />
              </div>
            )}
    </div>
  );
};

export default InstructorCurriculumPage;
