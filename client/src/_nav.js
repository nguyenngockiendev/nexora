import CIcon from "@coreui/icons-react";
import { cilBook, cilLibrary, cilNotes, cilSpeedometer } from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    roles:["student" ,"instructor", "admin"],
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavItem,
    name: "Products",
    to: "/products",
    roles:["student" ,"instructor", "admin"],
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Inventory",
    to: "/inventory",
    roles:["student" ,"instructor", "admin"],
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Courses",
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "My Courses",
        to: "/courses",
        roles:["student" ,"instructor", "admin"],
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Create Course",
        to: "/create_courses",
        roles:["instructor"],
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
    
    ],
  },
];

export default _nav;
