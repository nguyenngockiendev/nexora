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
import { useOutletContext } from "react-router-dom";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

const formatNumber = (value) => Number(value || 0).toLocaleString("vi-VN");

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
    purple: {
      bg: "rgba(139,92,246,0.1)",
      border: "rgba(139,92,246,0.2)",
      iconBg: "rgba(139,92,246,0.12)",
      iconColor: "#7c3aed",
      glow: "rgba(139,92,246,0.12)",
    },
  };
  const t = tones[tone] || tones.indigo;

  return (
    <div
      className="group rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default"
      style={{
        background: `rgba(255,255,255,0.6)`,
        border: `1px solid ${t.border}`,
        backdropFilter: "blur(20px)",
        boxShadow: `0 8px 32px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
      }}
    >
      <div
        className="mb-4 grid h-11 w-11 place-items-center rounded-2xl"
        style={{ background: t.iconBg, boxShadow: `0 0 16px ${t.glow}` }}
      >
        <Icon size={20} style={{ color: t.iconColor }} />
      </div>
      <p className="mb-1 text-sm font-semibold" style={{ color: "#64748b" }}>
        {label}
      </p>
      <strong
        className="block text-3xl font-black leading-none"
        style={{ color: "#1e293b" }}
      >
        {value}
      </strong>
      {helper && (
        <span
          className="mt-2 block text-xs font-medium"
          style={{ color: "#94a3b8" }}
        >
          {helper}
        </span>
      )}
    </div>
  );
};

const StatusPill = ({ status }) => {
  const styles = {
    completed: {
      bg: "rgba(16,185,129,0.1)",
      color: "#059669",
      border: "rgba(16,185,129,0.25)",
      label: "Hoàn thành",
    },
    pending: {
      bg: "rgba(245,158,11,0.12)",
      color: "#d97706",
      border: "rgba(245,158,11,0.3)",
      label: "Đang xử lý",
    },
  };
  const s = styles[status] || {
    bg: "rgba(239,68,68,0.1)",
    color: "#dc2626",
    border: "rgba(239,68,68,0.25)",
    label: "Thất bại",
  };

  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-xs font-bold"
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
      }}
    >
      {s.label || status}
    </span>
  );
};

const InstructorDashboardView = ({ dashboard, error, loading, onRetry }) => {
  const overview = dashboard?.overview || {};
  const coursePerformance = dashboard?.coursePerformance || [];
  const recentOrders = dashboard?.recentOrders || [];
  const { dashboard: intructorname } = useOutletContext();

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div
          className="rounded-3xl p-6 animate-pulse"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
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
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.75)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 md:p-6 flex items-center justify-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="mx-auto max-w-xl flex flex-col items-center rounded-3xl p-8 text-center"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(239,68,68,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="grid h-12 w-12 place-items-center rounded-2xl"
            style={{
              background: "rgba(249,115,22,0.1)",
              boxShadow: "0 0 20px rgba(249,115,22,0.15)",
            }}
          >
            <BarChart3 size={24} style={{ color: "#ea580c" }} />
          </div>
          <h2 className="mt-4 text-2xl font-black" style={{ color: "#1e293b" }}>
            Không thể tải bảng điều khiển
          </h2>
          <p className="mt-2 text-sm leading-6" style={{ color: "#64748b" }}>
            {error}
          </p>
          <button
            className="mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgba(249,115,22,0.8), rgba(251,146,60,0.7))",
              boxShadow: "0 8px 24px rgba(249,115,22,0.25)",
              border: "1px solid rgba(249,115,22,0.3)",
            }}
            onClick={onRetry}
          >
            <RefreshCw size={16} />
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <section
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8"
        style={{
          background: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.8)",
          backdropFilter: "blur(32px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(194,110,30,0.08)",
        }}
      >
        <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{
                background: "rgba(249,115,22,0.12)",
                border: "1px solid rgba(249,115,22,0.25)",
                color: "#ea580c",
              }}
            >
              <TrendingUp size={13} />
              Tổng quan giảng viên
            </div>
            <h1
              className="mt-5 max-w-2xl text-4xl font-black leading-tight md:text-5xl"
              style={{ color: "#1e293b" }}
            >
              Chào mừng trở lại,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #f97316, #f59e0b, #fb923c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {intructorname?.name}
              </span>
            </h1>
            <p
              className="mt-4 max-w-xl text-base leading-7"
              style={{ color: "#64748b" }}
            >
              Theo dõi hiệu quả khóa học, lớp trực tuyến, lượt đăng ký và doanh
              thu trong cùng một không gian làm việc.
            </p>
          </div>

          <div
            className="rounded-3xl p-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(251,146,60,0.12) 100%)",
              border: "1px solid rgba(249,115,22,0.25)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 32px rgba(194,110,30,0.12)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-semibold"
                style={{ color: "#64748b" }}
              >
                Tổng doanh thu
              </span>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  boxShadow: "0 0 12px rgba(249,115,22,0.2)",
                }}
              >
                <Wallet size={16} style={{ color: "#ea580c" }} />
              </div>
            </div>
            <strong
              className="mt-6 block text-3xl font-black leading-none md:text-4xl"
              style={{ color: "#1e293b" }}
            >
              {formatCurrency(overview.totalRevenue)}
            </strong>
            <div
              className="mt-5 flex items-center justify-between border-t pt-4 text-sm"
              style={{ borderColor: "rgba(249,115,22,0.15)" }}
            >
              <span style={{ color: "#64748b" }}>Đơn hàng hoàn tất</span>
              <span className="font-bold" style={{ color: "#1e293b" }}>
                {formatNumber(overview.completedOrders)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Khóa học"
          value={formatNumber(overview.totalCourses)}
          helper={`${formatNumber(overview.totalClasses)} lớp trực tuyến`}
          tone="indigo"
        />
        <StatCard
          icon={Users}
          label="Học viên"
          value={formatNumber(overview.totalStudents)}
          helper={`${formatNumber(overview.totalEnrollments)} lượt đăng ký`}
          tone="blue"
        />
        <StatCard
          icon={CheckCircle2}
          label="Đang theo học"
          value={formatNumber(overview.activeEnrollments)}
          helper={`${formatNumber(overview.completedEnrollments)} đã hoàn thành`}
          tone="green"
        />
        <StatCard
          icon={Wallet}
          label="Đơn hàng"
          value={formatNumber(overview.totalOrders)}
          helper={`${formatNumber(overview.pendingOrders)} đang xử lý`}
          tone="purple"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <div
          className="rounded-3xl p-5"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(194,110,30,0.08)",
          }}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(249,115,22,0.12)",
                  color: "#ea580c",
                  border: "1px solid rgba(249,115,22,0.25)",
                }}
              >
                Hiệu quả
              </span>
              <h2
                className="mt-3 text-2xl font-black"
                style={{ color: "#1e293b" }}
              >
                Hiệu quả khóa học
              </h2>
            </div>
            <div
              className="grid h-10 w-10 place-items-center rounded-2xl"
              style={{
                background: "rgba(249,115,22,0.12)",
                boxShadow: "0 0 12px rgba(249,115,22,0.15)",
              }}
            >
              <BarChart3 size={18} style={{ color: "#ea580c" }} />
            </div>
          </div>

          {coursePerformance.length === 0 ? (
            <div
              className="flex min-h-52 flex-col items-center justify-center rounded-2xl p-8 text-center"
              style={{
                background: "rgba(255,255,255,0.5)",
                border: "1px dashed rgba(249,115,22,0.2)",
              }}
            >
              <GraduationCap
                size={28}
                style={{ color: "#f97316", opacity: 0.6 }}
              />
              <h3
                className="mt-3 text-lg font-black"
                style={{ color: "#1e293b" }}
              >
                Chưa có dữ liệu khóa học
              </h3>
              <p
                className="mt-2 max-w-sm text-sm leading-6"
                style={{ color: "#64748b" }}
              >
                Tạo khóa học và tuyển sinh để theo dõi hiệu quả tại đây.
              </p>
            </div>
          ) : (
            <div
              className="overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.75)" }}
            >
              <div
                className="grid grid-cols-[1.6fr_0.8fr_0.8fr_1fr] px-4 py-3 text-xs font-bold uppercase tracking-wider max-lg:hidden"
                style={{
                  background: "rgba(249,115,22,0.04)",
                  color: "#94a3b8",
                }}
              >
                <span>Khóa học</span>
                <span>Lượt đăng ký</span>
                <span>Lớp học</span>
                <span className="text-right">Doanh thu</span>
              </div>
              <div
                className="divide-y"
                style={{ borderColor: "rgba(249,115,22,0.08)" }}
              >
                {coursePerformance.map((course) => (
                  <article
                    className="grid gap-4 px-4 py-4 transition-all lg:grid-cols-[1.6fr_0.8fr_0.8fr_1fr] lg:items-center"
                    style={{ ["--tw-bg-opacity"]: 1 }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(249,115,22,0.02)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                    key={course._id}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-12 w-14 flex-none rounded-xl object-cover"
                        style={{ border: "1px solid rgba(255,255,255,0.75)" }}
                      />
                      <div className="min-w-0">
                        <h3
                          className="truncate text-sm font-bold"
                          style={{ color: "#1e293b" }}
                        >
                          {course.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <span
                            className="rounded-full px-2 py-0.5 text-xs font-semibold capitalize"
                            style={{
                              background: "rgba(255,255,255,0.5)",
                              color: "#64748b",
                            }}
                          >
                            {course.type === "live" ? "Trực tuyến" : "Tự học"}
                          </span>
                          <span
                            className="rounded-full px-2 py-0.5 text-xs font-semibold capitalize"
                            style={{
                              background: "rgba(249,115,22,0.1)",
                              color: "#ea580c",
                            }}
                          >
                            {course.level === "beginner"
                              ? "Cơ bản"
                              : course.level === "intermediate"
                                ? "Trung cấp"
                                : course.level === "advanced"
                                  ? "Nâng cao"
                                  : course.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 text-sm font-bold"
                      style={{ color: "#64748b" }}
                    >
                      <Users size={14} style={{ color: "#94a3b8" }} />
                      {formatNumber(course.totalEnrollments)}
                    </div>
                    <div
                      className="flex items-center gap-2 text-sm font-bold"
                      style={{ color: "#64748b" }}
                    >
                      <CalendarDays size={14} style={{ color: "#94a3b8" }} />
                      {formatNumber(course.totalClasses)}
                    </div>
                    <div
                      className="text-sm font-black lg:text-right"
                      style={{ color: "#1e293b" }}
                    >
                      {formatCurrency(course.revenue)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside
          className="rounded-3xl p-5"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), 0 16px 48px rgba(194,110,30,0.08)",
          }}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(249,115,22,0.12)",
                  color: "#ea580c",
                  border: "1px solid rgba(249,115,22,0.25)",
                }}
              >
                Bán hàng
              </span>
              <h2
                className="mt-3 text-2xl font-black"
                style={{ color: "#1e293b" }}
              >
                Đơn hàng gần đây
              </h2>
            </div>
            <div
              className="grid h-10 w-10 place-items-center rounded-2xl"
              style={{
                background: "rgba(249,115,22,0.12)",
                boxShadow: "0 0 12px rgba(249,115,22,0.15)",
              }}
            >
              <Clock3 size={18} style={{ color: "#ea580c" }} />
            </div>
          </div>

          {recentOrders.length === 0 ? (
            <div
              className="flex min-h-52 flex-col items-center justify-center rounded-2xl p-8 text-center"
              style={{
                background: "rgba(255,255,255,0.5)",
                border: "1px dashed rgba(249,115,22,0.2)",
              }}
            >
              <Wallet size={28} style={{ color: "#f97316", opacity: 0.6 }} />
              <h3
                className="mt-3 text-lg font-black"
                style={{ color: "#1e293b" }}
              >
                Chưa có đơn hàng nào
              </h3>
              <p
                className="mt-2 max-w-sm text-sm leading-6"
                style={{ color: "#64748b" }}
              >
                Các giao dịch mua khóa học mới của học viên sẽ xuất hiện tại
                đây.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <article
                  className="rounded-2xl p-4 transition-all"
                  key={order._id}
                  style={{
                    background: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.75)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(249,115,22,0.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.5)")
                  }
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="grid h-10 w-10 flex-none place-items-center rounded-xl text-sm font-black text-white"
                      style={{
                        background: "linear-gradient(135deg, #f97316, #fb923c)",
                        boxShadow: "0 4px 12px rgba(249,115,22,0.25)",
                      }}
                    >
                      {order.userId?.name?.charAt(0) || "H"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <strong
                          className="truncate text-sm font-bold"
                          style={{ color: "#1e293b" }}
                        >
                          {order.userId?.name || "Học viên"}
                        </strong>
                        <StatusPill status={order.status} />
                      </div>
                      <p
                        className="mt-1 truncate text-sm"
                        style={{ color: "#64748b" }}
                      >
                        {order.courseId?.title || "Đơn mua khóa học"}
                      </p>
                      <div
                        className="mt-3 flex items-center justify-between gap-3 border-t pt-3"
                        style={{ borderColor: "rgba(249,115,22,0.12)" }}
                      >
                        <span
                          className="text-sm font-black"
                          style={{ color: "#1e293b" }}
                        >
                          {formatCurrency(order.price)}
                        </span>
                        {order.classId?.className && (
                          <small
                            className="truncate text-xs"
                            style={{ color: "#94a3b8" }}
                          >
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
