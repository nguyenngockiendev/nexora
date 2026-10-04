import { lazy } from "react";

const LiveclassRoom = lazy(() => import("../../class/pages/LiveClassRoomPage"));
const CourseEnrollments = lazy(() => import("../../enrollments/pages/CourseEnrollmentsPage"));
const Lession = lazy(() => import("../../lesson/pages/Lession"));
const DetailsCourseLive = lazy(() => import("../pages/CourseDetailsLive"));
const CourseDetailsRecorded = lazy(() => import("../pages/CourseDetailsRecorded"));
const Courses = lazy(() => import("../pages/Courses"));
const CreateCourses = lazy(() => import("../pages/CreateCourses"));
const UpdateCourse = lazy(() => import("../pages/UpdateCourse"));
const AdminCourseQualityPage = lazy(() => import("../pages/AdminCourseQualityPage"));

const courseRoute = [
  {
    path: "courses-all",
    element: <Courses mode="all" />,
    icon: "",
  },
  {
    path: "courses",
    element: <Courses mode="mine" />,
    icon: "",
  },
  {
    path: "course/create",
    element: <CreateCourses />,
    icon: "",
  },
  {
    path: "course/update/:courseId",
    element: <UpdateCourse />,
    icon: "",
  },
  {
    path: "courses-all/details/class/live/:courseId",
    element: <DetailsCourseLive />,
    icon: "",
  },
  {
    path: "courses-all/details/recorded/:courseId",
    element: <CourseDetailsRecorded />,
    icon: "",
  },
  {
    path: "courses/details_course/:id",
    element: <Lession />,
    icon: "",
  },
  {
    path: "student/live/class/:classId/item",
    element: <LiveclassRoom />,
    icon: "",
  },
  {
    path: "courses/:courseId/item",
    element: <CourseEnrollments />,
    icon: "",
  },
  {
    path: "admin/courses/quality-control",
    element: <AdminCourseQualityPage />,
    icon: "",
  },
];

export default courseRoute;
