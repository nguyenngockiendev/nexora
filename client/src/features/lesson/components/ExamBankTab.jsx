import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Badge, Spinner, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  FileText,
  Trash2,
  Eye,
  RefreshCw,
  PlusCircle,
  Sparkles,
  Calendar,
  Layers,
  HelpCircle,
  Play,
} from "lucide-react";
import {
  GetExamsByCourse,
  GetExamDetail,
  DeleteExam,
  SyncFocusExam,
  GetFocusExam,
  GetDedupExam,
} from "../api/examBank-api";
import UploadScanPdfModal from "./UploadScanPdfModal";
import ExamDetailModal from "./ExamDetailModal";

const ExamBankTab = ({ courseId }) => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [focusExam, setFocusExam] = useState(null);
  const [dedupExam, setDedupExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncingDedup, setIsSyncingDedup] = useState(false);

  // Modals state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [detailModalData, setDetailModalData] = useState({
    show: false,
    title: "",
    questions: [],
    isFocus: false,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [examsRes, focusRes] = await Promise.all([
        GetExamsByCourse(courseId),
        GetFocusExam(courseId),
      ]);
      setExams(examsRes?.data || []);
      setFocusExam(focusRes?.data || null);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu kho đề:", error);
      toast.error("Không thể tải danh sách đề thi ôn luyện!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchData();
    }
  }, [courseId]);

  const handleSyncFocusExam = async () => {
    try {
      setIsSyncing(true);
      const res = await SyncFocusExam(courseId);
      setFocusExam(res?.data || null);
      toast.success(res?.message || "Đã cập nhật bộ đề trọng tâm thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật đề trọng tâm:", error);
      toast.error(
        error.response?.data?.message || "Lỗi khi tổng hợp đề trọng tâm!",
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGetDedupExam = async () => {
    try {
      setIsSyncingDedup(true);
      const res = await GetDedupExam(courseId);
      const data = res?.data?.data || res?.data;
      if (data) {
        setDedupExam(data);
        setDetailModalData({
          show: true,
          title: `💎 Kho Đề Khử Trùng: Toàn Bộ ${data.totalQuestions || data.questions?.length || 0} Câu Hỏi Độc Nhất`,
          questions: data.questions || [],
          isFocus: false,
        });
        toast.success(
          `Đã khử trùng thành công! Có ${data.totalQuestions || data.questions?.length || 0} câu hỏi độc nhất.`,
        );
      }
    } catch (error) {
      console.error("Lỗi gọi khử trùng đề thi:", error);
      toast.error(
        error.response?.data?.message || "Lỗi khi lọc khử trùng đề thi!",
      );
    } finally {
      setIsSyncingDedup(false);
    }
  };

  const handleDeleteExam = async (examId, title) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bộ đề "${title}" không?`)) {
      return;
    }
    try {
      await DeleteExam(examId);
      setExams((prev) => prev.filter((item) => item._id !== examId));
      toast.success("Đã xóa bộ đề thi thành công!");
    } catch (error) {
      console.error("Lỗi xóa đề:", error);
      toast.error("Không thể xóa đề thi này!");
    }
  };

  const handleViewDetail = async (examId, title) => {
    try {
      const res = await GetExamDetail(examId);
      if (res?.data) {
        setDetailModalData({
          show: true,
          title: title || res.data.title,
          questions: res.data.questions || [],
          isFocus: false,
        });
      }
    } catch (error) {
      console.error("Lỗi lấy chi tiết đề:", error);
      toast.error("Không thể xem chi tiết đề thi!");
    }
  };

  const handleViewFocusDetail = () => {
    if (!focusExam || !focusExam.questions || focusExam.questions.length === 0) {
      toast.info("Chưa có câu hỏi trọng tâm nào. Hãy bấm 'Cập Nhật Trọng Tâm'!");
      return;
    }
    setDetailModalData({
      show: true,
      title: "🎯 Bộ Đề Trọng Tâm: Top Câu Hỏi Hay Ra Nhất",
      questions: focusExam.questions,
      isFocus: true,
    });
  };

  const focusQuestionCount = focusExam?.questions?.length || 0;
  const totalAnalyzed = focusExam?.totalExamsAnalyzed || 0;

  return (
    <div className="d-flex flex-column gap-4">
      {/* 1. FOCUS EXAM HIGHLIGHT CARD */}
      <Card
        className="border-0 shadow-sm overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 237, 213, 0.7) 0%, rgba(254, 215, 170, 0.4) 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(249, 115, 22, 0.25)",
        }}
      >
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                style={{
                  width: "56px",
                  height: "56px",
                  background: "#ea580c",
                  color: "#ffffff",
                }}
              >
                <Sparkles size={28} />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h5 className="fw-bold mb-0 text-slate-800">
                    BỘ ĐỀ TRỌNG TÂM: Top Câu Hỏi Hay Ra Nhất
                  </h5>
                  <Badge bg="danger" pill className="px-2 py-1">
                    AI Auto Deduplicate
                  </Badge>
                </div>
                <p className="text-muted small mb-0">
                  {totalAnalyzed > 0
                    ? `Đã tổng hợp từ ${totalAnalyzed} bộ đề thi quá khứ • Lọc được ${focusQuestionCount} câu hỏi có tần suất lặp lại cao.`
                    : "Chưa phân tích đề thi nào. Vui lòng nạp các đề thi PDF và bấm Cập Nhật Trọng Tâm."}
                </p>
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <Button
                variant="danger"
                className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
                style={{
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  border: "none",
                }}
                onClick={() =>
                  navigate(`/student/focus-exam/${courseId}?mode=focus`)
                }
                disabled={exams.length === 0}
              >
                <Play size={17} fill="currentColor" />
                Làm 60 Câu Trọng Tâm
              </Button>
              <Button
                variant="primary"
                className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
                style={{
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  border: "none",
                }}
                onClick={() =>
                  navigate(`/student/focus-exam/${courseId}?mode=dedup`)
                }
                disabled={exams.length === 0}
              >
                <Play size={17} fill="currentColor" />
                Làm Kho Khử Trùng
              </Button>
              <Button
                variant="light"
                className="rounded-pill px-3 fw-semibold shadow-sm d-flex align-items-center gap-2 bg-white"
                style={{ borderRadius: "9999px" }}
                onClick={handleViewFocusDetail}
                disabled={focusQuestionCount === 0}
              >
                <Eye size={18} className="text-orange-500" />
                Xem {focusQuestionCount} câu
              </Button>
              <Button
                variant="warning"
                className="rounded-pill px-3 fw-bold text-dark shadow-sm d-flex align-items-center gap-2"
                style={{ borderRadius: "9999px" }}
                onClick={handleSyncFocusExam}
                disabled={isSyncing || exams.length === 0}
              >
                {isSyncing ? (
                  <>
                    <Spinner size="sm" animation="border" /> Đang tổng hợp...
                  </>
                ) : (
                  <>
                    <RefreshCw size={18} /> Cập Nhật Trọng Tâm
                  </>
                )}
              </Button>
              <Button
                variant="light"
                className="rounded-pill px-3 fw-bold shadow-sm d-flex align-items-center gap-2 border"
                style={{
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)",
                  borderColor: "#c7d2fe",
                  color: "#4338ca",
                }}
                onClick={handleGetDedupExam}
                disabled={isSyncingDedup || exams.length === 0}
              >
                {isSyncingDedup ? (
                  <>
                    <Spinner size="sm" animation="border" /> Đang khử trùng...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="text-indigo-600" />
                    {dedupExam?.questions?.length
                      ? `Xem ${dedupExam.questions.length} câu khử trùng`
                      : "Xem Kho Khử Trùng"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 2. EXAM LIST SECTION */}
      <Card className="quiz-card p-3 border-0 shadow-sm" style={{ borderRadius: "20px" }}>
        <Card.Header className="quiz-card-header d-flex flex-wrap justify-content-between align-items-center bg-transparent border-bottom-0 pb-3">
          <div>
            <Card.Title className="mb-0 fw-bold fs-5 text-slate-800 d-flex align-items-center gap-2">
              <Layers size={22} className="text-orange-500" />
              Danh Sách Đề Thi Đã Nạp
            </Card.Title>
            <div className="text-muted small">
              Quản lý các đề thi đã nạp từ PDF để hệ thống phân tích câu hỏi
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
            <Badge pill bg="warning" text="dark" className="px-3 py-2 fs-6">
              {exams.length} đề thi
            </Badge>
            <Button
              variant="warning"
              className="rounded-pill px-4 fw-bold text-dark shadow-sm d-flex align-items-center gap-2"
              style={{ borderRadius: "9999px" }}
              onClick={() => setShowUploadModal(true)}
            >
              <PlusCircle size={18} /> Nạp Đề Mới Bằng PDF (AI)
            </Button>
          </div>
        </Card.Header>

        <Card.Body className="p-2">
          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="warning" />
              <div className="text-muted small mt-2">Đang tải danh sách đề thi...</div>
            </div>
          ) : exams.length === 0 ? (
            <div className="text-center p-5 bg-light rounded-4 border-2 border-dashed">
              <FileText size={48} className="text-muted mb-2 mx-auto" />
              <h6 className="fw-bold text-slate-700 mb-1">
                Chưa có đề thi nào trong kho đề!
              </h6>
              <p className="text-muted small mb-3">
                Hãy nhấn nút "Nạp Đề Mới Bằng PDF (AI)" ở góc trên để tải lên đề thi đầu tiên.
              </p>
              <Button
                variant="outline-warning"
                className="rounded-pill px-4 text-dark fw-semibold"
                onClick={() => setShowUploadModal(true)}
              >
                + Tải lên ngay
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {exams.map((exam) => (
                <div
                  key={exam._id}
                  className="p-3 rounded-4 border bg-white shadow-sm d-flex flex-wrap align-items-center justify-content-between gap-3 hover-shadow transition-all"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 bg-orange-100 text-orange-600 p-3"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <FileText size={24} />
                    </div>
                    <div>
                      <h6 className="fw-bold text-slate-800 mb-1">
                        {exam.title}
                      </h6>
                      <div className="d-flex flex-wrap align-items-center gap-3 text-muted small">
                        <span className="d-flex align-items-center gap-1">
                          <HelpCircle size={14} className="text-warning" />
                          <strong className="text-slate-700">{exam.questionCount}</strong> câu hỏi
                        </span>
                        <span>•</span>
                        <span className="d-flex align-items-center gap-1">
                          <Calendar size={14} />
                          Nạp ngày {new Date(exam.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      className="rounded-pill px-3 fw-bold text-dark d-flex align-items-center gap-1"
                      onClick={() =>
                        navigate(
                          `/student/focus-exam/${courseId}?mode=regular&examId=${exam._id}`,
                        )
                      }
                    >
                      <Play size={14} fill="currentColor" /> Làm đề này
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-pill px-3 d-flex align-items-center gap-1"
                      onClick={() => handleViewDetail(exam._id, exam.title)}
                    >
                      <Eye size={15} /> Xem chi tiết
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-pill px-3 d-flex align-items-center gap-1"
                      onClick={() => handleDeleteExam(exam._id, exam.title)}
                    >
                      <Trash2 size={15} /> Xóa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* 3. MODALS */}
      <UploadScanPdfModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        courseId={courseId}
        onSuccess={fetchData}
      />

      <ExamDetailModal
        show={detailModalData.show}
        onHide={() =>
          setDetailModalData((prev) => ({ ...prev, show: false }))
        }
        title={detailModalData.title}
        questions={detailModalData.questions}
        isFocus={detailModalData.isFocus}
      />
    </div>
  );
};

export default ExamBankTab;
