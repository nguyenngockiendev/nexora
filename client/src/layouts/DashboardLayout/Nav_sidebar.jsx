import {
  BookOpen,
  Users,
  Video,
  CreditCard,
  LayoutDashboard,
  HelpCircle,
  PlusCircle,
  FileQuestion,
  BrainCircuit,
  ShoppingBag,
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
    title: "Khóa học",
    items: [
      {
        name: "Khóa học",
        path: "courses-all",
        icon: BookOpen,
        roles: ["student", "admin", "instructor"],
      },
      {
        name: "Khóa học của tôi",
        path: "courses",
        icon: BookOpen,
        roles: ["instructor", "admin"],
      },
      {
        name: "Khóa học đã mua",
        path: "student",
        icon: PlusCircle,
        roles: ["student"],
      },
    ],
  },
  {
    title: "Quản lý",
    items: [
      {
        name: "Tạo khóa học",
        path: "course/create",
        icon: PlusCircle,
        roles: ["instructor", "admin"],
      },
      {
        name: "Tạo bài kiểm tra",
        path: "create_quizz/lession",
        icon: FileQuestion,
        roles: ["instructor", "admin"],
      },
      {
        name: "Bài kiểm tra",
        path: "student/quizzes",
        icon: BrainCircuit,
        roles: ["student"],
      },
      {
        name: "Lớp trực tuyến",
        path: "my/class",
        icon: Video,
        roles: ["instructor"],
      },

      {
        name: "bài học",
        path: "instructor/lessons",
        icon: BrainCircuit,
        roles: ["instructor"],
      },

      {
        name: "Quản lý người dùng",
        path: "user",
        icon: Users,
        roles: ["admin"],
      },
      {
        name: "Đăng kí Giảng Viên",
        path: "user/become-instructor",
        icon: Users,
        roles: ["student"],
      },
      {
        name: "Quản lý thông báo",
        path: "admin/teacher-requests",
        icon: Users,
        roles: ["admin"],
      },
      {
        name: "Quản lý bài học",
        path: "admin/courses/quality-control",
        icon: PlusCircle,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Giao Dịch",
    items: [
      {
        name: "Lịch sử đơn hàng",
        path: "payment_History",
        icon: CreditCard,
        roles: ["student", "instructor"],
      },
      {
        name: "Quản lý giao dịch",
        path: "admin/payments",
        icon: CreditCard,
        roles: ["admin"],
      },
      {
        name: "Giỏ Hàng",
        path: "cart",
        icon: ShoppingBag,
        roles: ["student", "instructor"],
      },
      {
        name: "Hỗ trợ",
        path: "help",
        icon: HelpCircle,
        roles: ["student", "instructor"],
      },
    ],
  },
];

export default Nav_Sidebar;
