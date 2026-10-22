import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import "../../quizz/style/CreateExamPage.css";
import LessionTableLession from "../components/LessionTableDetails";
import ExamBankTab from "../components/ExamBankTab";
import useInsCurr from "../hooks/useInsCurr";
import useDeleteLessionbyid from "../hooks/useDeletelession";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import useShareSocket from "../../../shared/hooks/useSocket";
import useUpdatelession from "../hooks/useUpdatelession";
import usePagination from "../../../shared/hooks/usePagination";
import PaginationForm from "../../../shared/components/PaginationForm";

const InstructorCurriculumPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { dashboard } = useOutletContext() || {};
  const role = dashboard?.role;

  const [activeTab, setActiveTab] = useState("lessons"); 
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
      if (result?.lessionId && result?.percent === 100) {
        setArrlession((preve) =>
          preve.map((e) =>
            e._id === result.lessionId
              ? { ...e, status: "TRANSCRIPT_READY" }
              : e,
          ),
        );
      } else if (result?.lessionId && result?.status === "FAILED") {
        setArrlession((preve) =>
          preve.map((e) =>
            e._id === result.lessionId ? { ...e, status: "FAILED" } : e,
          ),
        );
      }
    });
    return () => {
      socket.off("messageChangettext");
    };
  }, [socket]);

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
      {activeTab === "lessons" ? (
        <>
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
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {!loading && filterLession?.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 mt-6">
              <PaginationForm pagination={pagination} itemName="khóa học" />
            </div>
          )}
        </>
      ) : (
        <div className="p-3 p-md-4 w-100">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="light"
                className="quiz-btn-back rounded-pill"
                style={{ borderRadius: "9999px" }}
                type="button"
                onClick={() => navigate("/instructor/lessons")}
              >
                ← Quay lại
              </Button>
              <div>
                <div className="text-muted small fw-semibold">
                  Bài học › Kho đề thi ôn luyện
                </div>
                <h1 className="quiz-page-title mb-0">Kho Đề Thi Ôn Luyện</h1>
              </div>
            </div>
          </div>

          {role === "admin" && (
            <div className="d-flex align-items-center gap-2 mb-4">
              <Button
                variant="light"
                className="rounded-pill px-4 fw-bold text-dark shadow-sm"
                style={{ borderRadius: "9999px" }}
                onClick={() => setActiveTab("lessons")}
              >
                📹 Danh Sách Video Bài Giảng
              </Button>
              <Button
                variant="warning"
                className="rounded-pill px-4 fw-bold text-dark shadow-sm"
                style={{ borderRadius: "9999px" }}
                onClick={() => setActiveTab("exam_bank")}
              >
                📚 Kho Đề Thi Ôn Luyện
              </Button>
            </div>
          )}

          <ExamBankTab courseId={courseId} />
        </div>
      )}
    </div>
  );
};

export default InstructorCurriculumPage;
