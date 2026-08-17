import { useState } from "react";
import {
  Search,
  ChevronDown,
  Star,
  Clock,
  Radio,
  Video,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useCart } from "../../cart/hooks/useCart";

const CoursesForm = ({
  courses = [],
  loading,
  payment,
  paymentloading,
  setSearch,
  setFilter,
  role,
  navigate,
  errorPayment,
  messagepayment,
}) => {
  const [selectedSort, setSelectedSort] = useState("latest");
  const { addToCart, cartItems } = useCart();
  return (
    <div className="w-full space-y-8 pb-16">
      <section
        className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 lg:p-14 text-center flex flex-col items-center justify-center"
        style={{
          background: "rgba(255, 255, 255, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(30px)",
          boxShadow: "0 20px 50px rgba(194, 110, 30, 0.06)",
        }}
      >
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <button
            onClick={() => navigate("/cart")}
            className="relative inline-flex items-center justify-center p-3 rounded-full text-slate-700 bg-white/85 border border-white/95 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all backdrop-blur-xl cursor-pointer group"
            style={{ borderRadius: "9999px" }}
            title="Giỏ hàng"
          >
            <ShoppingCart
              size={20}
              className="text-slate-700 group-hover:text-orange-500 transition-colors"
            />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
              {cartItems.length}
            </span>
          </button>
        </div>

        {/* Ambient warm glows */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-25 pointer-events-none blur-[70px]"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none blur-[70px]"
          style={{
            background: "radial-gradient(circle, #fb923c 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Level up with{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #f97316, #ea580c, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Premium Courses
            </span>
          </h1>

          <p className="text-sm md:text-base font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Master new skills with interactive live sessions or learn at your
            own pace with our meticulously crafted recorded courses. Start
            learning today!
          </p>
        </div>
      </section>

      {/* ── 2. Pill Search & Filters Bar ── */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input Pill */}
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Search courses, skills, instructors..."
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="w-full pl-6 pr-12 py-3.5 rounded-full text-sm font-semibold bg-white/80 border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-800 placeholder-slate-400"
            style={{ borderRadius: "9999px" }}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
        </div>

        {/* Filter Dropdown Pills Group */}
        <div className="flex items-center gap-2.5 flex-wrap w-full lg:w-auto justify-start lg:justify-end">
          {/* Level Filter Pill */}
          <div className="relative">
            <select
              onChange={(e) => setFilter && setFilter(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-xs md:text-sm font-bold bg-white/80 border border-white/90 shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="All Courses">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Rating Filter Pill */}
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-xs md:text-sm font-bold bg-white/80 border border-white/90 shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="all">Rating: All</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Sort By Filter Pill */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-xs md:text-sm font-bold bg-white/80 border border-white/90 shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="latest">Sort by: Latest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ── Payment / Alert Messages ── */}
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
          <Loader2 className="animate-spin" size={26} /> Loading course
          catalog...
        </div>
      )}

      {!loading && courses?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {courses.map((cou) => {
            const isLive = cou?.type === "live";
            const rating =
              cou?.avgRatting || cou?.rating || (isLive ? 4.9 : 4.8);
            const reviewCount = cou?.totalReviews || cou?.ratingsCount || 120;
            const priceFormatted =
              Number(cou?.price || 0) === 0
                ? "Free"
                : `${Number(cou?.price || 0).toLocaleString("vi-VN")} đ`;

            const thumbnail =
              cou?.thumbnail ||
              (isLive
                ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80"
                : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80");

            return (
              <div
                key={cou._id}
                className="group flex flex-col justify-between p-4.5 md:p-5 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_25px_rgba(194,110,30,0.04)] hover:shadow-[0_16px_36px_rgba(249,115,22,0.1)] relative overflow-hidden"
                style={{
                  borderRadius: "1.95rem",
                  background: "rgba(255, 255, 255, 0.88)",
                  border: "1px solid rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(20px)",
                  minHeight: "440px",
                }}
              >
                <div>
                  {/* Thumbnail Image Container (Tăng chiều cao 20% lên h-52) */}
                  <div className="relative h-52 rounded-2xl overflow-hidden mb-4 shadow-xs group-hover:shadow-sm transition-all bg-gradient-to-br from-orange-100 via-amber-50 to-slate-100 flex items-center justify-center">
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/10 pointer-events-none" />

                    {/* Type Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      {isLive ? (
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md"
                          style={{
                            background:
                              "linear-gradient(135deg, #ef4444, #f97316)",
                            borderRadius: "9999px",
                          }}
                        >
                          <Radio size={11} className="animate-pulse" /> LIVE
                        </div>
                      ) : (
                        <div
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md"
                          style={{
                            background:
                              "linear-gradient(135deg, #f97316, #ea580c)",
                            borderRadius: "9999px",
                          }}
                        >
                          <Video size={11} /> RECORDED
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-sm md:text-base font-black text-slate-900 line-clamp-1 leading-snug group-hover:text-orange-600 transition-colors mb-1.5">
                    {cou?.title || "Course Title"}
                  </h3>

                  {/* Short Meta line (Clock / Category / Level) */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
                    <Clock size={13} />
                    <span>{cou?.category || cou?.level || "General"}</span>
                    <span>•</span>
                    <span className="truncate">
                      {cou?.instructor?.name || "Expert Instructor"}
                    </span>
                  </div>

                  {/* Rating & Price on SAME Row (Chuẩn y hệt mẫu ảnh 2) */}
                  <div className="flex items-center justify-between pt-1 mb-3">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Star
                        size={14}
                        className="text-amber-500 fill-amber-500"
                      />
                      <span className="font-extrabold">
                        {Number(rating).toFixed(1)}
                      </span>
                      <span className="text-slate-300 font-normal">|</span>
                      <span className="text-slate-400 font-semibold">
                        {reviewCount} reviews
                      </span>
                    </div>

                    {/* Price */}
                    <div className="text-base font-black text-orange-600">
                      {priceFormatted}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full pt-1">
                  {cou.type !== "live" && (
                    <button
                      onClick={() => addToCart(cou)}
                      className="flex-1 py-2 px-3 rounded-full text-xs font-extrabold text-slate-700 bg-white/90 border border-slate-300 hover:bg-white hover:border-slate-400 hover:text-slate-900 hover:scale-[1.02] active:scale-95 transition-all shadow-2xs text-center"
                      style={{ borderRadius: "9999px" }}
                    >
                      Add to cart
                    </button>
                  )}

                  {/* Enroll Now Button */}
                  <button
                    disabled={paymentloading}
                    onClick={() => {
                      if (cou?.type === "recorded") {
                        navigate(`details/recorded/${cou?._id}`);
                      } else {
                        navigate(`details/class/live/${cou._id}`);
                      }
                    }}
                    className="flex-1 py-2 px-3 rounded-full text-xs font-black text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-95 transition-all text-center"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                      borderRadius: "9999px",
                    }}
                  >
                    Details Course
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && courses?.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center p-12 rounded-[2rem] bg-white/60 backdrop-blur-2xl border border-dashed border-orange-200">
          <Search size={32} className="text-orange-400 mb-2 opacity-70" />
          <h4 className="text-base font-black text-slate-800 mb-1">
            No courses found
          </h4>
          <p className="text-xs font-semibold text-slate-500">
            Try searching with a different keyword or adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesForm;
