import React, { useState } from 'react';
import { Menu, X, Radio, Lock, MessageSquare } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTrial: () => void;
  onOpenEaSync: () => void;
  onOpenDevPortal: () => void;
  newApplicationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenTrial,
  onOpenEaSync,
  onOpenDevPortal,
  newApplicationsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overzicht', label: 'Wie Wij Zijn' },
    { id: 'wedstrijden', label: 'Wedstrijden' },
    { id: 'selectie', label: 'Selectie' },
    { id: 'tactiek', label: 'Tactiek' },
    { id: 'nieuws', label: 'Nieuws & Feed' },
    { id: 'info', label: 'Club Info' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs text-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark with clean club badge */}
          <div className="flex items-center gap-3">
            <a
              href="#overzicht"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('overzicht');
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center tracking-wider shadow-sm select-none transition-transform group-hover:scale-105">
                PU
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-900 uppercase group-hover:text-blue-600 transition-colors">
                  Predator United
                </span>
                <span className="text-[10px] font-mono tracking-widest text-blue-600 -mt-1 font-bold uppercase">
                  FC 27 · DIVISION 5
                </span>
              </div>
            </a>
          </div>

          {/* Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id || (link.id === 'overzicht' && (activeTab === 'overview' || !activeTab));
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-blue-600 font-bold scale-105'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full transition-all" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* EA Server Sync */}
            <button
              onClick={onOpenEaSync}
              title="Synchronize live match data from EA FC 27 servers"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span className="hidden xl:inline">EA Live Sync</span>
              <span className="xl:hidden">EA Sync</span>
            </button>

            {/* Dev / Staff Portal */}
            <button
              onClick={onOpenDevPortal}
              title="Staff Portal: Manage players & line-up"
              className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xl:inline">Staff Portal</span>
              <span className="xl:hidden">Staff</span>
              {newApplicationsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-black leading-tight animate-bounce">
                  {newApplicationsCount}
                </span>
              )}
            </button>

            {/* Public Discord Try-out Button */}
            <button
              onClick={onOpenTrial}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] rounded-lg transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discord Try-out</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenDevPortal}
              className="p-1.5 text-amber-800 bg-amber-50 border border-amber-300 rounded-lg text-xs flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              {newApplicationsCount > 0 && (
                <span className="px-1 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                  {newApplicationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2 px-3 text-sm font-semibold rounded-md text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEaSync();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-500" />
              <span>EA Live Sync</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDevPortal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 rounded-lg cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Staff Portal</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold text-white bg-[#5865F2] rounded-lg cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discord Try-out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
