import React from 'react';
import { Player } from '../types';
import { X, Sparkles, Activity } from 'lucide-react';

interface PlayerDetailModalProps {
  player: Player | null;
  onClose: () => void;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({ player, onClose }) => {
  if (!player) return null;

  const attributes = [
    { label: 'Pace (PAC)', value: player.pace },
    { label: 'Shooting (SHO)', value: player.shooting },
    { label: 'Passing (PAS)', value: player.passing },
    { label: 'Dribbling (DRI)', value: player.dribbling },
    { label: 'Defending (DEF)', value: player.defending },
    { label: 'Physicality (PHY)', value: player.physical },
  ];

  const preferredFoot =
    player.preferredFoot === 'Rechts' ? 'Right foot' :
    player.preferredFoot === 'Links' ? 'Left foot' :
    player.preferredFoot === 'Right' ? 'Right foot' :
    player.preferredFoot === 'Left' ? 'Left foot' : player.preferredFoot;

  const displayCategory =
    player.category === 'Aanval' ? 'Attack' :
    player.category === 'Middenveld' ? 'Midfield' :
    player.category === 'Verdediging' ? 'Defense' :
    player.category === 'Doelman' ? 'Goalkeeper' : player.category;

  const displayRole = player.role === 'Talent' ? 'Selectiespeler' : 'Basisspeler';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Activity className="w-4 h-4" />
            <span>FC 27 Pro Clubs Player Profile</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Card Showcase */}
        <div className="p-6 bg-gradient-to-b from-blue-50/50 to-white border-b border-slate-200">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* EA FC Rating Badge Card */}
            <div className="w-36 h-48 rounded-xl bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-800 border-2 border-blue-400/50 p-3 flex flex-col justify-between shadow-md shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-black text-white tabular-nums leading-none">
                    {player.overall}
                  </div>
                  <div className="text-xs font-mono font-bold text-blue-200 uppercase mt-0.5">
                    {player.position}
                  </div>
                </div>
                <div className="text-xs font-bold text-blue-200">
                  #{player.number}
                </div>
              </div>

              <div className="text-center my-auto">
                <span className="text-xs font-black uppercase text-white tracking-wide block truncate">
                  {player.gamertag}
                </span>
                <span className="text-[10px] text-blue-200 block truncate">
                  {player.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[10px] text-white font-mono border-t border-blue-400/30 pt-1.5">
                <div>PAC {player.pace}</div>
                <div>DRI {player.dribbling}</div>
                <div>SHO {player.shooting}</div>
                <div>DEF {player.defending}</div>
                <div>PAS {player.passing}</div>
                <div>PHY {player.physical}</div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase font-bold">
                  {displayRole} · {displayCategory}
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {player.gamertag}
                </h3>
                <div className="text-xs text-slate-500 font-medium">
                  {player.name} · {player.nationality} · {player.height} · {preferredFoot}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {player.tacticalRole}
              </p>

              {/* PlayStyles */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {player.playstylesPlus?.map((ps, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>{ps}</span>
                  </span>
                ))}
                {player.playstylesRegular?.map((ps, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {ps}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats and Attributes */}
        <div className="p-6 space-y-5 max-h-[50vh] overflow-y-auto">
          {/* Season Performance Row */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Division 5 Season Statistics
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase">Matches</span>
                <span className="text-sm font-mono font-bold text-slate-900">{player.matchesPlayed}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase">Goals</span>
                <span className="text-sm font-mono font-bold text-emerald-600">{player.goals}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase">Assists</span>
                <span className="text-sm font-mono font-bold text-blue-600">{player.assists}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase">Avg. Rating</span>
                <span className="text-sm font-mono font-bold text-amber-600">{player.averageRating}</span>
              </div>
            </div>
          </div>

          {/* Core Attribute Sliders */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Core Attributes & Skills
            </span>
            <div className="space-y-2.5">
              {attributes.map((attr, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">{attr.label}</span>
                    <span className="font-mono font-bold text-slate-900">{attr.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        attr.value >= 80 ? 'bg-emerald-500' : attr.value >= 70 ? 'bg-blue-600' : 'bg-slate-400'
                      }`}
                      style={{ width: `${Math.min(attr.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
