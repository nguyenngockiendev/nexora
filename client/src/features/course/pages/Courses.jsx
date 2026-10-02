import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CoursesForm from "../components/CourseForm";
import useGetCourses from "../hooks/useCourse";

import useShareSocket from "../../../shared/hooks/useSocket";
import { toast } from "react-toastify";
import PaginationForm from "../../../shared/components/PaginationForm";
import usePagination from "../../../shared/hooks/usePagination";

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
  const [courseType, setCourseType] = useState("all");

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

      if (courseType === "live") {
        result = result.filter((item) => item.type === "live");
      } else if (courseType === "recorded") {
        result = result.filter((item) => item.type === "recorded");
      } else if (courseType === "free") {
        result = result.filter((item) => Number(item.price || 0) === 0);
      } else if (courseType === "top_rated") {
        result = result.filter((item) => Number(item.rattingforcoure || 0) >= 4.5);
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
  }, [search, filter, courses, price, star, courseType]);

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

      if (courseType === "live") {
        result = result.filter((item) => item.type === "live");
      } else if (courseType === "recorded") {
        result = result.filter((item) => item.type === "recorded");
      } else if (courseType === "free") {
        result = result.filter((item) => Number(item.price || 0) === 0);
      } else if (courseType === "top_rated") {
        result = result.filter((item) => Number(item.rattingforcoure || 0) >= 4.5);
      }

      setFilterdatall(result);
    };

    handfilter();
  }, [search, filter, coursesall, courseType]);
  const currentList = mode === "all" ? filterdata : filterdatall;

  const pagination = usePagination(currentList, 9);
  return (
    <div className="w-full min-h-screen py-2 md:py-3">
      {mode == "all" ? (
        <CoursesForm
          mode={mode}
          setPrice={setPrice}
          setStar={setStar}
          courseType={courseType}
          setCourseType={setCourseType}
          rawCourses={courses}
          messagepayment={messagepayment}
          courses={pagination.currentData}
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
          courseType={courseType}
          setCourseType={setCourseType}
          rawCourses={coursesall}
          messagepayment={messagepayment}
          courses={pagination.currentData}
          error={error}
          loading={loading}
          role={role}
          setSearch={setSearch}
          setFilter={setFilter}
          navigate={navigate}
        />
      )}
      {!loading && currentList?.length > 0 && (
        <div className="w-full px-2 sm:px-4 md:px-6 mt-6">
          <PaginationForm pagination={pagination} itemName="khóa học" />
        </div>
      )}
    </div>
  );
};

export default Courses;
