import {
  ArrowLeft,
  Video,
  Calendar,
  Users,
  Activity,
  FileText,
  CheckCircle,
  Clock,
  PlayCircle,
  MessageSquare,
  Send,
  Upload,
  Plus,
  X,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ClassRoom = ({
  classs,
  navigate,
  message = [],
  loadings,
  sendMess,
  handleInputChange,
  input,
  setAssfile,
  Assfile,
  setShowUploadModal,
  showUploadModal,
  handsumbit,
  assesment,
  showStudentModal,
  setShowStudentModal,
  studentFile,
  selectedAssId,
  setSelectedAssId,
  handSubmitStudent,
  user,
}) => {
  const [contenChat, setContentChat] = useState("");

  const localUser = JSON.parse(localStorage.getItem("userInfor") || "{}");
  const currentUser = user || localUser;

  const isInstructor =
    currentUser?.role === "instructor" ||
    currentUser?.role === "admin" ||
    (classs?.instructorId?._id &&
      (currentUser?._id || currentUser?.userId) &&
      String(classs?.instructorId?._id) ===
        String(currentUser?._id || currentUser?.userId));

  const isStudent = !isInstructor;

  const handing = () => {
    if (contenChat.trim()) {
      sendMess(contenChat);
      setContentChat("");
    }
  };

  const getDayLabel = (day) => {
    const map = {
      Monday: "Thứ Hai",
      Tuesday: "Thứ Ba",
      Wednesday: "Thứ Tư",
      Thursday: "Thứ Năm",
      Friday: "Thứ Sáu",
      Saturday: "Thứ Bảy",
      Sunday: "Chủ Nhật",
    };
    return map[day] || day || "Thứ Hai";
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Hero Banner (Frosted Dark Glass Background + Centered Pill Button) ── */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden p-8 md:p-12 flex flex-col items-center justify-center text-center gap-4 shadow-xl transition-all"
        style={{
          background:
            "linear-gradient(135deg, rgba(40,30,20,0.65) 0%, rgba(70,50,30,0.55) 50%, rgba(30,25,20,0.7) 100%)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.3)",
        }}
      >
        <div className="absolute top-4 left-6 z-20">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm group cursor-pointer"
            style={{ borderRadius: "9999px" }}
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Quay lại</span>
          </button>
        </div>

        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-[90px]"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 right-10 w-72 h-72 rounded-full pointer-events-none opacity-30 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-3 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            {classs?.className || "Phòng Học Trực Tuyến"}
          </h1>
        </div>

        <button
          onClick={() => window.open(classs?.meetingLink, "_blank")}
          className="relative z-10 flex items-center gap-2.5 px-7 py-3 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl group active:scale-95 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #f97316, #fb923c)",
            borderRadius: "9999px",
            boxShadow: "0 8px 24px rgba(249,115,22,0.45)",
          }}
        >
          <Video className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Vào Phòng Học Google Meet 🎥</span>
        </button>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Teacher Profile Card */}
          <div
            className="p-5 rounded-[2rem] transition-all flex items-center gap-4 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 20px rgba(194,110,30,0.04)",
            }}
          >
            <img
              src={
                classs?.instructorId?.avatar ||
                "https://ui-avatars.com/api/?name=Teacher&background=random"
              }
              alt="Giảng viên"
              className="w-16 h-16 rounded-full object-cover ring-4 ring-white/90 shadow-md shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-extrabold text-slate-800 truncate">
                  {classs?.instructorId?.name || "Giảng viên Nexora"}
                </h3>
                <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-extrabold shrink-0 shadow-sm">
                  ✓
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-3 py-1 bg-white/90 text-orange-600 rounded-full text-xs font-semibold border border-orange-200/80 shadow-sm flex items-center gap-1.5"
                  style={{ borderRadius: "9999px" }}
                >
                  <span className="text-orange-500 text-[11px]">⚛️</span> Chuyên
                  gia đào tạo
                </span>
                <span
                  className="px-3 py-1 bg-white/90 text-amber-700 rounded-full text-xs font-semibold border border-amber-200/80 shadow-sm flex items-center gap-1.5"
                  style={{ borderRadius: "9999px" }}
                >
                  <span className="text-amber-500 text-[11px]">🏆</span> Giảng
                  viên xuất sắc
                </span>
              </div>
            </div>
          </div>

          {/* Class Info Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className="p-5 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
              }}
            >
              <Activity className="text-emerald-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Trạng thái
              </p>
              <div className="inline-flex items-center justify-center px-2 py-1 rounded bg-emerald-100 text-emerald-600 text-xs font-bold border border-emerald-200 uppercase">
                {classs?.status === "open"
                  ? "Đang mở"
                  : classs?.status === "closed"
                    ? "Đã đóng"
                    : "Đang mở"}
              </div>
            </div>
            <Link
              to={
                classs?._id ? `/instructor/classes/${classs._id}/students` : "#"
              }
              className="p-5 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
                cursor: "pointer",
              }}
            >
              <Users className="text-blue-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Sĩ số học viên
              </p>
              <h4 className="text-xl font-black text-slate-800">
                {classs?.currentStudents || 0} / {classs?.maxStudents || 0}
              </h4>
            </Link>

            <div
              className="p-5 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
              }}
            >
              <Calendar className="text-orange-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Khai giảng
              </p>
              <h4 className="text-base font-bold text-slate-800">
                {classs?.startDate || "Chưa cập nhật"}
              </h4>
            </div>
            <div
              className="p-5 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
              }}
            >
              <CheckCircle className="text-rose-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Kết thúc
              </p>
              <h4 className="text-base font-bold text-slate-800">
                {classs?.endDate || "Chưa cập nhật"}
              </h4>
            </div>
          </div>

          <div
            className="p-8 rounded-[2rem]"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                  <FileText size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-800">
                  Tài Liệu Học Tập
                </h3>
              </div>

              {isStudent ? (
                <button
                  type="button"
                  onClick={() => {
                    if (assesment && assesment.length > 0 && !selectedAssId) {
                      setSelectedAssId(assesment[0]._id);
                    }
                    setShowStudentModal(true);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-500/25 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderRadius: "9999px",
                  }}
                >
                  <Upload size={15} />
                  <span>Nộp bài tập</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-500/25 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    borderRadius: "9999px",
                  }}
                >
                  <Plus size={15} />
                  <span>Giao bài / Tải lên</span>
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
              {assesment && Array.isArray(assesment) && assesment.length > 0 ? (
                assesment.map((item, index) => {
                  const deadlineFormatted = item.deadline
                    ? new Date(item.deadline).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : null;

                  return (
                    <div
                      key={item._id || index}
                      className="group flex items-center justify-between gap-4 p-4 rounded-2xl transition-all hover:bg-white bg-white/50 cursor-pointer shadow-sm"
                      style={{ border: "1px solid rgba(0,0,0,0.05)" }}
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <FileText size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-slate-800 text-sm mb-0.5 truncate">
                            {item.title}
                          </h5>
                          {item.description && (
                            <p className="text-xs text-slate-500 line-clamp-1 mb-1 font-medium">
                              {item.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                            {deadlineFormatted && (
                              <span className="flex items-center gap-1 text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-md">
                                <Clock size={11} /> Hạn nộp: {deadlineFormatted}
                              </span>
                            )}
                            {item.createdAt && (
                              <span>
                                Đăng ngày:{" "}
                                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.fileUrl && (
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-500 hover:text-white transition-all shadow-sm shrink-0 active:scale-95"
                            style={{ borderRadius: "9999px" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download size={14} />
                            <span>{isStudent ? "Tải đề" : "Tải về"}</span>
                          </a>
                        )}

                        {isStudent && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAssId(item._id);
                              setShowStudentModal(true);
                            }}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all shadow-sm shrink-0 active:scale-95 border border-emerald-200 cursor-pointer"
                            style={{ borderRadius: "9999px" }}
                          >
                            <Upload size={14} />
                            <span>Nộp bài</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-2 text-slate-400">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center mb-1">
                    <FileText size={24} />
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    Chưa có tài liệu hoặc bài tập nào
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Giảng viên sẽ tải lên tài liệu và bài tập cho lớp học tại đây.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div
            className="p-6 rounded-[2rem] flex flex-col h-[480px] relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200/30 rounded-full blur-xl pointer-events-none" />

            <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2 relative z-10">
              <MessageSquare
                className="text-orange-500 animate-pulse"
                size={20}
              />{" "}
              Phòng Chat Lớp Học
            </h4>
            <div
              className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4 custom-scrollbar relative z-10"
              style={{ maxHeight: "320px" }}
            >
              {message && message.length > 0 ? (
                message.map((msg, index) => {
                  const currentUser = JSON.parse(
                    localStorage.getItem("userInfor") || "{}",
                  );
                  const isMe = msg.sender?._id === currentUser?.userId;

                  return (
                    <div
                      key={msg._id || index}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        {!isMe && (
                          <div className="w-4 h-4 rounded-full overflow-hidden bg-slate-200 border border-slate-300">
                            <img
                              src={`https://ui-avatars.com/api/?name=${msg.sender?.name || "User"}&background=random`}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="text-[10px] text-slate-400 font-black">
                          {isMe ? "Bạn" : msg.sender?.name || "Học viên"}
                        </span>
                      </div>
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] text-xs font-black shadow-sm leading-relaxed ${
                          isMe
                            ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-tr-none"
                            : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs font-bold gap-2 py-20">
                  <MessageSquare size={28} className="opacity-40" />
                  <span>Phòng chat đã sẵn sàng. Hãy gửi lời chào nhé!</span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="relative mt-auto z-10 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={contenChat}
                placeholder="Nhập tin nhắn của bạn..."
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl text-xs font-bold bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-sm"
                onChange={(e) => setContentChat(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handing()}
              />
              <button
                onClick={handing}
                className="absolute right-2 top-[13px] p-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 active:scale-95 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
              >
                <Send size={12} />
              </button>
            </div>
          </div>
          <div
            className="p-6 rounded-[2rem] flex flex-col h-[420px]"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 20px rgba(194,110,30,0.04)",
            }}
          >
            <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2 shrink-0">
              <Calendar className="text-orange-500" size={20} /> Lịch Học Trong
              Tuần
            </h4>

            {/* Scrollable Schedule List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              <div className="p-4 rounded-2xl bg-white/80 border border-orange-200/60 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-slate-800 text-sm">
                    {classs?.className || "Buổi học trực tuyến"}
                  </span>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    {classs?.startDate || "Đang mở"}
                  </span>
                </div>
                <div className="font-bold text-slate-700 text-xs mb-1">
                  {getDayLabel(classs?.schedule?.day)}
                </div>
                <div className="text-slate-500 text-xs font-semibold flex items-center gap-1.5">
                  <Clock size={13} className="text-orange-500" />
                  {classs?.schedule?.startTime} – {classs?.schedule?.endTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-lg">
                    Giao Bài Tập / Tài Liệu
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Tải lên tài liệu hoặc giao bài tập cho lớp học
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handsumbit(e);
              }}
            >
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Tiêu đề bài tập / tài liệu{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Bài tập thực hành dự án số 1"
                    className="w-full py-2.5 px-4 rounded-2xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800"
                  />
                </div>

                {/* Field 2: Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Hướng dẫn / Mô tả chi tiết
                  </label>
                  <textarea
                    name="description"
                    value={input.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Nhập yêu cầu làm bài hoặc lưu ý cho học viên..."
                    className="w-full py-2.5 px-4 rounded-2xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 resize-none"
                  />
                </div>

                {/* Field 3: File Upload */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    File đề bài mẫu / Tài liệu đính kèm{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-orange-400 rounded-2xl p-4 text-center bg-slate-50/50 hover:bg-orange-50/20 transition-all cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) => setAssfile(e.target.files[0])}
                      accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Upload size={16} />
                      </div>
                      {Assfile ? (
                        <span className="text-xs font-bold text-orange-600 truncate max-w-full px-2">
                          📄 {Assfile.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-xs font-bold text-slate-700">
                            Chọn file từ máy tính
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            PDF, Word, Zip, Rar (Tối đa 50MB)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Hạn chót nộp bài (Deadline){" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    value={input.deadline}
                    onChange={handleInputChange}
                    className="w-full py-2.5 px-4 rounded-2xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                    style={{ borderRadius: "9999px" }}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-md shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                      borderRadius: "9999px",
                    }}
                  >
                    Tải lên & Giao bài
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Nộp Bài Tập Dành Cho Học Viên ── */}
      {showStudentModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200"
          onClick={() => setShowStudentModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Upload size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-lg">
                    Nộp Bài Tập Lớp Học
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Tải lên file bài làm của bạn để nộp cho giảng viên
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowStudentModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handSubmitStudent(e);
              }}
            >
              <div className="p-6 space-y-4">
                {/* Field 1: Chọn bài tập cần nộp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Chọn bài tập cần nộp <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedAssId}
                    onChange={(e) => setSelectedAssId(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-2xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 cursor-pointer"
                  >
                    <option value="">-- Chọn bài tập cần nộp --</option>
                    {assesment &&
                      Array.isArray(assesment) &&
                      assesment.map((ass) => (
                        <option key={ass._id} value={ass._id}>
                          {ass.title}{" "}
                          {ass.deadline
                            ? `(Hạn: ${new Date(ass.deadline).toLocaleDateString("vi-VN")})`
                            : ""}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Field 2: File bài làm */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    File bài làm của bạn <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl p-4 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) => setStudentFile(e.target.files[0])}
                      accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg,.txt"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Upload size={16} />
                      </div>
                      {studentFile ? (
                        <span className="text-xs font-bold text-emerald-600 truncate max-w-full px-2">
                          📄 {studentFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-xs font-bold text-slate-700">
                            Chọn file bài làm từ máy tính
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            PDF, Word, Zip, Rar (Tối đa 50MB)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowStudentModal(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                    style={{ borderRadius: "9999px" }}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-md shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      borderRadius: "9999px",
                    }}
                  >
                    Nộp bài ngay
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRoom;
