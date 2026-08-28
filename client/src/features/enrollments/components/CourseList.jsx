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
  
  const {dashboard} = useOutletContext();

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
          const title = item?.courseId?.title || "Khóa học";
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
            item?.numberStudy?.length || item?.totalLessons || 10;
          const nextLessonTitle =
            item?.nextLesson?.title || "Kiến trúc nền tảng bài học";
          const rating =
            item?.rating || item?.courseId?.rating || (isLive ? 4.8 : 4.5);

          return (
            <div
              key={item._id}
              className="group flex flex-col justify-between rounded-[2.2rem] p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(194,110,30,0.06)] hover:shadow-[0_20px_45px_rgba(249,115,22,0.12)] relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.78)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">
                    {isLive ? "Lớp trực tuyến" : "Khóa học video"}
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-black text-slate-800">
                    <span>{Number(rating).toFixed(1)}</span>
                    <Star size={13} className="text-amber-500 fill-amber-500" />
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors mb-2">
                  {title}
                </h3>

                <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 mb-3.5">
                  <div className="flex items-center gap-1">
                    <Clock size={13} />
                    <span>
                      {item?.courseId?.category ||
                        (isLive ? "UI/UX & Lập trình" : "Công nghệ")}
                    </span>
                  </div>
                  {isLive && (
                    <div className="flex items-center gap-1">
                      <Users size={13} />
                      <span>{item?.studentsCount || 3} học viên</span>
                    </div>
                  )}
                </div>

                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                  {isLive ? (
                    <>
                      <div className="absolute top-3 left-3 z-10">
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider shadow-md"
                          style={{
                            background:
                              "linear-gradient(135deg, #ef4444, #f97316)",
                            borderRadius: "9999px",
                          }}
                        >
                          <Radio size={12} className="animate-pulse" /> TRỰC
                          TUYẾN
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <span className="text-xs font-bold text-white/95 line-clamp-1 drop-shadow-sm">
                          Đang phát:{" "}
                          {item?.classId?.title || "Buổi học tương tác"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <span className="text-xs font-black text-white/95 uppercase tracking-wider drop-shadow-sm bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        {title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-500 mb-3">
                  Giảng viên:{" "}
                  <strong className="text-slate-800 font-extrabold">
                    {instructorName}
                  </strong>
                </div>

                {isLive ? (
                  <div className="space-y-1.5 mb-6">
                    <div className="text-xs font-semibold text-slate-600">
                      Chủ đề hiện tại:{" "}
                      <strong className="text-slate-800 font-bold">
                        {item?.classId?.topic || "Kiến trúc & Thực hành"}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5 mb-6">
                    <div>
                      <div className="flex justify-between items-center text-xs font-extrabold text-slate-800 mb-1.5">
                        <span className="text-slate-700">
                          {progress}% hoàn thành
                        </span>
                        <span className="text-slate-400 font-semibold">
                          {completedCount}/{totalLessonsCount} Bài học
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${progress || 20}%`,
                            background:
                              "linear-gradient(90deg, #f97316, #fb923c)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-xs font-medium text-slate-500 truncate">
                      Bài học tiếp theo:{" "}
                      <strong className="text-slate-800 font-bold">
                        {nextLessonTitle}
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                {isLive ? (
                  <Link
                    to={`live/class/${item?.classId?._id || item?.classId || ""}/item`}
                    className="block w-full"
                  >
                    <button
                      className="w-full py-3.5 px-6 rounded-full text-sm font-black text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        borderRadius: "9999px",
                      }}
                    >
                      Vào lớp học
                    </button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2.5 w-full">
                    <Link
                      to={`courses/${item?.courseId?._id}/item`}
                      className="flex-1"
                    >
                      <button
                        className="w-full py-3 px-4 rounded-full text-xs md:text-sm font-black text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all text-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #f39a5a, #b35a12)",
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
                        className="w-full py-3 px-4 rounded-full text-xs md:text-sm font-extrabold text-slate-700 bg-white/80 border border-slate-300 hover:bg-white hover:border-slate-400 hover:text-slate-900 hover:scale-[1.02] active:scale-95 transition-all shadow-sm text-center"
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

      {courses && courses.length > 0 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
            style={{ borderRadius: "9999px" }}
          >
            <ChevronLeft size={14} /> Trước
          </button>

          <button
            className="w-7 h-7 rounded-full text-xs font-black text-orange-600 bg-orange-100 flex items-center justify-center shadow-xs"
            style={{ borderRadius: "9999px" }}
          >
            1
          </button>
          <button
            className="w-7 h-7 rounded-full text-xs font-bold text-slate-500 hover:bg-white/80 flex items-center justify-center transition-colors"
            style={{ borderRadius: "9999px" }}
          >
            2
          </button>
          <button
            className="w-7 h-7 rounded-full text-xs font-bold text-slate-500 hover:bg-white/80 flex items-center justify-center transition-colors"
            style={{ borderRadius: "9999px" }}
          >
            3
          </button>

          <button
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
            style={{ borderRadius: "9999px" }}
          >
            Sau <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
