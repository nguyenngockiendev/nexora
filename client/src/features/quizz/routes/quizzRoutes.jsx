import CreateExamPage from "../pages/CreateExamPage";
import TakeQuizPage from "../pages/TakeQuizPage";
import StudentQuizListPage from "../pages/StudentQuizListPage";
import AssessmentHubPage from "../pages/AssessmentHubPage";
import InstructorQuizCourseListPage from "../pages/InstructorQuizCourseListPage";
import InstructorQuizTrackingPage from "../pages/InstructorQuizTrackingPage";
import StudentFocusExamPage from "../pages/StudentFocusExamPage";
import StudentExamBankPage from "../pages/StudentExamBankPage";

const quizzRoutes = [
  // Danh sách môn học đã mua để ôn thi
  {
    path: "student/exam-bank",
    element: <StudentExamBankPage />,
  },
  // Màn hình làm đề 60 câu trọng tâm theo từng môn (courseId)
  {
    path: "student/focus-exam/:courseId",
    element: <StudentFocusExamPage />,
  },
  {
    path: "student/focus-exam",
    element: <StudentFocusExamPage />,
  },
  {
    path: "quizz/lession/:lessionId",
    element: <TakeQuizPage />,
  },
  {
    path: "create_quizz/lession",
    element: <CreateExamPage />,
  },
  {
    path: "student/quizzes",
    element: <StudentQuizListPage />,
  },
  {
    path: "instructor/assessments",
    element: <AssessmentHubPage />,
  },
  {
    path: "instructor/quizzes",
    element: <InstructorQuizCourseListPage mode="recorded" />,
  },
  {
    path: "instructor/quizzes/courses",
    element: <InstructorQuizCourseListPage mode="recorded" />,
  },
  {
    path: "instructor/assessments/courses",
    element: <InstructorQuizCourseListPage mode="assessments" />,
  },
  {
    path: "instructor/quizzes/:courseId",
    element: <InstructorQuizTrackingPage mode="recorded" />,
  },
  {
    path: "instructor/assessments/:classId",
    element: <InstructorQuizTrackingPage mode="assessments" />,
  },
];

export default quizzRoutes;
