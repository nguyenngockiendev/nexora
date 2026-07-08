import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  PlayCircle,
  TrendingUp,
  Video,
  Award,
  ChevronRight
} from "lucide-react";

const formatNumber = (value) => Number(value || 0).toLocaleString("vi-VN");

const getUserName = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfor"));
    return userInfo?.name || "Student";
  } catch {
    return "Student";
  }
};

// ── Stat Card (Light Glass + Blue Accent) ──
const StatCard = ({ icon: Icon, label, value, tone, helper }) => {
  const tones = {
    indigo: { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.25)', iconBg: 'rgba(99,102,241,0.12)', iconColor: '#4f46e5', glow: 'rgba(99,102,241,0.15)' },
    blue:   { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)', iconBg: 'rgba(59,130,246,0.12)', iconColor: '#2563eb', glow: 'rgba(59,130,246,0.15)' },
    green:  { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)',  iconBg: 'rgba(16,185,129,0.12)', iconColor: '#059669', glow: 'rgba(16,185,129,0.12)' },
    orange: { bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.2)',  iconBg: 'rgba(249,115,22,0.12)', iconColor: '#ea580c', glow: 'rgba(249,115,22,0.12)' },
  };
  const t = tones[tone] || tones.blue;

  return (
    <div
      className="group rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default"
      style={{
        background: `rgba(255,255,255,0.6)`,
        border: `1px solid ${t.border}`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 8px 32px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
      }}
    >
      <div
        className="mb-4 grid h-11 w-11 place-items-center rounded-2xl transition-transform group-hover:scale-110"
        style={{ background: t.iconBg, boxShadow: `0 0 16px ${t.glow}` }}
      >
        <Icon size={20} style={{ color: t.iconColor }} />
      </div>
      <p className="mb-1 text-sm font-semibold" style={{ color: '#64748b' }}>{label}</p>
      <strong className="block text-3xl font-black leading-none" style={{ color: '#1e293b' }}>{value}</strong>
      {helper && (
        <span className="mt-2 block text-xs font-medium" style={{ color: '#94a3b8' }}>{helper}</span>
      )}
    </div>
  );
};

const StudentDashboardView = ({ dashboard, error, loading }) => {
  const studentName = getUserName();
  
  // MOCK DATA for Student Dashboard UI demonstration
  const overview = dashboard?.overview || {
    enrolledCourses: 4,
    completedLessons: 42,
    upcomingClasses: 2,
    avgScore: 85
  };

  const currentCourse = {
    title: "Lập trình ReactJS Thực Chiến 2026",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=300&auto=format&fit=crop",
    progress: 68,
    lastLesson: "Chương 4: Quản lý trạng thái với Redux Toolkit"
  };

  const upcomingLiveClasses = [
    { id: 1, title: "Hỏi đáp & Review Code ReactJS", date: "Hôm nay", time: "20:00 - 21:30", instructor: "Nguyễn Văn A" },
    { id: 2, title: "Giải thuật & Cấu trúc dữ liệu", date: "Ngày mai", time: "18:00 - 19:30", instructor: "Trần Thị B" }
  ];

  // ── Loading Skeleton ──
  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-3xl p-6 animate-pulse" style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)' }}>
          <div className="h-10 w-2/3 rounded-2xl" style={{ background: 'rgba(59,130,246,0.08)' }} />
          <div className="mt-4 h-4 w-1/2 rounded-full" style={{ background: 'rgba(59,130,246,0.06)' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8"
        style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(32px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(59,130,246,0.08)',
        }}
      >
        {/* Top shimmer accent */}
        <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        {/* Glow blob */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#2563eb' }}
            >
              <GraduationCap size={14} />
              Student Dashboard
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight md:text-5xl" style={{ color: '#1e293b' }}>
              Chào mừng trở lại,{" "}
              <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {studentName}
              </span> 👋
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7" style={{ color: '#64748b' }}>
              Hôm nay là một ngày tuyệt vời để học những điều mới. Hãy tiếp tục hành trình tri thức của bạn nhé!
            </p>
          </div>

          {/* Continue Learning Card */}
          <div
            className="rounded-3xl p-1 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(6,182,212,0.12) 100%)',
              border: '1px solid rgba(59,130,246,0.25)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 32px rgba(59,130,246,0.12)',
            }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[1.3rem] p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600">Đang học</span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                    <BookOpen size={14} />
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 line-clamp-1">{currentCourse.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">{currentCourse.lastLesson}</p>
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500">Tiến độ</span>
                  <span className="text-blue-600">{currentCourse.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${currentCourse.progress}%` }}
                  ></div>
                </div>
                
                <button className="w-full py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  style={{ background: 'linear-gradient(to right, #3b82f6, #0ea5e9)' }}
                >
                  <PlayCircle size={18} />
                  Học tiếp ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat Cards ── */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookOpen}     label="Khóa đã tham gia"   value={formatNumber(overview.enrolledCourses)}   helper="Đang trong quá trình học" tone="indigo" />
        <StatCard icon={CheckCircle2} label="Bài giảng hoàn thành" value={formatNumber(overview.completedLessons)}  helper="Rất chăm chỉ!"          tone="green"  />
        <StatCard icon={Video}        label="Lớp Live sắp tới"   value={formatNumber(overview.upcomingClasses)}    helper="Đừng bỏ lỡ nhé"         tone="orange" />
        <StatCard icon={Award}        label="Điểm Quiz (TB)"     value={`${overview.avgScore}`}                   helper="Top 15% của lớp"        tone="blue" />
      </section>

      {/* ── Bottom Grid ── */}
      <section className="grid gap-6 xl:grid-cols-2">

        {/* Live Classes Schedule */}
        <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(0,0,0,0.04)' }}>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(249,115,22,0.12)', color: '#ea580c', border: '1px solid rgba(249,115,22,0.25)' }}>
                Lịch trình
              </span>
              <h2 className="mt-3 text-2xl font-black" style={{ color: '#1e293b' }}>Lớp Live sắp diễn ra</h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: 'rgba(249,115,22,0.12)', boxShadow: '0 0 12px rgba(249,115,22,0.15)' }}>
              <CalendarDays size={18} style={{ color: '#ea580c' }} />
            </div>
          </div>

          <div className="space-y-4">
            {upcomingLiveClasses.map(cls => (
              <div key={cls.id} className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/50 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex flex-col items-center justify-center font-bold">
                    <span className="text-xs uppercase">{cls.date === 'Hôm nay' ? 'TĐ' : 'MAI'}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{cls.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1"><Clock3 size={12}/> {cls.time}</span>
                      <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full">{cls.instructor}</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommend / Latest Activity */}
        <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(0,0,0,0.04)' }}>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(16,185,129,0.12)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}>
                Hoạt động
              </span>
              <h2 className="mt-3 text-2xl font-black" style={{ color: '#1e293b' }}>Thành tích & Chứng chỉ</h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: 'rgba(16,185,129,0.12)', boxShadow: '0 0 12px rgba(16,185,129,0.15)' }}>
              <TrendingUp size={18} style={{ color: '#059669' }} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-48 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
              <Award size={28} className="text-emerald-500" />
            </div>
            <p className="font-bold text-slate-700">Chưa có chứng chỉ nào</p>
            <p className="text-sm text-slate-500 mt-1 max-w-xs text-center">Hãy hoàn thành 100% khóa học để nhận chứng chỉ nhé!</p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default StudentDashboardView;
