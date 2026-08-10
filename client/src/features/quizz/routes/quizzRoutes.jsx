import CreateExamPage from "../pages/CreateExamPage";
import TakeQuizPage from "../pages/TakeQuizPage";
import StudentQuizListPage from "../pages/StudentQuizListPage";

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
];

export default quizzRoutes;
