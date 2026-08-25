import {
  Calendar,
  Clock,
  Video,
  Radio,
  ArrowRight,
  AlertCircle,
  Loader2,
  CalendarDays,
  Hourglass,
  ShoppingCart,
} from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../../cart/hooks/useCart";

const DetailsCourse = ({
  detalscourse = [],
  error,
  loading,
  payment,
  errorPayment,
  paymentloading,
}) => {
  const { addToCart } = useCart();
  const courseInfo = detalscourse?.[0]?.courseId || {};
  const instructor =
    (courseInfo?.instructor &&
      typeof courseInfo.instructor === "object" &&
      courseInfo.instructor) ||
    (detalscourse?.[0]?.instructorId &&
      typeof detalscourse[0].instructorId === "object" &&
      detalscourse[0].instructorId) ||
    (courseInfo?.instructorId &&
      typeof courseInfo.instructorId === "object" &&
      courseInfo.instructorId) ||
    null;

  const getDayLabel = (day) => {
    const map = {
      Monday: "Thứ Hai",
      Tuesday: "Thứ Ba",
      Wednesday: "Thứ Tư",
      Thursday: "Thứ Năm",
      Friday: "Thứ Sáu",
      Saturday: "Thứ Bảy",
      Sunday: "Chủ Nhật",
    };
    return map[day] || day || "Thứ Hai";
  };

  const { dashboard } = useOutletContext();
  const token = localStorage.getItem("token");
  let currentUserId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded?.userId || decoded?.id;
    } catch (err) {
      console.log(err);
    }
  }

  const instructorId =
    courseInfo?.instructor?._id ||
    courseInfo?.instructor ||
    courseInfo?.instructorId?._id ||
    courseInfo?.instructorId;
  const isOwner =
    currentUserId &&
    instructorId &&
    String(currentUserId) === String(instructorId);

  const availableClasses = detalscourse?.filter((c) => !c._emptyClass) || [];

  const startingPrice =
    availableClasses.length > 0
      ? Math.min(...availableClasses.map((c) => Number(c.price || 0)))
      : Number(courseInfo?.price || 0);

  const scrollToClasses = () => {
    const el = document.getElementById("available-classes-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 pb-16">
      <section
        className="rounded-[2.5rem] p-6 lg:p-10 relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-[0_20px_50px_rgba(194,110,30,0.06)] w-full"
        style={{
          background: "rgba(255, 255, 255, 0.78)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none blur-[70px]"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />

        <div className="w-full lg:w-[480px] xl:w-[560px] h-64 sm:h-80 rounded-2xl overflow-hidden relative shrink-0 shadow-sm group">
          <img
            src={
              courseInfo?.thumbnail ||
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
            }
            alt={courseInfo?.title || "Khóa học trực tuyến"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />

          <div className="absolute top-3.5 left-3.5 z-10">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider shadow-md"
              style={{
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                borderRadius: "9999px",
              }}
            >
              <Radio size={12} className="animate-pulse" /> PHÒNG HỌC TRỰC TUYẾN
            </div>
          </div>

          <div className="absolute bottom-3.5 left-4 right-4 z-10">
            <p className="text-xs font-extrabold text-white/90 drop-shadow-sm truncate">
              Lộ trình học trực tuyến tương tác cao
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-orange-600 bg-orange-100/80 border border-orange-200 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />{" "}
              Khóa Học Live
            </div>
            {isOwner && (
              <Link
                to={`/course/update/${courseInfo?._id}`}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:scale-105 transition-all"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                }}
              >
                Chỉnh sửa khóa học
              </Link>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {courseInfo?.title || "Khóa Học Trực Tuyến"}
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
            {courseInfo?.description ||
              "Học tập trực tuyến tương tác cùng giảng viên qua các buổi học thời gian thực, thực hành các dự án thực tế."}
          </p>

          {/* Instructor Box */}
          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/70 border border-white/90 shadow-xs max-w-md">
            <img
              src={
                instructor?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor?.name || "Giảng viên")}&background=f97316&color=fff`
              }
              alt={instructor?.name || "Giảng viên"}
              className="w-12 h-12 rounded-full object-cover shadow-xs border border-orange-200 shrink-0"
            />
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {instructor?.name || "Giảng viên Nexora"}
              </h4>
              <p className="text-[11px] font-bold text-slate-500 truncate">
                {instructor?.email ||
                  (instructor?.role === "instructor"
                    ? "Giảng viên chuyên môn"
                    : "Giảng viên Nexora")}
              </p>
              <p className="text-[10px] font-semibold text-orange-600">
                {instructor?.role === "instructor"
                  ? "Giảng viên chính thức • Nexora"
                  : "Chuyên gia đào tạo"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Học phí từ
              </span>
              <span className="text-2xl font-black text-orange-600">
                {startingPrice === 0
                  ? "Miễn phí"
                  : `${Number(startingPrice).toLocaleString("vi-VN")} đ`}
              </span>
            </div>

            <button
              onClick={scrollToClasses}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-black text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                borderRadius: "9999px",
              }}
            >
              Khám Phá Lớp Học <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. AVAILABLE LIVE CLASSES SECTION ── */}
      <div id="available-classes-section" className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Danh Sách Lớp Học Đang Mở
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              Lựa chọn lịch học và thời gian phù hợp nhất với bạn
            </p>
          </div>
        </div>

        {/* Payment Error Alert */}
        {errorPayment && (
          <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 text-red-600 font-bold text-xs flex items-center gap-2 shadow-xs backdrop-blur-md">
            <AlertCircle size={18} />
            <span>{errorPayment}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center justify-center p-12 text-orange-600 font-bold text-sm gap-2">
            <Loader2 className="animate-spin" size={26} /> Đang tải danh sách
            lớp học...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold text-xs">
            {error}
          </div>
        )}

        {!loading && availableClasses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableClasses.map((item) => {
              console.log("item", item);
              const isClosed =
                item?.status?.toLowerCase() === "closed" ||
                item?.status?.toLowerCase() === "ended";
              const currentStudents = Number(item?.currentStudents || 0);
              const maxStudents = Number(item?.maxStudents || 20);
              const seatPercentage = Math.min(
                Math.round((currentStudents / maxStudents) * 100),
                100,
              );

              return (
                <div
                  key={item._id}
                  className="group flex flex-col justify-between p-5 md:p-6 rounded-[2.2rem] transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(194,110,30,0.05)] hover:shadow-[0_20px_45px_rgba(249,115,22,0.12)] relative overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.78)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(24px)",
                  }}
                >
                  <div className="space-y-4">
                    {/* Header: Class Name & Status Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 line-clamp-1 leading-snug group-hover:text-orange-600 transition-colors">
                          {item?.className || "Lớp Học Trực Tuyến"}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                          Lớp học trực tuyến tương tác
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs ${
                          isClosed
                            ? "bg-slate-200 text-slate-600"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        }`}
                        style={{ borderRadius: "9999px" }}
                      >
                        {!isClosed && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        {isClosed
                          ? "ĐÃ ĐÓNG"
                          : item?.status === "open"
                            ? "ĐANG MỞ"
                            : item?.status || "ĐANG MỞ"}
                      </span>
                    </div>

                    {/* Seat Capacity Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Số chỗ</span>
                        <span className="text-slate-500 font-extrabold">
                          {currentStudents}/{maxStudents} học viên
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${seatPercentage}%`,
                            background:
                              seatPercentage >= 100
                                ? "#ef4444"
                                : seatPercentage >= 80
                                  ? "#f59e0b"
                                  : "linear-gradient(90deg, #10b981, #059669)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-semibold text-slate-600 pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar
                          size={14}
                          className="text-orange-500 shrink-0"
                        />
                        <span>
                          Ngày bắt đầu:{" "}
                          <strong className="text-slate-800 font-bold">
                            {item?.startDate || "Sắp mở"}
                          </strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Hourglass
                          size={14}
                          className="text-amber-500 shrink-0"
                        />
                        <span>
                          Ngày kết thúc:{" "}
                          <strong className="text-slate-800 font-bold">
                            {item?.endDate || "Sắp công bố"}
                          </strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={14}
                          className="text-blue-500 shrink-0"
                        />
                        <span>
                          Lịch học:{" "}
                          <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 font-bold text-[11px]">
                            {getDayLabel(item?.schedule?.day)}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-indigo-500 shrink-0" />
                        <span>
                          Khung giờ:{" "}
                          <strong className="text-slate-800 font-bold">
                            {item?.schedule?.startTime || "09:00"} -{" "}
                            {item?.schedule?.endTime || "11:00"}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {dashboard.role != "instructor" ? (
                    <div className="flex items-center gap-2.5 w-full">
                      <button
                        disabled={isClosed}
                        onClick={() =>
                          addToCart &&
                          addToCart({
                            _id: item._id,
                            courseId: item.courseId?._id || item.courseId,
                            classId: item._id,
                            title: `${courseInfo?.title || "Khóa Học Live"} - ${item.className || "Lớp học"}`,
                            className: item.className,
                            type: "live",
                            price: Number(item.price || 0),
                            thumbnail: courseInfo?.thumbnail,
                            schedule: item.schedule,
                          })
                        }
                        className="flex-1 py-2.5 px-3.5 rounded-full text-xs font-black text-slate-700 bg-white/90 border border-slate-300 hover:bg-white hover:border-slate-400 hover:text-slate-900 shadow-2xs hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ borderRadius: "9999px" }}
                      >
                        <ShoppingCart size={15} /> Thêm vào giỏ
                      </button>

                      <button
                        disabled={paymentloading || isClosed}
                        onClick={() =>
                          payment({
                            ...item,
                            courseId: item.courseId?._id || item.courseId,
                            classId: item._id,
                            type: "live",
                          })
                        }
                        className="flex-1 py-2.5 px-3.5 rounded-full text-xs font-black text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                          background: isClosed
                            ? "#94a3b8"
                            : "linear-gradient(135deg, #f97316, #ea580c)",
                          borderRadius: "9999px",
                        }}
                      >
                        {paymentloading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" /> Đang
                            xử lý...
                          </>
                        ) : isClosed ? (
                          "Đã đóng lớp"
                        ) : (
                          "Đăng ký ngay"
                        )}
                      </button>
                    </div>
                  ) : null}

                  <div className="space-y-3 pt-5 border-t border-slate-100/80 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Học phí lớp
                      </span>
                      <span className="text-xl font-black text-orange-600">
                        {Number(item?.price || 0).toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && availableClasses.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center p-14 rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-dashed border-orange-200">
            <Video size={36} className="text-orange-400 mb-2 opacity-70" />
            <h4 className="text-lg font-black text-slate-800 mb-1">
              Chưa có lớp học nào được lên lịch
            </h4>
            <p className="text-xs md:text-sm font-semibold text-slate-500">
              Vui lòng quay lại sau hoặc liên hệ với giảng viên để biết thêm
              thông tin về các đợt mở lớp tiếp theo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsCourse;
