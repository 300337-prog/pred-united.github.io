import React from 'react';
import { CLUB_INFO, PROCLUBS_TRACKER_URL } from '../data/mockData';
import { Player } from '../types';
import {
  Trophy,
  Flame,
  ChevronRight,
  Activity,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Users,
  Sliders,
  Newspaper,
  Info,
  Target,
  Crown,
  Heart,
  UserPlus,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';

const STADIUM_BG = '/src/assets/images/stadium_arena_1790682419357.jpg';

interface HeroSectionProps {
  onSelectTab: (tabId: string) => void;
  matchesCount: number;
  liveStats?: any;
  onRefreshLive?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: string;
  players?: Player[];
  onOpenTrial?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectTab,
  matchesCount,
  liveStats,
  onRefreshLive,
  isRefreshing = false,
  lastUpdated,
  players = [],
  onOpenTrial
}) => {
  const division = liveStats?.division || CLUB_INFO.currentDivision;
  const skillRating = liveStats?.skillRating || CLUB_INFO.skillRating;
  const wins = liveStats?.wins !== undefined ? liveStats.wins : CLUB_INFO.wins;
  const draws = liveStats?.ties !== undefined ? liveStats.ties : CLUB_INFO.draws;
  const losses = liveStats?.losses !== undefined ? liveStats.losses : CLUB_INFO.losses;
  const totalMatchesCalculated = wins + draws + losses > 0 ? wins + draws + losses : matchesCount || CLUB_INFO.totalMatches;
  // Accurate dynamic win rate calculation: 9 / 20 = 45%
  const calculatedWinRate = totalMatchesCalculated > 0 ? `${Math.round((wins / totalMatchesCalculated) * 100)}%` : '45%';
  const goalsScored = liveStats?.goals !== undefined ? liveStats.goals : CLUB_INFO.goalsScored;
  const goalsConceded = liveStats?.goalsAgainst !== undefined ? liveStats.goalsAgainst : CLUB_INFO.goalsConceded;
  const goalDiff = liveStats?.goalDifference || CLUB_INFO.goalDifference;
  const stadium = liveStats?.stadium || CLUB_INFO.stadium;
  const currentForm = liveStats?.currentForm || CLUB_INFO.currentForm;

  // Key players for the spotlight (top scorers & playmakers)
  const keyPlayers = players.slice(0, 4);

  return (
    <div id="overzicht" className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-slate-50">
      {/* Top Banner / Hero Intro */}
      <section className="relative pt-8 pb-16 overflow-hidden border-b border-slate-200">
        {/* Background Stadium Backdrop */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img
            src={STADIUM_BG}
            alt="PredatorUnited Stadium Arena"
            className="w-full h-full object-cover object-center opacity-10 filter saturate-100 contrast-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Real-time ProClubsTracker verified banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-white border border-blue-200 shadow-xs">
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-slate-900">Geverifieerde EA FC 27 Club:</span>
              <span className="text-blue-700 font-mono font-semibold">ProClubsTracker ID #181654</span>
              <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
              <span className="text-emerald-700 font-bold hidden sm:inline">{division}</span>
              {lastUpdated && (
                <span className="text-slate-500 text-[11px] hidden md:inline font-mono">
                  (Live gesynchroniseerd: {lastUpdated})
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onRefreshLive && (
                <button
                  onClick={onRefreshLive}
                  disabled={isRefreshing}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  title="Herlaad live data vanaf proclubstracker.com"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Laden...' : 'Ververs Live Data'}</span>
                </button>
              )}

              <a
                href={PROCLUBS_TRACKER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
              >
                <span>Bekijk op ProClubsTracker</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Main Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide">
                <Flame className="w-3.5 h-3.5 text-blue-600" />
                <span>OFFICIËLE CLUB STARTPAGINA · EA SPORTS FC 27 PRO CLUBS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-none uppercase">
                PREDATOR UNITED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500">
                  WIE WIJ ZIJN
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
                Welkom bij <strong>Predator United</strong>! Wij zijn een hechte, fanatieke en tactisch gedisciplineerde EA Sports FC 27 Pro Clubs vereniging actief in <strong>Division 5</strong>. Ontdek ons verhaal, onze leiders, de tactiek en onze opmars naar de top.
              </p>

              {/* Quick Action Navigation CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#wie-wij-zijn-verhaal"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <span>Lees Wie Wij Zijn</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onSelectTab('selectie')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Onze Spelers ({players.length || 4})</span>
                </button>
                <button
                  onClick={() => onSelectTab('wedstrijden')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Wedstrijden ({matchesCount})</span>
                </button>
                {onOpenTrial && (
                  <button
                    onClick={onOpenTrial}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 text-amber-400" />
                    <span>Meld je aan voor Try-out</span>
                  </button>
                )}
              </div>

              {/* Quick Status Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold">Huidige Vorm:</span>
                  <div className="flex items-center gap-1">
                    {currentForm.map((f: string, i: number) => {
                      const isWin = f === 'W';
                      const isDraw = f === 'D' || f === 'G';
                      const label = isDraw ? 'D' : f;
                      return (
                        <span
                          key={i}
                          className={`inline-flex items-center justify-center w-5 h-5 rounded text-[11px] font-bold ${
                            isWin
                              ? 'bg-emerald-600 text-white'
                              : isDraw
                              ? 'bg-amber-500 text-white'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Stadion:</span>
                  <span className="text-slate-900 font-bold">{stadium}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Skill Rating:</span>
                  <span className="text-blue-700 font-bold font-mono">{skillRating}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Live Division & Match Center Card (NO LOGO) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-full p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-black uppercase text-slate-900 tracking-wider">
                      Live EA FC 27 Match Center
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200">
                    ID #181654
                  </span>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-inner">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block font-mono">
                        Huidige Divisie
                      </span>
                      <span className="text-2xl font-black uppercase tracking-tight text-white">
                        {division}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block font-mono">
                        Skill Rating
                      </span>
                      <span className="text-2xl font-black text-amber-400 font-mono">
                        {skillRating}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center font-mono">
                    <div className="p-2 rounded-lg bg-white/5">
                      <span className="text-[10px] text-slate-400 block uppercase">Gewonnen</span>
                      <span className="text-base font-black text-emerald-400">{wins}W</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <span className="text-[10px] text-slate-400 block uppercase">Gelijk</span>
                      <span className="text-base font-black text-slate-300">{draws}G</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <span className="text-[10px] text-slate-400 block uppercase">Verloren</span>
                      <span className="text-base font-black text-rose-400">{losses}V</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/10 text-slate-300">
                    <span>Winrate: <strong className="text-blue-300 font-mono">{calculatedWinRate}</strong></span>
                    <span>Doelsaldo: <strong className="text-emerald-400 font-mono">{goalDiff}</strong></span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Speelavonden:</span>
                    <span className="font-bold text-slate-900">Di · Do · Zo (20:15 CET)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Voice Kanaal:</span>
                    <span className="font-bold text-[#5865F2]">Besloten Discord</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => onSelectTab('wedstrijden')}
                    className="flex-1 py-2 text-center text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Bekijk Uitslagen
                  </button>
                  {onOpenTrial && (
                    <button
                      onClick={onOpenTrial}
                      className="flex-1 py-2 text-center text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] rounded-lg transition-colors cursor-pointer"
                    >
                      Discord Try-out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Real Metric Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-colors">
              <div className="text-xs font-semibold text-slate-500 mb-1">Club Balans (W-G-V)</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums tracking-tight">
                {wins}<span className="text-blue-600 font-normal text-lg">W</span>{' '}
                {draws}<span className="text-slate-400 font-normal text-lg">G</span>{' '}
                {losses}<span className="text-rose-600 font-normal text-lg">V</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Totaal {totalMatchesCalculated} officiële wedstrijden in Divisie 5
              </div>
              <div className="absolute right-3 top-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-colors">
              <div className="text-xs font-semibold text-slate-500 mb-1">Winpercentage</div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 tabular-nums tracking-tight font-mono">
                {calculatedWinRate}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Doelsaldo: {goalDiff} ({goalsScored} voor, {goalsConceded} tegen)
              </div>
              <div className="absolute right-3 top-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Flame className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-colors">
              <div className="text-xs font-semibold text-slate-500 mb-1">Doelpunten Voor & Tegen</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tabular-nums tracking-tight">
                {goalsScored} - {goalsConceded}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Topscorers: n. Israël, T. RaySist
              </div>
              <div className="absolute right-3 top-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-colors">
              <div className="text-xs font-semibold text-slate-500 mb-1">EA FC Skill Rating</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-600 tabular-nums tracking-tight font-mono">
                {skillRating}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {division} · Common Gen 5
              </div>
              <div className="absolute right-3 top-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED "WIE WIJ ZIJN" (WHO WE ARE) STORY & IDENTITY SECTION */}
      <section id="wie-wij-zijn-verhaal" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Shield className="w-3.5 h-3.5" />
              <span>Clubprofiel & Identiteit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Wie Wij Zijn
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Predator United is een competitieve vriendengroep en Pro Clubs voetbalvereniging in EA Sports FC 27. Wij spelen voor de winst, bouwen op wederzijds respect en vieren elk doelpunt samen.
            </p>
          </div>

          {/* 3 Main Pillars of Predator United */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
            {/* Pillar 1: Onze Oprichting & Filosofie */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center mb-5 shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                  Onze Missie & Oprichting
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Predator United is opgericht om het echte Pro Clubs gevoel tot leven te brengen: geen solisten of ego-voetbal, maar een geoliede machine waar iedereen zijn taken uitvoert. In <strong>Division 5</strong> leggen we het fundament om door te stoten naar Division 1 en het kampioenschap.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-blue-700 flex items-center gap-1">
                <span>Eerlijk spel, tactische counters & passie</span>
              </div>
            </div>

            {/* Pillar 2: Aanvalskracht & Combinatiespel */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-blue-50/50 to-indigo-50/30 border border-blue-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-3 right-3 text-blue-400 opacity-20">
                <Zap className="w-16 h-16" />
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center mb-5 shadow-xs">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                  Aanvalskracht & Topscorers
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  Met 57 competitiedoelpunten beschikt Predator United over een vlijmscherpe voorhoede die elkaar feilloos aanvult:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                    <span className="font-bold text-slate-900">Baloa_6 (20 goals) & BoefSam00 (18 goals)</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Klinische afronding, loopacties en scorend vermogen vanuit de aanval en het middenveld.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                    <span className="font-bold text-slate-900">Theodebestebeste (12 assists) & Paggaking67 (9 goals, 9 assists)</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Vlijmscherpe steekpasses, balaannames en openingen naar de flanken.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-blue-700 flex items-center gap-1">
                <span>Direct combinatiespel & dodelijke afronding</span>
              </div>
            </div>

            {/* Pillar 3: Teamspirit, Discipline & Discord */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-5 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                  Teamspirit, Discipline & Discord
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Geen solisten en geen frustraties: Predator United draait om communicatie en respect. Iedereen meldt zich voor wedstrijden via onze besloten <strong>Discord</strong> server en we vechten met het hele team tot de 90e minuut.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium">
                  &ldquo;Samen winnen, samen verdedigen en samen promoveren naar de hoogste divisies van EA FC 27.&rdquo;
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>Vaste speelavonden en directe spraakcommunicatie</span>
              </div>
            </div>
          </div>

          {/* Core Values Strip */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-14">
            <div className="max-w-2xl mb-6">
              <span className="text-xs font-bold font-mono tracking-wider text-blue-400 uppercase">
                Kernwaarden van Predator United
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight mt-1">
                Waar Wij Voor Staan
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1.5">
                <div className="text-blue-400 font-bold text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>1. Teamgeest Eerst</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Samen winnen, samen verliezen. Nooit naar elkaar wijzen bij tegendoelpunten; altijd direct herpakken.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>2. Tactische Discipline</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Iedereen houdt zijn positie in onze 4-2-3-1 en 4-4-2 formaties. Aanvallen met overtuiging, verdedigen als één blok.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>3. Snelle Counters</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Razendsnelle omschakeling vanuit balbezitverlies van de tegenstander, direct richting onze twee aanvalsleiders.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>4. Open voor Versterking</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We scouten actief talentvolle verdedigers en middenvelders voor try-out sessies via ons Staff Portal.
                </p>
              </div>
            </div>
          </div>

          {/* SQUAD SPOTLIGHT ON START PAGE */}
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Onze Spelers
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-0.5">
                  De Hoofdrolspelers van de Selectie
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Maak kennis met de vaste krachten die de clubkleuren van Predator United verdedigen.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('selectie')}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-lg border border-blue-200 transition-colors cursor-pointer"
              >
                <span>Bekijk Volledige Selectie & Statistieken</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Spits 1: Theodebestebeste */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      #9 · ST
                    </span>
                    <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Basisspeler
                    </span>
                  </div>
                  <div className="font-black text-base text-slate-900">
                    Theodebestebeste
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Pro Naam: n. Israël
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    Aanvalsleider en aanspeelpunt. Brengt fysieke kracht (188cm), kopkracht en 12 assists.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Rating: <strong className="text-slate-900 font-bold font-mono">77 OVR</strong></span>
                  <span className="text-emerald-600 font-bold font-mono">7 Goals · 12 Assists</span>
                </div>
              </div>

              {/* Spits 2: Paggaking67 */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      #10 · ST/CF
                    </span>
                    <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Basisspeler
                    </span>
                  </div>
                  <div className="font-black text-base text-slate-900">
                    Paggaking67
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Pro Naam: T. RaySist (raysist)
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    Wendbaar, diepe loopacties en dodelijk link-up spel. Behaalde een historische 9.9 match rating.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Rating: <strong className="text-slate-900 font-bold font-mono">75 OVR</strong></span>
                  <span className="text-emerald-600 font-bold font-mono">9 Goals · 9 Assists</span>
                </div>
              </div>

              {/* Midfield Engine: BoefSam00 */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      #8 · CM/CAM
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Basisspeler
                    </span>
                  </div>
                  <div className="font-black text-base text-slate-900">
                    BoefSam00
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Pro Naam: Sam B.
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    De motor op het middenveld. Verdeelt het spel, onderschept passes en brengt de spitsen in stelling.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Rating: <strong className="text-slate-900 font-bold font-mono">75 OVR</strong></span>
                  <span className="text-blue-600 font-bold font-mono">82 Pass · 78 Ph</span>
                </div>
              </div>

              {/* Defensive Rock: Levi_Hofman */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      #3 · LB/LWB
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Basisspeler
                    </span>
                  </div>
                  <div className="font-black text-base text-slate-900">
                    Levi_Hofman
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Pro Naam: L. Hofman
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    Verdedigende zekerheid op de flank. Blokt voorzetten af en sluit gevaarlijk aan bij de opbouw.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Rating: <strong className="text-slate-900 font-bold font-mono">74 OVR</strong></span>
                  <span className="text-indigo-600 font-bold font-mono">80 Def · 84 Spd</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                Navigeer Direct Naar Clubonderdelen
              </h3>
              <span className="text-xs text-slate-500">
                Klik op een tegel om te openen
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              <button
                onClick={() => onSelectTab('wedstrijden')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-white hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  Wedstrijden
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Uitslagen, verslagen & statistieken
                </div>
              </button>

              <button
                onClick={() => onSelectTab('selectie')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-white hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                  Selectie & Team
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Spelers, rugnummers & posities
                </div>
              </button>

              <button
                onClick={() => onSelectTab('tactiek')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-500 hover:bg-white hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Sliders className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                  Opstelling & Tactiek
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Interactief speelveld (4-2-3-1 & 4-4-2)
                </div>
              </button>

              <button
                onClick={() => onSelectTab('nieuws')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-500 hover:bg-white hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center mb-2.5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <Newspaper className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                  Nieuws & Feed
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Clubupdates, berichten & reacties
                </div>
              </button>

              <button
                onClick={() => onSelectTab('info')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-500 hover:bg-white hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2.5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Info className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                  Club Info & Speeltijden
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Dinsdag, Donderdag & Zondag
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
