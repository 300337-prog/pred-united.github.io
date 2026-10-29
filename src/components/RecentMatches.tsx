import React, { useState, useMemo } from 'react';
import { MatchResult } from '../types';
import { Search, ChevronRight, Award, Shield, BarChart3, Radio, RefreshCw } from 'lucide-react';

interface RecentMatchesProps {
  matches: MatchResult[];
  onSelectMatch: (match: MatchResult) => void;
  onOpenEaSync?: () => void;
  onRefreshLive?: () => void;
  isRefreshing?: boolean;
}

export const RecentMatches: React.FC<RecentMatchesProps> = ({
  matches,
  onSelectMatch,
  onOpenEaSync,
  onRefreshLive,
  isRefreshing = false
}) => {
  const [filter, setFilter] = useState<'all' | 'W' | 'D' | 'L' | 'division' | 'cup'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      // Filter tab
      if (filter === 'W' && m.result !== 'W') return false;
      if (filter === 'D' && m.result !== 'D') return false;
      if (filter === 'L' && m.result !== 'L') return false;
      if (filter === 'division' && !m.competition.toLowerCase().includes('division') && !m.competition.toLowerCase().includes('divisie')) return false;
      if (filter === 'cup' && !m.competition.toLowerCase().includes('cup') && !m.competition.toLowerCase().includes('play-off')) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchOpponent = m.opponent.toLowerCase().includes(q);
        const matchComp = m.competition.toLowerCase().includes(q);
        const matchScorer = m.goals?.some((g) => g.scorer.toLowerCase().includes(q));
        if (!matchOpponent && !matchComp && !matchScorer) return false;
      }

      return true;
    });
  }, [matches, filter, searchQuery]);

  // Aggregate stats for current matches
  const totalGoalsPredator = matches.reduce((acc, m) => acc + m.scorePredator, 0);
  const totalGoalsOpponent = matches.reduce((acc, m) => acc + m.scoreOpponent, 0);
  const winCount = matches.filter((m) => m.result === 'W').length;
  const cleanSheets = matches.filter((m) => m.scoreOpponent === 0).length;

  return (
    <section id="wedstrijden" className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              League & Friendlies
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              Recent Match Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Complete match log of Predator United in FC 27 Pro Clubs featuring goalscorers, post-match statistics, and player ratings.
            </p>
          </div>

          <div className="self-start md:self-auto flex items-center gap-2 flex-wrap">
            {onRefreshLive && (
              <button
                onClick={onRefreshLive}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer disabled:opacity-50"
                title="Herlaad live wedstrijden van EA Sports FC 27 Pro Clubs servers"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Laden...' : 'Ververs Live Wedstrijden'}</span>
              </button>
            )}
            {onOpenEaSync && (
              <button
                onClick={onOpenEaSync}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-700 text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>EA Live Sync (Auto-Sync)</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stat Pill Strips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
            <span className="text-xs font-medium text-slate-500">Played</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">{matches.length} Matches</span>
          </div>
          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
            <span className="text-xs font-medium text-slate-500">Victories</span>
            <span className="font-mono font-bold text-emerald-600 tabular-nums text-sm">{winCount} W</span>
          </div>
          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
            <span className="text-xs font-medium text-slate-500">Goal Difference</span>
            <span className="font-mono font-bold text-blue-600 tabular-nums text-sm">
              {totalGoalsPredator - totalGoalsOpponent > 0 ? `+${totalGoalsPredator - totalGoalsOpponent}` : totalGoalsPredator - totalGoalsOpponent} ({totalGoalsPredator}-{totalGoalsOpponent})
            </span>
          </div>
          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
            <span className="text-xs font-medium text-slate-500">Clean Sheets</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">{cleanSheets} Matches</span>
          </div>
        </div>

        {/* Controls: Search and Filter Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-white border border-slate-200 rounded-xl scrollbar-none shadow-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'W', label: 'Wins' },
              { id: 'D', label: 'Draws' },
              { id: 'L', label: 'Losses' },
              { id: 'division', label: 'Division' },
              { id: 'cup', label: 'Play-offs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search opponent or player..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
            />
          </div>
        </div>

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-white border border-slate-200 shadow-xs">
            <Shield className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matches found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No matches match the selected filter or search term.
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer shadow-xs"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMatches.map((match) => {
              const isWin = match.result === 'W';
              const isDraw = match.result === 'D';

              return (
                <div
                  key={match.id}
                  onClick={() => onSelectMatch(match)}
                  className="group relative p-4 sm:p-5 rounded-xl bg-white hover:bg-blue-50/40 border border-slate-200 hover:border-blue-400 transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Competition & Result Badge & Opponent */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      {/* W / D / L indicator */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 border ${
                          isWin
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isDraw
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-rose-100 text-rose-800 border-rose-300'
                        }`}
                      >
                        {isWin ? 'W' : isDraw ? 'D' : 'L'}
                      </div>

                      {/* Match Details */}
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-semibold text-blue-600">{match.competition}</span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span>{match.date}</span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span>{match.isHome ? 'Home' : 'Away'}</span>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                            Predator United
                          </span>
                          <span className="text-sm font-semibold text-slate-400">vs</span>
                          <span className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                            {match.opponent}
                          </span>
                        </div>

                        {/* Scorers Summary */}
                        {match.goals && match.goals.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 flex-wrap">
                            <span className="text-[11px] text-slate-400 font-medium">Goals:</span>
                            {match.goals.slice(0, 4).map((g, idx) => (
                              <span key={idx} className="text-slate-700 font-medium">
                                {g.scorer} ({g.minute}&apos;){idx < Math.min(match.goals.length - 1, 3) ? ',' : ''}
                              </span>
                            ))}
                            {match.goals.length > 4 && (
                              <span className="text-slate-400 text-[11px]">+{match.goals.length - 4} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Score Box & Quick Stats Pill */}
                    <div className="flex items-center justify-between lg:justify-end gap-5 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                      {/* Man of the match pill */}
                      {match.motm && (
                        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span className="truncate max-w-[120px]">{match.motm.gamertag || match.motm.name}</span>
                          <span className="font-mono text-amber-700 font-bold">{match.motm.rating}</span>
                        </div>
                      )}

                      {/* Final Score Badge */}
                      <div className="flex items-center gap-2">
                        <div className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900 group-hover:border-blue-300 transition-colors">
                          {match.scorePredator} - {match.scoreOpponent}
                        </div>

                        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-600 text-slate-500 group-hover:text-white flex items-center justify-center transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
