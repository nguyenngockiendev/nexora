import { Search, Clock3, Target, Award } from "lucide-react";

const StudentQuizzCart = ({
  navigate,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  filteredQuizzes = [],
}) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Danh Sách Bài Kiểm Tra
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Luyện tập và kiểm tra kiến thức để đánh giá năng lực học tập của bạn
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/70 self-start md:self-auto shadow-xs">
          {[
            { key: "ALL", label: "Tất cả" },
            { key: "NOT_STARTED", label: "Chưa làm" },
            { key: "PASSED", label: "Đã Đạt" },
            { key: "FAILED", label: "Chưa Đạt" },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-orange-600 hover:bg-white/80"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400"
        />
        <input
          type="text"
          placeholder="Tìm kiếm bài kiểm tra, khóa học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 transition-all shadow-xs"
        />
      </div>

      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredQuizzes.map((quiz) => {
            const isPassed = quiz.status === "PASSED";
            const isFailed = quiz.status === "FAILED";
            const isNotStarted = quiz.status === "NOT_STARTED";

            return (
              <div
                key={quiz.id || quiz._id}
                className="group bg-white/75 backdrop-blur-xl rounded-3xl p-6 border border-white/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{
                  boxShadow:
                    "0 8px 30px rgba(249,115,22,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-600 font-bold text-xs border border-orange-200/40 line-clamp-1">
                      {quiz.courseTitle || "Khóa học"}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 truncate">
                      GV: {quiz.instructorName || "Giảng viên"}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-800 leading-snug line-clamp-2 mb-4 group-hover:text-orange-600 transition-colors">
                    {quiz.title || quiz.lessonTitle || "Bài kiểm tra"}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6 bg-slate-50/70 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5">
                      <Clock3 size={15} className="text-orange-500" />
                      <span>{quiz.duration || 15} Phút</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target size={15} className="text-orange-500" />
                      <span>
                        Điểm đạt: {Number(quiz.passScore || 8).toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  {isPassed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Đã Đạt ({quiz.lastAttempt?.score?.toFixed(1) || 10}đ)
                    </span>
                  )}

                  {isFailed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Chưa Đạt ({quiz.lastAttempt?.score?.toFixed(1) || 0}đ)
                    </span>
                  )}

                  {isNotStarted && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Chưa làm
                    </span>
                  )}

                  {isPassed && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/quizz/lession/${quiz.lessonId}`)
                      }
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all cursor-pointer shadow-xs"
                    >
                      Xem lịch sử
                    </button>
                  )}

                  {isFailed && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/quizz/lession/${quiz.lessonId}`)
                      }
                      className="px-4 py-1.5 rounded-xl text-white font-bold text-xs transition-all shadow-xs cursor-pointer hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, #f97316, #ea580c)",
                      }}
                    >
                      Thi lại
                    </button>
                  )}

                  {isNotStarted && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/quizz/lession/${quiz.lessonId}`)
                      }
                      className="px-4 py-2 rounded-xl text-white font-bold text-xs transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                      style={{
                        background:
                          "linear-gradient(135deg, #f97316, #ea580c)",
                      }}
                    >
                      Bắt đầu làm bài
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/70 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-3">
            <Award size={30} />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Không tìm thấy bài kiểm tra nào
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            {searchTerm
              ? `Không có bài kiểm tra nào phù hợp với từ khóa "${searchTerm}".`
              : "Hiện tại chưa có bài kiểm tra nào trong danh mục này."}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentQuizzCart;
