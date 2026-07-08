import { Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="mt-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm border-t"
      style={{
        background: 'rgba(255,252,248,0.6)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(249,115,22,0.1)',
      }}
    >
      <div className="flex items-center gap-2 text-slate-500">
        <div
          className="flex items-center justify-center w-6 h-6 rounded-lg text-white"
          style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', boxShadow: '0 4px 8px rgba(249,115,22,0.3)' }}
        >
          <Sparkles size={12} />
        </div>
        <span className="font-bold text-slate-600">LinguaAI</span>
        <span className="text-slate-400">&copy; {currentYear}</span>
      </div>

      <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-5 text-slate-400 font-medium text-xs">
        <div className="flex gap-4 sm:gap-5">
          <a href="#" className="hover:text-orange-500 transition-colors">Docs</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Support</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-emerald-500 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }} />
          All systems operational
        </div>
      </div>
    </footer>
  );
};

export default Footer;


