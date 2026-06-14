import ClassDetailsPage from "../pages/ClassDetailsPage";
import CreateClass from "../pages/CreateClasssPage";
import LiveclassRoom from "../pages/LiveClassRoomPage";
import ManageClassStudents from "../pages/ManageClassStudent";
import ManageLiveclassRoom from "../pages/ManageLiveClassPage";
import MyClass from "../pages/MyClassPage";

const ClassRoutes = [
  {
    path: "courses/create/class/:courseId",
    element: <CreateClass />,
  },
  {
    path: "my/class",
    element: <ManageLiveclassRoom />,
  },
  {
    path: "live/class/:classId/item",
    element: <LiveclassRoom />,
  },
  {
    path: "update-class/:classId",
    element: <CreateClass />,
  },
  {
    path: "courses/:classId/item",
    element: <CreateClass />,
  },
  {
    path: "my/class/details/class/:classId",
    element: <MyClass />,
  },
  {
    path: "instructor/classes/:classId/students",
    element: <ManageClassStudents />,
  },
  {
    path: "classes/:classId/removed-students",
    element: <ClassDetailsPage />,
  },
];
export default ClassRoutes;
