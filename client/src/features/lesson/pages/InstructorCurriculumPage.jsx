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
import {
  GetLessionDetails,
  RetryLessonNormalization,
} from "../api/lession-api";

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
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [retryingLessonId, setRetryingLessonId] = useState(null);
  const selectedLesson = arrLession.find((item) => item._id === selectedLessonId);
  const hasProcessingLesson = arrLession.some(
    (item) =>
      item.status === "PROCESSING" ||
      item.normalizationStatus === "PROCESSING",
  );

  useEffect(() => {
    if (!socket) {
      return;
    }
    const onProgress = (result) => {
      if (!result?.lessionId) return;
      setProcess(result);
      setArrlession((preve) =>
        preve.map((e) =>
          e._id === result.lessionId
            ? {
                ...e,
                status: result.status,
                normalizationStatus: result.normalizationStatus ?? null,
              }
            : e,
        ),
      );
    };
    socket.on("messageChangettext", onProgress);
    return () => {
      socket.off("messageChangettext", onProgress);
    };
  }, [socket]);

  useEffect(() => {
    if (detaisLession) {
      setArrlession(detaisLession);
    }
  }, [detaisLession]);

  useEffect(() => {
    if (!hasProcessingLesson) return;
    let stopped = false;
    let timer;
    const refresh = async () => {
      try {
        const lessons = await GetLessionDetails(courseId);
        if (stopped) return;
        const byId = new Map(lessons.map((lesson) => [lesson._id, lesson]));
        setArrlession((prev) =>
          prev.map((lesson) =>
            lesson.status === "PROCESSING" ||
            lesson.normalizationStatus === "PROCESSING"
              ? byId.get(lesson._id) || lesson
              : lesson,
          ),
        );
      } catch (error) {
        console.error("Không thể tải trạng thái bài học:", error);
      } finally {
        if (!stopped) timer = setTimeout(refresh, 5000);
      }
    };
    timer = setTimeout(refresh, 5000);
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [courseId, hasProcessingLesson]);

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
    const result = await update(lessionId, "PROCESSING");
    if (!result) {
      toast.error("Chưa thể bắt đầu phân tích video.");
      return;
    }
    setArrlession((preve) =>
      preve.map((e) =>
        e._id === lessionId
          ? { ...e, status: "PROCESSING", normalizationStatus: null }
          : e,
      ),
    );
    toast.info("Đang phân tích video.");
  };

  const handRetryNormalization = async (lessionId) => {
    setRetryingLessonId(lessionId);
    try {
      const { normalizationStatus } = await RetryLessonNormalization(lessionId);
      setArrlession((prev) =>
        prev.map((item) =>
          item._id === lessionId ? { ...item, normalizationStatus } : item,
        ),
      );
      if (normalizationStatus === "READY") {
        toast.success("Đã chuẩn hóa nội dung. Có thể tạo quiz.");
      }
    } catch (error) {
      if ([502, 503].includes(error.response?.status)) {
        setArrlession((prev) =>
          prev.map((item) =>
            item._id === lessionId
              ? { ...item, normalizationStatus: "FAILED" }
              : item,
          ),
        );
      }
      toast.error(error.response?.data?.message || "Chưa thể chuẩn hóa nội dung.");
    } finally {
      setRetryingLessonId(null);
    }
  };

  const handselectedLesson = (selectedLesson) => {
    if (!selectedLesson) return;
    setSelectedLessonId(selectedLesson._id);
  };

  const onClose = () => setSelectedLessonId(null);
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
            handRetryNormalization={handRetryNormalization}
            retryingLessonId={retryingLessonId}
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
