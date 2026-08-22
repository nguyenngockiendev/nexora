import {
  Calendar,
  Clock,
  Users,
  Video,
  Radio,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CalendarDays,
  Hourglass,
  Tag,
  ShoppingCart,
} from "lucide-react";
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
  const instructor = courseInfo?.instructorId || {
    name: "John Doe",
    role: "Senior Frontend Developer",
    experience: "8+ years experience",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  };

  const startingPrice =
    detalscourse?.length > 0
      ? Math.min(...detalscourse.map((c) => Number(c.price || 0)))
      : Number(courseInfo?.price || 49);

  const scrollToClasses = () => {
    const el = document.getElementById("available-classes-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 pb-16">
      <section
        className="rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-10 shadow-[0_20px_50px_rgba(194,110,30,0.06)]"
        style={{
          background: "rgba(255, 255, 255, 0.78)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(30px)",
        }}
      >
        {/* Ambient warm glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none blur-[70px]"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />

        {/* Left: Video / Banner Thumbnail */}
        <div className="w-full lg:w-[460px] h-60 sm:h-72 rounded-2xl overflow-hidden relative shrink-0 shadow-sm group">
          <img
            src={
              courseInfo?.thumbnail ||
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
            }
            alt={courseInfo?.title || "React Master Course"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />

          {/* Live Badge Overlay */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider shadow-md"
              style={{
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                borderRadius: "9999px",
              }}
            >
              <Radio size={12} className="animate-pulse" /> LIVE STREAMING
            </div>
          </div>

          <div className="absolute bottom-3.5 left-4 right-4 z-10">
            <p className="text-xs font-extrabold text-white/90 drop-shadow-sm truncate">
              Intro to React Architecture & Hooks
            </p>
          </div>
        </div>

        {/* Right: Course Information */}
        <div className="flex-1 space-y-4 relative z-10">
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-orange-600 bg-orange-100/80 border border-orange-200 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />{" "}
            Live Course
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {courseInfo?.title || "React Master Course"}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
            {courseInfo?.description ||
              "Learn React from beginner to advanced with real live interactive classes. Build real projects and work directly with the instructor."}
          </p>

          {/* Instructor Card */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/70 border border-white/90 shadow-xs max-w-md">
            <img
              src={
                instructor?.avatar ||
                `https://ui-avatars.com/api/?name=${instructor?.name || "Instructor"}&background=f97316&color=fff`
              }
              alt="Instructor"
              className="w-12 h-12 rounded-full object-cover shadow-xs border border-orange-200 shrink-0"
            />
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {instructor?.name || "John Doe"}
              </h4>
              <p className="text-[11px] font-bold text-slate-500 truncate">
                {instructor?.role || "Senior Frontend Developer"}
              </p>
              <p className="text-[10px] font-semibold text-slate-400">
                {instructor?.experience || "8+ years experience"}
              </p>
            </div>
          </div>

          {/* Price & CTA Button */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Starting Price
              </span>
              <span className="text-2xl font-black text-orange-600">
                {startingPrice === 0
                  ? "Free"
                  : `${Number(startingPrice).toLocaleString("vi-VN")} đ`}
              </span>
            </div>

            <button
              onClick={scrollToClasses}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-black text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                borderRadius: "9999px",
              }}
            >
              Explore Classes <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Available Classes Section (Exact 1:1 with Design Mockup) ── */}
      <div id="available-classes-section" className="space-y-6 pt-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Available Classes
          </h2>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">
            Choose the class schedule that fits you best
          </p>
        </div>

        {/* Payment Error Alert */}
        {errorPayment && (
          <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 text-red-600 font-bold text-xs flex items-center gap-2 shadow-xs backdrop-blur-md">
            <AlertCircle size={18} />
            <span>{errorPayment}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-orange-500 font-bold text-base">
            <Loader2 className="animate-spin" size={26} /> Loading available
            classes...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold text-xs">
            {error}
          </div>
        )}

        {/* ── 3-Column Class Schedules Grid ── */}
        {!loading && detalscourse?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detalscourse.map((item) => {
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
                          {item?.className || "Morning Live Cohort"}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                          Live Interactive Class
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
                        {item?.status || "OPEN"}
                      </span>
                    </div>

                    {/* Seat Capacity Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Seats</span>
                        <span className="text-slate-500 font-extrabold">
                          {currentStudents}/{maxStudents}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${seatPercentage}%`,
                            background:
                              seatPercentage >= 90
                                ? "linear-gradient(90deg, #ef4444, #f97316)"
                                : "linear-gradient(90deg, #10b981, #14b8a6)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Schedule Metadata Box */}
                    <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-100 space-y-2 text-xs font-semibold text-slate-600 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <Calendar
                          size={14}
                          className="text-orange-500 shrink-0"
                        />
                        <span>
                          Start Date:{" "}
                          <strong className="text-slate-800 font-bold">
                            {item?.startDate || "TBA"}
                          </strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Hourglass
                          size={14}
                          className="text-amber-500 shrink-0"
                        />
                        <span>
                          End Date:{" "}
                          <strong className="text-slate-800 font-bold">
                            {item?.endDate || "TBA"}
                          </strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={14}
                          className="text-blue-500 shrink-0"
                        />
                        <span>
                          Schedule:{" "}
                          <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 font-bold text-[11px]">
                            {item?.schedule?.day || "Mon, Wed, Fri"}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-indigo-500 shrink-0" />
                        <span>
                          Time:{" "}
                          <strong className="text-slate-800 font-bold">
                            {item?.schedule?.startTime || "09:00"} -{" "}
                            {item?.schedule?.endTime || "11:00"}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="space-y-3 pt-5 border-t border-slate-100/80 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Class Price
                      </span>
                      <span className="text-xl font-black text-orange-600">
                        {Number(item?.price || 0).toLocaleString("vi-VN")} đ
                      </span>
                    </div>

                    {/* 2 Action Buttons (Add to Cart + Buy Now) */}
                    <div className="flex items-center gap-2.5 w-full">
                      {/* Add to Cart Button */}
                      <button
                        disabled={isClosed}
                        onClick={() =>
                          addToCart &&
                          addToCart({
                            _id: item._id,
                            courseId: item.courseId?._id || item.courseId,
                            classId: item._id,
                            title: `${courseInfo?.title || "Live Course"} - ${item.className || "Class Cohort"}`,
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
                        <ShoppingCart size={15} /> Add to Cart
                      </button>

                      {/* Buy Now / Enroll Button */}
                      <button
                        disabled={paymentloading || isClosed}
                        onClick={() => payment(item)}
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
                            <Loader2 size={15} className="animate-spin" />{" "}
                            Processing...
                          </>
                        ) : isClosed ? (
                          "Class Closed"
                        ) : (
                          "Buy Now"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && detalscourse?.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center p-14 rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-dashed border-orange-200">
            <Video size={36} className="text-orange-400 mb-2 opacity-70" />
            <h4 className="text-lg font-black text-slate-800 mb-1">
              No classes currently scheduled
            </h4>
            <p className="text-xs md:text-sm font-semibold text-slate-500">
              Please check back soon or contact the instructor for future
              cohorts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsCourse;
