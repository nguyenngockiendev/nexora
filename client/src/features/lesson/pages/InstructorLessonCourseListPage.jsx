import { useState } from "react";

import { useNavigate } from "react-router-dom";
import "../../quizz/style/CreateExamPage.css";
import LessionCart from "../components/LessionCart";
import useInsLessionCourse from "../hooks/useInsLessionCourse";

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
