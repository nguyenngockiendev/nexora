import {
  BookOpen,
  Users,
  GraduationCap,
  Video,
  CreditCard,
  LayoutDashboard,
  Settings,
  PlusCircle,
  FileQuestion,
  BrainCircuit 
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
        roles: ["student"],
      },
      {
        name: "Live Classes",
        path: "my/class",
        icon: Video,
        roles: ["instructor"],
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
        roles: ["instructor", "admin"],
      },
      {
        name: "Create Quizz",
        path: "create_quizz/lession",
        icon: FileQuestion,
        roles: ["instructor", "admin"],
      },
       {
        name: "My Quizzes",
        path: "student/quizzes",
        icon: BrainCircuit,
        roles: ["student"],
      },

      {
        name: "User",
        path: "user",
        icon: Users,
        roles: ["admin"],
      },
      {
        name: "Request Instructor",
        path: "user/become-instructor",
        icon: Users,
        roles: ["student"],
      },
      {
        name: "Duyệt Giảng Viên",
        path: "admin/teacher-requests",
        icon: Users,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        name: "Payments",
        path: "payment_History",
        icon: CreditCard,
        roles: ["student", "instructor"],
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
