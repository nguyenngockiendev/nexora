import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CreateExamPage.css";
import InstructorQuizCourseListView from "../components/InstructorQuizCourseListView";
import useInstructorQuizCourses from "../hooks/useInstructorQuizCourses";

const InstructorQuizCourseListPage = ({ mode = "recorded" }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { courses, loading, error, refetch } = useInstructorQuizCourses(mode);

  const filteredCourses = (courses || []).filter((c) =>
    (c.title || c.courseTitle || "").toLowerCase().includes(searchTerm.toLowerCase()),
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
        mode={mode}
      />
    </div>
  );
};

export default InstructorQuizCourseListPage;
