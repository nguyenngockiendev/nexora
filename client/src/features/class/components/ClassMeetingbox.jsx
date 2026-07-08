import { ArrowLeft, Video, Calendar, Users, Activity, FileText, CheckCircle, Info, Clock, PlayCircle } from "lucide-react";

const ClassRoom = ({ classs, navigate }) => {
  return (
    <div className="space-y-8 pb-10">
      
      {/* ── Hero Banner (Join Meeting) ── */}
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(249,115,22,0.15)]"
           style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.95))', border: '1px solid rgba(255,255,255,0.9)' }}>
        
        {/* Background Decorative Blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 backdrop-blur-xl">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Live Session Ready
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 text-slate-800 leading-tight">
              {classs?.className || 'React Bootcamp - Live Class'}
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-xl">
              You are currently enrolled in this class. Your live session is ready to begin.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => window.open(classs?.meetingLink, "_blank")}
              className="group relative flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-white text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(249,115,22,0.4)]"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
            >
              <div className="absolute inset-0 rounded-2xl border-2 border-white/20" />
              {/* Radar Pulse Effect */}
              <div className="absolute inset-0 rounded-2xl bg-orange-500 opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              
              <Video className="w-8 h-8 group-hover:rotate-12 transition-transform" /> 
              <span>Join Google Meet</span>
            </button>
            <span className="text-sm font-bold text-slate-400">Click to enter virtual classroom</span>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Teacher Profile Card */}
          <div className="p-8 rounded-[2rem] transition-all hover:shadow-xl hover:shadow-orange-500/5 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden"
               style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent opacity-50 rounded-bl-[100px]" />
            
            <img 
              src={classs?.instructorId?.avatar || 'https://ui-avatars.com/api/?name=Teacher&background=random'} 
              alt="Instructor" 
              className="w-28 h-28 rounded-3xl object-cover shadow-lg border-4 border-white"
            />
            <div className="text-center sm:text-left flex-1 z-10">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg mb-2 uppercase tracking-wide">Course Instructor</span>
              <h3 className="text-2xl font-black text-slate-800 mb-1">{classs?.instructorId?.name || 'Instructor Name'}</h3>
              <p className="text-slate-500 font-medium mb-4">Senior Developer & Educator</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-sm font-semibold border border-orange-100">8 Years Experience</span>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold border border-blue-100">Top Rated</span>
              </div>
            </div>
          </div>

          {/* Class Info Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}>
              <Activity className="text-emerald-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
              <div className="inline-flex items-center justify-center px-2 py-1 rounded bg-emerald-100 text-emerald-600 text-xs font-bold border border-emerald-200 uppercase">
                {classs?.status || 'Active'}
              </div>
            </div>
            <div className="p-5 rounded-3xl" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}>
              <Users className="text-blue-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Students</p>
              <h4 className="text-xl font-black text-slate-800">{classs?.currentStudents || 0} / {classs?.maxStudents || 0}</h4>
            </div>
            <div className="p-5 rounded-3xl" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}>
              <Calendar className="text-orange-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</p>
              <h4 className="text-base font-bold text-slate-800">{classs?.startDate || 'N/A'}</h4>
            </div>
            <div className="p-5 rounded-3xl" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}>
              <CheckCircle className="text-rose-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">End Date</p>
              <h4 className="text-base font-bold text-slate-800">{classs?.endDate || 'N/A'}</h4>
            </div>
          </div>

          {/* Materials List */}
          <div className="p-8 rounded-[2rem]" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-800">Class Materials</h3>
            </div>

            <div className="space-y-3">
              {/* Material Item */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white cursor-pointer" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 mb-0.5">React Basics Notes.pdf</h5>
                  <p className="text-xs font-medium text-slate-500">2.4 MB • PDF Document</p>
                </div>
              </div>
              {/* Material Item */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white cursor-pointer" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 mb-0.5">Homework Assignment #1</h5>
                  <p className="text-xs font-medium text-slate-500">Word Document</p>
                </div>
              </div>
              {/* Video Item */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white cursor-pointer" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <PlayCircle size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 mb-0.5">Recording Session 1</h5>
                  <p className="text-xs font-medium text-slate-500 text-purple-500">Processing...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <button 
            onClick={() => navigate("/courses")}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all hover:bg-white hover:-translate-y-1 hover:shadow-lg text-slate-600 mb-2"
            style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.8)' }}
          >
            <ArrowLeft size={18} /> Back to My Classes
          </button>

          {/* Schedule Card */}
          <div className="p-6 rounded-[2rem]" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)' }}>
            <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="text-orange-500" size={20} /> Weekly Schedule
            </h4>
            <div className="p-4 rounded-2xl bg-white/50 border border-white">
              <div className="font-bold text-slate-800 mb-1">{classs?.schedule?.day || 'Monday'}</div>
              <div className="text-slate-500 font-medium flex items-center gap-2">
                <Clock size={14} /> {classs?.schedule?.startTime || '19:00'} - {classs?.schedule?.endTime || '21:00'}
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="p-6 rounded-[2rem]" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)' }}>
            <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Info className="text-blue-500" size={20} /> Class Features
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="text-orange-500 mt-0.5">•</span> Live interactive class
              </li>
              <li className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="text-orange-500 mt-0.5">•</span> Real-time Q&A
              </li>
              <li className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="text-orange-500 mt-0.5">•</span> Recording available after session
              </li>
              <li className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="text-orange-500 mt-0.5">•</span> Certificate on completion
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClassRoom;
