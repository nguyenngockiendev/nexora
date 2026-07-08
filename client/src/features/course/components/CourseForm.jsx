import { Search, Filter, Sparkles, ShoppingCart, Play, Info, AlertCircle, CheckCircle2 } from "lucide-react";

const CoursesForm = ({
  courses,
  loading,
  payment,
  paymentloading,
  setSearch,
  setFilter,
  role,
  navigate,
  errorPayment,
  messagepayment,
}) => {
  return (
    <div className="space-y-10">
      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden rounded-[2.5rem] p-8 lg:p-12 min-h-[360px] flex items-center"
        style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(32px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(194,110,30,0.08)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
        <div className="absolute -top-32 -right-20 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none animate-pulse" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 60%)', filter: 'blur(50px)', animationDuration: '4s' }} />
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 60%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10 w-full">
          
          {/* Hero Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#ea580c' }}
            >
              <Sparkles size={14} />
              Featured Catalog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4" style={{ color: '#1e293b' }}>
              Level up with <br/>
              <span style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium Courses</span>
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#64748b' }}>
              Master new skills with interactive live sessions or learn at your own pace with our meticulously crafted recorded courses.
            </p>
          </div>

          {/* Hero 3D Graphic (Stacked Cards) */}
          <div className="hidden lg:block relative w-[400px] h-[280px] perspective-1000">
            {/* Card 3 (Back) */}
            <div className="absolute top-8 right-12 w-64 h-40 rounded-2xl opacity-40 transform translate-x-12 -translate-y-8 rotate-12 scale-90"
              style={{ background: 'rgba(251,146,60,0.8)', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)' }} />
            {/* Card 2 (Middle) */}
            <div className="absolute top-4 right-6 w-64 h-40 rounded-2xl opacity-70 transform translate-x-6 -translate-y-4 rotate-6 scale-95"
              style={{ background: 'rgba(249,115,22,0.9)', border: '1px solid rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)' }} />
            {/* Card 1 (Front) */}
            <div className="absolute top-0 right-0 w-72 h-44 rounded-2xl shadow-2xl transform transition-transform hover:-translate-y-2 hover:rotate-2 duration-500 flex flex-col justify-between p-5"
              style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,1)', backdropFilter: 'blur(16px)', boxShadow: '0 20px 40px rgba(194,110,30,0.15)' }}>
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Play size={20} className="text-orange-500" />
                  </div>
                  <span className="px-2 py-1 rounded bg-rose-100 text-rose-600 text-[10px] font-bold">● LIVE</span>
                </div>
                <div>
                  <div className="h-4 w-3/4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search for courses, skills, or topics..."
            className="w-full glass-input pl-11 py-3 text-base"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-[220px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Filter size={18} className="text-slate-400" />
          </div>
          <select
            className="w-full glass-input pl-11 py-3 text-base appearance-none cursor-pointer font-medium"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All Courses">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* ── Alerts ── */}
      {(messagepayment || errorPayment) && (
        <div className="flex flex-col gap-3">
          {messagepayment && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={messagepayment === "payment failed!"
                ? { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }
                : { background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#059669' }
              }
            >
              {messagepayment === "payment failed!" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span className="text-sm font-semibold">{messagepayment}</span>
            </div>
          )}
          {errorPayment && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }}
            >
              <AlertCircle size={18} />
              <span className="text-sm font-semibold">{errorPayment}</span>
            </div>
          )}
        </div>
      )}

      {/* ── Loading State ── */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`rounded-3xl animate-pulse ${i === 0 ? 'sm:col-span-2 row-span-2 h-[400px]' : 'h-[300px]'}`} 
                 style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.75)' }} />
          ))}
        </div>
      )}

      {/* ── Course Grid (Bento Layout) ── */}
      {!loading && courses?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense">
          {courses.map((cou, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={cou._id}
                className={`group relative overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${isFeatured ? 'sm:col-span-2 row-span-2 rounded-[2rem]' : 'rounded-[1.5rem]'}`}
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
                  style={{ 
                    background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(249,115,22,0.08), transparent 40%)' 
                  }} 
                />

                {/* Thumbnail Container */}
                <div className={`relative overflow-hidden bg-slate-100 ${isFeatured ? 'h-64 sm:h-72' : 'h-40'}`}>
                  <img
                    src={cou?.thumbnail}
                    alt={cou?.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.5) 0%, transparent 60%)' }} />
                  
                  {/* Type Badge */}
                  <span
                    className={`absolute top-4 right-4 rounded-full font-bold shadow-lg ${isFeatured ? 'px-3 py-1.5 text-xs' : 'px-2.5 py-1 text-[10px]'}`}
                    style={
                      cou?.type === 'live'
                        ? { background: 'rgba(244,63,94,0.85)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(244,63,94,0.5)' }
                        : { background: 'rgba(249,115,22,0.85)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(249,115,22,0.5)' }
                    }
                  >
                    {cou?.type === 'live' ? '● Live' : 'Recorded'}
                  </span>
                </div>

                {/* Card Body */}
                <div className={`flex flex-col flex-1 gap-3 relative z-20 ${isFeatured ? 'p-6 lg:p-8' : 'p-4'}`}>
                  <h3 className={`font-bold leading-snug line-clamp-2 ${isFeatured ? 'text-2xl min-h-[4rem]' : 'text-[1rem] min-h-[2.5rem]'}`} style={{ color: '#1e293b' }}>
                    {cou?.title}
                  </h3>

                  <p className={`line-clamp-3 leading-relaxed flex-1 ${isFeatured ? 'text-sm' : 'text-xs line-clamp-2'}`} style={{ color: '#64748b' }}>
                    {cou?.description}
                  </p>

                  {/* Footer Section: Price & Actions */}
                  <div className={`mt-2 pt-4 border-t ${isFeatured ? 'pt-6 mt-4' : ''}`} style={{ borderColor: 'rgba(249,115,22,0.1)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Price</span>
                      <span className={`font-black ${isFeatured ? 'text-2xl' : 'text-lg'}`} style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {Number(cou?.price).toLocaleString("vi-VN")} ₫
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {role !== "student" && cou?.type === "recorded" && (
                        <button
                          className={`flex items-center justify-center gap-2 rounded-xl font-semibold transition-all ${isFeatured ? 'flex-1 py-3 text-base' : 'flex-1 py-2.5 text-sm'}`}
                          style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.75)', color: '#64748b' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#1e293b'; e.currentTarget.style.background = 'rgba(249,115,22,0.08)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; }}
                          onClick={() => navigate(`details_course/${cou._id}`)}
                        >
                          <Info size={isFeatured ? 18 : 16} />
                          Details
                        </button>
                      )}

                      {role === "student" && (
                        <button
                          className={`flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:shadow-lg ${isFeatured ? 'flex-1 py-3 text-base' : 'flex-1 py-2.5 text-sm'}`}
                          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(251,146,60,0.8))', border: '1px solid rgba(249,115,22,0.3)', boxShadow: '0 4px 16px rgba(249,115,22,0.25)' }}
                          disabled={paymentloading}
                          onClick={() => {
                            if (cou?.type === "recorded") {
                              payment(cou?._id, { type: cou?.type });
                            }
                            if (cou?.type === "live") {
                              navigate(`details/class/live/${cou._id}`);
                            }
                          }}
                        >
                          {paymentloading ? (
                            <span className="animate-pulse">Processing...</span>
                          ) : cou?.type === "live" ? (
                            <>
                              <Play size={isFeatured ? 18 : 16} />
                              Class Info
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={isFeatured ? 18 : 16} />
                              Buy Now
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && courses?.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center p-12 rounded-[2rem]" style={{ background: 'rgba(255,255,255,0.4)', border: '1px dashed rgba(249,115,22,0.2)' }}>
          <Search size={32} style={{ color: '#f97316', opacity: 0.5 }} className="mb-4" />
          <h4 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>No courses found</h4>
          <p className="text-sm" style={{ color: '#64748b' }}>Try searching with a different keyword or filter.</p>
        </div>
      )}
    </div>
  );
};

export default CoursesForm;

