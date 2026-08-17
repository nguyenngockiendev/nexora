import { useState } from "react";
import { toast } from "react-toastify";
import AdminCourseQualityView from "../components/AdminCourseQualityView";
import useManagerCoursebyAdmin from "../hooks/useManagerCourseByAdmin";
import { useEffect } from "react";

const AdminCourseQualityPage = () => {
  const { courses, error, loading, getcourses, updateStatusCourseAndLession } =
    useManagerCoursebyAdmin();
  const [couseSecons, setCouseSecons] = useState([]);
  useEffect(() => {
    getcourses();
  }, []);
  useEffect(() => {
    setCouseSecons(courses);
  }, [courses]);

  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [inspectCourse, setInspectCourse] = useState(null);
  const [warningCourse, setWarningCourse] = useState(null);

  const [localCourses, setLocalCourses] = useState(null);

  const [warningText, setWarningText] = useState("");

  const totalCoursesCount = couseSecons.length;
  const lowRatingCount = couseSecons.filter(
    (c) =>
      (c.avgRatting || c.rating || 0) < 3.0 &&
      (c.toatalcomment || c.totalReviews || 0) > 0,
  ).length;
  const healthyCount = couseSecons.filter(
    (c) =>
      (c.avgRatting || c.rating || 0) >= 3.5 ||
      (c.toatalcomment || c.totalReviews || 0) === 0,
  ).length;
  const bannedCount = couseSecons.filter((c) => c.status === "banned").length;

  const filteredCourses = couseSecons.filter((item) => {
    const courseRating = item.avgRatting ?? item.rating ?? 0;

    const matchSearch =
      !searchTerm.trim() ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructorName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRating =
      !ratingFilter ||
      (ratingFilter === "low" &&
        courseRating < 3.0 &&
        (item.toatalcomment || item.totalReviews || 0) > 0) ||
      (ratingFilter === "healthy" &&
        (courseRating >= 3.5 ||
          (item.toatalcomment || item.totalReviews || 0) === 0));

    const matchType = !typeFilter || item.type === typeFilter;
    const matchStatus = !statusFilter || item.status === statusFilter;

    return matchSearch && matchRating && matchType && matchStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setRatingFilter("");
    setTypeFilter("");
    setStatusFilter("");
  };

  const handleToggleLockCourse = async (item) => {
    const isBanned = await updateStatusCourseAndLession(
      item._id,
      item.status === "inactive" ? "active" : "inactive",
    );
    await getcourses();
    if (isBanned.isLooked.status === "active") {
      toast.success(`Đã Mở khóa lại khóa học "${item.title}"!`);
    } else {
      toast.warn(`Đã KHÓA TOÀN BỘ khóa học "${item.title}"!`);
    }
  };

  const handleSendWarningSubmit = (e) => {
    e.preventDefault();
    if (!warningText.trim()) {
      toast.error("Vui lòng nhập nội dung nhắc nhở cảnh báo!");
      return;
    }
    toast.info(
      `Đã gửi thông báo cảnh báo chất lượng tới Giảng viên ${warningCourse?.instructorName || "Giảng viên"}!`,
    );
    setWarningCourse(null);
    setWarningText("");
  };

  return (
    <div className="w-full">
      <AdminCourseQualityView
        courses={couseSecons}
        filteredCourses={filteredCourses}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        handleResetFilters={handleResetFilters}
        inspectCourse={inspectCourse}
        setInspectCourse={setInspectCourse}
        warningCourse={warningCourse}
        setWarningCourse={setWarningCourse}
        warningText={warningText}
        setWarningText={setWarningText}
        handleToggleLockCourse={handleToggleLockCourse}
        handleSendWarningSubmit={handleSendWarningSubmit}
        totalCoursesCount={totalCoursesCount}
        lowRatingCount={lowRatingCount}
        healthyCount={healthyCount}
        bannedCount={bannedCount}
      />
    </div>
  );
};

export default AdminCourseQualityPage;
