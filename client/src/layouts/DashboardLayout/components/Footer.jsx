import { Sparkles } from "lucide-react";
import styles from "./Footer.module.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
 return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <div className={styles.footerLogo}>
          <Sparkles size={12} />
        </div>
        <span className={styles.footerBrand}>LinguaAI</span>
        <span>&copy; {currentYear}</span>
      </div>

      <div className={styles.footerRight}>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Documentation</a>
          <a href="#" className={styles.footerLink}>Support</a>
          <a href="#" className={styles.footerLink}>Privacy</a>
          <a href="#" className={styles.footerLink}>Terms</a>
        </div>

        <div className={styles.footerStatus}>
          <span className={styles.statusDot} />
          <span>All systems operational</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
