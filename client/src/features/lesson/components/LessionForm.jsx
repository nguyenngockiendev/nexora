import { Link, useNavigate } from "react-router-dom";
import { PlayCircle, FileText, Download, Edit, Trash2, ShieldQuestion, FileQuestion, BookOpen, AlertCircle } from "lucide-react";

const LessionForm = ({
  currentLesson,
  handDelete,
  errorlession,
  loadinglession,
  role,
  videoRef,
  onplay,
  onpause,
  process,
}) => {
  const navigate = useNavigate();
  
  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-full min-h-[70vh]">
        <div className="text-center p-10 bg-white/40 backdrop-blur-3xl rounded-[2rem] border border-white shadow-xl max-w-sm">
          <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} />
          </div>
          <h4 className="text-2xl font-black text-slate-800 mb-2">No Lesson Selected</h4>
          <p className="text-slate-500 font-medium">Please select a lesson from the syllabus sidebar to begin learning.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-10 w-full max-w-6xl mx-auto">
      
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/70 backdrop-blur-2xl p-6 rounded-[2rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div>
          <div className="flex items-center gap-3 mb-1">
            {currentLesson?.isPreview && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-xs font-black uppercase tracking-wider border border-emerald-200">
                Preview
              </span>
            )}
            <span className="text-sm font-bold text-orange-500">Current Lesson</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800">{currentLesson?.content || 'Lesson Content'}</h2>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {role !== "student" ? (
            <>
              <Link to={`/update_lession/${currentLesson._id}`}>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">
                  <Edit size={16} /> Edit
                </button>
              </Link>

              <button 
                onClick={() => handDelete(currentLesson._id)}
                disabled={loadinglession}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-500 hover:text-white transition-colors shadow-sm disabled:opacity-50"
              >
                <Trash2 size={16} /> {loadinglession ? "Deleting..." : "Delete"}
              </button>

              <button 
                onClick={() => navigate(`/create_quizz/lession/${currentLesson?._id}/course/${currentLesson?.courseId}`)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black text-white shadow-md shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-purple-500 to-indigo-500"
              >
                <ShieldQuestion size={16} /> {currentLesson?.QuizExits ? "Update Quiz" : "Create Quiz"}
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate(`/quizz/lession/${currentLesson._id}`)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-orange-500 to-amber-500"
            >
              <FileQuestion size={18} /> Take Quiz
            </button>
          )}
        </div>
      </div>

      {/* ── Cinematic Video Player ── */}
      <div className="relative group rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl ring-1 ring-slate-900/5 aspect-video flex items-center justify-center">
        <video
          ref={videoRef}
          key={currentLesson?._id}
          controls
          className="w-full h-full object-contain"
          onLoadedMetadata={() => {
            if (process) {
              videoRef.current.currentTime = process.lastPosition || 0;
            }
          }}
          onPlay={onplay}
          onPause={onpause}
        >
          <source src={currentLesson?.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Glow behind video when paused/stopped can be added here, but object-contain is fine */}
      </div>

      {/* ── Resources Bento Grid ── */}
      <div className="bg-white/70 backdrop-blur-2xl p-6 rounded-[2rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <h5 className="text-xl font-black text-slate-800">Lesson Resources</h5>
          </div>
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 shadow-sm">
            {currentLesson?.resources?.length || 0} Files
          </span>
        </div>

        {currentLesson?.resources?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentLesson?.resources?.map((src) => (
              <div 
                key={src.id}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-700 text-sm mb-0.5 line-clamp-1">{src?.title}</h6>
                    <p className="text-xs font-medium text-slate-400">PDF Resource</p>
                  </div>
                </div>

                <a href={src?.url} download className="flex-shrink-0">
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 shadow-sm transition-colors active:scale-90">
                    <Download size={18} />
                  </button>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-3 bg-white/40 rounded-2xl border border-dashed border-slate-200">
            <FileText size={32} className="opacity-50" />
            <p className="text-sm font-medium">No resources available for this lesson.</p>
          </div>
        )}
      </div>

      {/* ── Error Display ── */}
      {errorlession && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold mt-2">
          <AlertCircle size={20} /> {errorlession}
        </div>
      )}

    </div>
  );
};

export default LessionForm;
