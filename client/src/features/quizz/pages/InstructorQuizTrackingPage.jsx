import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../style/CreateExamPage.css";
import InstructorQuizTrackingView from "../components/InstructorQuizTrackingView";
import QuizExamPreviewModal from "../components/QuizExamPreviewModal";
import QuizStudentSubmissionModal from "../components/QuizStudentSubmissionModal";
import AssignmentDetailModal from "../components/AssignmentDetailModal";
import AssignmentGradingModal from "../components/AssignmentGradingModal";
import useInstructorQuizCourses from "../hooks/useInstructorQuizCourses";

const InstructorQuizTrackingPage = ({ mode = "recorded" }) => {
  const navigate = useNavigate();
  const { courseId, classId } = useParams();
  const targetId = mode === "assessments" ? classId : courseId;

  const {
    getResultquizz,
    getTrackingAssignments,
    resultQuizz,
    updateStatusRetake,
    gradeSubmission,
  } = useInstructorQuizCourses(mode);

  useEffect(() => {
    if (targetId) {
      if (mode === "assessments") {
        getTrackingAssignments(targetId);
      } else {
        getResultquizz(targetId);
      }
    }
  }, [targetId, mode]);

  const [quizzesData, setQuizzesData] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    if (resultQuizz && resultQuizz.length > 0) {
      setQuizzesData(resultQuizz);
      if (!selectedQuizId || !resultQuizz.find((q) => q._id === selectedQuizId)) {
        setSelectedQuizId(resultQuizz[0]._id);
      }
    } else {
      setQuizzesData([]);
      setSelectedQuizId(null);
    }
  }, [resultQuizz]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [submissionModalData, setSubmissionModalData] = useState(null);
  const [gradingModalData, setGradingModalData] = useState(null);

  const handleAllowRetake = async (submission, quiz) => {
    const studentName = submission.student?.name || "Học viên";
    if (
      window.confirm(
        `Bạn có chắc chắn muốn cấp quyền cho "${studentName}" làm lại bài kiểm tra này không?`,
      )
    ) {
      try {
        await updateStatusRetake(submission._id, quiz.courseId);
        setSubmissionModalData(null);
        toast.success(`Đã mở quyền thi lại thành công cho ${studentName}!`);
        getResultquizz(targetId);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSaveGrade = async (submission, score, feedback) => {
    const studentName = submission.student?.name || "Học viên";
    try {
      await gradeSubmission(submission._id, { score, feedback });
      toast.success(`Đã chấm điểm ${score}/10 thành công cho ${studentName}!`);
      if (getTrackingAssignments) {
        getTrackingAssignments(targetId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    if (mode === "assessments") {
      navigate("/instructor/assessments/courses");
    } else {
      navigate("/instructor/quizzes/courses");
    }
  };

  const currentCourseOrClassTitle =
    quizzesData[0]?.className ||
    quizzesData[0]?.lessonTitle ||
    (mode === "assessments" ? "Lớp Học Trực Tuyến" : "Khóa Học Video");

  return (
    <div>
      <InstructorQuizTrackingView
        mode={mode}
        courseTitle={currentCourseOrClassTitle}
        quizzes={quizzesData}
        selectedQuizId={selectedQuizId}
        onSelectQuiz={(id) => setSelectedQuizId(id)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onBack={handleBack}
        onOpenExamModal={(quiz) => setPreviewQuiz(quiz)}
        onOpenSubmissionModal={(submission, quiz) =>
          setSubmissionModalData({ submission, quiz })
        }
        onOpenGradingModal={(submission, assignment) =>
          setGradingModalData({ submission, assignment })
        }
        onAllowRetake={handleAllowRetake}
      />

      {/* QUIZZ MODALS */}
      {mode === "recorded" && (
        <>
          <QuizExamPreviewModal
            show={!!previewQuiz}
            onHide={() => setPreviewQuiz(null)}
            quiz={previewQuiz}
          />

          <QuizStudentSubmissionModal
            show={!!submissionModalData}
            onHide={() => setSubmissionModalData(null)}
            submission={submissionModalData?.submission}
            quiz={submissionModalData?.quiz}
            onAllowRetake={(sub) =>
              handleAllowRetake(sub, submissionModalData?.quiz)
            }
          />
        </>
      )}

      {/* ASSIGNMENT MODALS */}
      {mode === "assessments" && (
        <>
          <AssignmentDetailModal
            show={!!previewQuiz}
            onHide={() => setPreviewQuiz(null)}
            assignment={previewQuiz}
          />

          <AssignmentGradingModal
            show={!!gradingModalData}
            onHide={() => setGradingModalData(null)}
            submission={gradingModalData?.submission}
            assignment={gradingModalData?.assignment}
            onSaveGrade={handleSaveGrade}
          />
        </>
      )}
    </div>
  );
};

export default InstructorQuizTrackingPage;
