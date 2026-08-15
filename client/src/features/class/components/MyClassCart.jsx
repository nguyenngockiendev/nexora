import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Search, Filter, Calendar, Users, Activity, PlayCircle, Clock, Trash2, Edit, Settings, MoreVertical, ShieldAlert } from "lucide-react";
import { useState } from "react";

const MyClassCart = ({
  classs,
  handchangesStatus,
  setSearch,
  setFiler,
  setFilterday,
  navigate,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const totalClasses = classs?.length || 0;
  const activeStudents = classs?.reduce((acc, curr) => acc + (curr.currentStudents || 0), 0) || 0;
  const upcomingClasses = classs?.filter(c => c.status === 'upcoming').length || 0;
  const openClasses = classs?.filter(c => c.status === 'open').length || 0;

  const nextClass = classs?.find(c => c.status === 'upcoming' || c.status === 'open') || classs?.[0];

  return (
    <div className="space-y-6 pb-10">
      
      {/* ── 1. ANALYTICS ROW (Stat Cards) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Classes', value: totalClasses, icon: <Activity size={18} />, bg: 'rgba(249,115,22,0.1)', color: '#ea580c' },
          { label: 'Active Students', value: activeStudents, icon: <Users size={18} />, bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
          { label: 'Upcoming', value: upcomingClasses, icon: <Clock size={18} />, bg: 'rgba(59,130,246,0.1)', color: '#2563eb' },
          { label: 'Open Registration', value: openClasses, icon: <ShieldAlert size={18} />, bg: 'rgba(16,185,129,0.1)', color: '#059669' }
        ].map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.85)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 20px rgba(194,110,30,0.04)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: stat.bg, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-800 leading-tight">{stat.value}</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. NEXT SESSION HIGHLIGHT (Hero Banner) ── */}
      {nextClass && (
        <section
          className="relative overflow-hidden rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            background: 'rgba(255,255,255,0.65)',
            border: '1px solid rgba(255,255,255,0.85)',
            backdropFilter: 'blur(24px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 36px rgba(194,110,30,0.06)',
          }}
        >
          <div className="absolute -top-32 -right-20 w-[350px] h-[350px] rounded-full opacity-20 pointer-events-none animate-pulse" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 60%)', filter: 'blur(40px)', animationDuration: '5s' }} />

          <div className="relative z-10 max-w-2xl">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-sm"
              style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#ea580c' }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" /> Next Scheduled Class
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-slate-800 leading-snug">
              {nextClass.className}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-orange-500" /> {nextClass.startDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-orange-500" /> {nextClass.schedule?.day} ({nextClass.schedule?.startTime} - {nextClass.schedule?.endTime})
              </span>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Link to={nextClass.meetingLink || '#'}>
              <button
                className="w-full md:w-auto flex items-center justify-center gap-2.5 px-7 py-3 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #fb923c)',
                  boxShadow: '0 6px 20px rgba(249,115,22,0.3)',
                  borderRadius: '9999px',
                }}
              >
                <PlayCircle size={18} className="group-hover:rotate-12 transition-transform" /> Enter Meeting ▶
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* ── 3. CONTROLS (Search & Filters) ── */}
      <div
        className="flex flex-col md:flex-row justify-between items-center gap-4 p-3 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)' }}
      >
        <h3 className="text-lg font-bold text-slate-800 px-2">All Classes</h3>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search size={15} className="absolute inset-y-0 left-3 my-auto text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search class..."
              className="w-full glass-input pl-9 py-2 text-xs"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative w-full sm:w-36">
            <Filter size={15} className="absolute inset-y-0 left-3 my-auto text-slate-400 pointer-events-none" />
            <select
              className="w-full glass-input pl-9 py-2 text-xs appearance-none cursor-pointer"
              onChange={(e) => setFiler(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <select
            className="w-full sm:w-32 glass-input py-2 text-xs cursor-pointer"
            onChange={(e) => setFilterday(e.target.value)}
          >
            <option value="All Day">All Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
      </div>

      {/* ── 4. CLASS CARDS GRID (3 Columns) ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {classs?.map((item) => {
          const progress = Math.min((item.currentStudents / (item.maxStudents || 1)) * 100, 100);
          
          return (
            <div
              key={item._id}
              className="group relative rounded-[1.75rem] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 6px 24px rgba(194,110,30,0.05)',
              }}
            >
              <div className="p-5 flex flex-col flex-1">
                {/* Card Header: Status & Actions Menu */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-2">
                    <span
                      className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm"
                      style={
                        item.status === 'open'
                          ? { background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#059669' }
                          : item.status === 'upcoming'
                          ? { background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#ea580c' }
                          : { background: 'rgba(148,163,184,0.15)', border: '1px solid rgba(148,163,184,0.3)', color: '#64748b' }
                      }
                    >
                      ● {item.status}
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 leading-snug line-clamp-2">{item.className}</h4>
                  </div>
                  
                  {/* Dropdown Menu Toggle */}
                  <div className="relative">
                    <button
                      className="p-1.5 rounded-full hover:bg-white/70 transition-colors text-slate-400 hover:text-slate-700"
                      onClick={() => setDropdownOpen(dropdownOpen === item._id ? null : item._id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {/* Dropdown Menu Popover */}
                    {dropdownOpen === item._id && (
                      <div
                        className="absolute right-0 top-9 w-40 rounded-2xl py-2 z-50 shadow-xl"
                        style={{
                          background: 'rgba(255,255,255,0.95)',
                          border: '1px solid rgba(255,255,255,1)',
                          backdropFilter: 'blur(16px)',
                        }}
                      >
                        <button
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-orange-50 flex items-center gap-2"
                          onClick={() => navigate(`/update-class/${item?._id}`, { state: { data: item } })}
                        >
                          <Edit size={13} /> Edit Info
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-orange-50 flex items-center gap-2"
                          onClick={() => handchangesStatus(item)}
                        >
                          <Settings size={13} /> Toggle Status
                        </button>
                        <div className="h-[1px] bg-slate-100 my-1" />
                        <button className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enrollment Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Enrollment</span>
                    <span className="text-xs font-bold text-slate-700">{item.currentStudents} / {item.maxStudents}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${progress}%`,
                        background: progress >= 100 ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #f97316, #fb923c)',
                      }}
                    />
                  </div>
                </div>

                {/* Schedule Info Box */}
                <div className="flex flex-col gap-1.5 p-3 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.45)', border: '1px dashed rgba(249,115,22,0.15)' }}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Calendar size={13} className="text-orange-500" /> Start: {item.startDate}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Clock size={13} className="text-orange-500" /> {item.schedule?.day} • {item.schedule?.startTime} - {item.schedule?.endTime}
                  </div>
                </div>

                {/* Card Action Buttons (Pill Capsule Style) */}
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    className="w-full py-2.5 rounded-full font-bold text-white text-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-md flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #f97316, #fb923c)',
                      boxShadow: '0 4px 14px rgba(249,115,22,0.25)',
                      borderRadius: '9999px',
                    }}
                    onClick={() => window.location.href = item?.meetingLink || '#'}
                  >
                    <PlayCircle size={15} /> Meeting Link
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.02] hover:bg-white flex items-center justify-center gap-1.5"
                      style={{
                        background: 'rgba(255,255,255,0.85)',
                        border: '1px solid rgba(249,115,22,0.25)',
                        color: '#ea580c',
                        borderRadius: '9999px',
                      }}
                      onClick={() => navigate(`/instructor/classes/${item._id}/students`)}
                    >
                      <Users size={13} /> Students
                    </button>

                    <button
                      className="py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.02] hover:bg-white flex items-center justify-center gap-1.5"
                      style={{
                        background: 'rgba(255,255,255,0.85)',
                        border: '1px solid rgba(249,115,22,0.25)',
                        color: '#ea580c',
                        borderRadius: '9999px',
                      }}
                      onClick={() => navigate(`/live/class/${item._id}/item`)}
                    >
                      <Activity size={13} /> Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Empty State ── */}
      {classs?.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center p-12 rounded-[2rem]" style={{ background: 'rgba(255,255,255,0.45)', border: '1px dashed rgba(249,115,22,0.25)' }}>
          <ShieldAlert size={36} style={{ color: '#f97316', opacity: 0.5 }} className="mb-3" />
          <h4 className="text-xl font-bold mb-1" style={{ color: '#1e293b' }}>No Classes Yet</h4>
          <p className="text-xs" style={{ color: '#64748b' }}>Start creating your first live class session.</p>
        </div>
      )}
    </div>
  );
};

export default MyClassCart;
