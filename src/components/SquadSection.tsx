import React, { useState } from 'react';
import { Player } from '../types';
import { SQUAD_PLAYERS } from '../data/mockData';
import { Sparkles } from 'lucide-react';

interface SquadSectionProps {
  onSelectPlayer: (player: Player) => void;
  players?: Player[];
}

export const SquadSection: React.FC<SquadSectionProps> = ({ onSelectPlayer, players = SQUAD_PLAYERS }) => {
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Attack' | 'Midfield' | 'Defense' | 'Goalkeeper'>('All');

  const filteredSquad = categoryFilter === 'All'
    ? players
    : players.filter((p) => {
        if (categoryFilter === 'Attack') return p.category === 'Attack' || p.category === 'Aanval';
        if (categoryFilter === 'Midfield') return p.category === 'Midfield' || p.category === 'Middenveld';
        if (categoryFilter === 'Defense') return p.category === 'Defense' || p.category === 'Verdediging';
        if (categoryFilter === 'Goalkeeper') return p.category === 'Goalkeeper' || p.category === 'Doelman';
        return true;
      });

  return (
    <section id="selectie" className="py-12 md:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              Team Roster & Player Profiles
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              Predator United Squad
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Active roster for Predator United in Division 5. Select any player to explore attributes, PlayStyles, and career stats.
            </p>
          </div>

          {/* Position filter buttons */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 border border-slate-200 rounded-xl scrollbar-none shadow-xs">
            {(['All', 'Attack', 'Midfield', 'Defense', 'Goalkeeper'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Squad Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSquad.map((player) => {
            const displayCategory =
              player.category === 'Aanval' ? 'Attack' :
              player.category === 'Middenveld' ? 'Midfield' :
              player.category === 'Verdediging' ? 'Defense' :
              player.category === 'Doelman' ? 'Goalkeeper' : player.category;

            return (
              <div
                key={player.id}
                onClick={() => onSelectPlayer(player)}
                className="group relative p-4 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-400 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                {/* Top bar with OVR badge and role */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    {/* OVR + Position Badge */}
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-400/40 flex flex-col items-center justify-center shadow-xs">
                        <span className="text-sm font-black text-white tabular-nums leading-none">
                          {player.overall}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-blue-200 uppercase mt-0.5">
                          {player.position}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500">
                          #{player.number}
                        </div>
                        <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {player.gamertag}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono font-semibold">
                      {displayCategory}
                    </span>
                  </div>

                  {/* Real name & tactical role */}
                  <div className="mb-3 text-xs text-slate-600">
                    <div className="text-slate-800 font-semibold">{player.name}</div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {player.tacticalRole}
                    </div>
                  </div>

                  {/* PlayStyles Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {player.playstylesPlus?.map((ps, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                        {ps}
                      </span>
                    ))}
                    {player.playstylesRegular?.slice(0, 2).map((ps, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200/80 text-slate-700"
                      >
                        {ps}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Quick Stats Row */}
                <div className="pt-3 border-t border-slate-200">
                  <div className="grid grid-cols-4 gap-1 text-center text-xs">
                    <div className="p-1 rounded bg-white border border-slate-200 shadow-xs">
                      <span className="text-[9px] text-slate-400 block uppercase">Apps</span>
                      <span className="font-mono font-bold text-slate-800">{player.matchesPlayed}</span>
                    </div>
                    <div className="p-1 rounded bg-white border border-slate-200 shadow-xs">
                      <span className="text-[9px] text-slate-400 block uppercase">Goals</span>
                      <span className="font-mono font-bold text-emerald-600">{player.goals}</span>
                    </div>
                    <div className="p-1 rounded bg-white border border-slate-200 shadow-xs">
                      <span className="text-[9px] text-slate-400 block uppercase">Assists</span>
                      <span className="font-mono font-bold text-blue-600">{player.assists}</span>
                    </div>
                    <div className="p-1 rounded bg-white border border-slate-200 shadow-xs">
                      <span className="text-[9px] text-slate-400 block uppercase">Rating</span>
                      <span className="font-mono font-bold text-amber-600">{player.averageRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
