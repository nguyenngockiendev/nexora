import { NavLink, useNavigate } from "react-router-dom";
import Nav_Sidebar from "../Nav_sidebar";
import { ChevronLeft, Sparkles, LogOut } from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const handleNavClick = () => {
    if (window.innerWidth <= 768) setMobileOpen(false);
  };
  const navigation = useNavigate();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-orange-950/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-3 left-3 bottom-3 z-50 flex flex-col transition-all duration-300 ease-in-out rounded-[28px] overflow-hidden
          ${collapsed ? 'w-[68px]' : 'w-[248px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-[calc(100%+12px)] md:translate-x-0'}
        `}
        style={{
          background: 'rgba(255, 252, 248, 0.72)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 0 60px rgba(249,115,22,0.1), 0 24px 64px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', boxShadow: '0 4px 14px rgba(249,115,22,0.4)' }}
          >
            <Sparkles size={15} className="text-white" />
          </div>

          <span className={`font-bold text-base text-slate-800 tracking-tight whitespace-nowrap transition-all duration-300 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'opacity-100'}`}>
            LinguaAI
          </span>

          {!collapsed && (
            <button
              className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-orange-500 transition-colors shrink-0"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={15} />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            className="mx-auto mb-2 w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-orange-500 transition-colors shrink-0"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
          >
            <ChevronLeft size={15} className="rotate-180" />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-2 flex flex-col gap-5">
          {Nav_Sidebar.map((group, groupIndex) => (
            <div key={group.title || groupIndex} className="flex flex-col gap-0.5">
              {group.title && !collapsed && (
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 px-3 mb-1">
                  {group.title}
                </p>
              )}

              {(group.items || (group.path ? [group] : [])).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    `nav-item-wave relative flex items-center gap-3 px-3 py-2.5 rounded-2xl
                     transition-all duration-200 ease-out
                     ${collapsed ? 'justify-center' : ''}
                     ${isActive
                       ? 'text-orange-600 -translate-y-px font-semibold'
                       : 'text-slate-500 hover:text-slate-800 hover:-translate-y-0.5'
                     }`
                  }
                  style={({ isActive }) => isActive ? {
                    background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(251,146,60,0.07))',
                  } : {}}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full"
                          style={{ background: 'linear-gradient(to bottom, #f97316, #fb923c)', boxShadow: '0 0 8px rgba(249,115,22,0.6)' }}
                        />
                      )}
                      <span className={`shrink-0 ${isActive ? 'text-orange-500' : ''}`}>
                        {item.icon && <item.icon size={18} />}
                      </span>
                      <span className={`text-sm whitespace-nowrap transition-all duration-200 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'opacity-100'}`}>
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className={`px-2 pb-3 shrink-0 flex flex-col gap-1 ${collapsed ? 'items-center' : ''}`}>
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl ${collapsed ? 'justify-center' : ''}`}>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', boxShadow: '0 4px 10px rgba(249,115,22,0.3)' }}
            >
              U
            </div>
            <div className={`min-w-0 transition-all duration-200 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'opacity-100'}`}>
              <div className="text-sm font-semibold text-slate-800 truncate">User Name</div>
              <div className="text-xs text-slate-400">Student</div>
            </div>
          </div>

          <button
            className={`nav-item-wave relative flex items-center gap-2.5 px-3 py-2.5 rounded-2xl
              transition-all duration-200 ease-out
              text-slate-400 hover:text-red-500 hover:-translate-y-0.5
              w-full ${collapsed ? 'justify-center' : ''}`}
            onClick={() => {
              localStorage.removeItem("token");
              navigation("/login");
            }}
            title={collapsed ? "Log out" : undefined}
          >
            <LogOut size={16} />
            {!collapsed && <span className="text-sm font-medium">Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
