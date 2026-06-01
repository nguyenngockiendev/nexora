// import DetailsCourseLive from "../pages/CourseDetailsLive";
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
];

export default courseRoute;
