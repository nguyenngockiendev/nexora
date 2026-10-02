import { useState } from "react";

import { useNavigate } from "react-router-dom";
import "../../quizz/style/CreateExamPage.css";
import LessionCart from "../components/LessionCart";
import useInsLessionCourse from "../hooks/useInsLessionCourse";
import PaginationForm from "../../../shared/components/PaginationForm";
import usePagination from "../../../shared/hooks/usePagination";

const InstructorLessonCourseListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, lsCourse } = useInsLessionCourse();
  const filteredCourses = lsCourse.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const pagination = usePagination(filteredCourses, 6);
  return (
    <div>
      <LessionCart
        searchTerm={searchTerm}
        navigate={navigate}
        setSearchTerm={setSearchTerm}
        filteredCourses={pagination.currentData}
      />
      {!loading && filteredCourses?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <PaginationForm pagination={pagination} itemName="khóa học" />
        </div>
      )}
    </div>
  );
};

export default InstructorLessonCourseListPage;
