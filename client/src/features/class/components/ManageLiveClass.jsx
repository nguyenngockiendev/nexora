import "react-toastify/dist/ReactToastify.css";
import { Search, Plus, Radio, Users, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

const ManageClass = ({
  listCourseLive,
  error,
  loading,
  navigate,
  selectedCourseId,
  setSelectedCourseId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = listCourseLive?.filter((item) =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Quản Lý Lớp Trực Tuyến
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <div
            className="px-4 py-2 rounded-2xl flex items-center gap-3 shrink-0"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.95)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tổng số lớp
            </span>
            <span className="text-xl font-black text-orange-500">
              {listCourseLive?.length || 0}
            </span>
          </div>

          <div className="relative shrink-0">
            <select
              value={selectedCourseId || listCourseLive?.[0]?._id || ""}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-sm cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              {listCourseLive?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title || "Chọn khóa học"}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              const targetId = selectedCourseId || listCourseLive?.[0]?._id;
              if (targetId) {
                navigate(`/courses/create/class/${targetId}`);
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-orange-600 text-sm transition-all duration-200 hover:scale-105 shrink-0 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(249,115,22,0.3)",
              boxShadow: "0 4px 16px rgba(249,115,22,0.1)",
              borderRadius: "9999px",
            }}
          >
            <Plus size={16} className="text-orange-500" />
            <span>Tạo lớp học</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={16} className="text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm khóa học trực tuyến..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
          style={{ borderRadius: "9999px" }}
        />
      </div>

      {(error || loading) && (
        <div className="flex flex-col gap-3">
          {error && (
            <div
              className="px-4 py-3 rounded-2xl flex items-center gap-3 font-semibold text-xs"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#dc2626",
              }}
            >
              {error}
            </div>
          )}
          {loading && (
            <div
              className="px-4 py-3 rounded-2xl flex items-center gap-3 font-semibold text-xs animate-pulse"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                color: "#ea580c",
              }}
            >
              Đang tải danh sách khóa học trực tuyến...
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {(filteredCourses || listCourseLive)?.map((item) => {
          return (
            <div
              key={item._id}
              className="p-4 md:p-5 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group"
              style={{
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 6px 24px rgba(194,110,30,0.05)",
              }}
            >
              <div className="w-full sm:w-56 h-36 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 shadow-sm">
                <img
                  src={
                    item?.thumbnail ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
                  }
                  alt="thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 space-y-3 min-w-0 w-full text-left">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase text-white shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #fb923c)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />{" "}
                    TRỰC TUYẾN
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 truncate">
                    {item?.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 font-medium">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-orange-600 border border-orange-200"
                    style={{ background: "rgba(249,115,22,0.08)" }}
                  >
                    {item?.category || "Lập trình"}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                    <Users size={14} className="text-slate-400" />
                    {item?.numberClass || 0} Học viên
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                    <Clock size={14} className="text-slate-400" />
                    Lịch học định kỳ
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto flex justify-end">
                <button
                  onClick={() => navigate(`details/class/${item._id}`)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-orange-600 text-sm transition-all duration-200 hover:scale-105 group/btn cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(249,115,22,0.3)",
                    boxShadow: "0 4px 16px rgba(249,115,22,0.08)",
                    borderRadius: "9999px",
                  }}
                >
                  <span>Vào phòng quản lý</span>
                  <ChevronRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && listCourseLive?.length === 0 && (
        <div
          className="flex flex-col items-center justify-center text-center p-12 rounded-[2rem]"
          style={{
            background: "rgba(255,255,255,0.4)",
            border: "1px dashed rgba(249,115,22,0.2)",
          }}
        >
          <Radio
            size={32}
            style={{ color: "#f97316", opacity: 0.5 }}
            className="mb-4"
          />
          <h4 className="text-lg font-bold mb-2 text-slate-800">
            Không tìm thấy khóa học trực tuyến nào
          </h4>
          <p className="text-xs text-slate-500">
            Tạo một khóa học trực tuyến mới để bắt đầu quản lý các buổi học.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageClass;
