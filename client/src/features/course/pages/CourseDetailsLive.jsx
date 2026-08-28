import { useNavigate, useParams } from "react-router-dom";
import { useDetailsCourse } from "../hooks/useDetailsCourseClass";
import usePayment from "../../payment/hooks/usePayment";
import DetailsCourse from "../components/CourseDetails";
import useShareSocket from "../../../shared/hooks/useSocket";
import { useEffect } from "react";
import { toast } from "react-toastify";

const DetailsCourseLive = () => {
  const { courseId } = useParams();
  const { detalscourse, error, loading } = useDetailsCourse(courseId);
  const {
    payment,
    qrpayment,
    setQrpayment,
    error: errorPayment,
    loading: paymentloading,
  } = usePayment();

  const socket = useShareSocket();
  const navigate = useNavigate();

  const qrUrl =
    qrpayment?.url || (typeof qrpayment === "string" ? qrpayment : null);

  useEffect(() => {
    if (!socket) return;
    socket.on("payment_success", (data) => {
      toast.success(data?.message || "Thanh toán thành công!");

      navigate("/student");
    });

    return () => {
      socket.off("payment_success");
    };
  }, [socket, navigate]);
  return (
    <div className="w-full min-h-screen py-6 md:py-8 px-4 sm:px-6">
      <DetailsCourse
        detalscourse={detalscourse}
        error={error}
        loading={loading}
        payment={payment}
        errorPayment={errorPayment}
        paymentloading={paymentloading}
        qrUrl={qrUrl}
        setQrpayment={setQrpayment}
      />
    </div>
  );
};

export default DetailsCourseLive;
