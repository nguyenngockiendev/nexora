import CourseEnrollments from "../pages/CourseEnrollmentsPage";
import MyCourses from "../pages/MyCourse";

const enrollmentsRoutes = [
  {
    path: "student",
    element: <MyCourses />,
  },
  {
    path: "student/courses/:courseId/item",
    element: <CourseEnrollments/>,
  },
];

export default enrollmentsRoutes;
