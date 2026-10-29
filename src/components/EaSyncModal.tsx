import React, { useState } from 'react';
import { MatchResult } from '../types';
import { PROCLUBS_TRACKER_URL } from '../data/mockData';
import { X, RefreshCw, Radio, Check, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

interface EaSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncMatch: (match: MatchResult) => void;
  onSyncAllStats?: (statsData: any) => void;
}

export const EaSyncModal: React.FC<EaSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncMatch,
  onSyncAllStats
}) => {
  const [clubName] = useState('PredatorUnited');
  const [clubId] = useState('181654');
  const [platform] = useState('common-gen5 (PS5/Xbox/PC)');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFetchFromEA = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/proclubs/live-stats');
      const data = await res.json();

      if (data && data.success) {
        setFetchedData(data);
      } else {
        throw new Error('Unable to receive data from tracker');
      }
    } catch (err: any) {
      setError('Error retrieving live stats: ' + (err.message || 'Server timeout'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyMatch = () => {
    if (fetchedData) {
      if (onSyncAllStats) {
        onSyncAllStats(fetchedData);
      } else if (fetchedData.matches && fetchedData.matches.length > 0) {
        fetchedData.matches.forEach((m: MatchResult) => onSyncMatch(m));
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <Radio className="w-4 h-4 animate-pulse text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                Live Stats Reload & ProClubsTracker Sync
              </h3>
              <p className="text-xs text-slate-500">
                Connected to club #181654 on EA Sports FC 27 servers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Server Connection Status Strip */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-slate-800">EA Server Status:</span>
              <span className="text-emerald-700 font-mono font-bold">Connected Live</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Division: <strong className="text-slate-900">Division 5</strong>
            </div>
          </div>

          {/* Configuration Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                EA Club Name & ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled
                  value={clubName}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold"
                />
                <input
                  type="text"
                  disabled
                  value={`#${clubId}`}
                  className="w-20 px-2 py-2 rounded-lg bg-slate-50 border border-slate-300 text-blue-600 font-mono font-bold text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Platform
              </label>
              <input
                type="text"
                disabled
                value={platform}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 font-mono"
              />
            </div>
          </div>

          {/* ProClubsTracker Official Source Link */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-bold text-slate-900 block">Official Tracker Source:</span>
                <span className="text-[11px] text-slate-500">proclubstracker.com/club/181654?platform=common-gen5&div=6</span>
              </div>
            </div>
            <a
              href={PROCLUBS_TRACKER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white text-blue-600 hover:text-blue-700 border border-slate-300 transition-colors shadow-xs"
              title="Open ProClubsTracker link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Sync Trigger Action */}
          <div className="text-center pt-1">
            <button
              onClick={handleFetchFromEA}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Fetching live data from ProClubsTracker...' : 'Reload Verified Live Stats Now'}</span>
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 text-xs">
              {error}
            </div>
          )}

          {/* Fetched Real Stats Preview Box */}
          {fetchedData && (
            <div className="p-4 rounded-xl bg-slate-50 border border-emerald-400 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Live data synchronized successfully!
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  {fetchedData.division} · {fetchedData.stadium}
                </span>
              </div>

              {/* Match overview */}
              {fetchedData.matches && fetchedData.matches.length > 0 && (
                <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <div className="text-sm font-black text-slate-900">
                      PredatorUnited vs {fetchedData.matches[0].opponent}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Goals: {fetchedData.matches[0].goals.map((g: any) => `${g.scorer} (${g.minute}')`).join(', ')}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Record: {fetchedData.wins}W - {fetchedData.ties}D - {fetchedData.losses}L (Goal Diff: {fetchedData.goalDifference})
                    </div>
                  </div>

                  <div className="px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-lg font-black text-rose-700 font-mono text-center">
                    <div>{fetchedData.matches[0].scorePredator} - {fetchedData.matches[0].scoreOpponent}</div>
                    <span className="text-[9px] text-rose-600 uppercase block font-sans">Division 5</span>
                  </div>
                </div>
              )}

              {/* Members preview */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Active Squad Members:</span>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {fetchedData.members?.map((m: any) => (
                    <span key={m.id} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-mono border border-blue-200 font-bold">
                      {m.gamertag} ({m.goals}G, {m.assists}A)
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setFetchedData(null)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleApplyMatch}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply Live Stats To Website</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
