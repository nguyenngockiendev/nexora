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
    title: "Recorded & Live Courses",
    description:
      "Learn at your own pace or join interactive live classes with expert instructors.",
  },
  {
    icon: Bot,
    title: "AI-Powered Quizzes",
    description:
      "Auto-generate quizzes from PDFs and video transcripts to reinforce learning.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Class Chat",
    description:
      "Collaborate with classmates and instructors during live sessions instantly.",
  },
  {
    icon: Video,
    title: "Live Classroom",
    description:
      "Join virtual classrooms with seamless video integration and class management.",
  },
];

const stats = [
  { value: "10K+", label: "Active Learners" },
  { value: "500+", label: "Courses" },
  { value: "98%", label: "Satisfaction" },
  { value: "50+", label: "Instructors" },
];

const testimonials = [
  {
    name: "Minh Anh",
    role: "English Learner",
    text: "The AI quiz feature helped me review lessons faster. Everything feels modern and easy to use.",
    rating: 5,
  },
  {
    name: "Hoàng Tuấn",
    role: "Instructor",
    text: "Managing live classes and students in one place saved me hours every week.",
    rating: 5,
  },
];

function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.bgMesh} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Sparkles size={18} />
            </div>
            <span>LinguaAI</span>
          </div>

          <nav className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#testimonials">Reviews</a>
          </nav>

          <div className={styles.navActions}>
            <Link to="/login" className={styles.btnGhost}>
              Sign in
            </Link>
            <Link to="/register" className={styles.btnPrimary}>
              Get started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <Zap size={14} />
          <span>AI-enhanced learning platform</span>
        </div>

        <h1 className={styles.heroTitle}>
          Learn smarter with
          <span className={styles.gradientText}> modern LMS</span>
        </h1>

        <p className={styles.heroSubtitle}>
          A complete learning platform for recorded courses, live classes, AI
          quizzes, and real-time collaboration — built for students and
          instructors.
        </p>

        <div className={styles.heroActions}>
          <Link to="/register" className={styles.btnPrimaryLg}>
            Start learning free
            <ArrowRight size={18} />
          </Link>
          <a href="#features" className={styles.btnGlassLg}>
            <Play size={16} />
            Explore features
          </a>
        </div>

        {/* Hero preview card */}
        <div className={styles.heroPreview}>
          <div className={styles.previewGlass}>
            <div className={styles.previewHeader}>
              <div className={styles.previewDots}>
                <span />
                <span />
                <span />
              </div>
              <span className={styles.previewLabel}>Dashboard Preview</span>
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

        {/* Stats */}
        <div className={styles.statsRow}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Features</span>
          <h2>Everything you need to teach and learn</h2>
          <p>
            From course creation to live sessions and AI-assisted assessments.
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

      {/* How it works */}
      <section id="how-it-works" className={styles.section}>
        <div className={styles.glassPanel}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>How it works</span>
            <h2>Get started in 3 simple steps</h2>
          </div>

          <div className={styles.stepsRow}>
            {[
              {
                step: "01",
                icon: Users,
                title: "Create account",
                desc: "Sign up as a student or instructor in seconds.",
              },
              {
                step: "02",
                icon: GraduationCap,
                title: "Join or create",
                desc: "Enroll in courses or build your own curriculum.",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Learn & grow",
                desc: "Attend classes, take AI quizzes, track progress.",
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

      {/* Testimonials */}
      <section id="testimonials" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Testimonials</span>
          <h2>Loved by learners and instructors</h2>
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

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2>Ready to transform your learning experience?</h2>
          <p>Join thousands of learners on LinguaAI today.</p>
          <Link to="/register" className={styles.btnPrimaryLg}>
            Get started for free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Sparkles size={16} />
            </div>
            <span>LinguaAI</span>
          </div>
          <p className={styles.footerCopy}>
            &copy; 2026 LinguaAI. Demo homepage — independent preview.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
