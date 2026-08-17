import {
  Search,
  Shield,
  ShieldOff,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Ban,
  GraduationCap,
  Crown,
  User as UserIcon,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

const UserTable = ({
  loading,
  error,
  userlist,
  navigate,
  handleChangeStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Client-side filtering logic for Search, Role, and Status
  const filteredUsers = userlist?.filter((item) => {
    const matchSearch =
      !searchTerm.trim() ||
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = !selectedRole || item?.role === selectedRole;
    const matchStatus = !selectedStatus || item?.status === selectedStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedRole("");
    setSelectedStatus("");
  };

  return (
    <div className="space-y-6 pb-10">
      {/* ── Header ── */}
      <div
        className="p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-sm transition-all"
        style={{
          background: "rgba(255,255,255,0.7)",
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

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-2">
            User Management
          </h1>
          <p className="text-sm md:text-base font-semibold text-slate-500 max-w-xl">
            Manage all students and instructors in your system
          </p>
        </div>
      </div>

      {loading && (
        <div className="text-orange-500 font-bold animate-pulse px-2 text-sm">
          Loading users...
        </div>
      )}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold text-sm">
          {error}
        </div>
      )}

      {/* ── Glass Filter Bar ── */}
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
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm font-semibold bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 shadow-sm"
              style={{ borderRadius: "9999px" }}
            />
          </div>

          {/* Role Select Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3.5 rounded-full text-sm font-bold bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 shadow-sm cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="">All Roles</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Status Select Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3.5 rounded-full text-sm font-bold bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 shadow-sm cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-2">
            <button
              onClick={handleResetFilters}
              className="w-full py-3.5 rounded-full text-sm font-bold text-slate-700 bg-white/80 border border-slate-200 hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2"
              style={{ borderRadius: "9999px" }}
            >
              <RotateCcw size={16} className="text-slate-500" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Modern Table List Card ── */}
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
          <div className="col-span-4">User Details</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Stats</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-200/70">
          {(filteredUsers || userlist)?.map((item) => (
            <div
              key={item._id}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 md:p-7 items-center transition-all hover:bg-white/90"
            >
              {/* User Details */}
              <div className="col-span-1 lg:col-span-4 flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={
                      item?.avatar ||
                      "https://ui-avatars.com/api/?name=" +
                        (item?.name || "User") +
                        "&background=random"
                    }
                    alt={item?.name}
                    className="w-13 h-13 md:w-14 md:h-14 rounded-full object-cover ring-4 ring-white/90 shadow-md"
                  />
                  {item.status === "active" ? (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  ) : (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-rose-500 ring-2 ring-white" />
                  )}
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h4 className="font-extrabold text-slate-800 text-base md:text-lg truncate">
                    {item?.name || "Unknown User"}
                  </h4>
                  <p className="text-xs md:text-sm font-semibold text-slate-500 truncate">
                    {item?.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="col-span-1 lg:col-span-2 flex items-center">
                {item?.role === "instructor" ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase border shadow-sm"
                    style={{
                      background: "rgba(168,85,247,0.1)",
                      borderColor: "rgba(168,85,247,0.3)",
                      color: "#9333ea",
                      borderRadius: "9999px",
                    }}
                  >
                    <Crown size={14} /> Instructor
                  </span>
                ) : item?.role === "admin" ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase border shadow-sm"
                    style={{
                      background: "rgba(249,115,22,0.1)",
                      borderColor: "rgba(249,115,22,0.3)",
                      color: "#ea580c",
                      borderRadius: "9999px",
                    }}
                  >
                    <Shield size={14} /> Admin
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase border shadow-sm"
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      borderColor: "rgba(59,130,246,0.3)",
                      color: "#2563eb",
                      borderRadius: "9999px",
                    }}
                  >
                    <GraduationCap size={14} /> Student
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="col-span-1 lg:col-span-2 flex items-center">
                {item?.status === "active" ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold border uppercase shadow-sm"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      borderColor: "rgba(16,185,129,0.3)",
                      color: "#059669",
                      borderRadius: "9999px",
                    }}
                  >
                    <CheckCircle size={14} /> Active
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold border uppercase shadow-sm"
                    style={{
                      background: "rgba(244,63,94,0.1)",
                      borderColor: "rgba(244,63,94,0.3)",
                      color: "#e11d48",
                      borderRadius: "9999px",
                    }}
                  >
                    <Ban size={14} /> Banned
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="col-span-1 lg:col-span-2">
                <p className="text-sm md:text-base font-extrabold text-slate-800">
                  {item.totalcourse || 0} Courses
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Joined: {item.joid || "N/A"}
                </p>
              </div>

              {/* Actions */}
              <div className="col-span-1 lg:col-span-2 flex items-center justify-start lg:justify-end gap-2.5">
                <button
                  onClick={() => navigate(`details/${item._id}`)}
                  className="w-10 h-10 rounded-full bg-white text-slate-500 border border-slate-200 flex items-center justify-center transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-sm hover:scale-105"
                  style={{ borderRadius: "9999px" }}
                  title="View Details"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() => handleChangeStatus(item)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border shadow-sm hover:scale-105 ${
                    item.status === "active"
                      ? "bg-white text-slate-500 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                      : "bg-white text-slate-500 border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300"
                  }`}
                  style={{ borderRadius: "9999px" }}
                  title={item.status === "active" ? "Ban User" : "Unban User"}
                >
                  {item.status === "active" ? (
                    <ShieldOff size={18} />
                  ) : (
                    <Shield size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {(!filteredUsers || filteredUsers.length === 0) && !loading && (
            <div className="p-12 text-center text-slate-500 text-sm font-bold">
              No users found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
