import { Link } from "react-router-dom";
import { Search, Filter, PlayCircle, BookOpen, Video, Clock, LayoutDashboard, Loader2 } from "lucide-react";

const CourseList = ({ courses, error, loading, setFilter, setSearch }) => {
  return (
    <div className="space-y-8 pb-10">
      {/* ── Header & Filter Bar ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-2">
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <LayoutDashboard className="text-orange-500" size={32} /> My Courses
          </h2>
          <p className="text-slate-500 font-medium">Continue your learning journey</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative group flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-bold bg-white/60 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="relative group w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Filter size={18} className="text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm font-bold bg-white/60 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none text-slate-700 cursor-pointer"
            >
              <option value="All Courses">All Courses</option>
              <option value="buy">Purchased</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-10 text-orange-500 font-bold">
          <Loader2 className="animate-spin" size={24} /> Loading your learning path...
        </div>
      )}
      
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold">
          {error}
        </div>
      )}

      {/* ── Glass Course Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses?.map((item) => (
          <div 
            key={item._id} 
            className="group flex flex-col rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)]"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden m-2 rounded-3xl">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
              <img
                src={item?.courseId?.thumbnail || 'https://via.placeholder.com/400x200'}
                alt={item?.courseId?.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Type Badge */}
              <div className="absolute top-4 right-4 z-20">
                {item?.type === "live" ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider shadow-lg">
                    <Video size={14} /> Recorded
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col p-6 pt-4">
              {/* Title & Instructor */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                  {item?.courseId?.title || 'Untitled Course'}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${item?.instructor?.name || 'Ins'}&background=random`} alt="instructor" />
                  </div>
                  <p className="text-sm font-bold text-slate-500">
                    {item?.instructor?.name || 'Unknown Instructor'}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Progress</span>
                  <span className="text-lg font-black text-orange-500">45%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out relative"
                    style={{ 
                      width: "45%",
                      background: 'linear-gradient(90deg, #f97316, #fbbf24)'
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>

              {/* Lesson Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                    <BookOpen size={14} />
                  </div>
                  <span>12 / 30 completed</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <PlayCircle size={14} />
                  </div>
                  <span className="truncate">Next: <strong className="text-slate-800">React Hooks</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Clock size={14} />
                  </div>
                  <span>Last accessed: 2 days ago</span>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="mt-auto flex flex-col items-center justify-center gap-4 pt-5 border-t border-slate-100/50 px-2">
                
                <div className="inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                  {item?.status || 'Active'}
                </div>

                <div className="flex justify-center items-center gap-3 w-full">
                  {item?.type === "recorded" && (
                    <Link to={`courses/${item?.courseId?._id}/item`}>
                      <button className="whitespace-nowrap flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-orange-500 transition-colors shadow-sm">
                        <BookOpen size={16} /> Details
                      </button>
                    </Link>
                  )}
                  {item?.type === "live" && (
                    <Link to={`live/class/${item?.classId}/item`}>
                      <button className="whitespace-nowrap flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-orange-600 bg-orange-50 border border-orange-200 hover:bg-orange-500 hover:text-white transition-colors shadow-sm">
                        <Video size={16} /> Join
                      </button>
                    </Link>
                  )}

                  <button className="whitespace-nowrap flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-black text-white shadow-md shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
                          style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                    Continue <PlayCircle size={16} />
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        ))}

        {courses?.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center text-slate-500 font-medium">
            No courses found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
