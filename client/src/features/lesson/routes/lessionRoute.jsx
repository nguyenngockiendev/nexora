import Createlession from "../pages/CreateLession";
import UpdateLessonPage from "../pages/UpdateLessonPage";
import InstructorLessonCourseListPage from "../pages/InstructorLessonCourseListPage";
import InstructorCurriculumPage from "../pages/InstructorCurriculumPage";

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
