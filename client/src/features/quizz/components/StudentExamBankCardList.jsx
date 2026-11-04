import { Search, Flame, Sparkles, FileText, BookOpen, ArrowRight, Layers } from "lucide-react";

/**
 * StudentExamBankCardList - Danh sách các khóa học đã mua để ôn thi
 * Cung cấp 3 chế độ ôn luyện trực tiếp trên mỗi thẻ môn học:
 * 1. Ôn 60 câu trọng tâm
 * 2. Ôn các câu khử trùng (toàn diện không trùng lặp)
 * 3. Ôn đề bình thường (luyện theo đề thi chuẩn)
 */
const StudentExamBankCardList = ({
  navigate,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  courses = [],
}) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 1. Header & Bộ Lọc Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            🎯 Kho Đề Ôn Luyện Thi
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Chọn môn học và chế độ ôn luyện phù hợp với mục tiêu điểm số của bạn
          </p>
        </div>

        {/* Tab lọc */}
        <div
          className="flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-md border border-slate-200/70 self-start md:self-auto shadow-xs"
          style={{ borderRadius: "9999px" }}
        >
          {[
            { key: "ALL", label: "Tất cả môn" },
            { key: "STUDYING", label: "Đang ôn tập" },
            { key: "COMPLETED", label: "Đã hoàn thành" },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-orange-600 hover:bg-white/80"
                }`}
                style={{ borderRadius: "9999px" }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Ô Tìm Kiếm Môn Học */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400"
        />
        <input
          type="text"
          placeholder="Tìm theo mã môn (MLN122, PRN211) hoặc tên môn học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200/80 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 transition-all shadow-xs"
          style={{ borderRadius: "9999px" }}
        />
      </div>

      {/* 3. Lưới Các Thẻ Môn Học Đã Mua (Course Cards) */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => {
            const courseId = course._id || course.id || "MLN122";
            const percent = Math.round(
              ((course.studiedQuestions || 0) / (course.focusCount || 60)) * 100
            );

            return (
              <div
                key={courseId}
                className="group bg-white/85 backdrop-blur-xl rounded-3xl p-6 border border-white/95 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{
                  boxShadow:
                    "0 8px 30px rgba(249,115,22,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <div>
                  {/* Mã môn & Kỳ học */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-block px-3 py-1 rounded-xl bg-orange-500/10 text-orange-600 font-extrabold text-xs border border-orange-200/50">
                      {course.courseCode || "MÔN HỌC"}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 truncate">
                      {course.semester ? `Kỳ: ${course.semester}` : "Đã kích hoạt"}
                    </span>
                  </div>

                  {/* Tên môn học */}
                  <h3 className="text-base md:text-lg font-black text-slate-800 leading-snug line-clamp-2 mb-3 group-hover:text-orange-600 transition-colors">
                    {course.courseName || course.title}
                  </h3>

                  {/* Thanh tiến độ ôn luyện của môn */}
                  <div className="bg-slate-50/90 rounded-2xl p-3 mb-5 border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-500">Tiến độ ôn trọng tâm:</span>
                      <span className="text-orange-600 font-extrabold">
                        {course.studiedQuestions || 0} / {course.focusCount || 60} câu ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3 NÚT HÀNH ĐỘNG ÔN LUYỆN: 60 CÂU, KHỬ TRÙNG, VÀ ĐỀ BÌNH THƯỜNG */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Lựa chọn chế độ ôn tập:
                  </div>

                  {/* NÚT 1: ÔN 60 CÂU TRỌNG TÂM */}
                  <button
                    type="button"
                    onClick={() => navigate(`/student/focus-exam/${courseId}?mode=focus`)}
                    className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs md:text-sm shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer group/btn"
                  >
                    <div className="flex items-center gap-2">
                      <Flame size={16} className="text-white fill-white shrink-0" />
                      <span>Ôn 60 Câu Trọng Tâm</span>
                    </div>
                    <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                      {course.focusCount || 60} câu <ArrowRight size={12} />
                    </span>
                  </button>

                  {/* NÚT 2: ÔN CÁC CÂU KHỬ TRÙNG (KHO TOÀN DIỆN) */}
                  <button
                    type="button"
                    onClick={() => navigate(`/student/focus-exam/${courseId}?mode=dedup`)}
                    className="w-full py-2.5 px-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-indigo-700 font-extrabold text-xs md:text-sm hover:bg-indigo-100/90 active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-indigo-600 shrink-0" />
                      <span>Ôn Các Câu Khử Trùng</span>
                    </div>
                    <span className="text-[11px] font-bold bg-white text-indigo-700 border border-indigo-200/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                      {course.uniqueCount || 480} câu <ArrowRight size={12} />
                    </span>
                  </button>

                  {/* NÚT 3: ÔN ĐỀ BÌNH THƯỜNG (TỪNG ĐỀ THI RIÊNG LẺ) */}
                  <button
                    type="button"
                    onClick={() => navigate(`/student/focus-exam/${courseId}?mode=regular`)}
                    className="w-full py-2.5 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs md:text-sm hover:bg-slate-100 hover:text-slate-900 active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-slate-500 shrink-0" />
                      <span>Ôn Đề Bình Thường</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      Từng đề thi <ArrowRight size={12} />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 text-center border border-slate-200/70 max-w-lg mx-auto">
          <BookOpen size={48} className="mx-auto text-orange-400 mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            Không tìm thấy môn học nào
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Hãy kiểm tra lại từ khóa tìm kiếm hoặc tham khảo các khóa học mới tại cửa hàng.
          </p>
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="px-5 py-2 rounded-full bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition"
          >
            Xóa tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentExamBankCardList;
