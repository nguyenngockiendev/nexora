import { useState, useRef } from "react";
import {
  Video,
  FileText,
  Sparkles,
  Play,
  Upload,
  CheckCircle2,
  X,
  ArrowLeft,
  BookOpen,
  Paperclip,
  Loader2,
  FileCode,
  Bold,
  Italic,
  Strikethrough,
  Link2,
  Check,
} from "lucide-react";

const CreateLession = ({
  navigate,
  register,
  handleSubmit,
  onSubmit,
  resource,
  setResource,
  loading,
  setVideoFile,
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const videoInputRef = useRef(null);
  const resourceInputRef = useRef(null);

  const handleVideoChange = (file) => {
    if (file) {
      setSelectedVideo(file);
      setVideoFile(file);
    }
  };

  const handleResourceChange = (file) => {
    if (file) {
      setResource({
        ...resource,
        title: file.name,
        url: file,
      });
    }
  };

  const removeVideo = (e) => {
    e.stopPropagation();
    setSelectedVideo(null);
    setVideoFile(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const removeResource = (e) => {
    e.stopPropagation();
    setResource({
      ...resource,
      title: "",
      url: "",
    });
    if (resourceInputRef.current) resourceInputRef.current.value = "";
  };

  return (
    <div className="w-full space-y-8 pb-16">
      <div
        className="w-full rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative overflow-hidden transition-all"
        style={{
          background: "rgba(255, 255, 255, 0.82)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 20px 50px rgba(194, 110, 30, 0.08)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 border-b border-amber-200/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner flex-shrink-0">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Tạo Bài Học Mới
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                Thêm nội dung bài học mới, video bài giảng và tài liệu học tập
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white/90 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <ArrowLeft size={15} />
            <span>Quay lại giáo trình</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 mt-8">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span>Tiêu đề bài học</span>
              <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-[11px] font-black flex items-center justify-center">
                1
              </span>
              <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tiêu đề bài học (VD: Giới thiệu tổng quan...)"
                required
                {...register("title")}
                className="w-full px-5 py-4 rounded-2xl text-base sm:text-lg font-bold text-slate-900 placeholder-slate-400 bg-white/90 border-2 border-orange-400/90 shadow-[0_0_20px_rgba(249,115,22,0.12)] outline-none transition-all focus:ring-4 focus:ring-orange-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex items-center justify-between p-5 rounded-2xl sm:rounded-3xl bg-white/90 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all">
              <div className="flex items-center gap-4 min-w-0 pr-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100/90 border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs flex-shrink-0">
                  <Play size={20} className="fill-slate-700 text-slate-700" />
                </div>
                <div className="truncate min-w-0">
                  <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    Cho phép học thử miễn phí
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    Cho phép học viên xem trước bài học này mà không cần mua
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  {...register("isPreview")}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-sm peer-checked:bg-gradient-to-r peer-checked:from-amber-400 peer-checked:to-orange-500 peer-checked:shadow-md peer-checked:shadow-orange-500/30"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-5 rounded-2xl sm:rounded-3xl bg-white/90 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all">
              <div className="flex items-center gap-4 min-w-0 pr-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs flex-shrink-0">
                  <Sparkles size={20} />
                </div>
                <div className="truncate min-w-0">
                  <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    Tự động tạo phụ đề bằng AI
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    Tự động nhận diện giọng nói và bóc tách phụ đề video bằng AI
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  value="PROCESSING"
                  {...register("status")}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-sm peer-checked:bg-gradient-to-r peer-checked:from-amber-400 peer-checked:to-orange-500 peer-checked:shadow-md peer-checked:shadow-orange-500/30"></div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="flex flex-col space-y-2">
              <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Video size={16} className="text-orange-500" />
                <span>Tải lên video bài học</span>
                <span className="text-orange-500">*</span>
              </label>

              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                required={!selectedVideo}
                className="hidden"
                onChange={(e) => handleVideoChange(e.target.files[0])}
              />

              <div
                onClick={() => videoInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingVideo(true);
                }}
                onDragLeave={() => setIsDraggingVideo(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingVideo(false);
                  handleVideoChange(e.dataTransfer.files[0]);
                }}
                className={`flex-1 min-h-[260px] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2 border-dashed ${
                  isDraggingVideo
                    ? "border-orange-500 bg-orange-50/80 scale-[1.01]"
                    : selectedVideo
                    ? "border-emerald-400/90 bg-emerald-50/50"
                    : "border-slate-300/90 bg-white/80 hover:bg-white hover:border-orange-400 hover:shadow-sm"
                } shadow-xs`}
              >
                {selectedVideo ? (
                  <div className="space-y-3.5 w-full max-w-sm mx-auto">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="truncate">
                      <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                        {selectedVideo.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {(selectedVideo.size / (1024 * 1024)).toFixed(1)} MB • Tệp video đã sẵn sàng
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={removeVideo}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all cursor-pointer"
                      >
                        <X size={13} />
                        <span>Xóa video</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-500/30">
                      <Upload size={28} />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-900">
                        Tải lên video
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Kéo thả hoặc click để chọn tệp
                      </p>
                      <span className="inline-block mt-2.5 text-xs font-bold text-slate-600 bg-slate-100/90 border border-slate-200/80 px-3 py-1 rounded-full">
                        MP4, MOV (tối đa 90MB)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText size={16} className="text-orange-500" />
                <span>Nội dung mô tả bài học</span>
                <span className="text-[11px] text-slate-400 font-normal normal-case">
                  (Hỗ trợ định dạng Markdown)
                </span>
                <span className="text-orange-500">*</span>
              </label>

              <div className="flex-1 rounded-3xl bg-white/90 border border-slate-200/90 shadow-xs overflow-hidden flex flex-col focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-500/15 transition-all">
                <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center gap-3 text-slate-600 select-none">
                  <button
                    type="button"
                    tabIndex={-1}
                    className="p-1 rounded hover:bg-slate-200/80 text-xs font-bold"
                  >
                    <Bold size={14} />
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="p-1 rounded hover:bg-slate-200/80 text-xs"
                  >
                    <Italic size={14} />
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="p-1 rounded hover:bg-slate-200/80 text-xs"
                  >
                    <Strikethrough size={14} />
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="p-1 rounded hover:bg-slate-200/80 text-xs"
                  >
                    <Link2 size={14} />
                  </button>
                </div>

                <textarea
                  rows={8}
                  placeholder="Chào mừng bạn đến với bài học! Trong bài này, chúng ta sẽ tìm hiểu về các nguyên lý cốt lõi, cú pháp và bài tập thực hành..."
                  required
                  {...register("content")}
                  className="w-full flex-1 p-5 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none resize-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Paperclip size={16} className="text-orange-500" />
                <span>Tài liệu đính kèm</span>
              </label>
              <button
                type="button"
                onClick={() => resourceInputRef.current?.click()}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-all cursor-pointer"
              >
                Thêm tài liệu +
              </button>
            </div>

            <input
              ref={resourceInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleResourceChange(e.target.files[0])}
            />

            {resource?.title ? (
              <div className="flex items-center justify-between p-4 px-5 rounded-2xl bg-white/95 border border-amber-300 shadow-xs">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 flex-shrink-0 shadow-2xs">
                    <FileCode size={20} />
                  </div>
                  <div className="truncate min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {resource.title}
                    </p>
                    <p className="text-[11px] text-slate-500 uppercase font-semibold">
                      Tài liệu đính kèm
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeResource}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => resourceInputRef.current?.click()}
                className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-dashed border-slate-300 hover:border-orange-400 hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-orange-600 shadow-2xs"
              >
                <Paperclip size={16} className="text-orange-500" />
                <span>+ Đính kèm file giáo trình PDF, slide hoặc mã nguồn Zip</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pt-6 border-t border-amber-200/60">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-700 bg-white/90 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft size={15} />
              <span>Quay lại</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-black text-white shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #eca776, #9a3b08)",
                borderRadius: "9999px",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Đang lưu bài học...</span>
                </>
              ) : (
                <>
                  <span>Lưu bài học</span>
                  <Check size={16} strokeWidth={3} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLession;

