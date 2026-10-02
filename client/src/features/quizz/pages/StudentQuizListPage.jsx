import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentQuizzCart from "../components/StudenQuizzCart";
import useExamQuizz from "../hooks/useGetExamQuiz";
import PaginationForm from "../../../shared/components/PaginationForm";
import usePagination from "../../../shared/hooks/usePagination";

function StudentQuizListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  const { quizList } = useExamQuizz();

  const filteredQuizzes = quizList.filter((quiz) => {
    const matchesSearch =
      quiz.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "ALL") return matchesSearch;
    return matchesSearch && quiz.status === activeTab;
  });
  const pagination = usePagination(filteredQuizzes, 6);
  return (
    <div>
      <StudentQuizzCart
        navigate={navigate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredQuizzes={pagination.currentData}
      />
      {filteredQuizzes?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <PaginationForm pagination={pagination} itemName="Bài kiểm tra" />
        </div>
      )}
    </div>
  );
}

export default StudentQuizListPage;
