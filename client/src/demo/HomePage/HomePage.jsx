import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  GraduationCap,
  MessageSquare,
  Play,
  Sparkles,
  Star,
  Users,
  Video,
  Zap,
} from "lucide-react";
import styles from "./HomePage.module.css";

const features = [
  {
    icon: BookOpen,
    title: "Khóa Học Video & Trực Tuyến",
    description:
      "Tự học linh hoạt theo tiến độ cá nhân hoặc tham gia các lớp học trực tiếp tương tác cùng giảng viên.",
  },
  {
    icon: Bot,
    title: "Trắc Nghiệm & Quiz AI",
    description:
      "Tự động tạo bộ câu hỏi trắc nghiệm thông minh từ tài liệu PDF và phụ đề video giúp củng cố kiến thức.",
  },
  {
    icon: MessageSquare,
    title: "Trò Chuyện Thời Gian Thực",
    description:
      "Trao đổi, thảo luận trực tiếp cùng bạn bè và giảng viên ngay trong suốt buổi học.",
  },
  {
    icon: Video,
    title: "Phòng Học Trực Tuyến (Live Class)",
    description:
      "Tham gia phòng học ảo tích hợp video chất lượng cao và quản lý lớp học toàn diện.",
  },
];

const stats = [
  { value: "10.000+", label: "Học viên năng động" },
  { value: "500+", label: "Khóa học chất lượng" },
  { value: "98%", label: "Tỷ lệ hài lòng" },
  { value: "50+", label: "Giảng viên chuyên gia" },
];

const testimonials = [
  {
    name: "Minh Anh",
    role: "Học viên Lập trình",
    text: "Tính năng bóc tách nội dung video và tạo Quiz AI giúp mình ôn bài nhanh gấp 3 lần. Giao diện trực quan và cực kỳ hiện đại!",
    rating: 5,
  },
  {
    name: "Hoàng Tuấn",
    role: "Giảng viên",
    text: "Quản lý khóa học, bài giảng và lớp học trực tiếp trên cùng một hệ thống giúp tôi tiết kiệm hàng giờ mỗi tuần.",
    rating: 5,
  },
];

function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.bgMesh} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className="font-black text-amber-400">N</span>
            </div>
            <span>Nexora LMS</span>
          </div>

          <nav className={styles.navLinks}>
            <a href="#features">Tính năng</a>
            <a href="#how-it-works">Quy trình</a>
            <a href="#testimonials">Đánh giá</a>
          </nav>

          <div className={styles.navActions}>
            <Link to="/login" className={styles.btnGhost}>
              Đăng nhập
            </Link>
            <Link to="/register" className={styles.btnPrimary}>
              Bắt đầu ngay
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <Zap size={14} />
          <span>Nền tảng học tập thông minh &amp; AI LMS</span>
        </div>

        <h1 className={styles.heroTitle}>
          Học thông minh hơn cùng
          <span className={styles.gradientText}> Nexora LMS</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Nền tảng học tập trực tuyến toàn diện kết hợp khóa học video, lớp học
          trực tiếp, bài tập trắc nghiệm AI và tương tác thời gian thực dành cho
          học viên và giảng viên.
        </p>

        <div className={styles.heroActions}>
          <Link to="/register" className={styles.btnPrimaryLg}>
            Bắt đầu học miễn phí
            <ArrowRight size={18} />
          </Link>
          <a href="#features" className={styles.btnGlassLg}>
            <Play size={16} />
            Khám phá tính năng
          </a>
        </div>

        <div className={styles.heroPreview}>
          <div className={styles.previewGlass}>
            <div className={styles.previewHeader}>
              <div className={styles.previewDots}>
                <span />
                <span />
                <span />
              </div>
              <span className={styles.previewLabel}>
                Xem trước bảng điều khiển
              </span>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewSidebar}>
                <div className={styles.previewNavItem} data-active />
                <div className={styles.previewNavItem} />
                <div className={styles.previewNavItem} />
                <div className={styles.previewNavItem} />
              </div>
              <div className={styles.previewContent}>
                <div className={styles.previewStatRow}>
                  <div className={styles.previewStat} />
                  <div className={styles.previewStat} />
                  <div className={styles.previewStat} />
                </div>
                <div className={styles.previewCardRow}>
                  <div className={styles.previewCard} />
                  <div className={styles.previewCard} />
                  <div className={styles.previewCard} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsRow}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Tính năng nổi bật</span>
          <h2>Tất cả những gì bạn cần để dạy và học hiệu quả</h2>
          <p>
            Từ tạo khóa học, quản lý lớp trực tuyến đến đánh giá năng lực tự động
            với trợ lý AI.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <feature.icon size={22} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className={styles.section}>
        <div className={styles.glassPanel}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Quy trình đơn giản</span>
            <h2>Bắt đầu hành trình chỉ với 3 bước</h2>
          </div>

          <div className={styles.stepsRow}>
            {[
              {
                step: "01",
                icon: Users,
                title: "Tạo tài khoản",
                desc: "Đăng ký tài khoản học viên hoặc giảng viên chỉ trong vài giây.",
              },
              {
                step: "02",
                icon: GraduationCap,
                title: "Chọn khóa học",
                desc: "Ghi danh các khóa học yêu thích hoặc tự xây dựng giáo trình giảng dạy.",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Học tập & Bứt phá",
                desc: "Tham gia lớp học, làm bài trắc nghiệm AI và nâng cao trình độ nhanh chóng.",
              },
            ].map((item) => (
              <div key={item.step} className={styles.stepCard}>
                <span className={styles.stepNumber}>{item.step}</span>
                <div className={styles.stepIcon}>
                  <item.icon size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Đánh giá từ cộng đồng</span>
          <h2>Được tin dùng bởi học viên và giảng viên</h2>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((item) => (
            <div key={item.name} className={styles.testimonialCard}>
              <div className={styles.stars}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className={styles.testimonialText}>&ldquo;{item.text}&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2>Sẵn sàng nâng tầm trải nghiệm học tập của bạn?</h2>
          <p>Tham gia cùng hơn 10.000+ học viên trên Nexora LMS ngay hôm nay.</p>
          <Link to="/register" className={styles.btnPrimaryLg}>
            Bắt đầu miễn phí ngay
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className="font-black text-amber-400">N</span>
            </div>
            <span>Nexora LMS</span>
          </div>
          <p className={styles.footerCopy}>
            &copy; 2026 Nexora LMS. Nền tảng công nghệ giáo dục trực tuyến thế hệ
            mới.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
