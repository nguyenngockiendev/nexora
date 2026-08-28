import { useState } from "react";
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
} from "lucide-react";
import { useCart } from "../../cart/hooks/useCart";

const CoursesForm = ({
  courses = [],
  loading,
  paymentloading,
  setSearch,
  setFilter,
  navigate,
  errorPayment,
  messagepayment,
  setStar,
  setPrice,
}) => {
  const [selectedSort, setSelectedSort] = useState("latest");
  const { addToCart } = useCart();

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
            Nâng tầm kiến thức cùng{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #f97316, #ea580c, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Khóa Học Hàng Đầu
            </span>
          </h1>

          <p className="text-sm md:text-base font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Làm chủ kỹ năng mới với các lớp học trực tuyến tương tác hoặc học
            theo lộ trình riêng với các bài giảng chất lượng cao. Bắt đầu học
            ngay hôm nay!
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, kỹ năng, giảng viên..."
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="w-full pl-6 pr-12 py-3.5 rounded-full text-sm font-semibold bg-white/80 border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-800 placeholder-slate-400"
            style={{ borderRadius: "9999px" }}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap w-full lg:w-auto justify-start lg:justify-end">
          <div className="relative">
            <select
              onChange={(e) => setFilter && setFilter(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-xs md:text-sm font-bold bg-white/80 border border-white/90 shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="All Courses">Tất cả cấp độ</option>
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          <div className="relative">
            <select
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-xs md:text-sm font-bold bg-white/80 border border-white/90 shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
              onChange={(e) => setStar && setStar(e.target.value)}
            >
              <option value="all">Đánh giá: Tất cả</option>
              <option value="4.5">4.5+ Sao</option>
              <option value="4.0">4.0+ Sao</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setPrice && setPrice(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-xs md:text-sm font-bold bg-white/80 border border-white/90 shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="all">Giá: Tất cả</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
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

      {!loading && courses?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {courses.map((cou) => {
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
                          <Radio size={11} className="animate-pulse" /> TRỰC
                          TUYẾN
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
                          <Video size={11} /> VIDEO BÀI GIẢNG
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm md:text-base font-black text-slate-900 line-clamp-1 leading-snug group-hover:text-orange-600 transition-colors mb-1.5">
                    {cou?.title || "Khóa học"}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
                    <Clock size={13} />
                    <span>{cou?.category || cou?.level || "Tổng quát"}</span>
                    <span>•</span>
                    <span className="truncate">
                      {cou?.instructor || "Giảng viên chuyên môn"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 mb-3">
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
                        {reviewCount} Lượt đánh giá
                      </span>
                    </div>

                    {!isLive && (
                      <div className="text-base font-black text-orange-600">
                        {priceFormatted}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full pt-1">
                  {cou.type !== "live" && !cou.isRecode && (
                    <button
                      onClick={() => addToCart(cou)}
                      className="flex-1 py-2 px-3 rounded-full text-xs font-extrabold text-slate-700 bg-white/90 border border-slate-300 hover:bg-white hover:border-slate-400 hover:text-slate-900 hover:scale-[1.02] active:scale-95 transition-all shadow-2xs text-center"
                      style={{ borderRadius: "9999px" }}
                    >
                      Thêm vào giỏ hàng
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
                    className="flex-1 py-2 px-3 rounded-full text-xs font-black text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-95 transition-all text-center"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                      borderRadius: "9999px",
                    }}
                  >
                    Chi tiết khóa học
                  </button>
                </div>
              </div>
            );
          })}
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
