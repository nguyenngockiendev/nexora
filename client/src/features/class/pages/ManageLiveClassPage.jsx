import { useState } from "react";
import ManageClass from "../components/ManageLiveClass";
import useLiveCourse from "../hooks/useLiveCourses";
import { useNavigate } from "react-router-dom";

const ManageLiveclassRoom = () => {
  const { listCourseLive, error, loading } = useLiveCourse();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const navigate = useNavigate();

  return (
    <ManageClass
      listCourseLive={listCourseLive}
      error={error}
      loading={loading}
      navigate={navigate}
      selectedCourseId={selectedCourseId}
      setSelectedCourseId={setSelectedCourseId}
    />
  );
};

export default ManageLiveclassRoom;
