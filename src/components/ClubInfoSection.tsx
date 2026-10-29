import React from 'react';
import { CLUB_INFO } from '../data/mockData';
import { Clock, Mic, Gamepad2, Award, Lock } from 'lucide-react';

interface ClubInfoSectionProps {
  onOpenTrial: () => void;
  onOpenDevPortal?: () => void;
}

export const ClubInfoSection: React.FC<ClubInfoSectionProps> = ({ onOpenTrial, onOpenDevPortal }) => {
  return (
    <section id="info" className="py-12 md:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              Club Identity & Community
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              About Predator United
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Everything you need to know about team culture, our FC 27 match schedule, and how to apply for a squad trial.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            {onOpenDevPortal && (
              <button
                onClick={onOpenDevPortal}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
                title="Staff Portal: Access recruitment and question logs"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Staff Portal Access</span>
              </button>
            )}
            <button
              onClick={onOpenTrial}
              className="px-5 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Try-out via Discord</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Schedule & Sessions */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
              Weekly Match Schedule
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              We host competitive team sessions on designated matchdays to maximize squad chemistry and tactical synergy.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between shadow-xs">
                <span className="text-slate-500">Tuesday:</span>
                <span className="text-slate-900 font-bold">20:15 - 23:00 CET</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between shadow-xs">
                <span className="text-slate-500">Thursday:</span>
                <span className="text-slate-900 font-bold">20:15 - 23:00 CET</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between shadow-xs">
                <span className="text-slate-500">Sunday (Play-offs):</span>
                <span className="text-blue-600 font-bold">19:45 - 23:30 CET</span>
              </div>
            </div>
          </div>

          {/* Voice Comms & Discord */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4 shadow-xs">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
              Comms & Discord
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Fast, clear, and composed communication is vital for success in Division 5. We operate via our private Discord server.
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Working headset & microphone required during matches</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Zero tolerance for toxicity or excessive ego</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Constructive tactical feedback at halftime</span>
              </li>
            </ul>
          </div>

          {/* Crossplay & Platform */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 shadow-xs">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
              Crossplay Supported
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Thanks to EA FC 27 Pro Clubs crossplay architecture, squad members compete together seamlessly across all generation 5 platforms.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-800 font-semibold shadow-xs">
                PlayStation 5
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-800 font-semibold shadow-xs">
                Xbox Series X|S
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-800 font-semibold shadow-xs">
                PC (EA App / Steam)
              </span>
            </div>
          </div>
        </div>

        {/* Club Ethos Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-300 flex items-center justify-center text-blue-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 uppercase">
                &quot;Bij Predator United strijdt iedereen als één hecht collectief&quot;
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Onze filosofie: snel combinatievoetbal, direct druk zetten bij balverlies en samen knallen voor promotie in Divisie 5.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 flex flex-col sm:flex-row items-center gap-3">
            <div>
              EA FC 27: <strong className="text-slate-900 font-bold">Divisie 5 (1605 Skill Rating)</strong>
            </div>
            <span className="hidden sm:inline text-slate-300">·</span>
            <div>
              Aanmelden: <strong className="text-blue-600 font-bold">Exclusief via Discord</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
