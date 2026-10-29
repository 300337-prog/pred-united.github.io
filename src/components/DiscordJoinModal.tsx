import React from 'react';
import { X, ExternalLink, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface DiscordJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscordJoinModal: React.FC<DiscordJoinModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const discordUrl = 'https://discord.gg/predatorunited';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Banner */}
        <div className="bg-[#5865F2] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white text-[#5865F2] flex items-center justify-center shadow-md">
            <MessageSquare className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-black uppercase tracking-tight">
            Try-out via Discord
          </h3>
          <p className="text-xs text-white/90 mt-1">
            Officiële selectie & scouting voor Predator United
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Aanmelden kan niet meer via de website</span>
            </div>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              Alle try-outs en proefwedstrijden verlopen vanaf heden exclusief via onze officiële Discord server.
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
              Hoe doe je mee?
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Join onze Discord via de onderstaande knop.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Ga naar het kanaal <strong className="font-mono text-blue-700 bg-blue-50 px-1 py-0.5 rounded">#try-outs</strong>.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Vermeld je EA Gamertag, favoriete positie en platform (PS5/Xbox/PC).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>De staf nodigt je direct uit voor de eerstvolgende speelavond!</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Open Discord & Meld Je Aan</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            
            <button
              onClick={onClose}
              className="w-full mt-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
