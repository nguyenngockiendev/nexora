import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff8f3 0%, #fef3e8 40%, #fdf0e8 70%, #f9f5ff 100%)' }}>
      {/* Ambient Glow Orbs - Warm Light */}
      <div className="fixed w-[700px] h-[700px] -top-[200px] -left-[150px] rounded-full bg-orb-1 pointer-events-none z-0 opacity-60" />
      <div className="fixed w-[600px] h-[600px] -bottom-[150px] -right-[150px] rounded-full bg-orb-2 pointer-events-none z-0 opacity-50" />
      <div className="fixed w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orb-3 pointer-events-none z-0 opacity-40" />
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />

      {/* Sidebar - Floating Island */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Content Area - no header */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out z-10 ${collapsed ? 'md:ml-[80px]' : 'md:ml-[260px]'} ml-0`}>
        <main className="flex-1 p-3 md:p-5 overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;

