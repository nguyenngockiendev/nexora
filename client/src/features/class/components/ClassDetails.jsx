import { ArrowLeft, Search, UserX, UserPlus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const ClassDetails = ({ liststudents, handremoveStudent }) => {
  return (
    <div className="space-y-8 pb-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-black mb-1 text-slate-800">Removed Students</h3>
          <p className="text-sm font-medium text-slate-500">
            Manage students who have been removed from this class
          </p>
        </div>

        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all hover:bg-white hover:-translate-x-1 hover:shadow-md text-slate-600"
          style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}
        >
          <ArrowLeft size={18} /> Back to Class
        </button>
      </div>

      {/* ── Removed Student List ── */}
      <div className="rounded-[2rem] overflow-hidden"
           style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
        
        {/* Table Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b border-white/50" style={{ background: 'rgba(255,255,255,0.4)' }}>
          <h5 className="text-xl font-bold text-slate-800">Inactive Roster</h5>
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input type="text" placeholder="Search by name or email..." className="w-full glass-input pl-11 py-3 text-sm rounded-xl" />
          </div>
        </div>

        {/* Table Header (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 px-8 border-b border-white/30 text-xs font-bold uppercase tracking-wider text-slate-400">
          <div className="col-span-4">Student Info</div>
          <div className="col-span-4">Email Address</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {liststudents?.studentinactive?.length > 0 ? (
            liststudents?.studentinactive?.map((item) => (
              <div key={item._id} className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 px-8 border-b border-white/20 transition-colors hover:bg-white/60">
                
                {/* Avatar & Name */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                  <div className="relative opacity-70 group-hover:opacity-100 transition-opacity">
                    <img src={item?.userId?.avatar || `https://ui-avatars.com/api/?name=${item?.userId?.name}&background=random`} alt={item?.userId?.name} 
                         className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white grayscale group-hover:grayscale-0 transition-all" />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-rose-400 border-2 border-white rounded-full shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-800 m-0 leading-tight">{item?.userId?.name}</h6>
                    <span className="text-xs font-medium text-slate-500 md:hidden">{item?.userId?.email}</span>
                  </div>
                </div>

                {/* Email (Hidden on Mobile) */}
                <div className="hidden md:block col-span-4 text-sm font-medium text-slate-600 truncate">
                  {item?.userId?.email}
                </div>

                {/* Status */}
                <div className="col-span-1 text-left md:text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: 'rgba(225,29,72,0.1)', color: '#e11d48', border: '1px solid rgba(225,29,72,0.2)' }}>
                    {item?.status || 'Removed'}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end gap-2 mt-3 md:mt-0">
                  <button onClick={() => handremoveStudent(item)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-emerald-50 hover:text-emerald-600 text-slate-500"
                          style={{ border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.5)' }}>
                    <UserPlus size={16} /> Restore
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500">
              <UserX size={48} className="mb-4 opacity-30" />
              <p className="text-lg font-bold text-slate-600">No removed students.</p>
              <p className="text-sm">There are no students who have been removed from this class.</p>
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        <div className="flex justify-between items-center p-6 border-t border-white/50" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <span className="text-sm font-medium text-slate-500">Showing {liststudents?.studentinactive?.length || 0} students</span>
          <div className="flex gap-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-white text-slate-500" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-white text-slate-500">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClassDetails;
