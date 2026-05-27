import { NavLink, useNavigate } from "react-router-dom";
import Nav_Sidebar from "../Nav_sidebar";

import { ChevronLeft, Sparkles } from "lucide-react";
import styles from "./Sidebar.module.css";
import { Button } from "react-bootstrap";

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const handleNavClick = () => {
  
    if (window.innerWidth <= 768) {
      setMobileOpen(false);
    }
  };
  const navigation = useNavigate();
  return (
    <>
    
      <div 
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.visible : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      
      <aside
        className={`
          ${styles.sidebar} 
          ${collapsed ? styles.collapsed : ''} 
          ${mobileOpen ? styles.mobileOpen : ''}
        `}
      >
        {/* Header */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <Sparkles size={20} />
            </div>
            <span className={styles.logoText}>LinguaAI</span>
          </div>

          <button
            className={`${styles.collapseButton} ${collapsed ? styles.rotated : ''}`}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={styles.navContainer}>
          {Nav_Sidebar.map((group, groupIndex) => (
            <div key={group.title || groupIndex} className={styles.navGroup}>
              {group.title && (
                <p className={styles.navGroupTitle}>{group.title}</p>
              )}

              {group.items?.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  data-tooltip={item.name}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <span className={styles.navIcon}>
                    {item.icon && <item.icon size={20} />}
                  </span>
                  <span className={styles.navText}>{item.name}</span>
                </NavLink>
              ))}

              {/* Single item without items array */}
              {group.path && !group.items && (
                <NavLink
                  to={group.path}
                  onClick={handleNavClick}
                  data-tooltip={group.name}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <span className={styles.navIcon}>
                    {group.icon && <group.icon size={20} />}
                  </span>
                  <span className={styles.navText}>{group.name}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Footer - User Profile */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>U</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>User Name</div>
              <div className={styles.userRole}>Student</div>
            </div>
            <div>
            <Button onClick={()=>{
              localStorage.removeItem("token");
              navigation("/login")
            }}>
              Log out
            </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
