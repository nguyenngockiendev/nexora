import { useState } from "react";
import { Search, Bell, Settings, HelpCircle, Menu, ChevronDown, Command } from "lucide-react";

const Header = ({ onMobileMenuClick }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 h-[72px] px-4 md:px-6 flex items-center justify-between border-b border-white/[0.06]"
      style={{
        background: 'rgba(7, 13, 31, 0.6)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent pointer-events-none" />

      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/10 hover:border-white/20"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          onClick={onMobileMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className={`relative hidden sm:flex items-center transition-all duration-300 ${searchFocused ? 'w-80' : 'w-60'}`}>
          <Search
            size={16}
            className={`absolute left-3.5 transition-colors duration-300 ${searchFocused ? 'text-blue-400' : 'text-slate-500'}`}
          />
          <input
            type="text"
            placeholder="Search courses, classes..."
            className="glass-input w-full h-10 pl-10 pr-14 text-sm"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="absolute right-3 flex items-center gap-1 px-1.5 py-0.5 rounded-lg border border-white/10 text-[10px] font-bold text-slate-500"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Command size={11} />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5">
          <button
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            aria-label="Help"
          >
            <HelpCircle size={18} />
          </button>

          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 border border-[#070d1f]"
              style={{ boxShadow: '0 0 6px rgba(59,130,246,0.8)' }} />
          </button>

          <button
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        </div>

        <div className="w-[1px] h-7 bg-white/[0.08] hidden sm:block" />

        {/* User Menu */}
        <button
          className="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 0 12px rgba(59,130,246,0.4)' }}>
            U
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold text-white leading-tight">User Name</div>
            <div className="text-xs text-slate-500 font-medium">Student</div>
          </div>
          <ChevronDown size={14} className="text-slate-600 hidden sm:block ml-1" />
        </button>
      </div>
    </header>
  );
};

export default Header;
