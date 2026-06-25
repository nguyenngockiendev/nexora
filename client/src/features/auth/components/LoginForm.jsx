import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail, Sparkles, Zap } from "lucide-react";
import styles from "../style/LoginForm.module.css";

const LoginForm = ({
  register,
  handleSubmit,
  loading,
  error,
  onSubmit,
}) => {
  return (
    <div className={styles.page}>
      {/* Background decorations */}
      <div className={styles.bgMesh} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className={styles.card}>
        {/* ── LEFT: Form Panel ── */}
        <div className={styles.formPanel}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Sparkles size={18} />
            </div>
            <span className={styles.logoText}>LinguaAI</span>
          </div>

          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.subheading}>
            Sign in to continue your learning journey
          </p>

          {/* Error */}
          {error && (
            <div className={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <Mail size={17} />
                </span>
                <input
                  className={styles.input}
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <Lock size={17} />
                </span>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>
            </div>

            {/* Footer: Submit + Forgot */}
            <div className={styles.formFooter}>
              <button
                type="submit"
                className={styles.btnSubmit}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight size={16} />}
              </button>

              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        {/* ── RIGHT: Info Panel ── */}
        <div className={styles.infoPanel}>
          <div className={`${styles.infoPanelOrb} ${styles.infoPanelOrb1}`} />
          <div className={`${styles.infoPanelOrb} ${styles.infoPanelOrb2}`} />

          <div className={styles.infoBadge}>
            <Zap size={12} />
            AI-enhanced learning
          </div>

          <h2 className={styles.infoTitle}>
            Start Learning Today
          </h2>

          <p className={styles.infoDesc}>
            Join thousands of students learning modern web development,
            live classes, and real projects.
          </p>

          <ul className={styles.infoList}>
            <li className={styles.infoListItem}>
              <span className={styles.infoListIcon}>✓</span>
              Live classes with expert instructors
            </li>
            <li className={styles.infoListItem}>
              <span className={styles.infoListIcon}>✓</span>
              AI-powered quizzes from your content
            </li>
            <li className={styles.infoListItem}>
              <span className={styles.infoListIcon}>✓</span>
              Lifetime access to recorded courses
            </li>
          </ul>

          <Link to="/register" className={styles.btnRegister}>
            Create free account
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
