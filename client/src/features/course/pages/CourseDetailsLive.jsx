import { useNavigate, useParams } from "react-router-dom";
import { useDetailsCourse } from "../hooks/useDetailsCourseClass";

import DetailsCourse from "../components/CourseDetails";

import { useCart } from "../../cart/hooks/useCart";

const DetailsCourseLive = () => {
  const { courseId } = useParams();
  const { detalscourse, error, loading } = useDetailsCourse(courseId);

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const handAddcart = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  return (
    <div className="w-full min-h-screen py-6 md:py-8 px-4 sm:px-6">
      <DetailsCourse
        detalscourse={detalscourse}
        error={error}
        loading={loading}
        handAddcart={handAddcart}
      />
    </div>
  );
};

export default DetailsCourseLive;
