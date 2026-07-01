
import Createlession from "../pages/CreateLession";
import UpdateLessonPage from "../pages/UpdateLessonPage";

const lessionRoute = [
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
