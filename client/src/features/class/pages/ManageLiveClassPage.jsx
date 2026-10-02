import { useState } from "react";
import ManageClass from "../components/ManageLiveClass";
import useLiveCourse from "../hooks/useLiveCourses";
import { useNavigate } from "react-router-dom";
import PaginationForm from "../../../shared/components/PaginationForm";
import usePagination from "../../../shared/hooks/usePagination";

const ManageLiveclassRoom = () => {
  const { listCourseLive, error, loading } = useLiveCourse();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const navigate = useNavigate();
  const pagination = usePagination(listCourseLive, 3);
  return (
    <div>
      <ManageClass
        listCourseLive={pagination.currentData}
        error={error}
        loading={loading}
        navigate={navigate}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
      />
      {!loading && listCourseLive?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <PaginationForm pagination={pagination} itemName="khóa học" />
        </div>
      )}
    </div>
  );
};

export default ManageLiveclassRoom;
