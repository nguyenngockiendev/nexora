import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CreateExamPage.css";
import InstructorQuizCourseListView from "../components/InstructorQuizCourseListView";
import useInstructorQuizCourses from "../hooks/useInstructorQuizCourses";

const InstructorQuizCourseListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { courses, loading, error, refetch } = useInstructorQuizCourses();

  const filteredCourses = (courses || []).filter((c) =>
    (c.title || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectCourse = (courseId) => {
    navigate(`/instructor/quizzes/${courseId}`);
  };

  const handleBack = () => {
    navigate("/instructor/assessments");
  };

  return (
    <div>
      <InstructorQuizCourseListView
        courses={filteredCourses}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelectCourse={handleSelectCourse}
        onBack={handleBack}
        onRefresh={refetch}
      />
    </div>
  );
};

export default InstructorQuizCourseListPage;
