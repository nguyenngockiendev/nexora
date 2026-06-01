import CreateClass from "../pages/CreateClasssPage"
import LiveclassRoom from "../pages/LiveClassRoomPage"
import MyClass from "../pages/MyClassPage"

const ClassRoutes =[
{
    path:"courses/create/class/:courseId",
    element:<CreateClass/>
},
{
    path:"my/class",
    element:<MyClass/>
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


]
export default ClassRoutes