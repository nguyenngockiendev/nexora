import { useState, useRef } from "react";
import {
  BookOpen,
  Video,
  FileText,
  Upload,
  ArrowLeft,
  Check,
  Loader2,
  Sparkles,
  Eye,
  Info,
  CheckCircle2,
} from "lucide-react";

const UpdateLessonForm = ({
  register,
  Setvideo,
  loading,
  resource,
  setResource,
  navigate,
  handleupdate,
  handleSubmit,
  isuploading,
  uploadPercent,
  lession,
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoInputRef = useRef(null);
  const resourceInputRef = useRef(null);

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      Setvideo(file);
    }
  };

  const handleResourceChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResource({
        ...resource,
        type: "pdf",
        title: file.name,
        url: file,
      });
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Cập Nhật Bài Học
            </h1>
            <span
              className="px-3 py-1 rounded-full text-xs font-black text-white shadow-sm"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            >
              Chỉnh Sửa
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Chỉnh sửa thông tin, video và tài liệu của bài học
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 bg-white/90 border border-slate-200 shadow-sm hover:bg-white hover:border-slate-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Quay lại</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleupdate)}
        className="w-full rounded-[2.5rem] p-6 sm:p-8 lg:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(194,110,30,0.06)]"
        style={{
          background: "rgba(255, 255, 255, 0.78)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <span>Tiêu đề bài học</span>
                <span className="text-orange-500">*</span>
              </label>
              <div className="relative rounded-2xl bg-white border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <BookOpen size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề bài học..."
                  required
                  {...register("title")}
                  className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-800">
                Nội dung mô tả
              </label>
              <div className="rounded-2xl bg-white border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-2xs">
                <textarea
                  rows={6}
                  placeholder="Mô tả chi tiết nội dung bài học..."
                  required
                  {...register("content")}
                  className="w-full p-4 bg-transparent text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-none rounded-2xl resize-y"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-800">
                Tài liệu đi kèm
              </label>
              <input
                type="file"
                ref={resourceInputRef}
                onChange={handleResourceChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
              />
              <div
                onClick={() => resourceInputRef.current?.click()}
                className="p-5 rounded-2xl bg-white/90 border border-slate-200 hover:border-orange-300 transition-all flex flex-row items-center justify-between gap-4 cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <FileText size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-800 truncate">
                      {resource?.title ||
                        lession?.resources?.[0]?.title ||
                        "Chưa có tài liệu đính kèm"}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400">
                      Tối đa 50MB. Chấp nhận tệp PDF, DOCX, ZIP.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resourceInputRef.current?.click();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-black text-orange-600 bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-all shrink-0 cursor-pointer shadow-2xs"
                >
                  {resource?.title || lession?.resources?.[0]?.title
                    ? "Thay đổi"
                    : "Tải lên tài liệu"}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div
                className="w-full flex items-center justify-between text-sm font-black text-slate-800 mb-1"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span>Video bài học</span>
                <span className="text-xs font-bold text-slate-400">
                  Tối đa 90MB
                </span>
              </div>

              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoChange}
                className="hidden"
                accept="video/mp4,video/mkv,video/avi,video/webm"
              />

              <div
                onClick={() => videoInputRef.current?.click()}
                className="w-full rounded-3xl p-8 border-2 border-dashed border-orange-200 bg-orange-50/20 hover:bg-orange-50/40 hover:border-orange-400 transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer shadow-2xs group relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Video size={32} />
                </div>

                {selectedVideo ? (
                  <div className="space-y-1">
                    <p className="text-xs font-black text-emerald-600 flex items-center justify-center gap-1 m-0">
                      <CheckCircle2 size={14} /> Đã chọn video mới:
                    </p>
                    <p className="text-sm font-bold text-slate-800 line-clamp-1 m-0">
                      {selectedVideo.name}
                    </p>
                    <p className="text-xs font-semibold text-slate-400 m-0">
                      {(selectedVideo.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-black text-slate-800 m-0">
                      Kéo thả hoặc nhấp để tải lên video bài học
                    </p>
                    <p className="text-xs font-semibold text-slate-400 m-0">
                      (Định dạng MP4, tối đa 90MB)
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    videoInputRef.current?.click();
                  }}
                  className="mt-1 px-5 py-2.5 rounded-xl text-xs font-black text-orange-700 bg-orange-100 hover:bg-orange-200 transition-all cursor-pointer shadow-2xs border-0"
                >
                  {selectedVideo ? "Chọn video khác" : "Chọn tệp video"}
                </button>

                {isuploading && (
                  <div className="w-full mt-3 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-orange-600">
                      <span>Đang tải lên Cloud...</span>
                      <span>{uploadPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${uploadPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
                <Info size={16} className="shrink-0 text-amber-600" />
                <span>Không chọn video mới sẽ tự động giữ nguyên video hiện tại.</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-sm font-black text-slate-800 mb-1">
                Cài đặt bài học
              </div>

              <div
                className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 transition-all flex items-center justify-between gap-4 cursor-pointer shadow-2xs"
                style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
              >
                <div className="flex items-center gap-3.5 min-w-0" style={{ display: "flex", alignItems: "center" }}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Eye size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-800 m-0">
                      Cho phép học thử miễn phí
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 m-0 mt-0.5">
                      Học viên có thể xem trước bài học này
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center">
                  <input
                    type="checkbox"
                    {...register("isPreview")}
                    className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                    style={{ width: "20px", height: "20px", cursor: "pointer", accentColor: "#f97316" }}
                  />
                </div>
              </div>

              <div
                className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 transition-all flex items-center justify-between gap-4 cursor-pointer shadow-2xs"
                style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
              >
                <div className="flex items-center gap-3.5 min-w-0" style={{ display: "flex", alignItems: "center" }}>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-800 m-0">
                      Tự động tạo phụ đề AI
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 m-0 mt-0.5">
                      Nhận diện giọng nói và sinh phụ đề tự động
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center">
                  <input
                    type="checkbox"
                    value="PROCESSING"
                    {...register("status")}
                    className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                    style={{ width: "20px", height: "20px", cursor: "pointer", accentColor: "#f97316" }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <button
                type="submit"
                disabled={isuploading}
                className="flex-1 py-4 px-6 rounded-2xl text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                }}
              >
                {isuploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Đang lưu... {uploadPercent}%</span>
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    <span>Lưu bài học</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="py-4 px-6 rounded-2xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
