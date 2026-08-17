import { useParams } from "react-router-dom";
import { useDetailsCourse } from "../hooks/useDetailsCourseClass";
import usePayment from "../../payment/hooks/usePayment";
import DetailsCourse from "../components/CourseDetails";

const DetailsCourseLive = () => {
  const { courseId } = useParams();
  const { detalscourse, error, loading } = useDetailsCourse(courseId);
  const {
    payment,
    error: errorPayment,
    loading: paymentloading,
  } = usePayment();

  return (
    <div className="w-full min-h-screen py-6 md:py-8 px-4 sm:px-6">
      <DetailsCourse
        detalscourse={detalscourse}
        error={error}
        loading={loading}
        payment={payment}
        errorPayment={errorPayment}
        paymentloading={paymentloading}
      />
    </div>
  );
};

export default DetailsCourseLive;
