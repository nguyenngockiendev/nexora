import { BookOpen, Image as ImageIcon, DollarSign, Tag, Play, ArrowLeft, Plus, Type, Loader2, CheckCircle } from "lucide-react";

const CreateCourese = ({
  register,
  handleSubmit,
  error,
  navigate,
  onSubmit,
  setThumbnail,
  loading,
  onConfirm,
  onCancel,
  exits,
}) => {
  return (
    <div className="py-10">
      <div 
        className="max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(249,115,22,0.15)]"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.9))', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}
      >
        <div className="p-10 md:p-14">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black mb-3 text-slate-800">Create New Course</h1>
            <p className="text-lg font-medium text-slate-500">
              Design, build, and publish your world-class learning content
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-red-50/80 border border-red-200 text-red-600 font-bold flex items-center justify-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Title */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <Type size={16} className="text-orange-500" /> Course Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a compelling course title..."
                  autoComplete="title"
                  {...register("title", { required: true })}
                  className="w-full glass-input px-6 py-4 rounded-2xl text-lg font-medium"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={16} className="text-orange-500" /> Description
                </label>
                <textarea
                  rows={4}
                  placeholder="What will students learn in this course?"
                  {...register("description", { required: true })}
                  className="w-full glass-input px-6 py-4 rounded-2xl text-base font-medium resize-none"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign size={16} className="text-orange-500" /> Course Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold">$</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    autoComplete="price"
                    {...register("price", { required: true })}
                    className="w-full glass-input pl-10 pr-6 py-4 rounded-2xl text-lg font-medium"
                  />
                </div>
              </div>

              {/* Course Level */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <Tag size={16} className="text-orange-500" /> Course Level
                </label>
                <select
                  {...register("level", { required: true })}
                  className="w-full glass-input px-6 py-4 rounded-2xl text-base font-medium appearance-none"
                >
                  <option value="">Select level...</option>
                  <option value="beginner">Beginner - Start from scratch</option>
                  <option value="intermediate">Intermediate - Build on basics</option>
                  <option value="advanced">Advanced - Master the subject</option>
                </select>
              </div>

              {/* Course Type */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <Play size={16} className="text-orange-500" /> Course Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer relative">
                    <input type="radio" value="live" {...register("type", { required: true })} className="peer sr-only" />
                    <div className="p-4 rounded-2xl border-2 border-white bg-white/50 text-center font-bold text-slate-500 transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600 hover:bg-white">
                      Live Classes
                    </div>
                  </label>
                  <label className="cursor-pointer relative">
                    <input type="radio" value="recorded" {...register("type", { required: true })} className="peer sr-only" />
                    <div className="p-4 rounded-2xl border-2 border-white bg-white/50 text-center font-bold text-slate-500 transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600 hover:bg-white">
                      Recorded Videos
                    </div>
                  </label>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon size={16} className="text-orange-500" /> Thumbnail Image
                </label>
                <label className="relative flex flex-col items-center justify-center w-full h-48 rounded-3xl border-2 border-dashed transition-all hover:bg-white/60 cursor-pointer"
                       style={{ borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(255,255,255,0.4)' }}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-14 h-14 mb-3 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center shadow-inner">
                      <ImageIcon size={28} />
                    </div>
                    <p className="mb-2 text-sm font-bold text-slate-600">Click to upload thumbnail</p>
                    <p className="text-xs font-medium text-slate-400">PNG, JPG or WEBP (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </label>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/50 mt-10">
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all hover:bg-white text-slate-600"
                style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.8)' }}
              >
                <ArrowLeft size={20} /> Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-[2] flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/30 disabled:opacity-70 disabled:hover:scale-100"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
              >
                {loading ? (
                  <><Loader2 className="animate-spin" size={24} /> Creating Course...</>
                ) : (
                  <><Plus size={24} /> Create Course</>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* ── Exits Modal (Create Live Class Prompt) ── */}
      {exits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40">
          <div 
            className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9))', border: '1px solid rgba(255,255,255,1)' }}
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-500 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle size={40} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">Course Created!</h3>
              <p className="text-slate-500 font-medium mb-8">
                Your live course framework is ready. Would you like to schedule your first Live Class session now?
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => onCancel()}
                  className="flex-1 py-3.5 rounded-xl font-bold transition-all hover:bg-slate-100 text-slate-600 border border-slate-200"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => onConfirm()}
                  className="flex-1 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-emerald-500/25"
                  style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}
                >
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourese;
