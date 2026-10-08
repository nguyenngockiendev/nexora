import {
  Search,
  ChevronDown,
  Star,
  Clock,
  Radio,
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trophy,
} from "lucide-react";
import { useMemo } from "react";
import { useCart } from "../../cart/hooks/useCart";

const CoursesForm = ({
  courses = [],
  rawCourses = [],
  loading,
  paymentloading,
  setSearch,
  setFilter,
  navigate,
  errorPayment,
  messagepayment,
  setStar,
  setPrice,
  mode,
  courseType = "all",
  setCourseType,
}) => {
  const { addToCart } = useCart();

  const counts = useMemo(() => {
    const list = rawCourses && rawCourses.length > 0 ? rawCourses : courses;
    return {
      live: list.filter((c) => c?.type === "live").length,
      recorded: list.filter((c) => c?.type === "recorded").length,
      free: list.filter((c) => Number(c?.price || 0) === 0).length,
      topRated: list.filter((c) => Number(c?.rattingforcoure || 0) >= 4.5).length,
    };
  }, [rawCourses, courses]);

  const { featuredCourse, remainingCourses } = useMemo(() => {
    if (!courses || courses.length === 0)
      return { featuredCourse: null, remainingCourses: [] };
    const sorted = [...courses].sort(
      (a, b) => Number(b.rattingforcoure || 0) - Number(a.rattingforcoure || 0),
    );
    return {
      featuredCourse: sorted[0],
      remainingCourses: sorted.slice(1),
    };
  }, [courses]);

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 space-y-6 pb-12">
      {/* 1. HÀNG BENTO BẤT ĐỐI XỨNG: HERO SPOTLIGHT + 4 BỘ LỌC THÔNG MINH */}
      {featuredCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Khối Trái (~66%): Khóa học xuất sắc nhất Hero Banner */}
          <div
            className="lg:col-span-8 keep-dark relative rounded-3xl overflow-hidden p-6 md:p-7 flex flex-col justify-between shadow-md shadow-orange-500/10 min-h-[320px] group transition-all duration-300 hover:shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.90) 55%, rgba(234, 88, 12, 0.28) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            {/* Ảnh nền nghệ thuật phía sau */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-luminosity bg-cover bg-center pointer-events-none group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: `url(${
                  featuredCourse?.thumbnail && featuredCourse.thumbnail.trim() !== ""
                    ? featuredCourse.thumbnail
                    : featuredCourse?.type === "live"
                      ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&q=80"
                      : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&q=80"
                })`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent pointer-events-none" />

            {/* Hàng trên: Huy hiệu */}
            <div className="relative z-10 flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-950 shadow-md"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  borderRadius: "9999px",
                }}
              >
                <Trophy size={11} /> Đánh giá cao nhất
              </span>
              {featuredCourse?.type === "live" ? (
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #f97316)",
                    borderRadius: "9999px",
                  }}
                >
                  <Radio size={10} className="animate-pulse" /> TRỰC TUYẾN
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                    borderRadius: "9999px",
                  }}
                >
                  <Video size={10} /> VIDEO BÀI GIẢNG
                </span>
              )}
              <span className="text-xs text-orange-200/90 font-medium ml-auto hidden sm:inline-flex items-center gap-1">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                {Number(featuredCourse?.rattingforcoure || 5).toFixed(1)} ({featuredCourse?.Rattingleng || 0} đánh giá)
              </span>
            </div>

            {/* Nội dung giữa: Tiêu đề lớn + Mô tả */}
            <div className="relative z-10 my-4 space-y-2 max-w-xl">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                {featuredCourse?.title || "Khóa học nổi bật"}
              </h2>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Clock size={13} />
                <span>{featuredCourse?.category || featuredCourse?.level || "Tổng quát"}</span>
                <span>•</span>
                <span>{featuredCourse?.instructor || "Giảng viên chuyên môn"}</span>
              </div>
            </div>

            {/* Hàng dưới: Giá tiền + Nút bấm */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 flex-wrap gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Học phí ưu đãi
                </div>
                <div className="text-xl md:text-2xl font-black text-orange-400">
                  {Number(featuredCourse?.price || 0) === 0
                    ? "Miễn phí"
                    : `${Number(featuredCourse?.price || 0).toLocaleString("vi-VN")} đ`}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {mode !== "mine" && featuredCourse?.type !== "live" && !featuredCourse?.isRecode && (
                  <button
                    onClick={() => addToCart(featuredCourse)}
                    className="px-4 py-2 rounded-full text-xs font-extrabold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all shadow-sm"
                    style={{ borderRadius: "9999px" }}
                  >
                    Thêm vào giỏ
                  </button>
                )}
                <button
                  disabled={paymentloading}
                  onClick={() => {
                    if (featuredCourse?.type === "recorded") {
                      navigate(`/courses-all/details/recorded/${featuredCourse?._id}`);
                    } else {
                      navigate(`/courses-all/details/class/live/${featuredCourse?._id}`);
                    }
                  }}
                  className="px-5 py-2 rounded-full text-xs font-black text-white shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all text-center"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                    borderRadius: "9999px",
                  }}
                >
                  Chi tiết khóa học →
                </button>
              </div>
            </div>
          </div>

          {/* Khối Phải (~34%): Lưới 2x2 gồm 4 ô tiện ích bộ lọc thông minh */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3.5 items-stretch">
            {/* Ô 1: Live */}
            <button
              type="button"
              onClick={() => setCourseType && setCourseType(courseType === "live" ? "all" : "live")}
              className="p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left group shadow-sm hover:shadow-md"
              style={{
                borderRadius: "1.5rem",
                background: courseType === "live" ? "rgba(249, 115, 22, 0.14)" : "rgba(255, 255, 255, 0.75)",
                border: courseType === "live" ? "1.5px solid #f97316" : "1px solid rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner group-hover:scale-110 transition-transform"
                  style={{ background: "rgba(244, 63, 94, 0.12)", borderRadius: "0.85rem" }}
                >
                  <Radio size={18} className="animate-pulse" />
                </div>
                {counts.live > 0 && (
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200"
                    style={{ borderRadius: "9999px" }}
                  >
                    {counts.live} lớp
                  </span>
                )}
              </div>
              <div className="pt-2">
                <h4 className="text-xs font-black text-slate-800 group-hover:text-orange-600 transition-colors">
                  Lớp Học Live
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">Tương tác trực tiếp</p>
              </div>
            </button>

            {/* Ô 2: Video */}
            <button
              type="button"
              onClick={() => setCourseType && setCourseType(courseType === "recorded" ? "all" : "recorded")}
              className="p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left group shadow-sm hover:shadow-md"
              style={{
                borderRadius: "1.5rem",
                background: courseType === "recorded" ? "rgba(249, 115, 22, 0.14)" : "rgba(255, 255, 255, 0.75)",
                border: courseType === "recorded" ? "1.5px solid #f97316" : "1px solid rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-orange-500 shadow-inner group-hover:scale-110 transition-transform"
                  style={{ background: "rgba(249, 115, 22, 0.12)", borderRadius: "0.85rem" }}
                >
                  <Video size={18} />
                </div>
                {counts.recorded > 0 && (
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-orange-50 text-orange-600 border border-orange-200"
                    style={{ borderRadius: "9999px" }}
                  >
                    {counts.recorded} khóa
                  </span>
                )}
              </div>
              <div className="pt-2">
                <h4 className="text-xs font-black text-slate-800 group-hover:text-orange-600 transition-colors">
                  Video Bài Giảng
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">Học theo lộ trình</p>
              </div>
            </button>

            {/* Ô 3: Free */}
            <button
              type="button"
              onClick={() => setCourseType && setCourseType(courseType === "free" ? "all" : "free")}
              className="p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left group shadow-sm hover:shadow-md"
              style={{
                borderRadius: "1.5rem",
                background: courseType === "free" ? "rgba(249, 115, 22, 0.14)" : "rgba(255, 255, 255, 0.75)",
                border: courseType === "free" ? "1.5px solid #f97316" : "1px solid rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner group-hover:scale-110 transition-transform"
                  style={{ background: "rgba(16, 185, 129, 0.12)", borderRadius: "0.85rem" }}
                >
                  <CheckCircle2 size={18} />
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200"
                  style={{ borderRadius: "9999px" }}
                >
                  Miễn phí
                </span>
              </div>
              <div className="pt-2">
                <h4 className="text-xs font-black text-slate-800 group-hover:text-orange-600 transition-colors">
                  Học Thử 0đ
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">Bắt đầu ngay</p>
              </div>
            </button>

            {/* Ô 4: Top Rated 4.5+ */}
            <button
              type="button"
              onClick={() => setCourseType && setCourseType(courseType === "top_rated" ? "all" : "top_rated")}
              className="p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left group shadow-sm hover:shadow-md"
              style={{
                borderRadius: "1.5rem",
                background: courseType === "top_rated" ? "rgba(249, 115, 22, 0.14)" : "rgba(255, 255, 255, 0.75)",
                border: courseType === "top_rated" ? "1.5px solid #f97316" : "1px solid rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner group-hover:scale-110 transition-transform"
                  style={{ background: "rgba(245, 158, 11, 0.12)", borderRadius: "0.85rem" }}
                >
                  <Star size={18} className="fill-amber-500" />
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-600 border border-amber-200"
                  style={{ borderRadius: "9999px" }}
                >
                  4.5+ ⭐
                </span>
              </div>
              <div className="pt-2">
                <h4 className="text-xs font-black text-slate-800 group-hover:text-orange-600 transition-colors">
                  Đánh Giá Cao
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">Học viên tin dùng</p>
              </div>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, kỹ năng, giảng viên..."
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-full text-xs font-semibold bg-white/80 border border-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-800 placeholder-slate-400"
            style={{ borderRadius: "9999px" }}
          />
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={15} />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto justify-start lg:justify-end">
          <div className="relative">
            <select
              onChange={(e) => setFilter && setFilter(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 rounded-full text-xs font-bold bg-white/80 border border-white/90 shadow-2xs backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="All Courses">Tất cả cấp độ</option>
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          <div className="relative">
            <select
              className="appearance-none pl-3.5 pr-8 py-2 rounded-full text-xs font-bold bg-white/80 border border-white/90 shadow-2xs backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
              onChange={(e) => setStar && setStar(e.target.value)}
            >
              <option value="all">Đánh giá: Tất cả</option>
              <option value="4.5">4.5+ Sao</option>
              <option value="4.0">4.0+ Sao</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          <div className="relative">
            <select
              onChange={(e) => setPrice && setPrice(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 rounded-full text-xs font-bold bg-white/80 border border-white/90 shadow-2xs backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="all">Giá: Tất cả</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {(messagepayment || errorPayment) && (
        <div className="flex flex-col gap-2.5">
          {messagepayment && (
            <div
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-bold backdrop-blur-md shadow-xs"
              style={
                messagepayment === "payment failed!"
                  ? {
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.25)",
                      color: "#dc2626",
                    }
                  : {
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                      color: "#059669",
                    }
              }
            >
              {messagepayment === "payment failed!" ? (
                <AlertCircle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
              <span>{messagepayment}</span>
            </div>
          )}
          {errorPayment && (
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-red-50/80 border border-red-200 text-red-600 text-xs md:text-sm font-bold shadow-xs">
              <AlertCircle size={18} />
              <span>{errorPayment}</span>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-3 py-16 text-orange-500 font-bold text-base">
          <Loader2 className="animate-spin" size={26} /> Đang tải danh sách khóa
          học...
        </div>
      )}

      {!loading && (remainingCourses.length > 0 || (!featuredCourse && courses.length > 0)) && (
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Danh sách khóa học</span>
              {courseType !== "all" && (
                <button
                  type="button"
                  onClick={() => setCourseType && setCourseType("all")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-100/70 border border-orange-300/60 px-2.5 py-0.5 rounded-full hover:bg-orange-200 transition-colors"
                >
                  <span>
                    Đang lọc:{" "}
                    {courseType === "live"
                      ? "Lớp Live"
                      : courseType === "recorded"
                        ? "Video"
                        : courseType === "free"
                          ? "Học thử 0đ"
                          : "4.5+ ⭐"}
                  </span>
                  <span className="font-black text-xs">✕</span>
                </button>
              )}
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              {(remainingCourses.length > 0 ? remainingCourses : courses).length} khóa học
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(remainingCourses.length > 0 ? remainingCourses : courses).map((cou) => {
              const isLive = cou?.type === "live";
              const rating = cou?.rattingforcoure;
              const reviewCount = cou?.Rattingleng || 0;
              const priceFormatted =
                Number(cou?.price || 0) === 0
                  ? "Miễn phí"
                  : `${Number(cou?.price || 0).toLocaleString("vi-VN")} đ`;

              return (
                <div
                  key={cou._id}
                  className="group flex flex-col justify-between p-3.5 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_18px_rgba(194,110,30,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.08)] relative overflow-hidden rounded-2xl"
                  style={{
                    borderRadius: "1rem",
                    background: "rgba(255, 255, 255, 0.88)",
                    border: "1px solid rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div>
                    {/* Thumbnail: Tỉ lệ chuẩn 16:9 aspect-video */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5 shadow-2xs group-hover:shadow-xs transition-all bg-gradient-to-br from-orange-100 via-amber-50 to-slate-100 flex items-center justify-center">
                      <img
                        src={
                          cou?.thumbnail && cou.thumbnail.trim() !== ""
                            ? cou.thumbnail
                            : isLive
                              ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                              : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
                        }
                        alt={cou?.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = isLive
                            ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                            : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-black/10 pointer-events-none" />
                      <div className="absolute top-2 right-2 z-10">
                        {isLive ? (
                          <div
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-wider shadow-sm"
                            style={{ background: "linear-gradient(135deg, #ef4444, #f97316)", borderRadius: "9999px" }}
                          >
                            <Radio size={10} className="animate-pulse" /> TRỰC TUYẾN
                          </div>
                        ) : (
                          <div
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-wider shadow-sm"
                            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", borderRadius: "9999px" }}
                          >
                            <Video size={10} /> VIDEO BÀI GIẢNG
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xs md:text-sm font-bold text-slate-900 line-clamp-1 leading-snug group-hover:text-orange-600 transition-colors mb-1">
                      {cou?.title || "Khóa học"}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-2">
                      <Clock size={12} />
                      <span>{cou?.category || cou?.level || "Tổng quát"}</span>
                      <span>•</span>
                      <span className="truncate">{cou?.instructor || "Giảng viên chuyên môn"}</span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5 mb-2.5">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                        <Star size={13} className="text-amber-500 fill-amber-500" />
                        <span className="font-extrabold">{Number(rating).toFixed(1)}</span>
                        <span className="text-slate-300 font-normal">|</span>
                        <span className="text-slate-400 font-medium text-[11px]">{reviewCount} Đánh giá</span>
                      </div>
                      <div className="text-sm font-black text-orange-600">{priceFormatted}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 w-full pt-1 border-t border-slate-100">
                    {mode !== "mine" && cou.type !== "live" && !cou.isRecode && (
                      <button
                        onClick={() => addToCart(cou)}
                        className="flex-1 py-1.5 px-2.5 rounded-full text-xs font-bold text-slate-700 bg-white/90 border border-slate-300 hover:bg-white hover:border-slate-400 hover:text-slate-900 hover:scale-[1.02] active:scale-95 transition-all shadow-2xs text-center"
                        style={{ borderRadius: "9999px" }}
                      >
                        Thêm giỏ
                      </button>
                    )}
                    {mode === "mine" && isLive && (
                      <button
                        onClick={() => navigate(`/create-class/${cou._id}`)}
                        className="flex-1 py-1.5 px-2.5 rounded-full text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 hover:bg-orange-100 hover:scale-[1.02] active:scale-95 transition-all shadow-2xs text-center cursor-pointer"
                        style={{ borderRadius: "9999px" }}
                        title="Tạo lớp học trực tuyến mới cho khóa học này"
                      >
                        + Tạo lớp
                      </button>
                    )}
                    <button
                      disabled={paymentloading}
                      onClick={() => {
                        if (cou?.type === "recorded") {
                          navigate(`/courses-all/details/recorded/${cou?._id}`);
                        } else {
                          navigate(`/courses-all/details/class/live/${cou._id}`);
                        }
                      }}
                      className="flex-1 py-1.5 px-3 rounded-full text-xs font-black text-white shadow-sm shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-95 transition-all text-center"
                      style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", borderRadius: "9999px" }}
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!loading && courses?.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center p-12 rounded-[2rem] bg-white/60 backdrop-blur-2xl border border-dashed border-orange-200">
          <Search size={32} className="text-orange-400 mb-2 opacity-70" />
          <h4 className="text-base font-black text-slate-800 mb-1">
            Không tìm thấy khóa học nào
          </h4>
          <p className="text-xs font-semibold text-slate-500">
            Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh các bộ lọc.
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesForm;
