import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentQuizzCart from "../components/StudenQuizzCart";
import useExamQuizz from "../hooks/useGetExamQuiz";

function StudentQuizListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  const { error, loading, quizList } = useExamQuizz();

  const filteredQuizzes = quizList.filter((quiz) => {
    const matchesSearch =
      quiz.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "ALL") return matchesSearch;
    return matchesSearch && quiz.status === activeTab;
  });

  return (
    <div>
      <StudentQuizzCart
        navigate={navigate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredQuizzes={filteredQuizzes}
      />
    </div>
  );
}

export default StudentQuizListPage;
