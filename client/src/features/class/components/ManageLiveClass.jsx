import "react-toastify/dist/ReactToastify.css";
import { Search, Video, Plus, Settings, Calendar, Radio, Activity } from "lucide-react";

const ManageClass = ({ listCourseLive, error, loading, navigate }) => {
  return (
    <div className="space-y-8 pb-10">
      {/* ── Hero Control Panel ── */}
      <section
        className="relative overflow-hidden rounded-[2.5rem] p-8 lg:p-10 flex items-center justify-between flex-wrap gap-8"
        style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(32px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(194,110,30,0.08)',
        }}
      >
        <div className="absolute -top-32 -right-20 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none animate-pulse" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 60%)', filter: 'blur(40px)', animationDuration: '5s' }} />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
            style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', color: '#e11d48' }}
          >
            <Radio size={14} className="animate-pulse" />
            Live Operations
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#1e293b' }}>
            Manage Live Classes
          </h2>
          <p className="text-base" style={{ color: '#64748b' }}>
            Create and manage live streaming sessions for your enrolled students.
          </p>
        </div>

        <div className="relative z-10 w-full md:w-[320px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search live courses..."
            className="w-full glass-input pl-11 py-3"
          />
        </div>
      </section>

      {/* ── Status Alerts ── */}
      {(error || loading) && (
        <div className="flex flex-col gap-3">
          {error && (
            <div className="px-4 py-3 rounded-2xl flex items-center gap-3 font-semibold" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }}>
              {error}
            </div>
          )}
          {loading && (
            <div className="px-4 py-3 rounded-2xl flex items-center gap-3 font-semibold animate-pulse" style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', color: '#ea580c' }}>
              Loading live courses...
            </div>
          )}
        </div>
      )}

      {/* ── Course List (Broadcast Studio Theme) ── */}
      <div className="flex flex-col gap-6">
        {listCourseLive?.map((item) => {
          const numClasses = item?.numberClass || 0;
          const progressDashoffset = 251 - (251 * Math.min((numClasses * 10), 100) / 100);

          return (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-[2rem] flex flex-col md:flex-row transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 32px rgba(194,110,30,0.06)',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Spotlight Overlay */}
              <div 
                className="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" 
                style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(249,115,22,0.08), transparent 40%)' }} 
              />
              
              {/* Diagonal Metal Sweep */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[2rem]">
                <div className="absolute top-0 bottom-0 w-32 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[500%] transition-transform duration-[1.5s] ease-in-out"
                     style={{ background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)' }} />
              </div>

              {/* ── 1. THUMBNAIL STUDIO ── */}
              <div className="w-full md:w-[320px] relative overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={item?.thumbnail}
                  alt="course"
                  className="w-full h-full min-h-[240px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 100%)' }} />
                
                {/* Radar Ring & Audio Visualizer */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                  {/* Radar */}
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <div className="absolute inset-0 animate-radar-ring" />
                    <div className="relative z-10 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.8)]">
                       <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  {/* Audio Bars */}
                  <div className="flex items-end gap-1 h-8 opacity-80 mix-blend-overlay">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-1.5 bg-white rounded-t-sm animate-audio-bar" style={{ height: '100%' }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 2. INNER BENTO CONTENT ── */}
              <div className="flex-1 p-6 relative z-20 flex flex-col justify-between">
                <div className="grid grid-cols-12 gap-6 items-center mb-6">
                  
                  {/* Course Info (Bento Box 1) */}
                  <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider w-max"
                         style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', color: '#e11d48' }}>
                      <Activity size={14} /> LIVE BROADCAST
                    </div>
                    <h4 className="text-2xl font-black leading-tight" style={{ color: '#1e293b' }}>{item?.title}</h4>
                    <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: '#64748b' }}>
                      {item?.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(249,115,22,0.1)', color: '#ea580c' }}>
                        <Calendar size={12} />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Created: 12 May 2026</span>
                    </div>
                  </div>

                  {/* Class Stats (Bento Box 2) */}
                  <div className="col-span-12 lg:col-span-4 flex justify-start lg:justify-end">
                    <div className="flex items-center gap-4 p-4 rounded-2xl w-full lg:w-auto shadow-sm"
                         style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,1)' }}>
                      
                      {/* Circular Progress SVG */}
                      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" stroke="rgba(249,115,22,0.1)" strokeWidth="8" fill="none" />
                          <circle cx="50" cy="50" r="42" stroke="#f97316" strokeWidth="8" fill="none" 
                                  strokeDasharray="264" strokeDashoffset={progressDashoffset} 
                                  className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="text-xl font-black text-orange-500">{numClasses}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Total</span>
                        <span className="font-bold text-slate-700">Classes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── 3. ACTIONS ROW ── */}
                <div className="flex flex-wrap gap-3 pt-6 border-t" style={{ borderColor: 'rgba(249,115,22,0.15)' }}>
                  <button
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}
                    onClick={() => navigate(`/courses/create/class/${item._id}`)}
                  >
                    <Plus size={18} /> Create Session
                  </button>

                  <button
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-md"
                    style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(249,115,22,0.3)', color: '#ea580c' }}
                    onClick={() => navigate(`details/class/${item._id}`)}
                  >
                    <Video size={18} /> Enter Studio
                  </button>

                  <button
                    className="flex-none flex items-center justify-center w-11 h-11 rounded-xl font-semibold transition-all hover:-translate-y-1 hover:shadow-md"
                    style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,1)', color: '#64748b' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1e293b'; e.currentTarget.style.background = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
                  >
                    <Settings size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {!loading && listCourseLive?.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center p-12 rounded-[2rem]" style={{ background: 'rgba(255,255,255,0.4)', border: '1px dashed rgba(249,115,22,0.2)' }}>
          <Radio size={32} style={{ color: '#f97316', opacity: 0.5 }} className="mb-4" />
          <h4 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>No live courses found</h4>
          <p className="text-sm" style={{ color: '#64748b' }}>Create a new live course to start managing sessions.</p>
        </div>
      )}
    </div>
  );
};

export default ManageClass;
