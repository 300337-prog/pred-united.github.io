import React, { useState } from 'react';
import { Player, ClubTrialApplication, EscalatedQuestion } from '../types';
import {
  X,
  Lock,
  Shirt,
  UserPlus,
  Trash2,
  Edit,
  Check,
  AlertCircle,
  Shield,
  Radio,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Send,
  Zap
} from 'lucide-react';

interface AdminTrialPortalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onAddPlayer: (player: Player) => void;
  onUpdatePlayer: (id: string, updated: Partial<Player>) => void;
  onDeletePlayer: (id: string) => void;
  applications: ClubTrialApplication[];
  escalatedQuestions?: EscalatedQuestion[];
  onUpdateStatus?: (id: string, status: ClubTrialApplication['status'], notes?: string) => void;
  onDeleteApplication?: (id: string) => void;
  onUpdateQuestionStatus?: (id: string, status: EscalatedQuestion['status'], reply?: string) => void;
  onDeleteQuestion?: (id: string) => void;
}

export const AdminTrialPortal: React.FC<AdminTrialPortalProps> = ({
  isOpen,
  onClose,
  players,
  onAddPlayer,
  onUpdatePlayer,
  onDeletePlayer,
  applications = [],
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [devCodeInput, setDevCodeInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'squad' | 'webhook' | 'discord' | 'settings'>('squad');

  // Squad filters
  const [squadCategoryFilter, setSquadCategoryFilter] = useState<string>('all');
  const [squadSearchQuery, setSquadSearchQuery] = useState('');

  // Player Add/Edit Modal
  const [playerModalMode, setPlayerModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  // Player form states
  const [formGamertag, setFormGamertag] = useState('');
  const [formName, setFormName] = useState('');
  const [formNumber, setFormNumber] = useState(9);
  const [formPosition, setFormPosition] = useState('ST');
  const [formCategory, setFormCategory] = useState<'Attack' | 'Midfield' | 'Defense' | 'Goalkeeper'>('Attack');
  const [formOverall, setFormOverall] = useState<number>(76);
  const [formTacticalRole, setFormTacticalRole] = useState('');
  const [formMatches, setFormMatches] = useState(0);
  const [formGoals, setFormGoals] = useState(0);
  const [formAssists, setFormAssists] = useState(0);

  // Webhook Test State
  const [webhookOpponent, setWebhookOpponent] = useState('FC Nieuwe Tegenstander');
  const [webhookScorePredator, setWebhookScorePredator] = useState(4);
  const [webhookScoreOpponent, setWebhookScoreOpponent] = useState(1);
  const [webhookScorers, setWebhookScorers] = useState('Baloa_6, BoefSam00, Theodebestebeste');
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = devCodeInput.trim().toLowerCase();
    if (
      cleaned === 'predator2026!' ||
      cleaned === 'predator2026' ||
      cleaned === 'predator2027!' ||
      cleaned === 'predator2027' ||
      cleaned === 'predator' ||
      cleaned === 'staff' ||
      cleaned === 'staff2027'
    ) {
      setIsAuthenticated(true);
      setErrorMsg(null);
    } else {
      setErrorMsg('Onjuiste stafcode. Toegang geweigerd (gebruik bijv. predator2027!).');
    }
  };

  const handleOpenAddPlayerModal = () => {
    setPlayerModalMode('add');
    setEditingPlayerId(null);
    setFormGamertag('');
    setFormName('');
    setFormNumber(Math.floor(Math.random() * 80) + 12);
    setFormPosition('ST');
    setFormCategory('Attack');
    setFormOverall(76);
    setFormTacticalRole('Aanvallende speler voor Predator United');
    setFormMatches(0);
    setFormGoals(0);
    setFormAssists(0);
  };

  const handleOpenEditPlayerModal = (player: Player) => {
    setPlayerModalMode('edit');
    setEditingPlayerId(player.id);
    setFormGamertag(player.gamertag);
    setFormName(player.name);
    setFormNumber(player.number);
    setFormPosition(player.position);
    setFormCategory(
      player.category === 'Aanval' ? 'Attack' :
      player.category === 'Middenveld' ? 'Midfield' :
      player.category === 'Verdediging' ? 'Defense' :
      player.category === 'Doelman' ? 'Goalkeeper' : (player.category as any)
    );
    setFormOverall(player.overall);
    setFormTacticalRole(player.tacticalRole);
    setFormMatches(player.matchesPlayed || 0);
    setFormGoals(player.goals || 0);
    setFormAssists(player.assists || 0);
  };

  const handleSubmitPlayerForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formGamertag.trim()) return;

    if (playerModalMode === 'add') {
      const newPlayer: Player = {
        id: `player-${Date.now()}`,
        gamertag: formGamertag.trim(),
        name: formName.trim() || formGamertag.trim(),
        number: Number(formNumber) || 9,
        position: formPosition.toUpperCase(),
        category: formCategory,
        role: 'Basisspeler',
        overall: Number(formOverall) || 76,
        matchesPlayed: Number(formMatches) || 0,
        goals: Number(formGoals) || 0,
        assists: Number(formAssists) || 0,
        cleanSheets: 0,
        motmAwards: 0,
        averageRating: 7.2,
        passAccuracy: 75,
        playstylesPlus: ['Quick Step+'],
        playstylesRegular: ['Rapid', 'Finesse Shot'],
        preferredFoot: 'Right',
        height: '1.85m',
        nationality: 'Netherlands',
        pace: 80,
        shooting: 75,
        passing: 75,
        dribbling: 76,
        defending: 55,
        physical: 75,
        tacticalRole: formTacticalRole.trim() || 'Selectiespeler Predator United'
      };
      onAddPlayer(newPlayer);
    } else if (playerModalMode === 'edit' && editingPlayerId) {
      onUpdatePlayer(editingPlayerId, {
        gamertag: formGamertag.trim(),
        name: formName.trim(),
        number: Number(formNumber),
        position: formPosition.toUpperCase(),
        category: formCategory,
        overall: Number(formOverall),
        tacticalRole: formTacticalRole.trim(),
        matchesPlayed: Number(formMatches),
        goals: Number(formGoals),
        assists: Number(formAssists),
      });
    }

    setPlayerModalMode(null);
  };

  const handleSendTestWebhook = async () => {
    setIsSendingWebhook(true);
    setWebhookStatus(null);
    try {
      const scorersArray = webhookScorers.split(',').map(s => s.trim()).filter(Boolean);
      const res = await fetch('/api/webhook/match-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opponent: webhookOpponent,
          scorePredator: webhookScorePredator,
          scoreOpponent: webhookScoreOpponent,
          scorers: scorersArray
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWebhookStatus(`Succes! Wedstrijd live verwerkt: ${data.message} (${data.updatedRecord})`);
      } else {
        setWebhookStatus(`Fout: ${data.error || 'Server error'}`);
      }
    } catch (e: any) {
      setWebhookStatus(`Verbindingsfout: ${e.message}`);
    } finally {
      setIsSendingWebhook(false);
    }
  };

  // Filtered players
  const filteredPlayers = players.filter((p) => {
    if (squadCategoryFilter !== 'all') {
      const cat = p.category === 'Aanval' ? 'Attack' :
                  p.category === 'Middenveld' ? 'Midfield' :
                  p.category === 'Verdediging' ? 'Defense' :
                  p.category === 'Doelman' ? 'Goalkeeper' : p.category;
      if (cat !== squadCategoryFilter) return false;
    }
    if (squadSearchQuery.trim()) {
      const q = squadSearchQuery.toLowerCase();
      return (
        p.gamertag.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q) ||
        p.number.toString().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
              PU
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  Staff &amp; Management Dashboard: Predator United
                </h3>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Staf Geautoriseerd
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Spelers toevoegen, verwijderen, posities &amp; rugnummers wijzigen, en live EA webhooks beheren.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setDevCodeInput('');
                }}
                className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-200 rounded-md cursor-pointer font-semibold"
              >
                Uitloggen
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center my-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center mx-auto text-blue-600 mb-4 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Beveiligde Staf Inlog
            </h4>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Voer de stafcode in om spelers toe te voegen, te verwijderen, posities aan te passen en webhooks te testen.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  placeholder="Voer stafcode in (bijv. predator2027!)..."
                  value={devCodeInput}
                  onChange={(e) => {
                    setDevCodeInput(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 text-center tracking-wider font-mono font-bold"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Inloggen als Staf
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 flex-wrap">
              <button
                onClick={() => setActiveTab('squad')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'squad'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Shirt className="w-4 h-4" />
                <span>Spelers Beheer ({players.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('webhook')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'webhook'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>Live EA Webhook &amp; Sync</span>
              </button>

              <button
                onClick={() => setActiveTab('discord')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'discord'
                    ? 'bg-[#5865F2] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discord Try-outs ({applications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Club Info</span>
              </button>
            </div>

            {/* TAB 1: SQUAD & SPELERSBEHEER */}
            {activeTab === 'squad' && (
              <div className="space-y-4">
                {/* Actions & Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="text"
                      placeholder="Zoek speler of nummer..."
                      value={squadSearchQuery}
                      onChange={(e) => setSquadSearchQuery(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-44"
                    />

                    {(['all', 'Attack', 'Midfield', 'Defense', 'Goalkeeper'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSquadCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          squadCategoryFilter === cat
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat === 'all' ? 'Alle Linies' : cat === 'Attack' ? 'Aanval' : cat === 'Midfield' ? 'Middenveld' : cat === 'Defense' ? 'Verdediging' : 'Doelman'}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleOpenAddPlayerModal}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Speler Toevoegen</span>
                  </button>
                </div>

                {/* Players List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredPlayers.map((player) => {
                    const displayCategory =
                      player.category === 'Aanval' ? 'Attack' :
                      player.category === 'Middenveld' ? 'Midfield' :
                      player.category === 'Verdediging' ? 'Defense' :
                      player.category === 'Doelman' ? 'Goalkeeper' : player.category;

                    return (
                      <div
                        key={player.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-3"
                      >
                        {/* Top: Shirt Number, Gamertag, Role & OVR */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-mono font-black text-sm flex items-center justify-center shadow-xs">
                              #{player.number}
                            </div>
                            <div>
                              <div className="font-black text-sm text-slate-900">
                                {player.gamertag}
                              </div>
                              <span className="text-xs text-slate-500 font-medium">
                                {player.name} · {player.goals || 0}G / {player.assists || 0}A
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {player.overall} OVR
                            </span>
                          </div>
                        </div>

                        {/* Interactive Position & Category changer */}
                        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                              Positie wijzigen:
                            </label>
                            <select
                              value={player.position}
                              onChange={(e) => {
                                const newPos = e.target.value.toUpperCase();
                                let newCat = displayCategory;
                                if (['ST', 'CF', 'RW', 'LW'].includes(newPos)) newCat = 'Attack';
                                else if (['CAM', 'CM', 'CDM', 'RM', 'LM'].includes(newPos)) newCat = 'Midfield';
                                else if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(newPos)) newCat = 'Defense';
                                else if (newPos === 'GK') newCat = 'Goalkeeper';

                                onUpdatePlayer(player.id, {
                                  position: newPos,
                                  category: newCat as any
                                });
                              }}
                              className="w-full text-xs font-bold px-2 py-1.5 bg-white border border-slate-300 rounded cursor-pointer text-blue-700 font-mono focus:outline-none focus:border-blue-500"
                            >
                              <option value="ST">ST (Spits)</option>
                              <option value="CF">CF (Schaduwspits)</option>
                              <option value="RW">RW (Rechtsbuiten)</option>
                              <option value="LW">LW (Linksbuiten)</option>
                              <option value="CAM">CAM (Aanvallende Middenvelder)</option>
                              <option value="CM">CM (Centrale Middenvelder)</option>
                              <option value="CDM">CDM (Verdedigende Middenvelder)</option>
                              <option value="LM">LM (Linker Middenvelder)</option>
                              <option value="RM">RM (Rechter Middenvelder)</option>
                              <option value="CB">CB (Centrale Verdediger)</option>
                              <option value="LB">LB (Linksback)</option>
                              <option value="RB">RB (Rechtsback)</option>
                              <option value="GK">GK (Doelman)</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                              Team Tab / Linie:
                            </label>
                            <select
                              value={displayCategory}
                              onChange={(e) => {
                                onUpdatePlayer(player.id, {
                                  category: e.target.value as any,
                                });
                              }}
                              className="w-full text-xs font-semibold px-2 py-1.5 bg-white border border-slate-300 rounded cursor-pointer text-slate-800 focus:outline-none focus:border-blue-500"
                            >
                              <option value="Attack">Aanval (Attack)</option>
                              <option value="Midfield">Middenveld (Midfield)</option>
                              <option value="Defense">Verdediging (Defense)</option>
                              <option value="Goalkeeper">Doelman (Goalkeeper)</option>
                            </select>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                          <span className="text-slate-500 truncate max-w-[200px] text-[11px]">
                            {player.tacticalRole}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleOpenEditPlayerModal(player)}
                              className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded cursor-pointer flex items-center gap-1"
                            >
                              <Edit className="w-3 h-3" />
                              <span>Bewerk</span>
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Weet je zeker dat je "${player.gamertag}" wilt verwijderen uit de selectie?`)) {
                                  onDeletePlayer(player.id);
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                              title="Speler Verwijderen"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: LIVE EA WEBHOOK & SYNC */}
            {activeTab === 'webhook' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <h4 className="text-sm font-black text-slate-900 uppercase">
                      Live Webhook Endpoints voor Predator United
                    </h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Gebruik deze webhook om automatische match-updates of tracker-events naar de website te sturen. Alle statistieken (zoals winpercentage: 45%, doelpunten en records) worden direct herberekend en live geüpdatet.
                  </p>

                  <div className="mt-3 p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs space-y-1.5">
                    <div className="text-emerald-400 font-bold">POST /api/webhook/ea-sync</div>
                    <div className="text-slate-400 text-[11px]">Volledige tracker payload sync (wins, losses, gamesPlayed, members).</div>
                    <div className="pt-2 text-emerald-400 font-bold">POST /api/webhook/match-update</div>
                    <div className="text-slate-400 text-[11px]">Nieuwe uitslag toevoegen met doelpuntenmakers.</div>
                  </div>
                </div>

                {/* Interactive Webhook Test Tool */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-black text-slate-900 uppercase text-xs">
                      Test Webhook Uitvoeren (Simuleer Nieuwe Uitslag)
                    </h5>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold font-mono text-[10px]">
                      Live Trigger
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tegenstander *</label>
                      <input
                        type="text"
                        value={webhookOpponent}
                        onChange={(e) => setWebhookOpponent(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Goals Predator United</label>
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={webhookScorePredator}
                        onChange={(e) => setWebhookScorePredator(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Goals Tegenstander</label>
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={webhookScoreOpponent}
                        onChange={(e) => setWebhookScoreOpponent(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Doelpuntenmakers (komma-gescheiden)</label>
                    <input
                      type="text"
                      value={webhookScorers}
                      onChange={(e) => setWebhookScorers(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
                    />
                  </div>

                  <button
                    onClick={handleSendTestWebhook}
                    disabled={isSendingWebhook}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSendingWebhook ? 'Verzenden...' : 'Verzend Test Webhook Naar Server'}</span>
                  </button>

                  {webhookStatus && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{webhookStatus}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: DISCORD TRY-OUTS */}
            {activeTab === 'discord' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-sm">
                      Try-out Aanmeldingen via Discord
                    </h4>
                    <p className="text-slate-600 mt-1">
                      Zoals afgesproken verlopen alle nieuwe aanmeldingen direct via Discord in plaats van formulieren op de website.
                    </p>
                  </div>
                  <a
                    href="https://discord.gg/predatorunited"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Open Discord Server</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-700 block">Instructie voor de Staf:</span>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                    <li>Kandidaten melden zich in het kanaal <strong>#try-outs</strong> in Discord.</li>
                    <li>Nodig kandidaten uit voor de reguliere speelavond (dinsdag, donderdag of zondag 20:15 CET).</li>
                    <li>Wanneer een kandidaat wordt aangenomen, klik je in het tabblad <strong>Spelers Beheer</strong> op <strong>+ Speler Toevoegen</strong> om hem direct in de officiële selectie te plaatsen!</li>
                  </ol>
                </div>
              </div>
            )}

            {/* TAB 4: CLUB INFO & SETTINGS */}
            {activeTab === 'settings' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
                <h4 className="text-sm font-bold text-slate-900 uppercase">
                  Predator United Club Informatie
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 uppercase font-bold block mb-1">Officiële Club ID</span>
                    <span className="font-mono text-base font-black text-blue-600">181654</span>
                    <p className="text-[11px] text-slate-400 mt-1">Crossplay common-gen5 (PS5 / Xbox Series X|S / PC)</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 uppercase font-bold block mb-1">Competitie</span>
                    <span className="font-bold text-slate-900">EA FC 27 Pro Clubs - Divisie 5</span>
                    <p className="text-[11px] text-slate-400 mt-1">1605 Skill Rating · 2 Promoties behaald</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 uppercase font-bold block mb-1">Speelschema</span>
                    <span className="font-bold text-slate-900">Dinsdag, Donderdag &amp; Zondag (20:15 - 23:00 CET)</span>
                    <p className="text-[11px] text-slate-400 mt-1">Discord private voice comms tijdens wedstrijden</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 uppercase font-bold block mb-1">Stadion</span>
                    <span className="font-bold text-slate-900">Stade Louis II</span>
                    <p className="text-[11px] text-slate-400 mt-1">Capaciteit voor duizenden fans</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL: SPELER TOEVOEGEN / BEWERKEN */}
        {playerModalMode && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
            <div 
              className="relative w-full max-w-xl bg-white border border-slate-300 rounded-2xl shadow-2xl p-6 text-slate-800 my-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 uppercase">
                      {playerModalMode === 'add' ? 'Nieuwe Speler Toevoegen' : `Speler Bewerken: ${formGamertag}`}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Wijzigingen zijn direct zichtbaar in de selectietab en op het tactiekveld.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPlayerModalMode(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitPlayerForm} className="space-y-4 text-xs">
                {/* Gamertag & Real Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      EA Gamertag *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="bijv. StrikerNL"
                      value={formGamertag}
                      onChange={(e) => setFormGamertag(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Pro / Spelersnaam
                    </label>
                    <input
                      type="text"
                      placeholder="bijv. Sam B."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>

                {/* Number, Position, Category, Overall */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Rugnummer (#) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={99}
                      value={formNumber}
                      onChange={(e) => setFormNumber(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Positie (ST, CM...) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="bijv. ST"
                      value={formPosition}
                      onChange={(e) => setFormPosition(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold uppercase focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Team Linie *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:border-blue-500 text-xs cursor-pointer"
                    >
                      <option value="Attack">Aanval (Attack)</option>
                      <option value="Midfield">Middenveld (Midfield)</option>
                      <option value="Defense">Verdediging (Defense)</option>
                      <option value="Goalkeeper">Doelman (Goalkeeper)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      OVR Rating *
                    </label>
                    <input
                      type="number"
                      required
                      min={60}
                      max={99}
                      value={formOverall}
                      onChange={(e) => setFormOverall(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>

                {/* Tactical Role Description */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Tactische Rol &amp; Instructies
                  </label>
                  <input
                    type="text"
                    placeholder="bijv. Schaduwspits met snelle loopacties in de diepte"
                    value={formTacticalRole}
                    onChange={(e) => setFormTacticalRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>

                {/* Goals & Assists */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Wedstrijden</label>
                    <input
                      type="number"
                      min={0}
                      value={formMatches}
                      onChange={(e) => setFormMatches(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Doelpunten</label>
                    <input
                      type="number"
                      min={0}
                      value={formGoals}
                      onChange={(e) => setFormGoals(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Assists</label>
                    <input
                      type="number"
                      min={0}
                      value={formAssists}
                      onChange={(e) => setFormAssists(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPlayerModalMode(null)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    {playerModalMode === 'add' ? 'Speler Opslaan' : 'Wijzigingen Opslaan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
