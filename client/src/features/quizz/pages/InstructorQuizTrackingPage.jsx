import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../style/CreateExamPage.css";
import InstructorQuizTrackingView from "../components/InstructorQuizTrackingView";
import QuizExamPreviewModal from "../components/QuizExamPreviewModal";
import QuizStudentSubmissionModal from "../components/QuizStudentSubmissionModal";
import useInstructorQuizCourses from "../hooks/useInstructorQuizCourses";
import { useEffect } from "react";

const InstructorQuizTrackingPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { getResultquizz, resultQuizz, updateStatusRetake } =
    useInstructorQuizCourses();
  useEffect(() => {
    if (courseId) {
      getResultquizz(courseId);
    }
  }, [courseId]);

  const [quizzesData, setQuizzesData] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    if (resultQuizz && resultQuizz.length > 0) {
      setQuizzesData(resultQuizz);
      if (!selectedQuizId) {
        setSelectedQuizId(resultQuizz[0]._id);
      }
    }
  }, [resultQuizz]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [submissionModalData, setSubmissionModalData] = useState(null);

  const handleAllowRetake = async (submission, quiz) => {
    const studentName = submission.student?.name || "Học viên";
    if (
      window.confirm(
        `Bạn có chắc chắn muốn cấp quyền cho "${studentName}" làm lại bài kiểm tra này không?`,
      )
    )
      await updateStatusRetake(quiz._id, quiz.courseId);
    {
      setSubmissionModalData(null);

      if (toast) {
        toast.success(`Đã mở quyền thi lại thành công cho ${studentName}!`);
      } else {
        alert(`Đã mở quyền thi lại thành công cho ${studentName}!`);
      }
    }
  };

  const handleBack = () => {
    navigate("/instructor/quizzes");
  };

  return (
    <div>
      <InstructorQuizTrackingView
        courseTitle="Lập Trình Web ReactJS & NextJS Toàn Tập Từ Zero"
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
        onAllowRetake={handleAllowRetake}
      />

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
    </div>
  );
};

export default InstructorQuizTrackingPage;
