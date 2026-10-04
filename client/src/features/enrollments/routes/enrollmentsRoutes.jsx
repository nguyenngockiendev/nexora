import { lazy } from "react";

const CourseEnrollments = lazy(() => import("../pages/CourseEnrollmentsPage"));
const MyCourses = lazy(() => import("../pages/MyCourse"));

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
