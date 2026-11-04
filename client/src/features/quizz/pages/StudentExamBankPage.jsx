import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentExamBankCardList from "../components/StudentExamBankCardList";
import useExamBankCourses from "../hooks/useExamBankCourses";

function StudentExamBankPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  const { courses } = useExamBankCourses();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      (course.courseCode || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (course.courseName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (activeTab === "ALL") return matchesSearch;
    return matchesSearch && course.status === activeTab;
  });

  return (
    <div>
      <StudentExamBankCardList
        navigate={navigate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        courses={filteredCourses}
      />
    </div>
  );
}

export default StudentExamBankPage;
