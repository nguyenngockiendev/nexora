import { lazy } from "react";

const CreateExamPage = lazy(() => import("../pages/CreateExamPage"));
const TakeQuizPage = lazy(() => import("../pages/TakeQuizPage"));
const StudentQuizListPage = lazy(() => import("../pages/StudentQuizListPage"));
const AssessmentHubPage = lazy(() => import("../pages/AssessmentHubPage"));
const InstructorQuizCourseListPage = lazy(() => import("../pages/InstructorQuizCourseListPage"));
const InstructorQuizTrackingPage = lazy(() => import("../pages/InstructorQuizTrackingPage"));

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
