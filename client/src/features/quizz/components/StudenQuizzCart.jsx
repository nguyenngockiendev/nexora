import { Search, Clock, Target } from "lucide-react";

const StudentQuizzCart = ({
  navigate,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  filteredQuizzes,
}) => {
  return (
    <div className="min-h-screen bg-[#fdf8f4] relative overflow-hidden p-6 md:p-10 font-sans">
      {/* Translucent floating ambient circles */}
      <div className="absolute top-10 left-8 w-12 h-12 rounded-full bg-orange-300/30 blur-md pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-14 h-14 rounded-full bg-amber-300/30 blur-md pointer-events-none" />
      <div className="absolute bottom-12 left-1/4 w-16 h-16 rounded-full bg-orange-200/30 blur-lg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header Bar: Title on left, Tabs on right */}
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-5">
            Danh Sách Bài Kiểm Tra
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-orange-200/40 pb-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Tìm kiếm bài kiểm tra..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/90 border border-slate-200/80 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-sm"
              />
            </div>

            {/* Filter Tabs matching image */}
            <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 self-end">
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
                    className={`relative py-1.5 transition-colors ${
                      isActive
                        ? "text-orange-600 font-bold"
                        : "hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute bottom-[-16px] left-0 right-0 h-[3px] bg-orange-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quiz 3-Column Grid Matching Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => {
            const isPassed = quiz.status === "PASSED";
            const isFailed = quiz.status === "FAILED";
            const isNotStarted = quiz.status === "NOT_STARTED";

            return (
              <div
                key={quiz.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.08)] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Block: Instructor Name on top, then Course Title */}
                  <div className="mb-2 space-y-0.5">
                    <div className="text-[11px] font-bold text-slate-400">
                      Giảng viên: {quiz.instructorName}
                    </div>
                    <div className="text-xs font-extrabold text-orange-600">
                      [{quiz.courseTitle}]
                    </div>
                  </div>

                  {/* Quiz Title */}
                  <h3 className="text-base font-extrabold text-slate-800 leading-snug mb-3">
                    {quiz.title}
                  </h3>

                  {/* Meta Details: Time & Passing Score */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock size={15} className="text-slate-400" />
                      <span>{quiz.duration} Phút</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target size={15} className="text-slate-400" />
                      <span>{quiz.passScore?.toFixed(1)}/10</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Area Matching Image */}
                <div className="flex items-center justify-between gap-2 pt-2">
                  {/* Status Pill Badge */}
                  {isPassed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Đã Đạt ({quiz.lastAttempt.score?.toFixed(1)} )
                    </span>
                  )}

                  {isFailed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100/80 text-rose-700 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Chưa Đạt ({quiz.lastAttempt.score?.toFixed(1)})
                    </span>
                  )}

                  {isNotStarted && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 text-amber-700 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Chưa làm
                    </span>
                  )}

                  {/* Right Action Button matching image */}
                  {isPassed && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/quizz/lession/${quiz.lessonId}`)
                      }
                      className="px-3.5 py-1.5 rounded-xl border border-orange-300 bg-orange-50/50 text-orange-600 font-bold text-xs hover:bg-orange-100/60 transition-all shadow-sm"
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
                      className="px-4 py-1.5 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-all shadow-sm"
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
                      className="px-4 py-1.5 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-all shadow-sm"
                    >
                      Bắt đầu làm bài
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default StudentQuizzCart;
