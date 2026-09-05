import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Layers,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssessmentHubView = ({
  stats = {
    totalTests: 24,
    completedGraded: 153,
    gradedPercent: "96.8%",
    pendingManual: 5,
  },
  quizInfo = {
    totalQuizzes: 18,
  },
  assignmentInfo = {
    totalAssignments: 6,
    pendingGrading: 5,
  },
  onRefresh,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-8 pb-16 animate-in fade-in duration-300">
      <div
        className="rounded-[28px] p-6 md:p-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,247,237,0.7) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 10px 30px rgba(249, 115, 22, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        }}
      >
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <GraduationCap size={14} className="text-orange-600" />
              <span>Trung Tâm Đánh Giá</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Tổng Quan Bài Kiểm Tra & Đánh Giá
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-xl">
              Trung tâm điều phối toàn bộ hoạt động kiểm tra trắc nghiệm và chấm
              điểm bài tập của học viên.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onRefresh}
              className="px-4 py-2.5 rounded-2xl bg-white/90 border border-slate-200 hover:border-orange-300 hover:text-orange-600 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <RefreshCw size={14} className="text-slate-400" />
              Làm mới
            </button>
          </div>
        </div>
      </div>

      {/* 3 STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Tests */}
        <div
          className="rounded-[24px] p-5 space-y-3 transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.02)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tổng bài kiểm tra
            </span>
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold border border-orange-100/80">
              <BookOpen size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800">
              {stats.totalTests}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Đang hoạt động trên các khóa học
            </div>
          </div>
        </div>

        {/* Card 2: Completed Graded */}
        <div
          className="rounded-[24px] p-5 space-y-3 transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.02)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Đã chấm hoàn tất
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100/80">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 flex items-baseline gap-2">
              <span>{stats.completedGraded}</span>
              <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                {stats.gradedPercent}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Đã có điểm và đánh giá đầy đủ
            </div>
          </div>
        </div>

        {/* Card 3: Pending Manual Grading */}
        <div
          className="rounded-[24px] p-5 space-y-3 transition-all"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,247,237,0.9) 0%, rgba(254,243,199,0.5) 100%)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(251, 146, 60, 0.35)",
            boxShadow: "0 8px 24px rgba(249, 115, 22, 0.08)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
              Chờ chấm tay
            </span>
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-sm shadow-orange-500/30">
              <Clock size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-orange-600 flex items-baseline gap-2">
              <span>{stats.pendingManual}</span>
              <span className="text-xs font-bold uppercase text-orange-600/80">
                Bài mới nộp
              </span>
            </div>
            <div className="text-xs text-orange-700/80 font-semibold mt-1">
              Cần giảng viên đánh giá & cho điểm
            </div>
          </div>
        </div>
      </div>

      {/* 2 MAIN WORKSPACE HUBS (ẤN ĐÂU VÀO ĐÓ) */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-orange-500" />
            <h2 className="text-lg font-black text-slate-800">
              Phân Hệ Quản Lý
            </h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
              Chọn khu vực để bắt đầu
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Bấm vào phân hệ bạn muốn làm việc để chuyển sang trang quản lý chi
            tiết
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* HUB 1: QUIZZ MANAGEMENT */}
          <div
            onClick={() => navigate("/instructor/quizzes")}
            className="group rounded-[28px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 10px 30px rgba(249, 115, 22, 0.05)",
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-2xl font-bold border border-orange-100/80 group-hover:scale-105 transition-transform">
                  <FileText size={26} />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Tự động chấm
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800 group-hover:text-orange-600 transition-colors">
                  Trắc Nghiệm Quizz
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Hệ thống tự động chấm điểm sau khi sinh viên nộp bài. Bạn chỉ
                  cần theo dõi bảng điểm, xem các câu sinh viên hay làm sai hoặc
                  cấp quyền cho thi lại.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Tổng đề Quiz hiện có:
                </span>
                <span className="text-lg font-black text-slate-800">
                  {quizInfo.totalQuizzes} Đề thi
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Xem bảng điểm & cho thi lại
              </span>
              <button
                type="button"
                className="px-5 py-2.5 rounded-2xl text-white text-xs font-black flex items-center gap-2 group-hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-500/25 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                }}
              >
                <span>Vào Quản Lý Quizz</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* HUB 2: MANUAL ASSIGNMENTS & LIVE CLASS */}
          <div
            onClick={() => navigate("/instructor/assignments")}
            className="group rounded-[28px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 10px 30px rgba(249, 115, 22, 0.05)",
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl font-bold border border-amber-100/80 group-hover:scale-105 transition-transform">
                  <Sparkles size={26} />
                </div>
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200/80 text-xs font-extrabold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  {assignmentInfo.pendingGrading} Bài chờ chấm
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                  Bài Tập Nộp File & Lớp Live
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Quản lý các bài tập đồ án, file source code (.zip) hoặc PDF do
                  sinh viên lớp Live nộp lên. Giảng viên vào tải file, chấm điểm
                  tay và gửi nhận xét.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Tổng bài tập đang giao:
                </span>
                <span className="text-lg font-black text-slate-800">
                  {assignmentInfo.totalAssignments} Bài tập
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Tải file bài làm & cho điểm
              </span>
              <button
                type="button"
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md shadow-amber-500/30 flex items-center gap-2 group-hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Vào Chấm Bài Tập</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHubView;
