import CreateClass from "../pages/CreateClasssPage"
import LiveclassRoom from "../pages/LiveClassRoomPage"
import ManageLiveclassRoom from "../pages/ManageLiveClassPage"
import MyClass from "../pages/MyClassPage"

const ClassRoutes =[
{
    path:"courses/create/class/:courseId",
    element:<CreateClass/>
},
{
    path:"my/class",
    element:<ManageLiveclassRoom/>
},
{
    path:"student/live/class/:classId/item",
    element:<LiveclassRoom/>
},
{
    path:"my/class/update-class/:classId",
    element:<CreateClass/>
},
{
    path:"courses/:classId/item",
    element:<CreateClass/>
},
{
    path:"my/class/details/class/:classId",
    element:<MyClass/>
},


]
export default ClassRoutes