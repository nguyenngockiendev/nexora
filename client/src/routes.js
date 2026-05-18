import React from "react";
import Courses from "./views/pages/Courses";
import CreateCourses from "./views/pages/CreateCourses";
import Lession from "./views/pages/Lession";
import Createlession from "./views/pages/CreateLession";
import UpdateLessonPage from "./views/pages/UpdateLessonPage";
import MyCourses from "./views/pages/MyCourse";
import CourseEnrollments from "./views/pages/CourseEnrollmentsPage";
import CreateClass from "./views/pages/CreateClasssPage";
import MyClass from "./views/pages/MyClassPage";
import LiveclassRoom from "./views/pages/LiveClassRoomPage";
import DetailsCourseLive from "./views/pages/CourseDetailsLive";




const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/products", name: "Products", element: Dashboard, exact: true },
  { path: "/courses", name: "Courses", element: Courses, exact: true },
  { path: "/create_courses", name: "Create", element: CreateCourses, exact: true },
  { path: "/details_course/:id", name: "Lession", element: Lession, exact: true },
  { path: "/create_lession/:id", name: "Create", element: Createlession, exact: true },
  { path: "/update_lession/:id", name: "Create", element: UpdateLessonPage, exact: true },
  { path: "/my-course", name: "my-Courses", element: MyCourses, exact: true },
  { path: "/courses/:courseId/item", name: "Enrollments", element: CourseEnrollments, exact: true },
  { path: "/create-class/:courseId", name: "create_class", element: CreateClass, exact: true },
  { path: "/update-class/:classId", name: "update_class", element: CreateClass, exact: true },
  { path: "/my-class", name: "my_class", element: MyClass, exact: true },
  { path: "/live/class/:classId/item", name: "live_class", element: LiveclassRoom, exact: true },
  { path: "/course-class-details/:courseId", name: "details_course", element: DetailsCourseLive, exact: true },
  
  
];

export default routes;
