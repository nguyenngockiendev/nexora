import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CoursesForm from "../components/CourseForm";
import useGetCourses from "../hooks/useCourse";
import usePayment from "../../payment/hooks/usePayment";

const Courses = ({ mode }) => {
  const [statusmessage] = useSearchParams();
  const { courses, coursesall, error, loading, getcourses, getcoursesAll } =
    useGetCourses();
  const [filterdata, setFilterdata] = useState([]);
  const [filterdatall, setFilterdatall] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Courses");

  useEffect(() => {
    getcourses();
    getcoursesAll();
  }, []);
  const {
    payment,
    error: errorPayment,
    loading: paymentloading,
  } = usePayment();
  const messagepayment = statusmessage.get("payment");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const handfilter = () => {
      let result = [...courses];
      if (search) {
        result = result.filter((item) =>
          item?.title?.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (filter !== "All Courses") {
        result = result.filter((item) => item.level === filter);
      }
      setFilterdata(result);
    };

    handfilter();
  }, [search, filter, courses]);

  useEffect(() => {
    const handfilter = () => {
      let result = [...coursesall];
      if (search) {
        result = result.filter((item) =>
          item?.title?.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (filter !== "All Courses") {
        result = result.filter((item) => item.level === filter);
      }
      setFilterdatall(result);
    };

    handfilter();
  }, [search, filter, coursesall]);

  return (
    <div className="w-full min-h-screen py-6 md:py-8">
      {mode == "all" ? (
        <CoursesForm
          messagepayment={messagepayment}
          payment={payment}
          errorPayment={errorPayment}
          paymentloading={paymentloading}
          courses={filterdata}
          error={error}
          loading={loading}
          role={role}
          setSearch={setSearch}
          setFilter={setFilter}
          navigate={navigate}
        />
      ) : (
        <CoursesForm
          messagepayment={messagepayment}
          payment={payment}
          errorPayment={errorPayment}
          paymentloading={paymentloading}
          courses={filterdatall}
          error={error}
          loading={loading}
          role={role}
          setSearch={setSearch}
          setFilter={setFilter}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default Courses;
