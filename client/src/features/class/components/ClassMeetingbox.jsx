import {
  ArrowLeft,
  Video,
  Calendar,
  Users,
  Activity,
  FileText,
  CheckCircle,
  Info,
  Clock,
  PlayCircle,
  MessageSquare,
  Send,
  Upload,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ClassRoom = ({ classs, navigate, message = [], loadings, sendMess }) => {
  const [contenChat, setContentChat] = useState("");
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

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg"
                  className="hidden"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                  }}
                />
                <div
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-500/25 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #f0a671 0%, #c45419 100%)",
                  }}
                >
                  <Upload size={14} />
                  <span>Tải lên tài liệu</span>
                </div>
              </label>
            </div>

            <div className="space-y-3">
              {/* Material Item */}
              <div
                className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white cursor-pointer"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 mb-0.5">
                    Tài liệu tổng hợp kiến thức buổi học.pdf
                  </h5>
                  <p className="text-xs font-medium text-slate-500">
                    2.4 MB • Tài liệu PDF
                  </p>
                </div>
              </div>

              <div
                className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white cursor-pointer"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 mb-0.5">
                    Bài tập thực hành dự án #1
                  </h5>
                  <p className="text-xs font-medium text-slate-500">
                    Tài liệu Word
                  </p>
                </div>
              </div>

              <div
                className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white cursor-pointer"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <PlayCircle size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 mb-0.5">
                    Video ghi lại buổi học số 1
                  </h5>
                  <p className="text-xs font-medium text-slate-500 text-purple-500">
                    Đang xử lý...
                  </p>
                </div>
              </div>
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
    </div>
  );
};

export default ClassRoom;
