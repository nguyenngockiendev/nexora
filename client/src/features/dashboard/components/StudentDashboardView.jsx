import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  PlayCircle,
  TrendingUp,
  Video,
  Award,
  ChevronRight,
  Compass,
} from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

const StatCard = ({ icon: Icon, label, value, tone, helper }) => {
  const tones = {
    indigo: {
      bg: "rgba(249,115,22,0.1)",
      border: "rgba(249,115,22,0.25)",
      iconBg: "rgba(249,115,22,0.12)",
      iconColor: "#ea580c",
      glow: "rgba(249,115,22,0.15)",
    },
    blue: {
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.25)",
      iconBg: "rgba(245,158,11,0.12)",
      iconColor: "#d97706",
      glow: "rgba(245,158,11,0.15)",
    },
    green: {
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.2)",
      iconBg: "rgba(16,185,129,0.12)",
      iconColor: "#059669",
      glow: "rgba(16,185,129,0.12)",
    },
    orange: {
      bg: "rgba(249,115,22,0.1)",
      border: "rgba(249,115,22,0.2)",
      iconBg: "rgba(249,115,22,0.12)",
      iconColor: "#ea580c",
      glow: "rgba(249,115,22,0.12)",
    },
  };
  const t = tones[tone] || tones.blue;

  return (
    <div
      className="group rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
      style={{
        background: `rgba(255,255,255,0.65)`,
        border: `1px solid ${t.border}`,
        backdropFilter: "blur(20px)",
        boxShadow: `0 4px 16px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
      }}
    >
      <div
        className="mb-2.5 grid h-8 w-8 place-items-center rounded-xl transition-transform group-hover:scale-105"
        style={{ background: t.iconBg, boxShadow: `0 0 10px ${t.glow}` }}
      >
        <Icon size={16} style={{ color: t.iconColor }} />
      </div>
      <p className="mb-0.5 text-xs font-semibold text-slate-500">
        {label}
      </p>
      <strong
        className="block text-xl font-black leading-tight text-slate-800"
      >
        {value}
      </strong>
      {helper && (
        <span
          className="mt-1 block text-[10px] font-medium text-slate-400"
        >
          {helper}
        </span>
      )}
    </div>
  );
};

const StudentDashboardView = ({
  dashboart,
  loading,
  recentlesson,
  classRecent,
}) => {
  const { dashboard } = useOutletContext();
  const navigate = useNavigate();

  const enrolledCount = dashboart?.length
    ? dashboart[0]?.CourseEnroill || dashboart.length
    : 0;
  const completedLessonsCount =
    dashboart?.reduce((sum, item) => sum + (item.LessonsSuccess || 0), 0) || 0;
  const liveClassesList =
    dashboart?.flatMap((item) => item.ClassLiveData || []) || [];
  const avgScore = dashboart?.length ? dashboart[0]?.AvgQuizz || 0 : 0;

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div
          className="rounded-3xl p-6 animate-pulse"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="h-10 w-2/3 rounded-2xl"
            style={{ background: "rgba(249,115,22,0.08)" }}
          />
          <div
            className="mt-4 h-4 w-1/2 rounded-full"
            style={{ background: "rgba(249,115,22,0.06)" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section
        className="relative overflow-hidden rounded-3xl p-5 lg:p-6 transition-all shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.90) 60%, rgba(15, 23, 42, 0.96) 100%)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow:
            "0 18px 48px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
        {/* Ambient Glow */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)",
          }}
        />

        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] items-center">
          <div>
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fb923c",
                borderRadius: "9999px",
              }}
            >
              <GraduationCap size={13} className="text-orange-400" />
              Tổng quan học viên
            </div>
            <h1
              className="mt-2 text-2xl font-black leading-snug md:text-3xl text-white"
            >
              Chào mừng trở lại,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #f97316, #fb923c, #ea580c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {dashboard?.name || "Học viên"}
              </span>{" "}
              👋
            </h1>
            <p
              className="mt-1.5 max-w-xl text-xs leading-relaxed text-slate-300 font-medium"
            >
              Hôm nay là một ngày tuyệt vời để học những điều mới. Hãy tiếp tục
              hành trình tri thức của bạn nhé!
            </p>
          </div>

          <div
            className="rounded-2xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-sm"
            style={{
              background:
                "linear-gradient(145deg, rgba(30, 41, 59, 0.70) 0%, rgba(15, 23, 42, 0.75) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.12)",
            }}
          >
            <div className="h-full flex flex-col justify-between">
              {recentlesson ? (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-400">
                        Đang học
                      </span>
                      <div className="w-7 h-7 rounded-full bg-white/10 text-orange-400 border border-white/10 flex items-center justify-center">
                        <BookOpen size={13} />
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-xs line-clamp-1">
                      {recentlesson?.titleCourse || "Khóa học hiện tại"}
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                      {recentlesson?.titleLession || "Bài học gần đây"}
                    </p>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] font-bold mb-1.5">
                      <span className="text-slate-400">Tiến độ</span>
                      <span className="text-orange-400">
                        {recentlesson?.percent || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mb-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-400 h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${recentlesson?.percent || 0}%`, borderRadius: "9999px" }}
                      ></div>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          recentlesson?.courseId
                            ? `/student/courses/${recentlesson.courseId}/item`
                            : "/courses",
                        )
                      }
                      style={{
                        background:
                          "linear-gradient(to right, #f97316, #ea580c)",
                        borderRadius: "9999px",
                      }}
                      className="w-full py-2 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <PlayCircle size={15} />
                      Học tiếp ngay
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-2.5 text-center">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 text-orange-400 flex items-center justify-center mb-2 shadow-2xs">
                    <Compass size={18} />
                  </div>
                  <h4 className="font-bold text-white text-xs">
                    Chưa có bài học gần đây
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5 max-w-[190px] leading-snug">
                    Hãy bắt đầu khóa học đầu tiên của bạn ngay hôm nay!
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    style={{
                      background: "linear-gradient(to right, #f97316, #ea580c)",
                      borderRadius: "9999px",
                    }}
                    className="mt-3 px-4 py-1.5 text-white font-bold text-xs shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer select-none"
                  >
                    Khám phá khóa học
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Khóa đã tham gia"
          value={enrolledCount}
          helper="Đang trong quá trình học"
          tone="indigo"
        />
        <StatCard
          icon={CheckCircle2}
          label="Bài giảng hoàn thành"
          value={completedLessonsCount}
          helper="Rất chăm chỉ!"
          tone="green"
        />
        <StatCard
          icon={Video}
          label="Lớp trực tuyến sắp tới"
          value={liveClassesList.length}
          helper="Đừng bỏ lỡ nhé"
          tone="orange"
        />
        <StatCard
          icon={Award}
          label="Điểm Quiz (TB)"
          value={`${avgScore}`}
          helper="Điểm trung bình bài kiểm tra"
          tone="blue"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div
          className="rounded-2xl p-4 lg:p-5"
          style={{
            background: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(180,100,20,0.04)",
          }}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(249,115,22,0.12)",
                  color: "#ea580c",
                  border: "1px solid rgba(249,115,22,0.25)",
                }}
              >
                Lịch trình
              </span>
              <h2
                className="mt-3 text-2xl font-black"
                style={{ color: "#1e293b" }}
              >
                Lớp học trực tuyến sắp diễn ra
              </h2>
            </div>
            <div
              className="grid h-10 w-10 place-items-center rounded-2xl"
              style={{
                background: "rgba(249,115,22,0.12)",
                boxShadow: "0 0 12px rgba(249,115,22,0.15)",
              }}
            >
              <CalendarDays size={18} style={{ color: "#ea580c" }} />
            </div>
          </div>

          <div className="space-y-4">
            {(() => {
              const liveClasses = Array.isArray(classRecent)
                ? classRecent
                : classRecent?.nextSessionClass
                  ? [classRecent.nextSessionClass]
                  : [];

              if (liveClasses.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center h-48 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-3 text-orange-500">
                      <Video size={24} />
                    </div>
                    <p className="font-bold text-slate-700">
                      Chưa có lịch học trực tuyến
                    </p>
                    <p className="text-sm text-slate-500 mt-1 max-w-xs text-center">
                      Các buổi học trực tuyến mới sẽ được cập nhật tại đây.
                    </p>
                  </div>
                );
              }

              return liveClasses.map((cls) => {
                const classTitle =
                  cls.className ||
                  cls.courseTitle ||
                  cls.title ||
                  "Lớp học trực tuyến";
                const scheduleTime = cls.schedule
                  ? `${cls.schedule.day || ""} (${cls.schedule.startTime || ""} - ${cls.schedule.endTime || ""})`
                  : cls.time || "Sắp diễn ra";
                const instructorName = cls.instructorId?.name || "Giảng viên";

                return (
                  <div
                    key={cls._id || cls.id}
                    onClick={() =>
                      navigate(`/student/live/class/${cls._id}/item`)
                    }
                    className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/70 hover:bg-white hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex flex-col items-center justify-center font-bold">
                        <span className="text-xs uppercase font-black">
                          LIVE
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">
                          {classTitle}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock3 size={12} /> {scheduleTime}
                          </span>
                          <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full">
                            {instructorName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        <div
          className="rounded-2xl p-4 lg:p-5"
          style={{
            background: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(180,100,20,0.04)",
          }}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <span
                className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  color: "#059669",
                  border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: "9999px",
                }}
              >
                Hoạt động
              </span>
              <h2
                className="mt-1.5 text-lg font-black"
                style={{ color: "#1e293b" }}
              >
                Thành tích &amp; Chứng chỉ
              </h2>
            </div>
            <div
              className="grid h-8 w-8 place-items-center rounded-xl"
              style={{
                background: "rgba(16,185,129,0.12)",
                boxShadow: "0 0 12px rgba(16,185,129,0.15)",
              }}
            >
              <TrendingUp size={18} style={{ color: "#059669" }} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-48 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
              <Award size={28} className="text-emerald-500" />
            </div>
            <p className="font-bold text-slate-700">Chưa có chứng chỉ nào</p>
            <p className="text-sm text-slate-500 mt-1 max-w-xs text-center">
              Hãy hoàn thành 100% khóa học để nhận chứng chỉ nhé!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboardView;
