// import DetailsCourseLive from "../pages/CourseDetailsLive";
import LiveclassRoom from "../../class/pages/LiveClassRoomPage";
import CourseEnrollments from "../../enrollments/pages/CourseEnrollmentsPage";
import Lession from "../../lesson/pages/Lession";
import DetailsCourseLive from "../pages/CourseDetailsLive";
import Courses from "../pages/Courses";
import CreateCourses from "../pages/CreateCourses";

const courseRoute = [
  {
    path: "courses",
    element: <Courses />,
    icon: "",
  },
  {
    path: "course/create",
    element: <CreateCourses />,
    icon: "",
  },
  {
    path: "courses/details/class/live/:courseId",
    element: <DetailsCourseLive/>,
    icon: "",
  },
  {
    path: "details_course/:id",
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
];

export default courseRoute;
