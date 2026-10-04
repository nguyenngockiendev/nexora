import { lazy } from "react";

const ClassDetailsPage = lazy(() => import("../pages/ClassDetailsPage"));
const CreateClass = lazy(() => import("../pages/CreateClasssPage"));
const LiveclassRoom = lazy(() => import("../pages/LiveClassRoomPage"));
const ManageClassStudents = lazy(() => import("../pages/ManageClassStudent"));
const ManageLiveclassRoom = lazy(() => import("../pages/ManageLiveClassPage"));
const MyClass = lazy(() => import("../pages/MyClassPage"));

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
