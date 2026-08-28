import { NavLink, useNavigate } from "react-router-dom";
import Nav_Sidebar from "../Nav_sidebar";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useCart } from "../../../features/cart/hooks/useCart";

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  dashboard,
}) => {
  const { cartItems } = useCart();
  const handleNavClick = () => {
    if (window.innerWidth <= 768) setMobileOpen(false);
  };
  const navigation = useNavigate();

  return (
    <>
      <div
        className={`fixed inset-0 bg-orange-950/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-3 left-3 bottom-3 z-50 flex flex-col transition-all duration-300 ease-in-out rounded-[28px]
          ${collapsed ? "w-[72px]" : "w-[250px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-[calc(100%+12px)] md:translate-x-0"}
        `}
        style={{
          background: "rgba(255, 252, 248, 0.85)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 0 40px rgba(249,115,22,0.08), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <div
          className={`flex items-center h-16 shrink-0 transition-all ${
            collapsed ? "justify-center px-2" : "justify-between px-4"
          }`}
        >
          <div
            onClick={() => collapsed && setCollapsed(false)}
            className={`flex items-center gap-3 cursor-pointer ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? "Nhấn để mở rộng menu" : undefined}
          >
            <img
              src="/logo.svg"
              alt="Nexora Logo"
              className="w-8 h-8 object-contain shrink-0 transition-transform hover:scale-105"
            />
            {!collapsed && (
              <span className="font-extrabold text-base text-slate-800 tracking-tight whitespace-nowrap">
                Nexora LMS
              </span>
            )}
          </div>

          {!collapsed && (
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all shrink-0 cursor-pointer"
              onClick={() => setCollapsed(true)}
              aria-label="Thu gọn thanh bên"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 pb-2 flex flex-col gap-4 custom-scrollbar">
          {Nav_Sidebar.map((group, groupIndex) => (
            <div
              key={group.title || groupIndex}
              className="flex flex-col gap-1"
            >
              {group.title && !collapsed && (
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 px-3 mb-1">
                  {group.title}
                </p>
              )}

              {(group.items || (group.path ? [group] : []))
                .filter(
                  (item) => !item.roles || item.roles.includes(dashboard?.role),
                )
                .map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end
                    onClick={handleNavClick}
                    title={collapsed ? item.name : undefined}
                    className={({ isActive }) =>
                      `flex items-center rounded-2xl transition-all duration-200 ease-out cursor-pointer no-underline outline-none focus:outline-none select-none
                      ${
                        collapsed
                          ? "w-11 h-11 mx-auto justify-center"
                          : "gap-3 px-3.5 py-2.5 w-full"
                      }
                      ${
                        isActive
                          ? "font-bold shadow-xs"
                          : "text-slate-600 hover:text-orange-600 hover:bg-white/60"
                      }`
                    }
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      outline: "none",
                      ...(isActive
                        ? {
                            background:
                              "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,146,60,0.08))",
                            color: "#ea580c",
                          }
                        : {
                            color: "#475569",
                          }),
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className="relative shrink-0 transition-colors flex items-center justify-center"
                          style={{ color: isActive ? "#ea580c" : "#64748b" }}
                        >
                          {item.icon && <item.icon size={19} />}
                          {collapsed && item.path === "cart" && cartItems?.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                              {cartItems.length > 9 ? "9+" : cartItems.length}
                            </span>
                          )}
                        </span>
                        {!collapsed && (
                          <div className="flex items-center justify-between flex-1 min-w-0">
                            <span
                              className="text-sm font-semibold whitespace-nowrap truncate no-underline"
                              style={{ color: isActive ? "#ea580c" : "#334155" }}
                            >
                              {item.name}
                            </span>
                            {item.path === "cart" && cartItems?.length > 0 && (
                              <span className="ml-auto px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-black shadow-xs shrink-0">
                                {cartItems.length > 9 ? "9+" : cartItems.length}
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
            </div>
          ))}
        </nav>

        <div
          className={`px-2 pb-3 shrink-0 flex flex-col gap-1.5 pt-2 border-t border-orange-100/50 ${
            collapsed ? "items-center" : ""
          }`}
        >
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all cursor-pointer mb-1"
              title="Mở rộng menu"
            >
              <ChevronRight size={18} />
            </button>
          )}

          <div
            onClick={() => navigation("/profile")}
            className={`flex items-center rounded-2xl cursor-pointer hover:bg-orange-500/10 transition-colors ${
              collapsed
                ? "w-11 h-11 justify-center mx-auto"
                : "gap-3 px-3 py-2"
            }`}
            title="Xem thông tin cá nhân"
          >
            {dashboard?.avatar ? (
              <img
                src={dashboard?.avatar}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0"
                alt="Avatar"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{
                  background: "linear-gradient(135deg, #f97316, #fb923c)",
                  boxShadow: "0 4px 10px rgba(249,115,22,0.3)",
                }}
              >
                {(dashboard?.name || "U")[0].toUpperCase()}
              </div>
            )}
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-slate-800 truncate">
                  {dashboard?.name || "Học viên"}
                </div>
                <div className="text-xs text-slate-400">
                  {dashboard?.role
                    ? dashboard?.role.charAt(0).toUpperCase() +
                      dashboard?.role.slice(1)
                    : "Student"}
                </div>
              </div>
            )}
          </div>

          <button
            className={`flex items-center rounded-2xl transition-all duration-200 ease-out text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer ${
              collapsed
                ? "w-11 h-11 justify-center mx-auto"
                : "gap-2.5 px-3 py-2 w-full"
            }`}
            onClick={() => {
              localStorage.removeItem("token");
              navigation("/login");
            }}
            title={collapsed ? "Đăng xuất" : undefined}
          >
            <LogOut size={17} />
            {!collapsed && (
              <span className="text-sm font-semibold">Đăng xuất</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
