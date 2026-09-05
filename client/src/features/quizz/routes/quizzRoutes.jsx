import CreateExamPage from "../pages/CreateExamPage";
import TakeQuizPage from "../pages/TakeQuizPage";
import StudentQuizListPage from "../pages/StudentQuizListPage";
import AssessmentHubPage from "../pages/AssessmentHubPage";

const quizzRoutes = [
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
];

export default quizzRoutes;
