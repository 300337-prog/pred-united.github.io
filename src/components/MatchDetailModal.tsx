import React from 'react';
import { MatchResult } from '../types';
import { X, Award, Shield } from 'lucide-react';

interface MatchDetailModalProps {
  match: MatchResult | null;
  onClose: () => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, onClose }) => {
  if (!match) return null;

  const isWin = match.result === 'W';
  const isDraw = match.result === 'D';

  const statItems = [
    { label: 'Possession', pred: `${match.stats.possession[0]}%`, opp: `${match.stats.possession[1]}%`, pVal: match.stats.possession[0], oVal: match.stats.possession[1] },
    { label: 'Total Shots', pred: match.stats.shots[0], opp: match.stats.shots[1], pVal: match.stats.shots[0], oVal: match.stats.shots[1] },
    { label: 'Shots on Target', pred: match.stats.shotsOnTarget[0], opp: match.stats.shotsOnTarget[1], pVal: match.stats.shotsOnTarget[0], oVal: match.stats.shotsOnTarget[1] },
    { label: 'Expected Goals (xG)', pred: match.stats.expectedGoals[0].toFixed(1), opp: match.stats.expectedGoals[1].toFixed(1), pVal: match.stats.expectedGoals[0], oVal: match.stats.expectedGoals[1] },
    { label: 'Pass Accuracy', pred: `${match.stats.passAccuracy[0]}%`, opp: `${match.stats.passAccuracy[1]}%`, pVal: match.stats.passAccuracy[0], oVal: match.stats.passAccuracy[1] },
    { label: 'Tackles Won', pred: match.stats.tacklesWon[0], opp: match.stats.tacklesWon[1], pVal: match.stats.tacklesWon[0], oVal: match.stats.tacklesWon[1] },
    { label: 'Fouls', pred: match.stats.fouls[0], opp: match.stats.fouls[1], pVal: match.stats.fouls[0], oVal: match.stats.fouls[1] },
    { label: 'Corners', pred: match.stats.corners[0], opp: match.stats.corners[1], pVal: match.stats.corners[0], oVal: match.stats.corners[1] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-8 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
              {match.competition}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Played on {match.date} {match.isHome ? '· Home at Stade Louis II' : '· Away match'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scoreboard Banner */}
        <div className="p-6 bg-gradient-to-b from-blue-50/60 to-white border-b border-slate-200">
          <div className="grid grid-cols-7 items-center text-center">
            {/* Predator United */}
            <div className="col-span-3 flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center mb-2 shadow-xs">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase">
                Predator United
              </span>
              <span className="text-xs text-blue-600 font-mono font-bold">Home Team</span>
            </div>

            {/* Score in Center */}
            <div className="col-span-1 flex flex-col items-center">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-slate-900">
                {match.scorePredator} - {match.scoreOpponent}
              </div>
              <span
                className={`mt-1 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  isWin
                    ? 'bg-emerald-100 text-emerald-800'
                    : isDraw
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {isWin ? 'Won' : isDraw ? 'Draw' : 'Defeat'}
              </span>
            </div>

            {/* Opponent */}
            <div className="col-span-3 flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center mb-2 shadow-xs">
                <Shield className="w-8 h-8 text-slate-500" />
              </div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-800 uppercase">
                {match.opponent}
              </span>
              <span className="text-xs text-slate-500 font-mono">Opponent</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Match Summary / Recap */}
          {match.summary && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Match Report
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {match.summary}
              </p>
            </div>
          )}

          {/* Goalscorers Timeline */}
          {match.goals && match.goals.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Goal Timeline
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {match.goals.map((g, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-mono font-bold flex items-center justify-center text-[11px]">
                        {g.minute}&apos;
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 block">{g.scorer}</span>
                        {g.assist && (
                          <span className="text-[11px] text-slate-500">Assist: {g.assist}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 rounded bg-white border border-slate-200">
                      {g.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Match Stats Comparison */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              Match Statistics
            </h4>
            <div className="space-y-3">
              {statItems.map((stat, idx) => {
                const total = (typeof stat.pVal === 'number' && typeof stat.oVal === 'number')
                  ? (stat.pVal + stat.oVal) || 1
                  : 1;
                const pPct = typeof stat.pVal === 'number' ? (stat.pVal / total) * 100 : 50;

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-blue-600 w-12 text-left">
                        {stat.pred}
                      </span>
                      <span className="font-semibold text-slate-700 text-center flex-1">
                        {stat.label}
                      </span>
                      <span className="font-mono font-bold text-slate-600 w-12 text-right">
                        {stat.opp}
                      </span>
                    </div>

                    {/* Comparative Dual Bar */}
                    <div className="h-1.5 bg-slate-200 rounded-full flex overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all"
                        style={{ width: `${pPct}%` }}
                      />
                      <div
                        className="bg-slate-400 h-full transition-all"
                        style={{ width: `${100 - pPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Player Ratings */}
          {match.playerRatings && match.playerRatings.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Player Ratings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {match.playerRatings.map((pr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                        {pr.position}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 block">{pr.playerName}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{pr.gamertag}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {(pr.goals > 0 || pr.assists > 0) && (
                        <span className="text-[11px] text-slate-600 font-mono">
                          {pr.goals > 0 ? `${pr.goals}G ` : ''}
                          {pr.assists > 0 ? `${pr.assists}A` : ''}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-blue-100 text-blue-800">
                        {pr.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Man of the Match Spotlight */}
          {match.motm && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                    Man of the Match
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    {match.motm.name || match.motm.gamertag} ({match.motm.position})
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {match.motm.contribution}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-2xl font-black font-mono text-amber-700">
                  {match.motm.rating}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Match Rating</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
