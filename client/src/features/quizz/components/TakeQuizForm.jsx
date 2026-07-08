import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  Send,
  Sparkles,
  XCircle,
  AlertCircle
} from "lucide-react";

const OPTION_LABELS = ["A", "B", "C", "D"];

function formatTime(seconds) {
  if (isNaN(seconds) || seconds == null || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const PageShell = ({ children }) => (
  <div className="min-h-screen bg-slate-50/50 relative overflow-hidden flex flex-col font-sans">
    {/* Decorative background elements */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
    <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8 flex-1 flex flex-col">
      {children}
    </div>
  </div>
);

const TakeQuizForm = ({
  quiz,
  currentIndex,
  setCurrentIndex,
  answers,
  onSelectAnswer,
  onSubmit,
  onRetry,
  submitted,
  result,
  timeLeft,
}) => {
  const currentQuestion = quiz?.questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === quiz?.questions.length - 1;
  const isTimeUp = timeLeft <= 0;

  const handleSubmitClick = () => {
    const unanswered = quiz?.questions.length - answeredCount;

    if (!submitted && unanswered > 0) {
      const confirmSubmit = window.confirm(
        `Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc muốn nộp bài?`,
      );
      if (!confirmSubmit) return;
    }

    onSubmit();
  };

  // ==========================================
  // RESULT VIEW
  // ==========================================
  if (submitted && result) {
    return (
      <PageShell>
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-wider">
                <Sparkles size={14} /> Result
              </span>
              <span className="text-sm font-bold text-slate-500">{quiz?.courseId?.title}</span>
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-1">Kết quả bài kiểm tra</h1>
            <p className="text-slate-500 font-medium">{quiz?.title}</p>
          </div>
          <button 
            type="button" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-orange-500 transition-colors shadow-sm"
            onClick={onRetry}
          >
            <RotateCcw size={18} /> Làm lại
          </button>
        </header>

        <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white mb-10 text-center max-w-2xl mx-auto w-full">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-inner ${result.pass ? "bg-emerald-100 text-emerald-500" : "bg-rose-100 text-rose-500"}`}>
            {result.pass ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
          </div>

          <h2 className="text-5xl font-black text-slate-800 mb-2">{result.attepms.score} <span className="text-2xl text-slate-400">điểm</span></h2>
          <p className="text-lg font-bold text-slate-500 mb-6">
            Đúng {result.attepms.correctAnswers}/{result.attepms.totalQuestions} câu
          </p>

          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-wide border ${result.pass ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"}`}>
            {result.pass
              ? `Đạt — yêu cầu ${result.attepms.quizId.passScore} điểm`
              : `Chưa đạt — yêu cầu ${result.attepms.quizId.passScore} điểm`}
          </div>

          {isTimeUp && (
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-500 bg-orange-50 px-4 py-2 rounded-xl">
              <AlertCircle size={16} /> Bài làm đã được nộp tự động vì hết thời gian.
            </div>
          )}
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
          Xem lại chi tiết
        </h3>

        <div className="space-y-6">
          {quiz?.questions?.map((q, qIndex) => {
            const selected = answers[q._id];
            const isCorrect = selected === q.correctAnswer;

            return (
              <div key={qIndex} className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <p className="text-lg font-bold text-slate-700 leading-relaxed">
                    <span className="text-slate-400 mr-2">Câu {qIndex + 1}.</span> 
                    {q.question}
                  </p>
                  <div className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border ${isCorrect ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"}`}>
                    {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {isCorrect ? "Đúng" : "Sai"}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {q.options.map((option, oIndex) => {
                    const isSelected = selected === oIndex;
                    const isCorrectOption = q.correctAnswer === oIndex;
                    
                    let optionClass = "bg-slate-50 border-slate-200 text-slate-600";
                    let keyClass = "bg-white text-slate-400";
                    
                    if (isCorrectOption) {
                      optionClass = "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm ring-1 ring-emerald-500/20";
                      keyClass = "bg-emerald-500 text-white shadow-sm";
                    } else if (isSelected && !isCorrectOption) {
                      optionClass = "bg-rose-50 border-rose-300 text-rose-700";
                      keyClass = "bg-rose-500 text-white";
                    }

                    return (
                      <div key={oIndex} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${optionClass}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0 ${keyClass}`}>
                          {OPTION_LABELS[oIndex]}
                        </div>
                        <span className="font-semibold text-sm leading-relaxed">{option}</span>
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="mt-6 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <p className="text-sm font-bold text-blue-800 mb-1">Giải thích:</p>
                    <p className="text-sm text-blue-900/80 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PageShell>
    );
  }

  // ==========================================
  // TAKE QUIZ VIEW
  // ==========================================
  return (
    <PageShell>
      <header className="mb-6 lg:mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white/70 backdrop-blur-2xl p-6 lg:p-8 rounded-[2rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-wider">
              <Sparkles size={14} /> Quiz Mode
            </span>
            <span className="text-sm font-bold text-slate-500">{quiz?.lessonTitle}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-800 mb-2">{quiz?.title}</h1>
          <p className="text-slate-500 font-medium">{quiz?.description}</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiến độ</div>
            <div className="text-lg font-black text-slate-700">{answeredCount}/{quiz?.questions.length}</div>
          </div>
          <div className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border shadow-sm transition-colors ${timeLeft <= 60 ? "bg-rose-50 border-rose-200 text-rose-600 animate-pulse" : "bg-slate-800 border-slate-800 text-white"}`}>
            <Clock size={20} />
            <span className="text-xl font-black tracking-widest">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 h-full flex-1 min-h-[500px]">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 bg-white/70 backdrop-blur-2xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden">
          <div className="p-6 pb-4 border-b border-slate-100 flex flex-col gap-2">
            <h2 className="text-lg font-black text-slate-800">Danh sách câu hỏi</h2>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div> Đã làm</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div> Chưa làm</span>
            </div>
          </div>
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-5 lg:grid-cols-4 gap-4">
              {quiz?.questions.map((q, index) => {
                const isActive = index === currentIndex;
                const isDone = answers[q._id] !== undefined;

                let btnClass = "bg-white border-slate-100 text-slate-500 hover:border-orange-200 hover:text-orange-500 hover:bg-orange-50 hover:scale-110";
                
                if (isActive) {
                  btnClass = "bg-gradient-to-br from-orange-400 to-orange-600 border-none text-white shadow-lg shadow-orange-500/40 ring-4 ring-orange-500/20 scale-110 z-10";
                } else if (isDone) {
                  btnClass = "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100";
                }

                return (
                  <button
                    key={q._id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`relative w-12 h-12 mx-auto rounded-full font-black text-sm flex items-center justify-center transition-all duration-300 ${btnClass} ${!isActive && 'border-2'}`}
                  >
                    {index + 1}
                    {isDone && !isActive && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-sm">
                        <CheckCircle2 size={10} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Question Area */}
        <section className="flex-1 bg-white/70 backdrop-blur-2xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden relative">
          <div className="p-6 lg:p-10 flex-1 flex flex-col">
            
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-wider">
                Câu {currentIndex + 1}
              </span>
              <span className="text-sm font-bold text-slate-400">
                / {quiz?.questions.length}
              </span>
            </div>

            <p className="text-xl lg:text-2xl font-bold text-slate-700 leading-relaxed mb-8 flex-1">
              {currentQuestion?.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {currentQuestion?.options?.map((option, index) => {
                const isSelected = answers[currentQuestion._id] === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onSelectAnswer(currentQuestion._id, index)}
                    className={`group flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                      isSelected 
                        ? "bg-orange-50 border-orange-500 shadow-md shadow-orange-500/10" 
                        : "bg-white border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-400 group-hover:bg-orange-200 group-hover:text-orange-700"
                    }`}>
                      {OPTION_LABELS[index]}
                    </div>
                    <span className={`font-semibold leading-relaxed ${isSelected ? "text-orange-900" : "text-slate-600"}`}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
              >
                <ArrowLeft size={18} /> Trước
              </button>

              {!isLastQuestion ? (
                <button
                  type="button"
                  className="flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-orange-500 to-amber-500"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                  Tiếp <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-white shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-emerald-500 to-teal-500"
                  onClick={handleSubmitClick}
                >
                  <Send size={18} /> Nộp bài
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default TakeQuizForm;
