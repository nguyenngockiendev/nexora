import {
  Search,
  Star,
  AlertTriangle,
  CheckCircle,
  Ban,
  ShieldAlert,
  Eye,
  Send,
  Video,
  Radio,
  Users,
  X,
  BookOpen,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCourseQualityView = ({
  courses,
  filteredCourses,
  loading,
  error,
  searchTerm,
  setSearchTerm,
  ratingFilter,
  setRatingFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  handleResetFilters,
  inspectCourse,
  setInspectCourse,
  warningCourse,
  setWarningCourse,
  warningText,
  setWarningText,
  handleToggleLockCourse,
  handleSendWarningSubmit,
  totalCoursesCount,
  lowRatingCount,
  healthyCount,
  bannedCount,
}) => {
  const displayList = filteredCourses || courses || [];
  const navigate = useNavigate();
  return (
    <div className="space-y-6 pb-12">
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-sm transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        style={{
          background: "rgba(255,255,255,0.75)",
          border: "1px solid rgba(255,255,255,0.9)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 12px 36px rgba(194,110,30,0.06)",
        }}
      >
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-30 blur-[90px]"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 space-y-1">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest mb-1 shadow-sm"
            style={{
              background: "rgba(249,115,22,0.12)",
              border: "1px solid rgba(249,115,22,0.25)",
              color: "#ea580c",
            }}
          >
            <ShieldAlert size={14} className="text-orange-500 animate-pulse" />
            Platform Content Quality Control
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Course Quality & Moderation
          </h1>
          <p className="text-sm md:text-base font-semibold text-slate-500 max-w-xl">
            Giám sát chất lượng khóa học toàn sàn, kiểm tra các cảnh báo sao
            thấp và khóa các khóa học vi phạm.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-3 flex-wrap relative z-10">
          <div className="px-4 py-2.5 rounded-2xl bg-white/80 border border-slate-200 shadow-sm flex items-center gap-2">
            <BookOpen size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-500">
              Tổng khóa học:
            </span>
            <span className="text-base font-black text-slate-800">
              {totalCoursesCount || 0}
            </span>
          </div>

          <div
            onClick={() => setRatingFilter("low")}
            className="px-4 py-2.5 rounded-2xl border shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            style={{
              background: "rgba(244,63,94,0.08)",
              borderColor: "rgba(244,63,94,0.25)",
              color: "#e11d48",
            }}
          >
            <AlertTriangle size={16} className="animate-pulse" />
            <span className="text-xs font-extrabold">Cảnh báo Sao thấp:</span>
            <span className="text-base font-black">{lowRatingCount || 0}</span>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm flex items-center gap-2 text-emerald-700">
            <CheckCircle size={16} />
            <span className="text-xs font-extrabold">Đạt chuẩn:</span>
            <span className="text-base font-black">{healthyCount || 0}</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-orange-500 font-bold animate-pulse px-2 text-sm">
          Loading courses...
        </div>
      )}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold text-sm">
          {error}
        </div>
      )}

      {/* ── Glass Filter Toolbar ── */}
      <div
        className="p-4 md:p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        style={{
          background: "rgba(255,255,255,0.75)",
          border: "1px solid rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by course title or instructor..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm font-semibold bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 shadow-sm"
              style={{ borderRadius: "9999px" }}
            />
          </div>

          {/* Rating Alert Filter Dropdown */}
          <div className="md:col-span-3">
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-full text-sm font-bold bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 shadow-sm cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="">All Rating Levels</option>
              <option value="low">⚠️ Low Rating Alert (&lt; 3.0★)</option>
              <option value="healthy">✓ Healthy (≥ 3.5★)</option>
            </select>
          </div>

          {/* Course Type Select Dropdown */}
          <div className="md:col-span-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-full text-sm font-bold bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 shadow-sm cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="">All Types</option>
              <option value="live">🎥 Live Class</option>
              <option value="recorded">📹 Recorded</option>
            </select>
          </div>

          {/* Status Select Dropdown */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-full text-sm font-bold bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 shadow-sm cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          <div className="md:col-span-1">
            <button
              onClick={handleResetFilters}
              className="w-full py-3.5 rounded-full text-sm font-bold text-slate-700 bg-white/80 border border-slate-200 hover:bg-white transition-all shadow-sm flex items-center justify-center"
              style={{ borderRadius: "9999px" }}
              title="Reset Filters"
            >
              <RotateCcw size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modern Warm Glass Table Card ── */}
      <div
        className="rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        style={{
          background: "rgba(255,255,255,0.75)",
          border: "1px solid rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 p-6 border-b border-slate-200/80 bg-white/60 text-xs md:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">Course Details</div>
          <div className="col-span-2">Star Rating</div>
          <div className="col-span-2">Type & Students</div>
          <div className="col-span-2">Health Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-200/70">
          {displayList.map((item) => {
            const ratingValue = item.avgRatting ?? item.rating ?? 0;
            const reviewCount = item.toatalcomment ?? item.totalReviews ?? 0;
            const studentCount = item.studentsCount ?? 0;
            const isLowRating = ratingValue < 3.0 && reviewCount > 0;
            const isBanned =
              item.status === "inactive" || item.status === "banned";
            const instructorName =
              item.instructorName || item.instructor?.name || "Giảng viên";
            const instructorAvatar =
              item.instructorAvatar ||
              item.instructor?.avatar ||
              "https://ui-avatars.com/api/?name=" +
                instructorName +
                "&background=random";

            return (
              <div
                key={item._id}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 md:p-7 items-center transition-all ${
                  isBanned
                    ? "bg-rose-50/40 opacity-75"
                    : isLowRating
                      ? "bg-amber-50/30 hover:bg-amber-50/60"
                      : "hover:bg-white/90"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/instructor/lessons/${item._id}`)}
              >
                {/* Course Details */}
                <div className="col-span-1 lg:col-span-4 flex items-center gap-4">
                  <img
                    src={
                      item.thumbnail ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
                    }
                    alt={item.title}
                    className="w-20 h-14 rounded-2xl object-cover ring-2 ring-white shadow-sm shrink-0"
                  />
                  <div className="min-w-0 space-y-1">
                    <h4 className="font-extrabold text-slate-800 text-sm md:text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <img
                        src={instructorAvatar}
                        alt={instructorName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-slate-500">
                        {instructorName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="col-span-1 lg:col-span-2 flex items-center gap-2">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border shadow-sm ${
                      isLowRating
                        ? "bg-rose-100 border-rose-200 text-rose-700"
                        : "bg-amber-100 border-amber-200 text-amber-800"
                    }`}
                    style={{ borderRadius: "9999px" }}
                  >
                    <Star size={14} className="fill-current" />
                    <span>{Number(ratingValue).toFixed(1)}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    ({reviewCount} reviews)
                  </span>
                </div>

                {/* Type & Students */}
                <div className="col-span-1 lg:col-span-2 space-y-1">
                  <div>
                    {item.type === "live" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-600">
                        <Radio size={13} className="animate-pulse" /> Live Class
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-600">
                        <Video size={13} /> Recorded
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <Users size={13} className="text-slate-400" />
                    <span>{item.studentsCount} Students</span>
                  </div>
                </div>

                {/* Health Status */}
                <div className="col-span-1 lg:col-span-2 flex items-center">
                  {isBanned ? (
                    <span
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase border shadow-sm"
                      style={{
                        background: "rgba(244,63,94,0.12)",
                        borderColor: "rgba(244,63,94,0.3)",
                        color: "#e11d48",
                        borderRadius: "9999px",
                      }}
                    >
                      <Ban size={13} /> Banned
                    </span>
                  ) : isLowRating ? (
                    <span
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase border shadow-sm animate-pulse"
                      style={{
                        background: "rgba(245,158,11,0.15)",
                        borderColor: "rgba(245,158,11,0.35)",
                        color: "#d97706",
                        borderRadius: "9999px",
                      }}
                    >
                      <AlertTriangle size={13} /> Low Rating Alert
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase border shadow-sm"
                      style={{
                        background: "rgba(16,185,129,0.1)",
                        borderColor: "rgba(16,185,129,0.3)",
                        color: "#059669",
                        borderRadius: "9999px",
                      }}
                    >
                      <CheckCircle size={13} /> Healthy
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-1 lg:col-span-2 flex items-center justify-start lg:justify-end gap-2">
                  {/* Inspect Reviews Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectCourse(item);
                    }}
                    className="w-10 h-10 rounded-full bg-white text-slate-600 border border-slate-200 flex items-center justify-center transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-sm hover:scale-105"
                    style={{ borderRadius: "9999px" }}
                    title="Inspect Ratings & Reviews"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Send Warning to Instructor */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWarningCourse(item);
                      setWarningText(
                        `Chào Giảng viên ${instructorName}, Khóa học "${item.title}" của bạn đang nhận nhiều phản hồi sao thấp (${Number(ratingValue).toFixed(1)}★). Vui lòng kiểm tra lại chất lượng video và bài học!`,
                      );
                    }}
                    className="w-10 h-10 rounded-full bg-white text-amber-600 border border-slate-200 flex items-center justify-center transition-all hover:bg-amber-50 hover:border-amber-300 shadow-sm hover:scale-105"
                    style={{ borderRadius: "9999px" }}
                    title="Send Improvement Notice to Instructor"
                  >
                    <Send size={16} />
                  </button>

                  {/* Lock / Ban Course Button */}
                  <button
                    onClick={() => {
                      handleToggleLockCourse(item);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border shadow-sm hover:scale-105 ${
                      isBanned
                        ? "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600"
                        : "bg-white text-slate-400 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                    }`}
                    style={{ borderRadius: "9999px" }}
                    title={
                      isBanned ? "Unban Course" : "Lock / Ban Entire Course"
                    }
                  >
                    {isBanned ? <CheckCircle size={18} /> : <Ban size={18} />}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredCourses.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-sm font-bold">
              Không tìm thấy khóa học nào phù hợp với bộ lọc.
            </div>
          )}
        </div>
      </div>

      {inspectCourse &&
        (console.log(inspectCourse),
        (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
            <div
              className="w-full max-w-2xl rounded-[2.5rem] p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(255,255,255,0.9)",
                backdropFilter: "blur(30px)",
              }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-100 text-orange-600 rounded-2xl">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 line-clamp-1">
                      {inspectCourse.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      Giảng viên:{" "}
                      <strong className="text-slate-700">
                        {inspectCourse.instructorName}
                      </strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setInspectCourse(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 flex items-center justify-center transition-all"
                  style={{ borderRadius: "9999px" }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Rating Summary Bar */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-orange-600 flex items-center gap-1">
                    <Star size={24} className="fill-current" />
                    <span>
                      {Number(
                        inspectCourse?.avgRatting ?? inspectCourse?.rating ?? 0,
                      ).toFixed(1)}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    <p className="text-slate-800 font-extrabold">
                      Đánh giá trung bình
                    </p>
                    <p>
                      Dựa trên{" "}
                      {inspectCourse?.toatalcomment ??
                        inspectCourse?.totalReviews ??
                        inspectCourse?.reviews?.length ??
                        0}{" "}
                      phản hồi
                    </p>
                  </div>
                </div>

                {(inspectCourse?.avgRatting ?? inspectCourse?.rating ?? 0) <
                  3.0 && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-black bg-rose-100 text-rose-700 border border-rose-200 uppercase">
                    ⚠️ Đạt ngưỡng Cảnh báo
                  </span>
                )}
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Phản hồi chê từ học viên ({inspectCourse.reviews?.length || 0}
                  )
                </h4>

                {inspectCourse.reviews.length > 0 ? (
                  inspectCourse.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-800">
                          {rev.userId.name}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star size={13} className="fill-current" />
                          <span>{rev.rating} sao</span>
                          <span className="text-slate-300 ml-2">
                            {rev.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-slate-600 italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-bold text-slate-400 italic">
                    Chưa có bình luận đánh giá nào.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

      {/* ── MODAL 2: SEND WARNING TO INSTRUCTOR ── */}
      {warningCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <form
            onSubmit={handleSendWarningSubmit}
            className="w-full max-w-lg rounded-[2.5rem] p-6 md:p-8 space-y-5 relative overflow-hidden shadow-2xl bg-white"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-800">
                Gửi Nhắc Nhở Cho Giảng Viên
              </h3>
              <button
                type="button"
                onClick={() => setWarningCourse(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 flex items-center justify-center"
                style={{ borderRadius: "9999px" }}
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nội dung cảnh báo chất lượng
              </label>
              <textarea
                rows={4}
                value={warningText}
                onChange={(e) => setWarningText(e.target.value)}
                className="w-full p-4 rounded-2xl text-xs font-medium bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setWarningCourse(null)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200"
                style={{ borderRadius: "9999px" }}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 transition-all shadow-md"
                style={{ borderRadius: "9999px" }}
              >
                Gửi Cảnh Báo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminCourseQualityView;
