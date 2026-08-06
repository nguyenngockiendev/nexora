import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Detailscourse from "../components/DetailsCourse";
import { useDetails } from "../hooks/useDetailsCourse";
import usePayment from "../../payment/hooks/usePayment";
import useRating from "../hooks/useRating";

const CourseDetailsRecorded = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { detalscourse, error, loading } = useDetails(courseId);
  const { payment } = usePayment();
  const { ratings, CreateAndUpdate } = useRating(courseId);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [expandedSyllabus, setExpandedSyllabus] = useState(true);
  const [instructorRating, setUserRating] = useState(5);

  const totalDuration = (detalscourse?.lessons || []).reduce(
    (acc, curr) => acc + curr.duration,
    0,
  );
  const handInstructorRatingChange = async (e) => {
    e.preventDefault();
    await CreateAndUpdate({
      instructorRating: instructorRating,
    });
  };
  const handleOpenPreview = (videoUrl) => {
    if (!videoUrl) return;
    setPreviewVideoUrl(videoUrl);
    setShowPreviewModal(true);
  };
  return (
    <div>
      <Detailscourse
        handInstructorRatingChange={handInstructorRatingChange}
        instructorRating={instructorRating}
        setUserRating={setUserRating}
        ratings={ratings}
        payment={payment}
        navigate={navigate}
        detalscourse={detalscourse}
        error={error}
        loading={loading}
        activeLessonId={activeLessonId}
        setActiveLessonId={setActiveLessonId}
        showPreviewModal={showPreviewModal}
        setShowPreviewModal={setShowPreviewModal}
        previewVideoUrl={previewVideoUrl}
        handleOpenPreview={handleOpenPreview}
        expandedSyllabus={expandedSyllabus}
        setExpandedSyllabus={setExpandedSyllabus}
        totalDuration={totalDuration}
      />
    </div>
  );
};

export default CourseDetailsRecorded;
