import { ArrowLeft, BookOpen, Clock, GraduationCap, PlayCircle, Receipt, User, Video, ShieldCheck } from "lucide-react";

const formatCurrency = (value) => Number(value || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
const formatDate = (dateString) => new Date(dateString).toLocaleDateString("vi-VN");

const StatCard = ({ icon: Icon, label, value, tone }) => {
  const tones = {
    blue:   { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)', iconBg: 'rgba(59,130,246,0.12)', iconColor: '#2563eb', glow: 'rgba(59,130,246,0.15)' },
    green:  { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)',  iconBg: 'rgba(16,185,129,0.12)', iconColor: '#059669', glow: 'rgba(16,185,129,0.12)' },
    orange: { bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.2)',  iconBg: 'rgba(249,115,22,0.12)', iconColor: '#ea580c', glow: 'rgba(249,115,22,0.12)' },
  };
  const t = tones[tone] || tones.blue;

  return (
    <div
      className="group rounded-3xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `rgba(255,255,255,0.6)`,
        border: `1px solid ${t.border}`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 8px 32px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="grid h-14 w-14 place-items-center rounded-2xl transition-transform group-hover:scale-110"
          style={{ background: t.iconBg, boxShadow: `0 0 16px ${t.glow}` }}
        >
          <Icon size={24} style={{ color: t.iconColor }} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <strong className="block text-3xl font-black text-slate-800 leading-tight">{value}</strong>
        </div>
      </div>
    </div>
  );
};

const DetailsUSer = ({ loading, error, userlist, numberErrolments, totalOrder, numberlive }) => {
  
  if (loading) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-slate-500">Đang tải hồ sơ học viên...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 text-center text-rose-500 bg-rose-50 rounded-2xl border border-rose-200 m-4">
      <h3 className="font-bold mb-2">Lỗi tải dữ liệu</h3>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 text-blue-600 text-xs font-black uppercase tracking-wider border border-blue-200/50 mb-2">
            <User size={14} /> Student Profile
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800">Chi tiết học viên</h1>
          <p className="text-slate-500 font-medium">Xem thông tin, khóa học và lịch sử thanh toán</p>
        </div>
        
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm self-start sm:self-auto">
          <ArrowLeft size={18} /> Quay lại
        </button>
      </div>

      {/* ── Profile Card ── */}
      <div className="rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="h-32 md:h-40 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="px-6 pb-6 md:px-10 md:pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20 mb-6">
            <div className="relative">
              <img
                src={userlist?.user?.avata || "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"}
                alt="Avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-xl bg-white"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-sm" title="Online"></div>
            </div>
            
            <div className="text-center md:text-left flex-1 mb-2">
              <h2 className="text-3xl font-black text-slate-800 mb-1">{userlist?.user?.name || "Học viên vô danh"}</h2>
              <p className="text-slate-500 font-medium mb-3">{userlist?.user?.email}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                  <GraduationCap size={14} /> Học viên
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${userlist?.status === 'active' || userlist?.status ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'} capitalize`}>
                  <ShieldCheck size={14} /> {userlist?.status || "Hoạt động"}
                </span>
                <span className="text-xs font-bold text-slate-400 ml-2">
                  Tham gia: 22/03/2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={BookOpen} label="Tổng khóa học" value={numberErrolments || 0} tone="blue" />
        <StatCard icon={Receipt} label="Tổng đơn hàng" value={totalOrder || 0} tone="green" />
        <StatCard icon={Video} label="Khóa Live Class" value={numberlive || 0} tone="orange" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* ── Learning History ── */}
        <div className="rounded-[2rem] p-6 bg-white/70 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col h-full">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest bg-blue-100/50 text-blue-600 border border-blue-200/50">
                Learning
              </span>
              <h2 className="mt-2 text-xl font-black text-slate-800">Khóa học đã đăng ký</h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-blue-500">
              <BookOpen size={18} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {(!userlist?.finalresult || userlist.finalresult.length === 0) ? (
              <div className="flex flex-col items-center justify-center p-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl h-40">
                <p className="font-bold">Chưa có khóa học nào</p>
              </div>
            ) : (
              userlist.finalresult.map((item) => (
                <div key={item._id} className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all group">
                  <img
                    src={item?.thumbnail || "https://via.placeholder.com/150"}
                    alt={item?.title}
                    className="w-20 h-14 object-cover rounded-xl border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 truncate group-hover:text-blue-600 transition-colors">{item?.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-100 text-slate-500">{item?.type || 'Course'}</span>
                      <span className="text-xs font-semibold text-slate-400 truncate">{item?.description || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right hidden sm:block">
                    <div className="text-sm font-black text-slate-700">{formatCurrency(item?.coursePrice)}</div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full inline-block mt-1 ${item?.status === 'active' || item?.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                      {item?.status || 'Active'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Order History ── */}
        <div className="rounded-[2rem] p-6 bg-white/70 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col h-full">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest bg-emerald-100/50 text-emerald-600 border border-emerald-200/50">
                Billing
              </span>
              <h2 className="mt-2 text-xl font-black text-slate-800">Lịch sử giao dịch</h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Receipt size={18} />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {(!userlist?.order || userlist.order.length === 0) ? (
              <div className="flex flex-col items-center justify-center p-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl h-40">
                <p className="font-bold">Chưa có giao dịch nào</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pl-2">Mã ĐH</th>
                    <th className="pb-3">Loại</th>
                    <th className="pb-3 text-right">Số tiền</th>
                    <th className="pb-3 text-center">Trạng thái</th>
                    <th className="pb-3 text-right pr-2">Ngày</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userlist.order.map((item) => {
                    const isLive = item?.classId != null;
                    return (
                      <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pl-2 font-bold text-sm text-slate-700">ORD-{item._id?.substring(0, 4)?.toUpperCase() || '00'}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${isLive ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                            {isLive ? <Video size={12}/> : <PlayCircle size={12}/>}
                            {isLive ? "Live" : "Recorded"}
                          </span>
                        </td>
                        <td className="py-4 text-right font-black text-sm text-slate-800">{formatCurrency(item?.price)}</td>
                        <td className="py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            item?.status === "completed" ? "bg-emerald-100 text-emerald-700" : 
                            item?.status === "pending" ? "bg-amber-100 text-amber-700" : 
                            "bg-rose-100 text-rose-700"
                          }`}>
                            {item?.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="py-4 pr-2 text-right text-xs font-semibold text-slate-500">{formatDate(item.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsUSer;
