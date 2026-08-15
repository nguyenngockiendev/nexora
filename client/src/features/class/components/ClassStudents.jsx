import {
  ArrowLeft,
  Search,
  Users,
  UserCheck,
  UserX,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useState } from "react";

const ClassStudents = ({
  liststudents,
  error,
  loading,
  handremoveStudent,
  navigate,
}) => {
  const classid = liststudents?.Refectstudent;
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-black mb-1" style={{ color: "#1e293b" }}>
            Students Management
          </h3>
          <p className="text-sm font-medium" style={{ color: "#64748b" }}>
            Manage students enrolled in this class
          </p>
        </div>

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all hover:bg-white hover:-translate-x-1 hover:shadow-md"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.8)",
            color: "#475569",
          }}
        >
          <ArrowLeft size={18} /> Back to Class
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students */}
        <div
          className="flex items-center gap-5 p-6 rounded-[2rem] transition-all hover:-translate-y-1"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-500 shadow-inner">
            <Users size={28} />
          </div>
          <div>
            <p
              className="text-sm font-bold uppercase tracking-wider mb-1"
              style={{ color: "#94a3b8" }}
            >
              Total Students
            </p>
            <h3 className="text-4xl font-black" style={{ color: "#1e293b" }}>
              {liststudents?.totalStudents || 0}
            </h3>
          </div>
        </div>

        {/* Active Students */}
        <div
          className="flex items-center gap-5 p-6 rounded-[2rem] transition-all hover:-translate-y-1"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-emerald-100 text-emerald-500 shadow-inner">
            <UserCheck size={28} />
          </div>
          <div>
            <p
              className="text-sm font-bold uppercase tracking-wider mb-1"
              style={{ color: "#94a3b8" }}
            >
              Active Students
            </p>
            <h3 className="text-4xl font-black" style={{ color: "#1e293b" }}>
              {liststudents?.activeStudents || 0}
            </h3>
          </div>
        </div>

        {/* Inactive Students (Clickable) */}
        <div
          onClick={() => navigate(`/classes/${classid}/removed-students`)}
          className="group flex items-center gap-5 p-6 rounded-[2rem] transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-rose-50 text-rose-400 group-hover:bg-rose-100 group-hover:text-rose-500 transition-colors shadow-inner">
            <UserX size={28} />
          </div>
          <div>
            <p
              className="text-sm font-bold uppercase tracking-wider mb-1 group-hover:text-rose-400 transition-colors"
              style={{ color: "#94a3b8" }}
            >
              Inactive Students
            </p>
            <h3
              className="text-4xl font-black group-hover:text-rose-600 transition-colors"
              style={{ color: "#1e293b" }}
            >
              {liststudents?.inactiveStudents || 0}
            </h3>
          </div>
        </div>
      </div>

      {/* ── Student List ── */}
      <div
        className="rounded-[2rem] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
        }}
      >
        {/* Table Toolbar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b border-white/50"
          style={{ background: "rgba(255,255,255,0.4)" }}
        >
          <h5 className="text-xl font-bold" style={{ color: "#1e293b" }}>
            Student Roster
          </h5>
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full glass-input pl-11 py-3 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Table Header (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 px-8 border-b border-white/30 text-xs font-bold uppercase tracking-wider text-slate-400">
          <div className="col-span-4">Student Info</div>
          <div className="col-span-3">Email Address</div>
          <div className="col-span-2">Joined Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {liststudents?.student?.length > 0 ? (
            liststudents?.student?.map((item) => (
              <div
                key={item._id}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 px-8 border-b border-white/20 transition-colors hover:bg-white/60"
              >
                {/* Avatar & Name */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={
                        item?.userId?.avatar ||
                        `https://ui-avatars.com/api/?name=${item?.userId?.name}&background=random`
                      }
                      alt={item?.userId?.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white"
                    />
                    {item?.status === "active" && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    )}
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-800 m-0 leading-tight">
                      {item?.userId?.name}
                    </h6>
                    <span className="text-xs font-medium text-slate-500 md:hidden">
                      {item?.userId?.email}
                    </span>
                  </div>
                </div>

                {/* Email (Hidden on Mobile) */}
                <div className="hidden md:block col-span-3 text-sm font-medium text-slate-600 truncate">
                  {item?.userId?.email}
                </div>

                {/* Joined Date */}
                <div className="hidden md:block col-span-2 text-sm font-medium text-slate-500">
                  22/03/2024
                </div>

                {/* Status */}
                <div className="col-span-1 text-left md:text-center">
                  <span
                    className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      color: "#059669",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    {item?.status || "Active"}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => setSelectedStudent(item)}
                    className="flex items-center justify-center w-10 h-10 rounded-xl transition-all hover:bg-orange-50 hover:text-orange-600 text-slate-400"
                    style={{
                      border: "1px solid rgba(0,0,0,0.05)",
                      background: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handremoveStudent(item)}
                    className="flex items-center justify-center w-10 h-10 rounded-xl transition-all hover:bg-rose-50 hover:text-rose-600 text-slate-400"
                    style={{
                      border: "1px solid rgba(0,0,0,0.05)",
                      background: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500">
              <UserX size={48} className="mb-4 opacity-30" />
              <p className="text-lg font-bold text-slate-600">
                No students found.
              </p>
              <p className="text-sm">
                There are no students currently enrolled in this class.
              </p>
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        <div
          className="flex justify-between items-center p-6 border-t border-white/50"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          <span className="text-sm font-medium text-slate-500">
            Showing 1 to {liststudents?.student?.length || 0} of{" "}
            {liststudents?.totalStudents || 0} students
          </span>
          <div className="flex gap-1">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-white text-slate-500 hover:text-slate-800"
              disabled
            >
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-white text-slate-600 hover:text-slate-800">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-white text-slate-600 hover:text-slate-800">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-white text-slate-600 hover:text-slate-800">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-[2.25rem] p-6 lg:p-8 transition-all animate-in fade-in zoom-in duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid rgba(255, 255, 255, 1)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-3">
                <img
                  src={selectedStudent?.userId?.avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover shadow-md ring-4 ring-white"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">
                {selectedStudent?.userId?.name || "Học sinh"}
              </h3>
              <span
                className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: "rgba(249,115,22,0.12)",
                  border: "1px solid rgba(249,115,22,0.25)",
                  color: "#ea580c",
                }}
              >
                {selectedStudent?.status || "Active"}
              </span>
            </div>

            {/* Info Rows */}
            <div
              className="space-y-3 mb-6 p-4 rounded-2xl"
              style={{
                background: "rgba(249,115,22,0.03)",
                border: "1px border-orange-500/10",
              }}
            >
              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-400 flex items-center gap-2">
                  <Mail size={14} className="text-orange-500" /> Email address
                </span>
                <span className="font-bold text-slate-700">
                  {selectedStudent?.userId?.email || "Chưa cập nhật"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-400 flex items-center gap-2">
                  <Phone size={14} className="text-orange-500" /> Phone number
                </span>
                <span className="font-bold text-slate-700">
                  {selectedStudent?.userId?.phone ||
                    selectedStudent?.userId?.phoneNumber ||
                    "Chưa cập nhật"}
                </span>
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-2.5 rounded-full font-bold text-white text-xs transition-all hover:scale-105 hover:shadow-md"
                style={{
                  background: "linear-gradient(135deg, #f97316, #fb923c)",
                  boxShadow: "0 4px 14px rgba(249,115,22,0.25)",
                  borderRadius: "9999px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassStudents;
