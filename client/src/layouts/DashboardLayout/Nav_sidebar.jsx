import { 
  BookOpen, 
  Users, 
  GraduationCap,
  Video,
  CreditCard,
  LayoutDashboard,
  Settings,
  PlusCircle
} from "lucide-react";

const Nav_Sidebar = [
  {
    title: "Overview",
    items: [
      {
        name: "Dashboard",
        path: "dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Learning",
    items: [
      {
        name: "My Courses",
        path: "courses",
        icon: BookOpen,
      },
      {
        name: "Students Course",
        path: "student",
        icon: PlusCircle,
      },
      {
        name: "Live Classes",
        path: "my/class",
        icon: Video,
      },
      {
        name: "Enrollments",
        path: "#",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        name: "Create Course",
        path: "course/create",
        icon: PlusCircle,
      },
      
      {
        name: "Create Class",
        path: "#",
        icon: PlusCircle,
      },
      {
        name: "Students",
        path: "#",
        icon: Users,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        name: "Payments",
        path: "#",
        icon: CreditCard,
      },
      {
        name: "Settings",
        path: "#",
        icon: Settings,
      },
    ],
  },
];

export default Nav_Sidebar;
