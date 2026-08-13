import { useState } from "react";

import { useNavigate } from "react-router-dom";
import "../../quizz/style/CreateExamPage.css";
import LessionCart from "../components/LessionCart";
import useInsLessionCourse from "../hooks/useInsLessionCourse";

// MOCK SKELETON DATA (Giảng viên tự nối API logic sau này)
const MOCK_RECORDED_COURSES = [
  {
    _id: "course-1",
    title: "ReactJS cho người đi làm",
    instructor: "Nguyễn Văn A",
    lessonCount: 12,
    type: "RECORDED",
  },
  {
    _id: "course-2",
    title: "Node.js & MongoDB",
    instructor: "Trần Thị B",
    lessonCount: 8,
    type: "RECORDED",
  },
  {
    _id: "course-3",
    title: "Lập trình Web cơ bản",
    instructor: "Lê Văn C",
    lessonCount: 0,
    type: "RECORDED",
  },
];

const InstructorLessonCourseListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, lsCourse } =useInsLessionCourse()
  const filteredCourses = lsCourse.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div>
      <LessionCart
        searchTerm={searchTerm}
        navigate={navigate}
        setSearchTerm={setSearchTerm}
        filteredCourses={filteredCourses}
      />
    </div>
  );
};

export default InstructorLessonCourseListPage;
