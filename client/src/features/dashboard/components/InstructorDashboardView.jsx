import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  RefreshCw,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

const formatNumber = (value) => Number(value || 0).toLocaleString("vi-VN");

const getUserName = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfor"));
    return userInfo?.name || "Instructor";
  } catch {
    return "Instructor";
  }
};

const cn = (...classes) => classes.filter(Boolean).join(" ");

const metricTone = {
  indigo: "bg-sky-100/80 text-sky-700 ring-white/70",
  blue: "bg-cyan-100/80 text-cyan-700 ring-white/70",
  green: "bg-teal-100/80 text-teal-700 ring-white/70",
  purple: "bg-fuchsia-100/70 text-fuchsia-700 ring-white/70",
};

const StatCard = ({ icon: Icon, label, value, tone, helper }) => (
  <div className="group rounded-3xl border border-white/70 bg-white/35 p-5 shadow-[0_18px_50px_rgba(70,120,180,0.14)] backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_24px_70px_rgba(56,135,210,0.2)]">
    <div
      className={cn(
        "mb-4 grid h-12 w-12 place-items-center rounded-2xl ring-1 shadow-inner",
        metricTone[tone],
      )}
    >
      <Icon size={20} />
    </div>
    <p className="mb-1 text-sm font-semibold text-slate-600">{label}</p>
    <strong className="block text-3xl font-black leading-none text-slate-900">
      {value}
    </strong>
    {helper && (
      <span className="mt-2 block text-xs font-semibold text-slate-500">
        {helper}
      </span>
    )}
  </div>
);

const StatusPill = ({ status }) => {
  const tone =
    status === "completed"
      ? "bg-teal-100/70 text-teal-700 ring-white/80"
      : status === "pending"
        ? "bg-amber-100/70 text-amber-700 ring-white/80"
        : "bg-rose-100/70 text-rose-700 ring-white/80";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1 backdrop-blur",
        tone,
      )}
    >
      {status}
    </span>
  );
};

const InstructorDashboardView = ({ dashboard, error, loading, onRetry }) => {
  const overview = dashboard?.overview || {};
  const coursePerformance = dashboard?.coursePerformance || [];
  const recentOrders = dashboard?.recentOrders || [];
  const instructorName = getUserName();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-112px)] rounded-[2rem] bg-[linear-gradient(135deg,#dff7ff_0%,#e8f4ff_34%,#f7def4_68%,#fff0ec_100%)] p-4 text-slate-950 md:p-6">
        <div className="rounded-3xl border border-white/70 bg-white/35 p-6 shadow-[0_18px_50px_rgba(70,120,180,0.14)] backdrop-blur-2xl">
          <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-white/60" />
          <div className="mt-4 h-4 w-1/2 animate-pulse rounded-full bg-white/60" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="h-32 animate-pulse rounded-3xl border border-white/70 bg-white/35 backdrop-blur-2xl"
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-112px)] rounded-[2rem] bg-[linear-gradient(135deg,#dff7ff_0%,#e8f4ff_34%,#f7def4_68%,#fff0ec_100%)] p-4 text-slate-950 md:p-6">
        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center rounded-3xl border border-white/70 bg-white/40 p-8 text-center shadow-[0_24px_70px_rgba(56,135,210,0.18)] backdrop-blur-2xl">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100/80 text-sky-700 shadow-inner">
            <BarChart3 size={24} />
          </div>
          <h2 className="mt-4 text-2xl font-black text-slate-900">
            Dashboard is unavailable
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{error}</p>
          <button
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-300/50"
            onClick={onRetry}
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-112px)] rounded-[2rem] bg-[linear-gradient(135deg,#dff7ff_0%,#e8f4ff_34%,#f7def4_68%,#fff0ec_100%)] p-4 text-slate-950 md:p-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/30 shadow-[0_28px_90px_rgba(56,135,210,0.16)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_76%_0%,rgba(217,70,239,0.13),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.05))]" />
        <div className="relative grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/45 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-sky-700 shadow-sm backdrop-blur">
              <TrendingUp size={14} />
              Instructor business dashboard
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-slate-900 md:text-5xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                {instructorName}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Track course performance, class activity, enrollments, and revenue
              from one focused workspace.
            </p>
          </div>

          <div className="rounded-[1.7rem] border border-white/35 bg-slate-950/75 p-5 text-white shadow-2xl shadow-sky-400/20 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">
                Total revenue
              </span>
              <Wallet size={18} className="text-cyan-200" />
            </div>
            <strong className="mt-6 block text-3xl font-black leading-none md:text-4xl">
              {formatCurrency(overview.totalRevenue)}
            </strong>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-slate-400">Completed orders</span>
              <span className="font-bold text-white">
                {formatNumber(overview.completedOrders)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Courses"
          value={formatNumber(overview.totalCourses)}
          helper={`${formatNumber(overview.totalClasses)} live classes`}
          tone="indigo"
        />
        <StatCard
          icon={Users}
          label="Students"
          value={formatNumber(overview.totalStudents)}
          helper={`${formatNumber(overview.totalEnrollments)} enrollments`}
          tone="blue"
        />
        <StatCard
          icon={CheckCircle2}
          label="Active enrollments"
          value={formatNumber(overview.activeEnrollments)}
          helper={`${formatNumber(overview.completedEnrollments)} completed`}
          tone="green"
        />
        <StatCard
          icon={Wallet}
          label="Orders"
          value={formatNumber(overview.totalOrders)}
          helper={`${formatNumber(overview.pendingOrders)} pending`}
          tone="purple"
        />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)]">
        <div className="rounded-[2rem] border border-white/70 bg-white/35 p-5 shadow-[0_18px_50px_rgba(70,120,180,0.14)] backdrop-blur-2xl">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-white/70 bg-white/45 px-3 py-1 text-xs font-black uppercase tracking-wide text-sky-700 backdrop-blur">
                Performance
              </span>
              <h2 className="mt-3 text-2xl font-black text-slate-900">
                Course performance
              </h2>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-100/80 text-sky-700 shadow-inner">
              <BarChart3 size={20} />
            </div>
          </div>

          {coursePerformance.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/80 bg-white/25 p-8 text-center backdrop-blur">
              <GraduationCap size={30} className="text-sky-600" />
              <h3 className="mt-3 text-lg font-black text-slate-900">
                No course data yet
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                Create courses and enroll students to see performance here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/25 backdrop-blur">
              <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr_1fr] bg-white/35 px-4 py-3 text-xs font-black uppercase tracking-wide text-slate-500 max-lg:hidden">
                <span>Course</span>
                <span>Enrollments</span>
                <span>Classes</span>
                <span className="text-right">Revenue</span>
              </div>
              <div className="divide-y divide-white/60">
                {coursePerformance.map((course) => (
                  <article
                    className="grid gap-4 px-4 py-4 transition hover:bg-white/35 lg:grid-cols-[1.6fr_0.8fr_0.8fr_1fr] lg:items-center"
                    key={course._id}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-14 w-16 flex-none rounded-2xl object-cover ring-2 ring-white/80"
                      />
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-black text-slate-900">
                          {course.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <span className="rounded-full bg-white/55 px-2 py-0.5 text-xs font-bold capitalize text-slate-600 backdrop-blur">
                            {course.type}
                          </span>
                          <span className="rounded-full bg-sky-100/75 px-2 py-0.5 text-xs font-bold capitalize text-sky-700">
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <Users size={15} className="text-slate-400" />
                      {formatNumber(course.totalEnrollments)}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <CalendarDays size={15} className="text-slate-400" />
                      {formatNumber(course.totalClasses)}
                    </div>
                    <div className="text-sm font-black text-slate-900 lg:text-right">
                      {formatCurrency(course.revenue)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-[2rem] border border-white/70 bg-white/35 p-5 shadow-[0_18px_50px_rgba(70,120,180,0.14)] backdrop-blur-2xl">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-white/70 bg-white/45 px-3 py-1 text-xs font-black uppercase tracking-wide text-fuchsia-700 backdrop-blur">
                Sales
              </span>
              <h2 className="mt-3 text-2xl font-black text-slate-900">
                Recent orders
              </h2>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-fuchsia-100/70 text-fuchsia-700 shadow-inner">
              <Clock3 size={20} />
            </div>
          </div>

          {recentOrders.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/80 bg-white/25 p-8 text-center backdrop-blur">
              <Wallet size={30} className="text-fuchsia-600" />
              <h3 className="mt-3 text-lg font-black text-slate-900">
                No orders yet
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                New student purchases will appear in this list.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <article
                  className="rounded-[1.4rem] border border-white/65 bg-white/25 p-4 backdrop-blur transition hover:bg-white/40"
                  key={order._id}
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 flex-none place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-fuchsia-500 text-sm font-black text-white shadow-lg shadow-sky-300/30">
                      {order.userId?.name?.charAt(0) || "S"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <strong className="truncate text-sm font-black text-slate-900">
                          {order.userId?.name || "Student"}
                        </strong>
                        <StatusPill status={order.status} />
                      </div>
                      <p className="mt-1 truncate text-sm font-semibold text-slate-600">
                        {order.courseId?.title || "Course order"}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/60 pt-3">
                        <span className="text-sm font-black text-slate-900">
                          {formatCurrency(order.price)}
                        </span>
                        {order.classId?.className && (
                          <small className="truncate text-xs font-bold text-slate-400">
                            {order.classId.className}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};

export default InstructorDashboardView;
