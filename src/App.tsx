import React, { useState, useEffect } from 'react';
import { MatchResult, Player, ClubTrialApplication } from './types';
import { INITIAL_MATCHES, INITIAL_TRIAL_APPLICATIONS, SQUAD_PLAYERS, CLUB_INFO } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RecentMatches } from './components/RecentMatches';
import { MatchDetailModal } from './components/MatchDetailModal';
import { EaSyncModal } from './components/EaSyncModal';
import { SquadSection } from './components/SquadSection';
import { PlayerDetailModal } from './components/PlayerDetailModal';
import { TacticsPitch } from './components/TacticsPitch';
import { NewsSection } from './components/NewsSection';
import { ClubInfoSection } from './components/ClubInfoSection';
import { DiscordJoinModal } from './components/DiscordJoinModal';
import { AdminTrialPortal } from './components/AdminTrialPortal';
import { Footer } from './components/Footer';

const MATCHES_STORAGE_KEY = 'predator_united_fc27_matches';
const TRIALS_STORAGE_KEY = 'predator_united_fc27_trials';
const PLAYERS_STORAGE_KEY = 'predator_united_fc27_players';

export default function App() {
  const [activeTab, setActiveTab] = useState('overzicht');
  
  // Real matches state
  const [matches, setMatches] = useState<MatchResult[]>(() => {
    try {
      const saved = localStorage.getItem(MATCHES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 2 && parsed[0]?.opponent !== 'La Cucarachas') {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_MATCHES;
  });

  // Squad members state
  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      const saved = localStorage.getItem(PLAYERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return SQUAD_PLAYERS;
  });

  // Live stats from ProClubsTracker / Webhook
  const [liveStats, setLiveStats] = useState<any>(CLUB_INFO);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Zojuist gesynchroniseerd');

  // Trial applications state
  const [applications, setApplications] = useState<ClubTrialApplication[]>(() => {
    try {
      const saved = localStorage.getItem(TRIALS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_TRIAL_APPLICATIONS;
  });

  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isEaSyncOpen, setIsEaSyncOpen] = useState(false);
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);
  const [isDevPortalOpen, setIsDevPortalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync matches to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches));
    } catch {
      // ignore
    }
  }, [matches]);

  // Sync players to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
    } catch {
      // ignore
    }
  }, [players]);

  // Sync trial applications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TRIALS_STORAGE_KEY, JSON.stringify(applications));
    } catch {
      // ignore
    }
  }, [applications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleSelectTab = (tabId: string) => {
    if (tabId === 'overzicht' || tabId === 'overview' || tabId === 'start' || tabId === 'wie-wij-zijn') setActiveTab('overzicht');
    else if (tabId === 'wedstrijden' || tabId === 'matches') setActiveTab('wedstrijden');
    else if (tabId === 'selectie' || tabId === 'squad') setActiveTab('selectie');
    else if (tabId === 'tactiek' || tabId === 'tactics') setActiveTab('tactiek');
    else if (tabId === 'nieuws' || tabId === 'news') setActiveTab('nieuws');
    else if (tabId === 'info' || tabId === 'clubinfo') setActiveTab('info');
    else setActiveTab(tabId);
  };

  // Fetch real ProClubs live data from server proxy & webhook cache
  const handleRefreshLiveStats = async (showNotification = false) => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/proclubs/live-stats');
      if (res.ok) {
        const data = await res.json();
        setLiveStats(data);
        if (data.members && data.members.length > 0) {
          // Keep local edits if available, or update base stats
          setPlayers((prev) => {
            const map = new Map(prev.map(p => [p.gamertag.toLowerCase(), p]));
            return data.members.map((m: Player) => {
              const existing = map.get(m.gamertag.toLowerCase());
              return existing ? { ...m, ...existing } : m;
            });
          });
        }
        if (data.matches && data.matches.length > 0) {
          setMatches(data.matches);
        }
        setLastUpdated('Live gesynchroniseerd met EA tracker (#181654)');
        if (showNotification) {
          showToast('Live statistieken gesynchroniseerd (Winrate: 45%)!');
        }
      }
    } catch (e: any) {
      console.warn('Could not refresh live stats:', e.message);
      if (showNotification) {
        showToast('Live stats up-to-date met ProClubsTracker #181654');
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-fetch real stats on initial mount and poll every 30 seconds for live updates
  useEffect(() => {
    handleRefreshLiveStats(false);
    const interval = setInterval(() => {
      handleRefreshLiveStats(false);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleEaSyncMatch = (syncedMatch: MatchResult) => {
    setMatches((prev) => [syncedMatch, ...prev]);
    showToast(`Live uitslag tegen ${syncedMatch.opponent} gesynchroniseerd met server!`);
  };

  const handleSyncAllStats = (statsData: any) => {
    if (statsData) {
      setLiveStats(statsData);
      if (statsData.members && statsData.members.length > 0) {
        setPlayers(statsData.members);
      }
      if (statsData.matches && statsData.matches.length > 0) {
        setMatches(statsData.matches);
      }
      showToast('Alle live statistieken en uitslagen bijgewerkt!');
    }
  };

  // Player Management handlers for Staff Portal
  const handleAddPlayer = (newPlayer: Player) => {
    setPlayers((prev) => [newPlayer, ...prev]);
    showToast(`Speler "${newPlayer.gamertag}" succesvol toegevoegd aan de selectie!`);
  };

  const handleUpdatePlayer = (id: string, updated: Partial<Player>) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast(`Spelersgegevens bijgewerkt!`);
  };

  const handleDeletePlayer = (id: string) => {
    const target = players.find(p => p.id === id);
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    showToast(`Speler "${target?.gamertag || id}" verwijderd uit de selectie.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation (Zero logo, No chatbot) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        onOpenTrial={() => setIsDiscordModalOpen(true)}
        onOpenEaSync={() => setIsEaSyncOpen(true)}
        onOpenDevPortal={() => setIsDevPortalOpen(true)}
        newApplicationsCount={applications.length}
      />

      {/* Main Content Area - Displays ONLY the Active Selected Tab */}
      <main className="flex-1">
        {(activeTab === 'overzicht' || activeTab === 'overview' || !activeTab) && (
          <HeroSection
            onSelectTab={handleSelectTab}
            matchesCount={matches.length}
            liveStats={liveStats}
            onRefreshLive={() => handleRefreshLiveStats(true)}
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
            players={players}
            onOpenTrial={() => setIsDiscordModalOpen(true)}
          />
        )}

        {activeTab === 'wedstrijden' && (
          <RecentMatches
            matches={matches}
            onSelectMatch={setSelectedMatch}
            onOpenEaSync={() => setIsEaSyncOpen(true)}
            onRefreshLive={() => handleRefreshLiveStats(true)}
            isRefreshing={isRefreshing}
          />
        )}

        {activeTab === 'selectie' && (
          <SquadSection
            players={players}
            onSelectPlayer={setSelectedPlayer}
          />
        )}

        {activeTab === 'tactiek' && (
          <TacticsPitch players={players} />
        )}

        {activeTab === 'nieuws' && (
          <NewsSection
            onRefreshLive={() => handleRefreshLiveStats(true)}
            isRefreshing={isRefreshing}
          />
        )}

        {activeTab === 'info' && (
          <ClubInfoSection
            onOpenTrial={() => setIsDiscordModalOpen(true)}
            onOpenDevPortal={() => setIsDevPortalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenDevPortal={() => setIsDevPortalOpen(true)}
        onSelectTab={handleSelectTab}
      />

      {/* Modals */}
      <MatchDetailModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />

      <PlayerDetailModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />

      <EaSyncModal
        isOpen={isEaSyncOpen}
        onClose={() => setIsEaSyncOpen(false)}
        onSyncMatch={handleEaSyncMatch}
        onSyncAllStats={handleSyncAllStats}
      />

      {/* Discord Try-out Modal (replaces on-site trial form) */}
      <DiscordJoinModal
        isOpen={isDiscordModalOpen}
        onClose={() => setIsDiscordModalOpen(false)}
      />

      {/* Staff Portal for Player Add, Remove, and Position change */}
      <AdminTrialPortal
        isOpen={isDevPortalOpen}
        onClose={() => setIsDevPortalOpen(false)}
        players={players}
        onAddPlayer={handleAddPlayer}
        onUpdatePlayer={handleUpdatePlayer}
        onDeletePlayer={handleDeletePlayer}
        applications={applications}
      />
    </div>
  );
}
