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
    path:"my/class/live/class/:classId/item",
    element:<LiveclassRoom/>
},
{
    path:"my/class/update-class/:classId",
    element:<CreateClass/>
},
]
export default ClassRoutes