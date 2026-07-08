import {
  Activity,
  BookOpen,
  DollarSign,
  GraduationCap,
  Layout,
  RefreshCw,
  Shield,
  Users,
  UserCheck,
  CreditCard,
  Calendar
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

const formatNumber = (value) => Number(value || 0).toLocaleString("vi-VN");

const getUserName = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfor"));
    return userInfo?.name || "Administrator";
  } catch {
    return "Administrator";
  }
};

// ── Stat Card (Light Glass + Purple Accent) ──
const StatCard = ({ icon: Icon, label, value, tone, helper }) => {
  const tones = {
    purple: { bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.25)', iconBg: 'rgba(168,85,247,0.12)', iconColor: '#9333ea', glow: 'rgba(168,85,247,0.15)' },
    pink:   { bg: 'rgba(236,72,153,0.1)',  border: 'rgba(236,72,153,0.25)', iconBg: 'rgba(236,72,153,0.12)', iconColor: '#db2777', glow: 'rgba(236,72,153,0.15)' },
    indigo: { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.2)',  iconBg: 'rgba(99,102,241,0.12)', iconColor: '#4f46e5', glow: 'rgba(99,102,241,0.12)' },
    cyan:   { bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.2)',   iconBg: 'rgba(6,182,212,0.12)',  iconColor: '#0891b2', glow: 'rgba(6,182,212,0.12)' },
  };
  const t = tones[tone] || tones.purple;

  return (
    <div
      className="group rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default flex flex-col justify-between"
      style={{
        background: `rgba(255,255,255,0.6)`,
        border: `1px solid ${t.border}`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 8px 32px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
      }}
    >
      <div>
        <div
          className="mb-4 grid h-11 w-11 place-items-center rounded-2xl"
          style={{ background: t.iconBg, boxShadow: `0 0 16px ${t.glow}` }}
        >
          <Icon size={20} style={{ color: t.iconColor }} />
        </div>
        <p className="mb-1 text-sm font-semibold" style={{ color: '#64748b' }}>{label}</p>
        <strong className="block text-3xl font-black leading-none" style={{ color: '#1e293b' }}>{value}</strong>
      </div>
      {helper && (
        <span className="mt-4 block text-xs font-medium" style={{ color: '#94a3b8' }}>{helper}</span>
      )}
    </div>
  );
};

// ── Status Pill ──
const StatusPill = ({ status }) => {
  const styles = {
    completed: { bg: 'rgba(16,185,129,0.1)',  color: '#059669', border: 'rgba(16,185,129,0.25)' },
    pending:   { bg: 'rgba(245,158,11,0.12)', color: '#d97706', border: 'rgba(245,158,11,0.3)'  },
  };
  const s = styles[status] || { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'rgba(239,68,68,0.25)' };

  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {status}
    </span>
  );
};

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-lg">
        <p className="font-bold text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-bold text-slate-800">
              {formatter ? formatter(entry.value) : formatNumber(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboardView = ({ dashboard, error, loading, onRetry, timeFilter, setTimeFilter }) => {
  const adminName = getUserName();

  const overview = dashboard?.overview || {};
  const revenueChart = dashboard?.revenueChart || [];
  const userChart = dashboard?.userChart || [];

  const newUsers = [
    { id: 1, name: "Trần Bảo Lâm", role: "instructor", joined: "2 giờ trước", avatar: "https://ui-avatars.com/api/?name=Lam&background=6366f1&color=fff" },
    { id: 2, name: "Nguyễn Thị Mai", role: "student", joined: "4 giờ trước", avatar: "https://ui-avatars.com/api/?name=Mai&background=ec4899&color=fff" },
    { id: 3, name: "Lê Hoàng Phúc", role: "student", joined: "5 giờ trước", avatar: "https://ui-avatars.com/api/?name=Phuc&background=06b6d4&color=fff" },
    { id: 4, name: "Vũ Thanh Vân", role: "instructor", joined: "Hôm qua", avatar: "https://ui-avatars.com/api/?name=Van&background=8b5cf6&color=fff" },
  ];

  const recentTransactions = [
    { id: "TRX-001", user: "Phạm Văn Tuấn", amount: 1500000, status: "completed", type: "Course Purchase", date: "Vừa xong" },
    { id: "TRX-002", user: "Đinh Quỳnh Anh", amount: 450000, status: "pending", type: "Live Class", date: "15 phút trước" },
    { id: "TRX-003", user: "Lý Gia Hân", amount: 2000000, status: "completed", type: "Subscription", date: "1 giờ trước" },
    { id: "TRX-004", user: "Ngô Đức Minh", amount: 750000, status: "failed", type: "Course Purchase", date: "3 giờ trước" },
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-3xl p-6 animate-pulse" style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
          <div className="h-10 w-2/3 rounded-2xl" style={{ background: 'rgba(168,85,247,0.08)' }} />
          <div className="mt-4 h-4 w-1/2 rounded-full" style={{ background: 'rgba(168,85,247,0.06)' }} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-3xl" style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.75)' }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="mx-auto max-w-xl flex flex-col items-center rounded-3xl p-8 text-center" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(239,68,68,0.2)', backdropFilter: 'blur(20px)' }}>
          <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: 'rgba(168,85,247,0.1)' }}>
            <Activity size={24} style={{ color: '#9333ea' }} />
          </div>
          <h2 className="mt-4 text-2xl font-black" style={{ color: '#1e293b' }}>Hệ thống đang bận</h2>
          <p className="mt-2 text-sm leading-6" style={{ color: '#64748b' }}>{error}</p>
          <button
            className="mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30"
            style={{ background: 'linear-gradient(135deg, #a855f7, #d946ef)' }}
            onClick={onRetry}
          >
            <RefreshCw size={16} />
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* ── Hero Banner & Filter ── */}
      <section
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(32px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(168,85,247,0.08)',
        }}
      >
        <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #a855f7 0%, #ec4899 50%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)', color: '#9333ea' }}
          >
            <Shield size={14} />
            System Admin
          </div>
          <h1 className="text-4xl font-black leading-tight md:text-5xl" style={{ color: '#1e293b' }}>
            Trạm điều khiển,{" "}
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {adminName}
            </span> 🛡️
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7" style={{ color: '#64748b' }}>
            Giám sát sức khỏe nền tảng, quản lý người dùng và theo dõi dòng tiền theo thời gian thực.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-sm">
          <Calendar size={18} className="text-slate-400 ml-2" />
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-transparent border-none text-sm font-bold text-slate-700 focus:outline-none cursor-pointer pr-4"
          >
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
          </select>
        </div>
      </section>

      {/* ── Stat Cards ── */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div
          className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-1"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.85) 0%, rgba(217,70,239,0.85) 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(168,85,247,0.25)',
          }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Doanh thu</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md">
                <DollarSign size={14} className="text-white" />
              </div>
            </div>
            <strong className="block text-2xl xl:text-3xl font-black leading-none tracking-tight">
              {formatCurrency(overview.totalRevenue)}
            </strong>
            <div className="mt-4 pt-3 border-t border-white/20 text-xs font-medium text-white/80">
              {timeFilter === 'week' ? 'Tuần' : 'Tháng'} này
            </div>
          </div>
        </div>
        
        <StatCard icon={Users}         label="Người Dùng"     value={formatNumber(overview.totalUsers)}        helper={`Đăng ký mới trong ${timeFilter === 'week' ? 'tuần' : 'tháng'}`} tone="purple" />
        <StatCard icon={GraduationCap} label="Giảng Viên"          value={formatNumber(overview.totalInstructors)}  helper="Đối tác giảng dạy"            tone="pink"   />
        <StatCard icon={BookOpen}      label="Khóa Học"   value={formatNumber(overview.totalCourses)}      helper="Đang hoạt động trên chợ"      tone="indigo" />
        <StatCard icon={Layout}        label="Trả Phí (Pro)"  value={formatNumber(overview.activeSubscriptions)}helper="Gói thành viên"       tone="cyan" />
      </section>

      {/* ── Charts Section ── */}
      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        
        {/* Revenue Area Chart */}
        <div className="rounded-3xl p-5 md:p-6" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: '0 16px 48px rgba(168,85,247,0.06)' }}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-800">Biểu Đồ Doanh Thu</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Xu hướng tăng trưởng dòng tiền</p>
            </div>
            <span className="text-sm font-bold text-emerald-500 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <Activity size={14}/> +12.5%
            </span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(val) => `${val / 1000000}M`} />
                <Tooltip content={<CustomTooltip formatter={(val) => formatCurrency(val)} />} />
                <Area type="monotone" dataKey="value" name="Doanh thu" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Bar Chart */}
        <div className="rounded-3xl p-5 md:p-6" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: '0 16px 48px rgba(236,72,153,0.06)' }}>
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-800">Lượng Người Dùng</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Đăng ký mới theo {timeFilter === 'week' ? 'ngày' : 'tháng'}</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userChart} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="students" name="Học viên" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="instructors" name="Giảng viên" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── Bottom Grid ── */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)]">

        {/* Recent Transactions */}
        <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(168,85,247,0.06)' }}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(168,85,247,0.12)', color: '#9333ea', border: '1px solid rgba(168,85,247,0.25)' }}>
                Tài Chính
              </span>
              <h2 className="mt-3 text-2xl font-black" style={{ color: '#1e293b' }}>Giao dịch gần đây</h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: 'rgba(168,85,247,0.12)', boxShadow: '0 0 12px rgba(168,85,247,0.15)' }}>
              <CreditCard size={18} style={{ color: '#9333ea' }} />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white/40">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Mã GD</th>
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Sản phẩm</th>
                  <th className="py-3 px-4 text-right">Số tiền</th>
                  <th className="py-3 px-4 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {recentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 text-xs font-bold text-slate-400">{trx.id}</td>
                    <td className="py-3 px-4 font-bold text-sm text-slate-800">{trx.user}</td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-500">{trx.type}</td>
                    <td className="py-3 px-4 text-right font-black text-slate-800 text-sm">{formatCurrency(trx.amount)}</td>
                    <td className="py-3 px-4 text-center"><StatusPill status={trx.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Users */}
        <aside className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(236,72,153,0.06)' }}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(236,72,153,0.12)', color: '#db2777', border: '1px solid rgba(236,72,153,0.25)' }}>
                Nhân Sự
              </span>
              <h2 className="mt-3 text-2xl font-black" style={{ color: '#1e293b' }}>Người dùng mới</h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: 'rgba(236,72,153,0.12)', boxShadow: '0 0 12px rgba(236,72,153,0.15)' }}>
              <UserCheck size={18} style={{ color: '#db2777' }} />
            </div>
          </div>

          <div className="space-y-3">
            {newUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-3 rounded-2xl transition-all border border-transparent hover:border-pink-100 hover:bg-pink-50/30 hover:shadow-sm"
              >
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm">{user.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${user.role === 'instructor' ? 'bg-indigo-100 text-indigo-700' : 'bg-cyan-100 text-cyan-700'}`}>
                      {user.role}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{user.joined}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-pink-100 hover:text-pink-600 transition-colors">
                  <UserCheck size={14} />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default AdminDashboardView;
