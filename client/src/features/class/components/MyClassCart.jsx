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

  // Compute Analytics
  const totalClasses = classs?.length || 0;
  const activeStudents = classs?.reduce((acc, curr) => acc + (curr.currentStudents || 0), 0) || 0;
  const upcomingClasses = classs?.filter(c => c.status === 'upcoming').length || 0;
  const openClasses = classs?.filter(c => c.status === 'open').length || 0;

  const nextClass = classs?.find(c => c.status === 'upcoming' || c.status === 'open') || classs?.[0];

  return (
    <div className="space-y-8 pb-10">
      
      {/* ── 1. ANALYTICS ROW ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Classes', value: totalClasses, icon: <Activity size={20} />, color: 'blue' },
          { label: 'Active Students', value: activeStudents, icon: <Users size={20} />, color: 'emerald' },
          { label: 'Upcoming', value: upcomingClasses, icon: <Clock size={20} />, color: 'orange' },
          { label: 'Open for Registration', value: openClasses, icon: <ShieldAlert size={20} />, color: 'rose' }
        ].map((stat, idx) => (
          <div key={idx} className="flex items-center gap-4 p-5 rounded-[1.5rem] transition-all hover:-translate-y-1"
               style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${stat.color}-100 text-${stat.color}-500`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-black" style={{ color: '#1e293b' }}>{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. NEXT SESSION HIGHLIGHT ── */}
      {nextClass && (
        <section className="relative overflow-hidden rounded-[2.5rem] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))', border: '1px solid rgba(255,255,255,1)', backdropFilter: 'blur(32px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 20px 40px rgba(194,110,30,0.1)' }}>
          
          <div className="absolute -top-32 -right-20 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none animate-pulse" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 60%)', filter: 'blur(40px)', animationDuration: '4s' }} />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#ea580c' }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" /> Next Scheduled Class
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 leading-tight" style={{ color: '#1e293b' }}>
              {nextClass.className}
            </h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#64748b' }}>
                <Calendar size={16} /> {nextClass.startDate}
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#64748b' }}>
                <Clock size={16} /> {nextClass.schedule?.day} ({nextClass.schedule?.startTime} - {nextClass.schedule?.endTime})
              </span>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Link to={nextClass.meetingLink || '#'}>
              <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-white text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 group"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <PlayCircle size={24} className="group-hover:animate-spin" /> Enter Meeting
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* ── 3. CONTROLS (SEARCH & FILTER) ── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-2 rounded-2xl" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.6)' }}>
        <h3 className="text-xl font-bold px-4" style={{ color: '#1e293b' }}>All Classes</h3>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input type="text" placeholder="Search class..." className="w-full glass-input pl-9 text-sm" onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="relative w-full sm:w-40">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-slate-400" />
            </div>
            <select className="w-full glass-input pl-9 text-sm appearance-none cursor-pointer" onChange={(e) => setFiler(e.target.value)}>
              <option value="All Status">All Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <select className="w-full sm:w-36 glass-input text-sm cursor-pointer" onChange={(e) => setFilterday(e.target.value)}>
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

      {/* ── 4. CLASS CARDS GRID ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classs?.map((item) => {
          const progress = Math.min((item.currentStudents / (item.maxStudents || 1)) * 100, 100);
          
          return (
            <div key={item._id} className="group relative rounded-[2rem] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                 style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
              
              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 pr-4">
                    <span className="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase mb-2"
                          style={item.status === 'open' ? { background: '#e8fff3', color: '#10b981' } : 
                                 item.status === 'upcoming' ? { background: '#fff3e0', color: '#f97316' } : 
                                 { background: '#f1f5f9', color: '#64748b' }}>
                      ● {item.status}
                    </span>
                    <h4 className="text-xl font-bold leading-tight line-clamp-2" style={{ color: '#1e293b' }}>{item.className}</h4>
                  </div>
                  
                  {/* Menu Button */}
                  <div className="relative">
                    <button className="p-2 rounded-xl hover:bg-white/50 transition-colors" onClick={() => setDropdownOpen(dropdownOpen === item._id ? null : item._id)}>
                      <MoreVertical size={18} className="text-slate-400" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {dropdownOpen === item._id && (
                      <div className="absolute right-0 top-10 w-40 rounded-xl py-2 z-50 shadow-xl"
                           style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-orange-50" onClick={() => navigate(`/update-class/${item?._id}`, { state: { data: item } })}>
                          <Edit size={14} className="inline mr-2" /> Edit Info
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-orange-50" onClick={() => handchangesStatus(item)}>
                          <Settings size={14} className="inline mr-2" /> Toggle Status
                        </button>
                        <div className="h-[1px] bg-slate-100 my-1" />
                        <button className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">
                          <Trash2 size={14} className="inline mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Enrollment</span>
                    <span className="text-sm font-bold text-slate-700">{item.currentStudents} / {item.maxStudents}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                         style={{ width: `${progress}%`, background: progress >= 100 ? '#10b981' : '#f97316' }} />
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="flex flex-col gap-2 p-3 rounded-xl mb-6" style={{ background: 'rgba(255,255,255,0.4)', border: '1px dashed rgba(0,0,0,0.05)' }}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Calendar size={14} className="text-orange-400" /> Start: {item.startDate}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Clock size={14} className="text-orange-400" /> {item.schedule.day} • {item.schedule.startTime} - {item.schedule.endTime}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button className="col-span-2 py-2.5 rounded-xl font-bold text-white transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-orange-500/25 flex items-center justify-center gap-2"
                          style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
                          onClick={() => window.location.href = item?.meetingLink || '#'}>
                    <PlayCircle size={16} /> Meeting Link
                  </button>
                  <button className="py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white flex items-center justify-center gap-1"
                          style={{ border: '1px solid rgba(0,0,0,0.05)', color: '#64748b' }}
                          onClick={() => navigate(`/instructor/classes/${item._id}/students`)}>
                    <Users size={14} /> Students
                  </button>
                  <button className="py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white flex items-center justify-center gap-1"
                          style={{ border: '1px solid rgba(0,0,0,0.05)', color: '#64748b' }}
                          onClick={() => navigate(`/live/class/${item._id}/item`)}>
                    <Activity size={14} /> Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Empty State ── */}
      {classs?.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center p-16 rounded-[2.5rem]" style={{ background: 'rgba(255,255,255,0.4)', border: '1px dashed rgba(249,115,22,0.2)' }}>
          <ShieldAlert size={40} style={{ color: '#f97316', opacity: 0.5 }} className="mb-4" />
          <h4 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>No Classes Yet</h4>
          <p className="text-base" style={{ color: '#64748b' }}>Start creating your first live class session.</p>
        </div>
      )}
    </div>
  );
};

export default MyClassCart;
