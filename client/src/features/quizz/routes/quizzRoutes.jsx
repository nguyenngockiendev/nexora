import CreateExamPage from "../pages/CreateExamPage";
import TakeQuizPage from "../pages/TakeQuizPage";

const quizzRoutes = [
  {
    path: "quizz/lession/:lessionId",
    element: <TakeQuizPage />,
  },
  {
    path: "create_quizz/lession/:lessionId/course/:courseId",
    element: <CreateExamPage />,
  },
];

export default quizzRoutes;
