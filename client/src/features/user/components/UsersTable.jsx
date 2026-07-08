import { Search, Shield, ShieldOff, Eye, ChevronLeft, ChevronRight, CheckCircle, Ban, GraduationCap, Crown, User as UserIcon } from "lucide-react";

const UserTable = ({
  loading,
  error,
  userlist,
  navigate,
  handleChangeStatus,
}) => {
  return (
    <div className="space-y-6 pb-10">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">User Management</h2>
          <p className="text-slate-500 font-medium">Manage all students and instructors in your system</p>
        </div>
      </div>

      {loading && <div className="text-orange-500 font-bold animate-pulse">Loading users...</div>}
      {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold">{error}</div>}

      {/* ── Glass Filter Bar ── */}
      <div 
        className="p-4 md:p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium bg-white/50 border border-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* Role Tabs */}
          <div className="md:col-span-3 flex p-1.5 rounded-2xl bg-white/40 border border-white">
            <button className="flex-1 py-2 rounded-xl text-sm font-bold bg-white text-orange-600 shadow-sm">
              Student
            </button>
            <button className="flex-1 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
              Instructor
            </button>
          </div>

          {/* Status Select */}
          <div className="md:col-span-2">
            <select className="w-full px-4 py-3.5 rounded-2xl text-sm font-bold bg-white/50 border border-white focus:bg-white focus:outline-none appearance-none text-slate-600 cursor-pointer">
              <option>All Status</option>
              <option>Active</option>
              <option>Banned</option>
            </select>
          </div>

          {/* Reset */}
          <div className="md:col-span-2">
            <button className="w-full py-3.5 rounded-2xl text-sm font-bold text-slate-600 border border-slate-200 hover:bg-white transition-all">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* ── Modern Grid Table ── */}
      <div 
        className="rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}
      >
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 p-6 border-b border-white/50 bg-white/40 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">User Details</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Stats</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/50">
          {userlist?.map((item) => (
            <div key={item._id} className="group grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 items-center transition-all hover:bg-white/60">
              
              {/* User Details */}
              <div className="col-span-1 lg:col-span-4 flex items-center gap-4">
                <div className="relative">
                  <img
                    src={item?.avatar || 'https://ui-avatars.com/api/?name=' + (item?.name || 'User') + '&background=random'}
                    alt={item?.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                  />
                  {item.status === 'active' ? (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                  ) : (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{item?.name || 'Unknown User'}</h4>
                  <p className="text-sm font-medium text-slate-500">{item?.email}</p>
                </div>
              </div>

              {/* Role */}
              <div className="col-span-1 lg:col-span-2 flex items-center">
                {item?.role === 'instructor' ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 text-purple-600 text-xs font-bold uppercase border border-purple-200">
                    <Crown size={14} /> Instructor
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 text-blue-600 text-xs font-bold uppercase border border-blue-200">
                    <GraduationCap size={14} /> Student
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="col-span-1 lg:col-span-2 flex items-center">
                {item?.status === 'active' ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 uppercase">
                    <CheckCircle size={14} /> Active
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 uppercase">
                    <Ban size={14} /> Banned
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="col-span-1 lg:col-span-2">
                <div className="text-sm font-bold text-slate-700">{item.totalcourse || 0} Courses</div>
                <div className="text-xs font-medium text-slate-400">Joined: {item.joid || 'N/A'}</div>
              </div>

              {/* Actions */}
              <div className="col-span-1 lg:col-span-2 flex items-center justify-start lg:justify-end gap-2">
                
                <button
                  onClick={() => navigate(`details/${item._id}`)}
                  className="w-10 h-10 rounded-xl bg-white text-slate-400 border border-slate-200 flex items-center justify-center transition-all hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200"
                  title="View Details"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() => handleChangeStatus(item)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                    item.status === 'active'
                      ? 'bg-white text-slate-400 border-slate-200 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200'
                      : 'bg-white text-slate-400 border-slate-200 hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-200'
                  }`}
                  title={item.status === 'active' ? "Ban User" : "Unban User"}
                >
                  {item.status === 'active' ? <ShieldOff size={18} /> : <Shield size={18} />}
                </button>
              </div>

            </div>
          ))}

          {/* Empty State */}
          {userlist?.length === 0 && !loading && (
            <div className="p-10 text-center text-slate-500 font-medium">
              No users found.
            </div>
          )}
        </div>
      </div>

      {/* ── Pagination ── */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
        <span className="text-sm font-bold text-slate-500">
          Showing <span className="text-slate-800">1 - 10</span> of <span className="text-slate-800">120</span> users
        </span>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-colors disabled:opacity-50">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 rounded-xl bg-orange-500 text-white font-black shadow-md shadow-orange-500/20">1</button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">2</button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">3</button>
          </div>

          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-colors disabled:opacity-50">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserTable;
