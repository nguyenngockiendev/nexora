import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CoursesForm from "../components/CourseForm";
import useGetCourses from "../hooks/useCourse";

import useShareSocket from "../../../shared/hooks/useSocket";
import { toast } from "react-toastify";

const Courses = ({ mode }) => {
  const [statusmessage] = useSearchParams();
  const { courses, coursesall, error, loading, getcourses, getcoursesAll } =
    useGetCourses();
  const [filterdata, setFilterdata] = useState([]);
  const [filterdatall, setFilterdatall] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Courses");
  const [price, setPrice] = useState("");
  const [star, setStar] = useState("all");

  useEffect(() => {
    getcourses();
    getcoursesAll();
  }, []);

  const messagepayment = statusmessage.get("payment");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const socket = useShareSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("payment_success", (data) => {
      toast.success(data?.message || "Thanh toán thành công!");
      navigate("/student");
    });
    return () => socket.off("payment_success");
  }, [socket, navigate]);

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

      if (price !== "all" && price == "price-desc") {
        result = result.sort((a, b) => b.price - a.price);
      }
      if (price !== "all" && price == "price-asc") {
        result = result.sort((a, b) => a.price - b.price);
      }

      if (star !== "all") {
        result = result.filter(
          (item) => Number(item.rattingforcoure) >= Number(star),
        );
      }

      setFilterdata(result);
    };

    handfilter();
  }, [search, filter, courses, price, star]);

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
          mode={mode}
          setPrice={setPrice}
          setStar={setStar}
          messagepayment={messagepayment}
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
          mode={mode}
          setPrice={setPrice}
          setStar={setStar}
          messagepayment={messagepayment}
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
