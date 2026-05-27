import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Content Area */}
      <div className={`${styles.contentArea} ${collapsed ? styles.collapsed : ''}`}>
        {/* Header */}
        <Header onMobileMenuClick={handleMobileMenuClick} />

        {/* Main Content */}
        <main className={styles.mainContent}>
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
