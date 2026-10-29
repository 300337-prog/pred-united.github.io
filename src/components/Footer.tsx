import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onOpenDevPortal?: () => void;
  onSelectTab?: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDevPortal, onSelectTab }) => {
  const handleTabClick = (tabId: string) => {
    if (onSelectTab) {
      onSelectTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center tracking-wider select-none shadow-xs">
              PU
            </div>
            <div>
              <span className="font-black text-slate-900 uppercase text-sm tracking-tight">
                Predator United
              </span>
              <span className="text-[11px] text-blue-600 block font-mono font-bold">
                EA SPORTS FC 27 PRO CLUBS · DIVISION 5
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-slate-600 flex-wrap justify-center font-semibold">
            <button
              onClick={() => handleTabClick('overzicht')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Wie Wij Zijn
            </button>
            <button
              onClick={() => handleTabClick('wedstrijden')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Wedstrijden
            </button>
            <button
              onClick={() => handleTabClick('selectie')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Selectie
            </button>
            <button
              onClick={() => handleTabClick('tactiek')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Tactiek
            </button>
            <button
              onClick={() => handleTabClick('nieuws')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Nieuws & Feed
            </button>
            <button
              onClick={() => handleTabClick('info')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Club Info
            </button>
            {onOpenDevPortal && (
              <button
                onClick={onOpenDevPortal}
                className="text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                title="Staff Portal: Manage players & line-up"
              >
                <Lock className="w-3 h-3" />
                <span>Staff Portal</span>
              </button>
            )}
          </div>

          <div className="text-center md:text-right text-slate-500 text-[11px]">
            © {new Date().getFullYear()} Predator United. Official FC 27 Pro Clubs Hub.
          </div>
        </div>
      </div>
    </footer>
  );
};
