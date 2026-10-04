import { lazy } from "react";

const Createlession = lazy(() => import("../pages/CreateLession"));
const UpdateLessonPage = lazy(() => import("../pages/UpdateLessonPage"));
const InstructorLessonCourseListPage = lazy(() => import("../pages/InstructorLessonCourseListPage"));
const InstructorCurriculumPage = lazy(() => import("../pages/InstructorCurriculumPage"));

const lessionRoute = [
  {
    path: "instructor/lessons",
    element: <InstructorLessonCourseListPage />,
  },
  {
    path: "instructor/lessons/:courseId",
    element: <InstructorCurriculumPage />,
  },
  {
    path: "create_lession/:id",
    element: <Createlession />,
  },
  {
    path: "update_lession/:lessionId",
    element: <UpdateLessonPage />,
  },
];
export default lessionRoute;
