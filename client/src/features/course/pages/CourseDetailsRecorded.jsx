import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Detailscourse from "../components/DetailsCourse";
import { useDetails } from "../hooks/useDetailsCourse";
import usePayment from "../../payment/hooks/usePayment";
import useRating from "../hooks/useRating";
import PaymentQRModal from "../../payment/components/PaymentQRModal";
import useShareSocket from "../../../shared/hooks/useSocket";
import { toast } from "react-toastify";

const CourseDetailsRecorded = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const socket = useShareSocket();
  const { detalscourse, error, loading } = useDetails(courseId);
  const {
    payment,
    qrpayment,
    setQrpayment,
    loading: paymentLoading,
  } = usePayment();
  const { ratings, CreateAndUpdate } = useRating(courseId);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [expandedSyllabus, setExpandedSyllabus] = useState(true);
  const [instructorRating, setUserRating] = useState(5);

  const qrUrl =
    qrpayment?.url || (typeof qrpayment === "string" ? qrpayment : null);

  useEffect(() => {
    if (!socket) return;
    socket.on("payment_success", (data) => {
      toast.success(data?.message || "Thanh toán thành công!");
      navigate("/student");
    });
    return () => socket.off("payment_success");
  }, [socket, navigate]);

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
        paymentLoading={paymentLoading}
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

      {qrUrl && (
        <PaymentQRModal
          qrUrl={qrUrl}
          courseTitle={detalscourse?.title}
          onClose={() => setQrpayment(null)}
        />
      )}
    </div>
  );
};

export default CourseDetailsRecorded;
