import React, { useState } from 'react';
import { FORMATION_PRESETS, SQUAD_PLAYERS } from '../data/mockData';
import { Player } from '../types';
import { Sparkles, Sliders, Shield, Award } from 'lucide-react';

interface TacticsPitchProps {
  players?: Player[];
}

export const TacticsPitch: React.FC<TacticsPitchProps> = ({ players = SQUAD_PLAYERS }) => {
  const [activeFormationId, setActiveFormationId] = useState(FORMATION_PRESETS[0].id);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);

  const activePreset = FORMATION_PRESETS.find(f => f.id === activeFormationId) || FORMATION_PRESETS[0];

  const selectedPosition = activePreset.positions.find(p => p.id === selectedPositionId) || activePreset.positions[0];

  // Match position with a real squad player by playerId only, never defaulting to Theodebestebeste
  const getAssignedPlayer = (pos: { id: string; label: string; playerId?: string }) => {
    if (pos.playerId) {
      const match = players.find(p => p.id === pos.playerId);
      if (match) return match;
    }
    return null;
  };

  const selectedPlayer = getAssignedPlayer(selectedPosition);

  const mentalityDisplay =
    activePreset.mentality === 'Aanvallend' ? 'Attacking' :
    activePreset.mentality === 'Gebalanceerd' ? 'Balanced' :
    activePreset.mentality === 'Hoge Pressing' ? 'High Press' :
    activePreset.mentality === 'Counter' ? 'Counter-Attack' : activePreset.mentality;

  return (
    <section id="tactiek" className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              Formations &amp; Tactics
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              Tactical Pitch Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Interactive pitch breakdown showing Predator United&apos;s tactical setups in FC 27. Select any position on the pitch to inspect specific player roles and custom tactical instructions.
            </p>
          </div>

          {/* Formation Preset Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl overflow-x-auto scrollbar-none shadow-xs">
            {FORMATION_PRESETS.map((form) => (
              <button
                key={form.id}
                onClick={() => {
                  setActiveFormationId(form.id);
                  setSelectedPositionId(null);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFormationId === form.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {form.code}
              </button>
            ))}
          </div>
        </div>

        {/* Pitch + Tactical Instructions Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tactical Pitch (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm relative overflow-hidden">
            {/* Form Name & Mentality Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {activePreset.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activePreset.description}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                Mentality: {mentalityDisplay}
              </span>
            </div>

            {/* Football Pitch Graphic Container */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden border-2 border-emerald-800 shadow-inner bg-[#0c2415]">
              {/* Grass lawn stripes & field markings */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f13] via-[#0d2a1a] to-[#0a1f13]" />

              {/* Pitch grid lines SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Border line */}
                <rect x="5%" y="4%" width="90%" height="92%" fill="none" stroke="#ffffff" strokeWidth="2" />
                
                {/* Halfway line */}
                <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="#ffffff" strokeWidth="2" />
                
                {/* Center circle */}
                <circle cx="50%" cy="50%" r="14%" fill="none" stroke="#ffffff" strokeWidth="2" />
                <circle cx="50%" cy="50%" r="2" fill="#ffffff" />

                {/* Top penalty area (Opponent Box) */}
                <rect x="25%" y="4%" width="50%" height="18%" fill="none" stroke="#ffffff" strokeWidth="2" />
                <rect x="37%" y="4%" width="26%" height="7%" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="50%" cy="16%" r="2" fill="#ffffff" />

                {/* Bottom penalty area (Predator Box) */}
                <rect x="25%" y="78%" width="50%" height="18%" fill="none" stroke="#ffffff" strokeWidth="2" />
                <rect x="37%" y="89%" width="26%" height="7%" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="50%" cy="84%" r="2" fill="#ffffff" />
              </svg>

              {/* Position Pins on the Pitch - GEEN NAMEN ER ONDER */}
              {activePreset.positions.map((pos) => {
                const isSelected = selectedPosition?.id === pos.id;
                const assigned = getAssignedPlayer(pos);

                return (
                  <button
                    key={pos.id}
                    onClick={() => setSelectedPositionId(pos.id)}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    title={assigned ? `${pos.label}: ${assigned.gamertag}` : `${pos.label}: Pro Clubs AI`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group z-10 cursor-pointer ${
                      isSelected ? 'scale-120 z-20' : 'hover:scale-110'
                    }`}
                  >
                    {/* Clean circle badge: ONLY position code, NO names underneath */}
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex flex-col items-center justify-center font-black transition-all shadow-lg border-2 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-white shadow-[0_0_20px_rgba(37,99,235,0.9)] ring-2 ring-blue-400'
                          : assigned
                          ? 'bg-slate-900 text-white border-blue-400 hover:bg-blue-600 hover:border-white shadow-md'
                          : 'bg-slate-900/85 text-slate-100 border-white/70 hover:bg-slate-800 hover:border-white'
                      }`}
                    >
                      <span className="leading-none text-[11px] sm:text-xs font-mono font-bold">
                        {pos.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Tactical Inspector & Custom Sliders (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Position Details Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs text-white shadow-xs">
                    {selectedPosition.label}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase">
                      Position: {selectedPosition.label}
                    </h4>
                    {selectedPlayer ? (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-blue-600 font-mono font-bold">
                          {selectedPlayer.gamertag} ({selectedPlayer.name})
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono font-medium">
                        Pro Clubs Squad AI · Open Trial Slot
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-600 font-mono shrink-0">
                  {selectedPlayer ? `${selectedPlayer.overall} OVR` : '75 OVR'}
                </span>
              </div>

              {/* Instructions Box */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[11px] uppercase font-bold block mb-1">
                    FC 27 Tactical Role &amp; Instructions
                  </span>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium leading-relaxed">
                    &quot;{selectedPosition.instructions}&quot;
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[11px] uppercase font-bold block mb-1">
                    PlayStyles &amp; Traits
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPlayer && selectedPlayer.playstylesPlus.length > 0 ? (
                      selectedPlayer.playstylesPlus.map((ps, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1 shadow-xs"
                        >
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          {ps}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                          <Shield className="w-3 h-3 text-slate-500" />
                          EA Pro Clubs System Standard
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          Try-out available
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Team Tactical Preset Sliders (EA FC 27 Tactical Settings) */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <Sliders className="w-4 h-4" />
                <span>FC 27 Tactical Sliders</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Defensive Style</span>
                  <span className="font-bold text-slate-900">Press After Possession Loss</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Defensive Depth</span>
                  <span className="font-bold text-blue-600 font-mono">68 / 100</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Build-Up Play</span>
                  <span className="font-bold text-slate-900">Fast Combinations</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Chance Creation</span>
                  <span className="font-bold text-slate-900">Forward Runs</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Players In Box</span>
                  <span className="font-bold text-blue-600 font-mono">7 / 10</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
