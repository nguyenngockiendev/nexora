import "react-toastify/dist/ReactToastify.css";
import { Search, Plus, Radio, Users, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

const ManageClass = ({ listCourseLive, error, loading, navigate }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = listCourseLive?.filter((item) =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 pb-10">
      {/* ── Top Header Bar (Matching Design Mockup) ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Live Class Management
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          {/* Total Classes Stat Badge */}
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
              Total Classes
            </span>
            <span className="text-xl font-black text-orange-500">
              {listCourseLive?.length || 0}
            </span>
          </div>

          {/* Create Session Pill Button */}
          <button
            onClick={() => {
              if (listCourseLive && listCourseLive.length > 0) {
                navigate(`/courses/create/class/${listCourseLive[0]._id}`);
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-orange-600 text-sm transition-all duration-200 hover:scale-105 shrink-0"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(249,115,22,0.3)",
              boxShadow: "0 4px 16px rgba(249,115,22,0.1)",
              borderRadius: "9999px",
            }}
          >
            <Plus size={16} className="text-orange-500" />
            <span>Create Session</span>
          </button>
        </div>
      </div>

      {/* ── Search Bar (Optional Filter) ── */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={16} className="text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter live courses..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs font-medium bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
          style={{ borderRadius: "9999px" }}
        />
      </div>

      {/* ── Status Alerts ── */}
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
              Loading live courses...
            </div>
          )}
        </div>
      )}

      {/* ── Course Card List (Matching Design Mockup Exactly) ── */}
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
              {/* Left: Course Thumbnail */}
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

              {/* Center: Course Details */}
              <div className="flex-1 space-y-3 min-w-0 w-full text-left">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase text-white shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #fb923c)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />{" "}
                    LIVE
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
                    Full-stack
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                    <Users size={14} className="text-slate-400" />
                    {item?.numberClass || 120} Students
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                    <Clock size={14} className="text-slate-400" />
                    2:00 PM - 3:30 PM EST
                  </span>
                </div>
              </div>

              {/* Right: Enter Studio Action Button */}
              <div className="shrink-0 w-full sm:w-auto flex justify-end">
                <button
                  onClick={() => navigate(`details/class/${item._id}`)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-orange-600 text-sm transition-all duration-200 hover:scale-105 group/btn"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(249,115,22,0.3)",
                    boxShadow: "0 4px 16px rgba(249,115,22,0.08)",
                    borderRadius: "9999px",
                  }}
                >
                  <span>Enter Studio</span>
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
            No live courses found
          </h4>
          <p className="text-xs text-slate-500">
            Create a new live course to start managing sessions.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageClass;
