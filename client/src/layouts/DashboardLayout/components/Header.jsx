import { useState } from "react";
import { 
  Search, 
  Bell, 
  Settings, 
  HelpCircle, 
  Menu,
  ChevronDown,
  Command
} from "lucide-react";
import styles from "./Header.module.css";

const Header = ({ onMobileMenuClick }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className={styles.header}>
      {/* Left Section */}
      <div className={styles.headerLeft}>
        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={onMobileMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search courses, classes..."
            className={styles.searchInput}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className={styles.searchShortcut}>
            <Command size={12} />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.headerRight}>
        {/* Help Button */}
        <button className={styles.iconButton} aria-label="Help">
          <HelpCircle size={20} />
        </button>

        {/* Notifications */}
        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={20} />
          <span className={styles.notificationBadge} />
        </button>

        {/* Settings */}
        <button className={styles.iconButton} aria-label="Settings">
          <Settings size={20} />
        </button>

        <div className={styles.headerDivider} />

        {/* User Menu */}
        <button className={styles.userMenu}>
          <div className={styles.userMenuAvatar}>U</div>
          <div className={styles.userMenuInfo}>
            <div className={styles.userMenuName}>User Name</div>
            <div className={styles.userMenuRole}>Student</div>
          </div>
          <ChevronDown size={16} className={styles.userMenuChevron} />
        </button>
      </div>
    </header>
  );
};

export default Header;
