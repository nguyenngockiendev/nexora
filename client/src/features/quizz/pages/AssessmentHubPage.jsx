import AssessmentHubView from "../components/AssessmentHubView";
import useAssessment from "../hooks/useAssessment";

const AssessmentHubPage = () => {
  const { assessmetshub, loading, getAssessmenthub } = useAssessment();

  const handleRefresh = () => {
    if (getAssessmenthub) getAssessmenthub();
  };

  return (
    <div className="w-full min-h-screen py-4 md:py-6 px-2 md:px-4">
      <AssessmentHubView
        assessmetshub={assessmetshub}
        loading={loading}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default AssessmentHubPage;
