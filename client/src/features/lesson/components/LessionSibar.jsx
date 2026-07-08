import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Circle, PlayCircle, ArrowLeft, Plus, Loader2, ListVideo, Lock } from "lucide-react";

const SidebarLesson = ({
  loading,
  error,
  title,
  currentLesson,
  setCurrentLesson,
  id,
  role,
  exits,
  process,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white/40 backdrop-blur-3xl overflow-hidden p-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none" />
      
      {/* ── Header ── */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
            <ListVideo size={20} />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-800">Course Lessons</h4>
            <p className="text-sm font-bold text-slate-500">Manage your learning path</p>
          </div>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="relative z-10 flex flex-col gap-3 mb-6">
        {role !== "student" && (
          <Link to={`/create_lession/${id}`}>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
              <Plus size={18} /> Create New Lesson
            </button>
          </Link>
        )}

        <button 
          onClick={() => navigate("/courses")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-orange-500 transition-colors shadow-sm"
        >
          <ArrowLeft size={16} /> Back To Courses
        </button>
      </div>

      {/* ── Loading & Error ── */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-10 text-orange-500 gap-3">
          <Loader2 className="animate-spin" size={28} />
          <p className="text-sm font-bold">Loading lessons...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold mb-4">
          {error}
        </div>
      )}

      {/* ── Lesson Count ── */}
      {!loading && !error && (
        <div className="relative z-10 mb-4 flex items-center justify-between">
          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">
            Syllabus
          </span>
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 shadow-sm">
            {title?.length || 0} Lessons
          </span>
        </div>
      )}

      {/* ── Lesson List ── */}
      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar -mr-4 pr-4 pb-10 space-y-3">
        {title?.map((titl, index) => {
          const isActive = currentLesson?._id === titl?._id;
          const isCompleted = process?.lessonId === titl?._id;
          
          return (
            <div
              key={titl._id}
              onClick={() => setCurrentLesson(titl)}
              className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive 
                  ? 'bg-white border-orange-500 shadow-[0_10px_30px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/50 scale-[1.02]' 
                  : 'bg-white/60 border-white hover:bg-white hover:border-slate-200 hover:shadow-md'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-amber-500" />
              )}
              
              <div className="flex items-start gap-3">
                
                {/* Status Icon */}
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  ) : isActive ? (
                    <PlayCircle size={20} className="text-orange-500 animate-pulse" />
                  ) : titl?.isPreview ? (
                    <Circle size={20} className="text-slate-300 group-hover:text-orange-300 transition-colors" />
                  ) : (
                    <Lock size={18} className="text-slate-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h5 className={`font-bold text-sm truncate ${isActive ? 'text-orange-600' : 'text-slate-700 group-hover:text-orange-500'}`}>
                      {index + 1}. {titl?.title}
                    </h5>
                    {titl?.isPreview && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-md text-[10px] font-black uppercase tracking-wider">
                        Free
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <PlayCircle size={12} /> {titl?.duration || "10 mins"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className={isCompleted ? "text-emerald-500" : ""}>
                      {isCompleted ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarLesson;
