import { Link, useOutletContext } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Star,
  Clock,
  Users,
  Radio,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CourseList = ({ courses, error, loading, setFilter, setSearch }) => {
  const { dashboard } = useOutletContext();

  const activeCoursesCount = courses?.length || 0;

  return (
    <div className="w-full space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 ">
        <div className="relative w-full lg:max-w-md -ml-3">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, giảng viên..."
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="w-full pl-6 pr-12 py-3.5 rounded-full text-sm font-semibold bg-white/70 border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-800 placeholder-slate-400"
            style={{ borderRadius: "9999px" }}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <select
              onChange={(e) => setFilter && setFilter(e.target.value)}
              className="appearance-none pl-5 pr-10 py-3 rounded-full text-xs md:text-sm font-bold bg-white/70 border border-white/90 shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="All Courses">Tất cả danh mục</option>
              <option value="buy">Khóa học đang học</option>
              <option value="live">Lớp trực tuyến</option>
              <option value="recorded">Khóa học video</option>
            </select>
            <ChevronDown
              size={15}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>

          <div className="relative">
            <select
              className="appearance-none pl-5 pr-10 py-3 rounded-full text-xs md:text-sm font-bold bg-white/70 border border-white/90 shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="latest">Sắp xếp: Mới nhất</option>
              <option value="progress">Sắp xếp: Tiến độ</option>
              <option value="title">Sắp xếp: Tên khóa học</option>
            </select>
            <ChevronDown
              size={15}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Khóa Học Của Tôi
        </h1>
        <p className="text-sm md:text-base font-semibold text-slate-500">
          Chào mừng trở lại, {dashboard?.name} •{" "}
          <span className="text-orange-600 font-extrabold">
            {activeCoursesCount} Khóa học đang tham gia
          </span>
        </p>
      </div>

      {error && (
        <div className="p-5 rounded-3xl bg-red-50/80 border border-red-200 text-red-600 font-bold text-sm backdrop-blur-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7">
        {courses?.map((item) => {
          const isLive = item?.type === "live";
          const courseTitle = item?.courseId?.title || "Khóa học";
          const className = item?.classId?.className || "";
          const title = isLive
            ? className
              ? `${courseTitle} - ${className}`
              : courseTitle
            : courseTitle;
          const instructorName =
            item?.instructor?.name ||
            item?.courseId?.instructorName ||
            "Giảng viên";
          const thumbnail =
            item?.courseId?.thumbnail ||
            (isLive
              ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80"
              : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80");
          const progress = Number(item?.process || 0);
          const completedCount = item?.completed?.length || 0;
          const totalLessonsCount =
            item?.numberStudy?.length || item?.totalLessons || 0;
          const nextLessonTitle =
            item?.nextLesson?.title ||
            (completedCount >= totalLessonsCount && totalLessonsCount > 0
              ? "Đã hoàn thành tất cả bài học 🎉"
              : "Bắt đầu bài học đầu tiên");
          const rating = item?.rating ? Number(item.rating).toFixed(1) : "5.0";

          return (
            <div
              key={item._id}
              className="group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_25px_rgba(194,110,30,0.06)] hover:shadow-[0_16px_36px_rgba(249,115,22,0.1)] relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.78)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                    {isLive ? "Lớp trực tuyến" : "Khóa học video"}
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-black text-slate-800">
                    <span>{rating}</span>
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-800 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors mb-1.5 min-h-[2.6rem]">
                  {title}
                </h3>

                <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400 mb-2.5">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>
                      {item?.courseId?.category ||
                        (isLive ? "Lớp học trực tuyến" : "Khóa học video")}
                    </span>
                  </div>
                  {isLive && (
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>
                        {item?.classId?.currentStudents ?? 0} học viên
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative h-32 sm:h-36 rounded-xl overflow-hidden mb-3 shadow-xs group-hover:shadow-md transition-all">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {isLive && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <div
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-sm"
                        style={{
                          background:
                            "linear-gradient(135deg, #ef4444, #f97316)",
                          borderRadius: "9999px",
                        }}
                      >
                        <Radio size={10} className="animate-pulse" /> TRỰC TUYẾN
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-500 mb-2.5">
                  Giảng viên:{" "}
                  <strong className="text-slate-800 font-bold">
                    {instructorName}
                  </strong>
                </div>

                {isLive ? (
                  <div className="space-y-1 mb-3.5">
                    <div className="text-xs font-medium text-slate-600">
                      Mô tả lớp học:{" "}
                      <strong className="text-slate-800 font-bold">
                        {item?.classId?.description ||
                          "Học trực tuyến tương tác cùng giảng viên"}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 mb-3.5">
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-800 mb-1">
                        <span className="text-slate-700">
                          {progress}% hoàn thành
                        </span>
                        <span className="text-slate-400 font-semibold">
                          {completedCount}/{totalLessonsCount} Bài học
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${progress}%`,
                            background:
                              "linear-gradient(90deg, #f97316, #fb923c)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-[11px] font-medium text-slate-500 truncate">
                      Bài học tiếp theo:{" "}
                      <strong className="text-slate-800 font-semibold">
                        {nextLessonTitle}
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-1">
                {isLive ? (
                  <Link
                    to={`live/class/${item?.classId?._id || item?.classId || ""}/item`}
                    className="block w-full"
                  >
                    <button
                      className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        borderRadius: "9999px",
                      }}
                    >
                      Vào lớp học
                    </button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 w-full">
                    <Link
                      to={`courses/${item?.courseId?._id}/item`}
                      className="flex-1"
                    >
                      <button
                        className="w-full py-2 px-3 rounded-full text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.01] active:scale-95 transition-all text-center cursor-pointer"
                        style={{
                          background:
                            "linear-gradient(135deg, #f97316, #ea580c)",
                          borderRadius: "9999px",
                        }}
                      >
                        Học ngay
                      </button>
                    </Link>

                    <Link
                      to={`/courses-all/details/recorded/${item?.courseId?._id}`}
                      className="flex-1"
                    >
                      <button
                        className="w-full py-2 px-3 rounded-full text-xs font-bold text-slate-700 bg-white/90 border border-slate-200/90 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all shadow-2xs text-center cursor-pointer"
                        style={{ borderRadius: "9999px" }}
                      >
                        Chi tiết
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {courses?.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center text-slate-500 font-semibold text-sm">
            Không tìm thấy khóa học nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
