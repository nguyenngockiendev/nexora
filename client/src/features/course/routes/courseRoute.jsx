// import DetailsCourseLive from "../pages/CourseDetailsLive";
import LiveclassRoom from "../../class/pages/LiveClassRoomPage";
import CourseEnrollments from "../../enrollments/pages/CourseEnrollmentsPage";
import Lession from "../../lesson/pages/Lession";
import DetailsCourseLive from "../pages/CourseDetailsLive";
import CourseDetailsRecorded from "../pages/CourseDetailsRecorded";
import Courses from "../pages/Courses";
import CreateCourses from "../pages/CreateCourses";

import AdminCourseQualityPage from "../pages/AdminCourseQualityPage";

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
