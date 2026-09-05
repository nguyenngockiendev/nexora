import { useState } from "react";
import AssessmentHubView from "../components/AssessmentHubView";

const AssessmentHubPage = () => {
  const [stats] = useState({
    totalTests: 24,
    completedGraded: 153,
    gradedPercent: "96.8%",
    pendingManual: 5,
  });

  const [quizInfo] = useState({
    totalQuizzes: 18,
  });

  const [assignmentInfo] = useState({
    totalAssignments: 6,
    pendingGrading: 5,
  });

  const handleRefresh = () => {
    console.log("Refreshing assessment hub data...");
  };

  return (
    <div className="w-full min-h-screen py-4 md:py-6 px-2 md:px-4">
      <AssessmentHubView
        stats={stats}
        quizInfo={quizInfo}
        assignmentInfo={assignmentInfo}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default AssessmentHubPage;
