import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CreateExamPage.css";
import InstructorQuizCourseListView from "../components/InstructorQuizCourseListView";
import useInstructorQuizCourses from "../hooks/useInstructorQuizCourses";
import usePagination from "../../../shared/hooks/usePagination";
import PaginationForm from "../../../shared/components/PaginationForm";

const InstructorQuizCourseListPage = ({ mode = "recorded" }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { courses, loading, error, refetch } = useInstructorQuizCourses(mode);

  const filteredCourses = (courses || []).filter((c) =>
    (c.title || c.courseTitle || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const handleSelectCourse = (id) => {
    if (mode === "assessments") {
      navigate(`/instructor/assessments/${id}`);
    } else {
      navigate(`/instructor/quizzes/${id}`);
    }
  };

  const handleBack = () => {
    navigate("/instructor/assessments");
  };
  const pagination = usePagination(filteredCourses, 5);
  return (
    <div>
      <InstructorQuizCourseListView
        courses={pagination.currentData}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelectCourse={handleSelectCourse}
        onBack={handleBack}
        onRefresh={refetch}
        mode={mode}
      />
      {!loading && filteredCourses?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <PaginationForm pagination={pagination} itemName="khóa học" />
        </div>
      )}
    </div>
  );
};

export default InstructorQuizCourseListPage;
