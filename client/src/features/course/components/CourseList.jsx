import { Link } from "react-router-dom";
import { Search, Play, ExternalLink, BookOpen, Clock, Filter } from "lucide-react";

const CourseList = ({ courses, error, loading, setFilter, setSearch }) => {
  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen">

      {/* ── Page Header ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-6"
        style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(32px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(194,110,30,0.08)',
        }}
      >
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3"
              style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#ea580c' }}
            >
              <BookOpen size={12} />
              Learning
            </div>
            <h1 className="text-3xl font-black" style={{ color: '#1e293b' }}>My Courses</h1>
            <p className="mt-1 text-sm" style={{ color: '#64748b' }}>Continue your learning journey</p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search courses..."
                className="glass-input h-10 pl-10 pr-4 text-sm w-full sm:w-56"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select
                className="glass-input h-10 pl-10 pr-4 text-sm w-full sm:w-44 appearance-none cursor-pointer"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All Courses">All Courses</option>
                <option value="buy">Buy</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-72 rounded-3xl animate-pulse" style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.75)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-2xl p-4 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }}>
          {error}
        </div>
      )}

      {/* ── Course Grid ── */}
      {!loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses?.map((item) => (
            <div
              key={item._id}
              className="group rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 32px rgba(0,0,0,0.05)',
              }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden h-44">
                <img
                  src={item?.courseId?.thumbnail}
                  alt={item?.courseId?.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 60%)' }} />

                {/* Type Badge */}
                <span
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={
                    item?.type === 'live'
                      ? { background: 'rgba(244,63,94,0.85)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(244,63,94,0.5)' }
                      : { background: 'rgba(249,115,22,0.85)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(249,115,22,0.5)' }
                  }
                >
                  {item?.type === 'live' ? '● Live' : 'Recorded'}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                <h3 className="font-bold text-sm leading-snug line-clamp-2 min-h-[2.5rem]" style={{ color: '#1e293b' }}>
                  {item?.courseId?.title}
                </h3>

                <p className="text-xs font-medium" style={{ color: '#64748b' }}>{item?.instructor?.name}</p>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: '#94a3b8' }}>
                    <span className="flex items-center gap-1"><Clock size={11} />Progress</span>
                    <span className="font-bold" style={{ color: '#f97316' }}>45%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(249,115,22,0.1)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: '45%', background: 'linear-gradient(90deg, #f97316, #fb923c)', boxShadow: '0 0 8px rgba(249,115,22,0.4)' }}
                    />
                  </div>
                </div>

                {/* Lesson Info */}
                <div className="text-xs space-y-1" style={{ color: '#94a3b8' }}>
                  <div>12 / 30 lessons completed</div>
                  <div style={{ color: '#94a3b8' }}>Last accessed: 2 days ago</div>
                </div>

                {/* Status */}
                <span
                  className="self-start px-2.5 py-0.5 rounded-full text-xs font-bold capitalize"
                  style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}
                >
                  {item?.status}
                </span>

                {/* Actions */}
                <div className="mt-auto flex gap-2 pt-2">
                  {item?.type === 'recorded' && (
                    <Link
                      to={`courses/${item?.courseId?._id}/item`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.75)', color: '#64748b' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#1e293b'; e.currentTarget.style.background = 'rgba(249,115,22,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; }}
                    >
                      <ExternalLink size={13} />
                      Details
                    </Link>
                  )}
                  {item?.type === 'live' && (
                    <Link
                      to={`live/class/${item?.classId}/item`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}
                    >
                      <Play size={13} />
                      Join Class
                    </Link>
                  )}
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.8), rgba(251,146,60,0.7))', border: '1px solid rgba(249,115,22,0.3)', boxShadow: '0 4px 12px rgba(249,115,22,0.2)' }}
                  >
                    <Play size={13} />
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
